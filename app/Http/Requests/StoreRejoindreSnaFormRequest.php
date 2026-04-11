<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRejoindreSnaFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'involvement_types' => ['required', 'array', 'min:1'],
            'involvement_types.*' => ['string', 'in:benevole,cercle_reflexion,expertise_ponctuelle,projet_specifique'],
            'main_skills' => ['required', 'array', 'min:1'],
            'main_skills.*' => ['string', 'in:dev_info,web_ux_seo,communication_presse,juridique,redaction_recherche,philosophie_sociologie,analyse_economique,organisation_evenements,comptabilite_gestion,recherche_financements,plaidoyer_politique,coordination_territoriale,autre'],
            'other_skill' => [
                'nullable',
                'string',
                'max:255',
                Rule::requiredIf(fn () => in_array('autre', $this->input('main_skills', []), true)),
            ],
            'experience' => ['nullable', 'string', 'max:5000'],
            'availability' => ['required', 'string', 'in:une_fois,ponctuel,1_2_mois,1_2_semaine,structure'],
            'integration_preferences' => ['required', 'array', 'min:1'],
            'integration_preferences.*' => ['string', 'in:cercle,equipe_operationnelle,groupe_local,projet_national'],
            'name' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
        ];
    }

    public function messages(): array
    {
        return [
            'involvement_types.required' => 'Veuillez selectionner au moins un mode d implication.',
            'involvement_types.min' => 'Veuillez selectionner au moins un mode d implication.',
            'main_skills.required' => 'Veuillez selectionner au moins une competence principale.',
            'main_skills.min' => 'Veuillez selectionner au moins une competence principale.',
            'other_skill.required_if' => 'Veuillez preciser votre autre competence.',
            'availability.required' => 'Veuillez indiquer votre disponibilite.',
            'integration_preferences.required' => 'Veuillez selectionner au moins une option d integration.',
            'integration_preferences.min' => 'Veuillez selectionner au moins une option d integration.',
            'name.required' => 'Le nom est obligatoire.',
            'city.required' => 'La ville est obligatoire.',
            'email.required' => 'L adresse email est obligatoire.',
            'email.email' => 'L adresse email n est pas valide.',
        ];
    }
}
