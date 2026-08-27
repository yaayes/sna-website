<?php

namespace App\Http\Requests\Admin;

use App\Exports\ExportFieldGroups;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Base request for a field-group export endpoint.
 *
 * Subclasses provide the allowed group keys (from the form's
 * {@see ExportFieldGroups} registry) and may add form-specific
 * filter rules via {@see extraRules()}.
 */
abstract class ExportFieldGroupsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Allowed field-group keys for this form.
     *
     * @return array<int, string>
     */
    abstract protected function allowedGroups(): array;

    /**
     * Extra, form-specific validation rules (e.g. a payment-status filter).
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    protected function extraRules(): array
    {
        return [];
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return array_merge([
            'format' => ['required', Rule::in(['xlsx', 'csv'])],
            'groups' => ['required', 'array', 'min:1'],
            'groups.*' => ['string', Rule::in($this->allowedGroups())],
            'search' => ['nullable', 'string', 'max:255'],
            'date_from' => ['nullable', 'date'],
            'date_to' => ['nullable', 'date', 'after_or_equal:date_from'],
        ], $this->extraRules());
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'groups.required' => 'Veuillez sélectionner au moins un groupe de champs à exporter.',
            'groups.min' => 'Veuillez sélectionner au moins un groupe de champs à exporter.',
        ];
    }
}
