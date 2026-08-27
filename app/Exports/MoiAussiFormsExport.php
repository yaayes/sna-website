<?php

namespace App\Exports;

use App\Models\MoiAussiForm;
use Illuminate\Database\Eloquent\Builder;

class MoiAussiFormsExport extends FieldGroupExport
{
    /**
     * @return Builder<MoiAussiForm>
     */
    public function query(): Builder
    {
        return MoiAussiForm::query()
            ->with('action:id,title,slug')
            ->when($this->filters['search'] ?? null, function (Builder $query, string $search): void {
                $query->where(function (Builder $inner) use ($search): void {
                    $inner->where('email', 'ilike', "%{$search}%")
                        ->orWhere('ref', 'ilike', "%{$search}%")
                        ->orWhere('name', 'ilike', "%{$search}%");
                });
            })
            ->when($this->filters['date_from'] ?? null, fn (Builder $query, string $date) => $query->whereDate('created_at', '>=', $date))
            ->when($this->filters['date_to'] ?? null, fn (Builder $query, string $date) => $query->whereDate('created_at', '<=', $date))
            ->orderByDesc('created_at')
            ->orderBy('id');
    }

    /**
     * @return class-string<MoiAussiExportGroups>
     */
    protected function groupRegistry(): string
    {
        return MoiAussiExportGroups::class;
    }
}
