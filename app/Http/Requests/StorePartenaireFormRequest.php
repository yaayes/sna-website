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
            'address' => ['required', 'string', 'max:500'],
            'phone' => ['nullable', 'string', 'max:20'],
            'email' => ['required', 'email', 'max:255'],
            'contact_name' => ['required', 'string', 'max:255'],
            'partnership_moral' => ['boolean'],
            'partnership_moral_details' => ['nullable', 'string', 'max:1000'],
            'partnership_technical' => ['boolean'],
            'partnership_technical_details' => ['nullable', 'string', 'max:1000'],
            'partnership_financial' => ['boolean'],
            'objectives' => ['required', 'string', 'max:3000'],
            'comment_libre' => ['nullable', 'string', 'max:2000'],
            'commitment_projects' => ['boolean'],
            'commitment_communication' => ['boolean'],
            'commitment_expertise' => ['boolean'],
            'attachments' => ['nullable', 'array'],
            'attachments.*' => ['file', 'mimes:pdf', 'max:5120'],
            'consents_email' => ['boolean'],
            'consents_rgpd' => ['accepted'],
        ];
    }

    public function messages(): array
    {
        return [
            'organisation_name.required' => 'Le nom de l organisation est obligatoire.',
            'legal_status.required' => 'Le statut juridique est obligatoire.',
            'address.required' => 'L adresse est obligatoire.',
            'email.required' => 'L adresse email est obligatoire.',
            'email.email' => 'L adresse email n est pas valide.',
            'contact_name.required' => 'Le nom et la fonction du contact sont obligatoires.',
            'objectives.required' => 'Veuillez preciser les objectifs et motivations du partenariat.',
            'attachments.*.mimes' => 'Les pieces jointes doivent etre au format PDF.',
            'attachments.*.max' => 'Les pieces jointes ne doivent pas depasser 5 MB.',
            'consents_rgpd.accepted' => 'Vous devez accepter les conditions RGPD.',
        ];
    }
}
