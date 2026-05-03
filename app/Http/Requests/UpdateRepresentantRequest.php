<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRepresentantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
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
            'department_code.required' => 'Le code departement est obligatoire.',
            'department_name.required' => 'Le nom du departement est obligatoire.',
            'first_name.required' => 'Le prenom est obligatoire.',
            'last_name.required' => 'Le nom de famille est obligatoire.',
            'role.required' => 'Le role est obligatoire.',
            'short_bio.required' => 'La biographie courte est obligatoire.',
        ];
    }
}
