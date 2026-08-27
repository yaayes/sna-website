<?php

namespace App\Concerns;

use App\Exports\FieldGroupExport;
use App\Http\Requests\Admin\ExportFieldGroupsRequest;
use Maatwebsite\Excel\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

/**
 * Shared controller helper for field-group export endpoints.
 */
trait ExportsFieldGroups
{
    /**
     * Build the download response for a {@see FieldGroupExport}.
     *
     * @param  class-string<FieldGroupExport>  $exportClass
     * @param  array<string, mixed>  $validated  Output of an {@see ExportFieldGroupsRequest}.
     * @param  string  $filenamePrefix  e.g. "adhesions-aidant" -> "adhesions-aidant-2026-08-27.xlsx"
     */
    protected function downloadFieldGroupExport(string $exportClass, array $validated, string $filenamePrefix): BinaryFileResponse
    {
        $writerType = ($validated['format'] === 'csv') ? Excel::CSV : Excel::XLSX;

        $filters = array_filter([
            'search' => $validated['search'] ?? null,
            'date_from' => $validated['date_from'] ?? null,
            'date_to' => $validated['date_to'] ?? null,
            'payment_status' => $validated['payment_status'] ?? null,
        ], fn ($value): bool => $value !== null);

        $filename = $filenamePrefix.'-'.now()->format('Y-m-d').'.'.$validated['format'];

        return (new $exportClass($validated['groups'], $filters))->download($filename, $writerType);
    }
}
