<?php

namespace App\Console\Commands;

use App\Models\AidantAdhesionForm;
use Illuminate\Console\Command;

class PruneAidantAdhesionDrafts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:prune-aidant-adhesion-drafts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete aidant adhesion drafts older than one month';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $threshold = now()->subMonth();

        $deletedCount = AidantAdhesionForm::query()
            ->where('status', AidantAdhesionForm::STATUS_DRAFT)
            ->where(function ($query) use ($threshold): void {
                $query->where('draft_saved_at', '<=', $threshold)
                    ->orWhere(function ($nestedQuery) use ($threshold): void {
                        $nestedQuery->whereNull('draft_saved_at')
                            ->where('created_at', '<=', $threshold);
                    });
            })
            ->delete();

        $this->info("Pruned {$deletedCount} old aidant adhesion draft(s).");

        return self::SUCCESS;
    }
}
