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
        $form = AidantAdhesionForm::create($request->validated());

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
