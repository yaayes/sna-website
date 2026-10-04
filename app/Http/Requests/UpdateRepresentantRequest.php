<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRepresentantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Normalize numeric strings such as "07" so they pass the integer rule.
     */
    protected function prepareForValidation(): void
    {
        $sortOrder = $this->input('sort_order');

        if (is_string($sortOrder) && preg_match('/^\d+$/', trim($sortOrder))) {
            $this->merge(['sort_order' => (int) trim($sortOrder)]);
        }
    }

    public function rules(): array
    {
        return [
            'department_code' => ['required', 'string', 'max:10'],
            'department_name' => ['required', 'string', 'max:255'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'short_bio' => ['required', 'string'],
            'photo' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp', 'max:3072'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'department_code.required' => 'Le code département est obligatoire.',
            'department_name.required' => 'Le nom du département est obligatoire.',
            'first_name.required' => 'Le prénom est obligatoire.',
            'last_name.required' => 'Le nom de famille est obligatoire.',
            'role.required' => 'Le rôle est obligatoire.',
            'short_bio.required' => 'La biographie courte est obligatoire.',
            'photo.image' => 'La photo doit être une image.',
            'photo.mimes' => 'La photo doit être au format JPEG, PNG ou WebP.',
            'photo.max' => 'La photo ne doit pas dépasser 3 Mo.',
            'sort_order.integer' => "L'ordre d'affichage doit être un nombre entier.",
            'sort_order.min' => "L'ordre d'affichage doit être supérieur ou égal à 0.",
        ];
    }
}
