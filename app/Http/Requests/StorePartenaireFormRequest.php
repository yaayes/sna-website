<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePartenaireFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'organisation_name' => ['required', 'string', 'max:255'],
            'legal_status' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'contact_name' => ['required', 'string', 'max:255'],
            'partnership_moral' => ['boolean'],
            'partnership_technical' => ['boolean'],
            'partnership_financial' => ['boolean'],
            'objectives' => ['required', 'string', 'max:3000'],
            'commitment_projects' => ['boolean'],
            'commitment_communication' => ['boolean'],
            'commitment_expertise' => ['boolean'],
            'consents_email' => ['boolean'],
            'consents_rgpd' => ['accepted'],
        ];
    }

    public function messages(): array
    {
        return [
            'organisation_name.required' => 'Le nom de l organisation est obligatoire.',
            'legal_status.required' => 'Le statut juridique est obligatoire.',
            'email.required' => 'L adresse email est obligatoire.',
            'email.email' => 'L adresse email n est pas valide.',
            'contact_name.required' => 'Le nom et la fonction du contact sont obligatoires.',
            'objectives.required' => 'Veuillez preciser les objectifs et motivations du partenariat.',
            'consents_rgpd.accepted' => 'Vous devez accepter les conditions RGPD.',
        ];
    }
}
