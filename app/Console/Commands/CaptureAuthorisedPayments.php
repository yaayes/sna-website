<?php

namespace App\Console\Commands;

use App\Models\Payment;
use App\Services\CawlPaymentService;
use Illuminate\Console\Command;
use Throwable;

class CaptureAuthorisedPayments extends Command
{
    protected $signature = 'payments:capture-authorised
                            {--dry-run : List what would be captured without making any API calls}
                            {--chunk=50 : Number of payments to process per batch}';

    protected $description = 'Capture all authorised (PENDING_CAPTURE) payments that have not yet been captured';

    public function __construct(private readonly CawlPaymentService $cawlPaymentService)
    {
        parent::__construct();
    }

    public function handle(): int
    {
        $dryRun = $this->option('dry-run');
        $chunk = (int) $this->option('chunk');

        $query = Payment::query()
            ->where('status', 'authorized')
            ->whereNotNull('cawl_payment_id')
            ->orderBy('created_at');

        $total = $query->count();

        if ($total === 0) {
            $this->info('No authorised payments found.');

            return self::SUCCESS;
        }

        $this->info(sprintf(
            '%s %d authorised payment(s)%s.',
            $dryRun ? '[DRY RUN] Would process' : 'Processing',
            $total,
            $dryRun ? '' : ' — verifying status with CAWL before capture',
        ));

        if ($dryRun) {
            $this->table(
                ['ID', 'Merchant Reference', 'Amount', 'Created At', 'CAWL Payment ID'],
                $query->get()->map(fn (Payment $p) => [
                    $p->id,
                    $p->merchant_reference,
                    $p->amountEuros().' €',
                    $p->created_at?->toDateTimeString(),
                    $p->cawl_payment_id,
                ])->all(),
            );

            return self::SUCCESS;
        }

        $captured = 0;
        $skipped = 0;
        $failed = 0;
        $expired = 0;

        $bar = $this->output->createProgressBar($total);
        $bar->start();

        $query->chunk($chunk, function ($payments) use (&$captured, &$skipped, &$failed, &$expired, $bar): void {
            foreach ($payments as $payment) {
                /** @var Payment $payment */
                $this->processPayment($payment, $captured, $skipped, $failed, $expired);
                $bar->advance();
            }
        });

        $bar->finish();
        $this->newLine(2);

        $this->table(
            ['Result', 'Count'],
            [
                ['Captured successfully', $captured],
                ['Already captured / in progress (skipped)', $skipped],
                ['Authorisation expired or rejected', $expired],
                ['Errors', $failed],
            ],
        );

        return $failed > 0 ? self::FAILURE : self::SUCCESS;
    }

    private function processPayment(
        Payment $payment,
        int &$captured,
        int &$skipped,
        int &$failed,
        int &$expired,
    ): void {
        try {
            // Always verify the real status on CAWL before attempting capture —
            // authorisations from weeks ago may have already expired.
            $result = $this->cawlPaymentService->getPaymentStatus($payment->cawl_payment_id);
            $remoteStatus = strtoupper($result['status'] ?? '');

            if ($remoteStatus !== 'PENDING_CAPTURE') {
                // Sync our local status with whatever CAWL reports now.
                $localStatus = $this->mapRemoteStatus($remoteStatus);

                if ($localStatus !== $payment->status) {
                    $payment->update(['status' => $localStatus, 'status_code' => $result['status_code']]);
                }

                if (in_array($remoteStatus, ['CAPTURED', 'CAPTURE_REQUESTED'])) {
                    $skipped++;
                } else {
                    // CANCELLED, REJECTED, etc. — authorisation expired or was voided.
                    $expired++;
                    $this->newLine();
                    $this->warn(sprintf(
                        '  Payment %s (%s): remote status is %s — marked as %s.',
                        $payment->id,
                        $payment->merchant_reference,
                        $remoteStatus,
                        $localStatus,
                    ));
                }

                return;
            }

            $this->cawlPaymentService->capturePayment($payment->cawl_payment_id, $payment->amount_cents);
            $payment->update(['status_code' => $result['status_code']]);
            $captured++;
        } catch (Throwable $e) {
            $failed++;
            $this->newLine();
            $this->error(sprintf(
                '  Payment %s (%s): %s',
                $payment->id,
                $payment->merchant_reference,
                $e->getMessage(),
            ));
        }
    }

    private function mapRemoteStatus(string $remoteStatus): string
    {
        return match ($remoteStatus) {
            'CAPTURED', 'PAID' => 'captured',
            'REJECTED', 'REJECTED_CAPTURE' => 'rejected',
            'CANCELLED' => 'cancelled',
            'CAPTURE_REQUESTED', 'AUTHORIZATION_REQUESTED', 'PENDING_CAPTURE' => 'authorized',
            default => 'pending',
        };
    }
}
