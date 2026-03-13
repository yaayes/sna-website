<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMoiAussiFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'situation' => ['required', 'in:oui,en_cours,resolu'],
            'testimony' => ['required', 'string', 'max:5000'],
            'consequences' => ['nullable', 'array'],
            'consequences.*' => ['string', 'max:100'],
            'contacted_institution' => ['nullable', 'boolean'],
            'institution_name' => ['nullable', 'string', 'max:255'],
            'usage_anonymised' => ['boolean'],
            'usage_collective' => ['boolean'],
            'usage_legislation' => ['boolean'],
            'usage_confidential' => ['boolean'],
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
        ];
    }

    public function messages(): array
    {
        return [
            'situation.required' => 'Veuillez indiquer votre situation.',
            'situation.in' => 'La situation selectionnee est invalide.',
            'testimony.required' => 'Veuillez decrire ce que vous avez vecu.',
            'email.email' => 'L adresse email n est pas valide.',
        ];
    }
}
