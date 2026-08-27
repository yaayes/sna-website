<?php

namespace App\Http\Requests\Admin;

use App\Exports\AidantAdhesionExportGroups;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rule;

class ExportAidantAdhesionRequest extends ExportFieldGroupsRequest
{
    /**
     * @return array<int, string>
     */
    protected function allowedGroups(): array
    {
        return AidantAdhesionExportGroups::keys();
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    protected function extraRules(): array
    {
        return [
            'payment_status' => ['nullable', Rule::in(['captured', 'pending', 'authorized', 'rejected', 'cancelled', 'none'])],
        ];
    }
}
