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
            'aidants' => ['required', 'array', 'min:1'],
            'aidants.*.genre' => ['nullable', 'in:homme,femme,non_renseigne'],
            'aidants.*.nom' => ['required', 'string', 'max:255'],
            'aidants.*.prenom' => ['required', 'string', 'max:255'],
            'aidants.*.age' => ['nullable', 'string', 'max:10'],
            'aidants.*.email' => ['required', 'email', 'max:255'],
            'aidants.*.phone' => ['nullable', 'string', 'max:50'],
            'aidants.*.departement' => ['nullable', 'string', 'max:100'],
            'aidants.*.commune' => ['nullable', 'string', 'max:255'],
            'aidants.*.aidant_type' => ['required', 'in:parent_handicap,conjoint,parent_aine,proche,autre'],
            'aidants.*.aidant_type_autre_precisions' => ['nullable', 'string', 'max:255'],
            'aidants.*.situation_familiale' => ['nullable', 'string', 'max:50'],
            'aidants.*.situation_familiale_autre_precisions' => ['nullable', 'string', 'max:255'],
            'aidants.*.aide_tranche_age' => ['nullable', 'in:moins_18,18_65,plus_65'],
            'aidants.*.aide_age' => ['nullable', 'string', 'max:10'],
            'aidants.*.type_situation' => ['nullable', 'array'],
            'aidants.*.type_situation.*' => ['string', 'max:100'],
            'aidants.*.type_situation_autre_precisions' => ['nullable', 'string', 'max:255'],
            'aidants.*.reconnaissance_administrative' => ['nullable', 'string', 'max:100'],

            'aides' => ['required', 'array', 'min:1'],
            'aides.*.aide_tranche_age' => ['nullable', 'in:moins_18,18_65,plus_65'],
            'aides.*.aide_age' => ['nullable', 'string', 'max:10'],
            'aides.*.type_situation' => ['nullable', 'array'],
            'aides.*.type_situation.*' => ['string', 'max:100'],
            'aides.*.type_situation_autre_precisions' => ['nullable', 'string', 'max:255'],
            'aides.*.reconnaissance_administrative' => ['nullable', 'string', 'max:100'],
            'aides.*.aide_genre' => ['nullable', 'in:homme,femme,non_renseigne'],
            'aides.*.aide_profile' => ['nullable', 'in:enfant,adulte'],
            'aides.*.scolarisation' => ['nullable', 'string', 'max:100'],
            'aides.*.scolarisation_autre_precisions' => ['nullable', 'string', 'max:255'],
            'aides.*.situation_adulte' => ['nullable', 'string', 'max:100'],
            'aides.*.situation_adulte_autre_precisions' => ['nullable', 'string', 'max:255'],
            'aides.*.lieu_habitation' => ['nullable', 'string', 'max:100'],
            'aides.*.lieu_habitation_autre_precisions' => ['nullable', 'string', 'max:255'],

            'genre' => ['nullable', 'in:homme,femme,non_renseigne'],
            'nom' => ['nullable', 'string', 'max:255'],
            'prenom' => ['nullable', 'string', 'max:255'],
            'age' => ['nullable', 'string', 'max:10'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'departement' => ['nullable', 'string', 'max:100'],
            'commune' => ['nullable', 'string', 'max:255'],
            'aidant_type' => ['nullable', 'in:parent_handicap,conjoint,parent_aine,proche,autre'],
            'aidant_type_autre_precisions' => ['nullable', 'string', 'max:255'],
            'situation_familiale' => ['nullable', 'string', 'max:50'],
            'situation_familiale_autre_precisions' => ['nullable', 'string', 'max:255'],
            'aide_tranche_age' => ['nullable', 'in:moins_18,18_65,plus_65'],
            'aide_age' => ['nullable', 'string', 'max:10'],
            'type_situation' => ['nullable', 'array'],
            'type_situation.*' => ['string', 'max:100'],
            'type_situation_autre_precisions' => ['nullable', 'string', 'max:255'],
            'reconnaissance_administrative' => ['nullable', 'string', 'max:100'],
            'aide_genre' => ['nullable', 'in:homme,femme,non_renseigne'],
            'scolarisation' => ['nullable', 'string', 'max:100'],
            'scolarisation_autre_precisions' => ['nullable', 'string', 'max:255'],
            'situation_adulte' => ['nullable', 'string', 'max:100'],
            'situation_adulte_autre_precisions' => ['nullable', 'string', 'max:255'],
            'lieu_habitation' => ['nullable', 'string', 'max:100'],
            'lieu_habitation_autre_precisions' => ['nullable', 'string', 'max:255'],
            'impacts' => ['nullable', 'array'],
            'impacts.*' => ['string', 'max:100'],
            'impacts_autre_precisions' => ['nullable', 'string', 'max:255'],
            'situation_professionnelle' => ['nullable', 'string', 'max:100'],
            'expression_libre' => ['nullable', 'string', 'max:3000'],
            'soutient_sna' => ['boolean'],
            'wants_info' => ['boolean'],
            'declaration_honneur' => ['accepted'],
            'don_amount' => ['nullable', 'numeric', 'min:1', 'max:100000'],
            'consents_rgpd' => ['accepted'],
        ];
    }

    public function messages(): array
    {
        return [
            'aidants.required' => "Veuillez renseigner au moins un aidant.",
            'aidants.min' => "Veuillez renseigner au moins un aidant.",
            'aides.required' => "Veuillez renseigner au moins une personne aidee.",
            'aides.min' => "Veuillez renseigner au moins une personne aidee.",
            'aidants.*.nom.required' => 'Le nom de chaque aidant est obligatoire.',
            'aidants.*.prenom.required' => 'Le prénom de chaque aidant est obligatoire.',
            'aidants.*.email.required' => "L'adresse e-mail de chaque aidant est obligatoire.",
            'aidants.*.email.email' => "Une adresse e-mail d'aidant n'est pas valide.",
            'aidants.*.aidant_type.required' => "Veuillez indiquer la situation de chaque aidant.",
            'declaration_honneur.accepted' => "Vous devez confirmer la déclaration sur l'honneur.",
            'consents_rgpd.accepted' => 'Vous devez accepter le traitement de vos données conformément au RGPD.',
        ];
    }
}
