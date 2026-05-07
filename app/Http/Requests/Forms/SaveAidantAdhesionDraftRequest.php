<?php

namespace App\Http\Requests\Forms;

use Illuminate\Foundation\Http\FormRequest;

class SaveAidantAdhesionDraftRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'draft_token' => ['nullable', 'string', 'size:64'],
            'step' => ['required', 'integer', 'min:0', 'max:5'],

            // Aidants — all optional for partial saves (required in final submit)
            'aidants' => ['nullable', 'array', 'min:1'],
            'aidants.*.genre' => ['nullable', 'in:homme,femme,non_renseigne'],
            'aidants.*.nom' => ['nullable', 'string', 'max:255'],
            'aidants.*.prenom' => ['nullable', 'string', 'max:255'],
            'aidants.*.age' => ['nullable', 'string', 'max:10'],
            'aidants.*.email' => ['nullable', 'email', 'max:255'],
            'aidants.*.phone' => ['nullable', 'string', 'max:50'],
            'aidants.*.departement' => ['nullable', 'string', 'max:100'],
            'aidants.*.commune' => ['nullable', 'string', 'max:255'],
            'aidants.*.aidant_type' => ['nullable', 'in:parent_handicap,conjoint,parent_aine,proche,autre'],
            'aidants.*.aidant_type_autre_precisions' => ['nullable', 'string', 'max:255'],
            'aidants.*.situation_familiale' => ['nullable', 'string', 'max:50'],
            'aidants.*.situation_familiale_autre_precisions' => ['nullable', 'string', 'max:255'],

            'aides' => ['nullable', 'array', 'min:1'],
            'aides.*.aide_genre' => ['nullable', 'in:homme,femme,non_renseigne'],
            'aides.*.aide_profile' => ['nullable', 'in:enfant,adulte'],
            'aides.*.scolarisation' => ['nullable', 'string', 'max:100'],
            'aides.*.scolarisation_autre_precisions' => ['nullable', 'string', 'max:255'],
            'aides.*.situation_adulte' => ['nullable', 'string', 'max:100'],
            'aides.*.situation_adulte_autre_precisions' => ['nullable', 'string', 'max:255'],
            'aides.*.lieu_habitation' => ['nullable', 'string', 'max:100'],
            'aides.*.lieu_habitation_autre_precisions' => ['nullable', 'string', 'max:255'],

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
            'soutient_sna' => ['nullable', 'boolean'],
            'wants_info' => ['nullable', 'boolean'],
            'declaration_honneur' => ['nullable', 'boolean'],
            'consents_rgpd' => ['nullable', 'boolean'],
            'don_amount' => ['nullable', 'numeric', 'min:0', 'max:100000'],
            'coupon_code' => ['nullable', 'string', 'max:50'],
        ];
    }
}
