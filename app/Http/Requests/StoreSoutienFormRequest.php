<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSoutienFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'organisation' => ['nullable', 'string', 'max:255'],
            'statut' => ['required', 'in:physique,morale'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'wants_partnership' => ['boolean'],
            'wants_events' => ['boolean'],
            'wants_participation' => ['boolean'],
            'message' => ['nullable', 'string', 'max:2000'],
            'consents_email' => ['boolean'],
            'consents_rgpd' => ['accepted'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Le nom et prenom sont obligatoires.',
            'statut.required' => 'Le statut est obligatoire.',
            'email.required' => 'L adresse email est obligatoire.',
            'email.email' => 'L adresse email n est pas valide.',
            'consents_rgpd.accepted' => 'Vous devez accepter les conditions RGPD.',
        ];
    }
}
