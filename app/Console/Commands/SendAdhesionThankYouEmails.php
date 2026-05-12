<?php

namespace App\Console\Commands;

use App\Models\AidantAdhesionForm;
use App\Models\FormAccessToken;
use App\Models\FormSubmission;
use App\Notifications\FormSubmissionConfirmationNotification;
use Illuminate\Console\Command;
use Illuminate\Notifications\AnonymousNotifiable;
use Illuminate\Support\Str;

class SendAdhesionThankYouEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-adhesion-thank-you-emails
                            {--dry-run : Show how many emails would be sent without sending them}
                            {--paid-only : Only include submissions with a successful payment}
                            {--limit= : Limit how many submissions are processed}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send thank-you confirmation emails for older adhesion submissions that were not previously notified';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $limit = $this->option('limit');
        $dryRun = (bool) $this->option('dry-run');
        $paidOnly = (bool) $this->option('paid-only');

        $query = FormSubmission::query()
            ->where('type', 'adhesion')
            ->whereNull('notified_at')
            ->where('formable_type', AidantAdhesionForm::class)
            ->whereHasMorph('formable', [AidantAdhesionForm::class], function ($formQuery): void {
                $formQuery->where('status', AidantAdhesionForm::STATUS_COMPLETED);
            })
            ->where(function ($paymentQuery) use ($paidOnly): void {
                $paymentQuery->whereHas('payments', function ($successfulPayments): void {
                    $successfulPayments->whereIn('status', ['captured', 'authorized']);
                });

                if (! $paidOnly) {
                    $paymentQuery->orWhereDoesntHave('payments');
                }
            })
            ->orderBy('id');

        if (is_numeric($limit) && (int) $limit > 0) {
            $query->limit((int) $limit);
        }

        $submissions = $query->get();

        if ($dryRun) {
            $this->info("Dry run: {$submissions->count()} adhesion submission(s) would receive a thank-you email.");

            return self::SUCCESS;
        }

        $sent = 0;
        $skipped = 0;

        foreach ($submissions as $submission) {
            $updated = FormSubmission::query()
                ->whereKey($submission->getKey())
                ->whereNull('notified_at')
                ->update(['notified_at' => now()]);

            if ($updated === 0) {
                $skipped++;

                continue;
            }

            $accessToken = FormAccessToken::create([
                'email' => $submission->email,
                'token' => Str::random(64),
                'expires_at' => now()->addHour(),
            ]);

            (new AnonymousNotifiable)
                ->route('mail', $submission->email)
                ->notify(new FormSubmissionConfirmationNotification($submission, $accessToken->token));

            $sent++;
        }

        $this->info("Thank-you emails sent: {$sent}. Skipped: {$skipped}.");

        return self::SUCCESS;
    }
}
