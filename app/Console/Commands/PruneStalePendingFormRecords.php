<?php

namespace App\Console\Commands;

use App\Models\PartenaireForm;
use App\Models\SoutienForm;
use Illuminate\Console\Command;

class PruneStalePendingFormRecords extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:prune-stale-pending-form-records';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete stale pending soutien and partenaire records older than two weeks';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $threshold = now()->subDays(14);

        $deletedSoutien = $this->pruneSoutienForms($threshold);
        $deletedPartenaire = $this->prunePartenaireForms($threshold);

        $this->info("Pruned {$deletedSoutien} stale soutien record(s) and {$deletedPartenaire} stale partenaire record(s).");

        return self::SUCCESS;
    }

    private function pruneSoutienForms(\DateTimeInterface $threshold): int
    {
        $forms = SoutienForm::query()
            ->where('updated_at', '<=', $threshold)
            ->whereHas('submission', function ($query): void {
                $query->whereNull('notified_at')
                    ->whereDoesntHave('payments', function ($paymentQuery): void {
                        $paymentQuery->whereIn('status', ['captured', 'authorized']);
                    });
            })
            ->with('submission')
            ->get();

        $deletedCount = 0;

        foreach ($forms as $form) {
            $form->submission?->delete();
            $form->delete();
            $deletedCount++;
        }

        return $deletedCount;
    }

    private function prunePartenaireForms(\DateTimeInterface $threshold): int
    {
        $forms = PartenaireForm::query()
            ->where('updated_at', '<=', $threshold)
            ->whereHas('submission', function ($query): void {
                $query->whereNull('notified_at')
                    ->whereDoesntHave('payments', function ($paymentQuery): void {
                        $paymentQuery->whereIn('status', ['captured', 'authorized']);
                    });
            })
            ->with('submission')
            ->get();

        $deletedCount = 0;

        foreach ($forms as $form) {
            $form->submission?->delete();
            $form->delete();
            $deletedCount++;
        }

        return $deletedCount;
    }
}
