<?php

namespace App\Exports;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

/**
 * Base Laravel Excel export driven by an {@see ExportFieldGroups} registry.
 *
 * Subclasses implement {@see query()} (the filtered base query) and
 * {@see groupRegistry()} (the registry class name). Headings and row mapping
 * are derived from the selected groups.
 */
abstract class FieldGroupExport implements FromQuery, ShouldAutoSize, WithHeadings, WithMapping
{
    use Exportable;

    /**
     * @param  array<int, string>  $groups  Selected field-group keys.
     * @param  array{search?: string|null, date_from?: string|null, date_to?: string|null, payment_status?: string|null}  $filters
     */
    public function __construct(
        protected readonly array $groups,
        protected readonly array $filters = [],
    ) {}

    /**
     * @return Builder<covariant \Illuminate\Database\Eloquent\Model>
     */
    abstract public function query(): Builder;

    /**
     * @return class-string<ExportFieldGroups>
     */
    abstract protected function groupRegistry(): string;

    /**
     * @return array<int, string>
     */
    public function headings(): array
    {
        return $this->groupRegistry()::headings($this->groups);
    }

    /**
     * @param  Model  $row
     * @return array<int, string|null>
     */
    public function map($row): array
    {
        return $this->groupRegistry()::row($row, $this->groups);
    }
}
