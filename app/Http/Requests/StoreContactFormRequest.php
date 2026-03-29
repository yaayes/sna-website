<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:2000'],
            'profile' => ['required', 'in:aidant,professionnel,institution,etudiant,journaliste,autre'],
            'contact_preference' => ['required', 'in:email,phone,none'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Le nom et prénom sont obligatoires.',
            'city.required' => 'La ville est obligatoire.',
            'email.required' => "L'adresse email est obligatoire.",
            'email.email' => "L'adresse email n'est pas valide.",
            'subject.required' => "L'objet de votre demande est obligatoire.",
            'message.required' => 'Le message est obligatoire.',
            'profile.required' => 'Veuillez sélectionner votre profil.',
            'profile.in' => 'Le profil sélectionné est invalide.',
            'contact_preference.required' => 'Veuillez indiquer si vous souhaitez être recontacté(e).',
            'contact_preference.in' => 'Le choix de recontact est invalide.',
        ];
    }
}
