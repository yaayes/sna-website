<?php

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use App\Http\Requests\Forms\StoreAidantAdhesionFormRequest;
use App\Models\AidantAdhesionForm;
use App\Models\FormSubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class AidantAdhesionFormController extends Controller
{
    public function store(StoreAidantAdhesionFormRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $aidants = $validated['aidants'] ?? [];
        $primaryAidant = $aidants[0] ?? [];
        $aides = $validated['aides'] ?? [];
        $primaryAide = $aides[0] ?? [];

        $payload = array_merge($validated, [
            'aidants' => $aidants,
            'aides' => $aides,
            'genre' => $validated['genre'] ?? ($primaryAidant['genre'] ?? null),
            'nom' => $validated['nom'] ?? ($primaryAidant['nom'] ?? null),
            'prenom' => $validated['prenom'] ?? ($primaryAidant['prenom'] ?? null),
            'age' => $validated['age'] ?? ($primaryAidant['age'] ?? null),
            'email' => $validated['email'] ?? ($primaryAidant['email'] ?? null),
            'phone' => $validated['phone'] ?? ($primaryAidant['phone'] ?? null),
            'departement' => $validated['departement'] ?? ($primaryAidant['departement'] ?? null),
            'commune' => $validated['commune'] ?? ($primaryAidant['commune'] ?? null),
            'aidant_type' => $validated['aidant_type'] ?? ($primaryAidant['aidant_type'] ?? null),
            'aidant_type_autre_precisions' => $validated['aidant_type_autre_precisions'] ?? ($primaryAidant['aidant_type_autre_precisions'] ?? null),
            'situation_familiale' => $validated['situation_familiale'] ?? ($primaryAidant['situation_familiale'] ?? null),
            'situation_familiale_autre_precisions' => $validated['situation_familiale_autre_precisions'] ?? ($primaryAidant['situation_familiale_autre_precisions'] ?? null),
            'aide_tranche_age' => $validated['aide_tranche_age'] ?? ($primaryAide['aide_tranche_age'] ?? null),
            'aide_age' => $validated['aide_age'] ?? ($primaryAide['aide_age'] ?? null),
            'type_situation' => $validated['type_situation'] ?? ($primaryAide['type_situation'] ?? []),
            'type_situation_autre_precisions' => $validated['type_situation_autre_precisions'] ?? ($primaryAide['type_situation_autre_precisions'] ?? null),
            'reconnaissance_administrative' => $validated['reconnaissance_administrative'] ?? ($primaryAide['reconnaissance_administrative'] ?? null),
            'aide_genre' => $validated['aide_genre'] ?? ($primaryAide['aide_genre'] ?? null),
            'scolarisation' => $validated['scolarisation'] ?? ($primaryAide['scolarisation'] ?? null),
            'scolarisation_autre_precisions' => $validated['scolarisation_autre_precisions'] ?? ($primaryAide['scolarisation_autre_precisions'] ?? null),
            'situation_adulte' => $validated['situation_adulte'] ?? ($primaryAide['situation_adulte'] ?? null),
            'situation_adulte_autre_precisions' => $validated['situation_adulte_autre_precisions'] ?? ($primaryAide['situation_adulte_autre_precisions'] ?? null),
            'lieu_habitation' => $validated['lieu_habitation'] ?? ($primaryAide['lieu_habitation'] ?? null),
            'lieu_habitation_autre_precisions' => $validated['lieu_habitation_autre_precisions'] ?? ($primaryAide['lieu_habitation_autre_precisions'] ?? null),
            'don_amount_cents' => isset($validated['don_amount']) ? (int) round(((float) $validated['don_amount']) * 100) : null,
        ]);

        unset($payload['don_amount']);

        $form = AidantAdhesionForm::create($payload);

        FormSubmission::create([
            'email' => $form->email,
            'type' => 'adhesion',
            'formable_type' => AidantAdhesionForm::class,
            'formable_id' => $form->id,
            'access_token' => Str::random(64),
            'token_expires_at' => now()->addDays(30),
        ]);

        return back()->with('success', 'Votre adhésion a bien été enregistrée. Merci de soutenir le SNA !');
    }
}
