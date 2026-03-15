<?php

namespace App\Http\Requests\Forms;

use Illuminate\Foundation\Http\FormRequest;

class StoreAidantAdhesionFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'genre' => ['nullable', 'in:homme,femme,non_renseigne'],
            'nom' => ['required', 'string', 'max:255'],
            'prenom' => ['required', 'string', 'max:255'],
            'age' => ['nullable', 'string', 'max:10'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'departement' => ['nullable', 'string', 'max:100'],
            'commune' => ['nullable', 'string', 'max:255'],
            'aidant_type' => ['required', 'in:parent_handicap,conjoint,parent_aine,proche,autre'],
            'situation_familiale' => ['nullable', 'string', 'max:50'],
            'aide_tranche_age' => ['nullable', 'in:moins_18,18_65,plus_65'],
            'aide_age' => ['nullable', 'string', 'max:10'],
            'type_situation' => ['nullable', 'array'],
            'type_situation.*' => ['string', 'max:100'],
            'reconnaissance_administrative' => ['nullable', 'string', 'max:100'],
            'aide_genre' => ['nullable', 'in:homme,femme,non_renseigne'],
            'scolarisation' => ['nullable', 'string', 'max:100'],
            'situation_adulte' => ['nullable', 'string', 'max:100'],
            'lieu_habitation' => ['nullable', 'string', 'max:100'],
            'impacts' => ['nullable', 'array'],
            'impacts.*' => ['string', 'max:100'],
            'situation_professionnelle' => ['nullable', 'string', 'max:100'],
            'expression_libre' => ['nullable', 'string', 'max:3000'],
            'soutient_sna' => ['boolean'],
            'wants_info' => ['boolean'],
            'consents_rgpd' => ['accepted'],
        ];
    }

    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom est obligatoire.',
            'prenom.required' => 'Le prénom est obligatoire.',
            'email.required' => "L'adresse e-mail est obligatoire.",
            'email.email' => "L'adresse e-mail n'est pas valide.",
            'aidant_type.required' => "Veuillez indiquer votre situation d'aidant(e).",
            'consents_rgpd.accepted' => 'Vous devez accepter le traitement de vos données conformément au RGPD.',
        ];
    }
}
