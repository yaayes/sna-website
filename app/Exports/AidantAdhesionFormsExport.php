<?php

namespace App\Exports;

use App\Models\AidantAdhesionForm;
use Illuminate\Database\Eloquent\Builder;

class AidantAdhesionFormsExport extends FieldGroupExport
{
    /**
     * @return Builder<AidantAdhesionForm>
     */
    public function query(): Builder
    {
        return AidantAdhesionForm::query()
            ->where('status', AidantAdhesionForm::STATUS_COMPLETED)
            ->with(['submission.payments' => fn ($query) => $query->latest()])
            ->when($this->filters['search'] ?? null, function (Builder $query, string $search): void {
                $query->where(function (Builder $inner) use ($search): void {
                    $inner->where('email', 'ilike', "%{$search}%")
                        ->orWhere('ref', 'ilike', "%{$search}%")
                        ->orWhere('nom', 'ilike', "%{$search}%")
                        ->orWhere('prenom', 'ilike', "%{$search}%")
                        ->orWhere('phone', 'ilike', "%{$search}%");
                });
            })
            ->when($this->filters['date_from'] ?? null, fn (Builder $query, string $date) => $query->whereDate('created_at', '>=', $date))
            ->when($this->filters['date_to'] ?? null, fn (Builder $query, string $date) => $query->whereDate('created_at', '<=', $date))
            ->when($this->filters['payment_status'] ?? null, function (Builder $query, string $status): void {
                if ($status === 'none') {
                    $query->whereDoesntHave('submission.payments', fn (Builder $inner) => $inner->whereIn('status', ['captured', 'authorized']));

                    return;
                }

                $query->whereHas('submission.payments', fn (Builder $inner) => $inner->where('status', $status));
            })
            ->orderByDesc('created_at')
            ->orderBy('id');
    }

    /**
     * @return class-string<AidantAdhesionExportGroups>
     */
    protected function groupRegistry(): string
    {
        return AidantAdhesionExportGroups::class;
    }
}
