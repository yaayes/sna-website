<?php

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePartenaireFormRequest;
use App\Models\FormSubmission;
use App\Models\PartenaireForm;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class PartenaireFormController extends Controller
{
    public function store(StorePartenaireFormRequest $request): RedirectResponse
    {
        $form = PartenaireForm::create($request->validated());

        FormSubmission::create([
            'email' => $form->email,
            'type' => 'partenaire',
            'formable_type' => PartenaireForm::class,
            'formable_id' => $form->id,
            'access_token' => Str::random(64),
            'token_expires_at' => now()->addDays(30),
        ]);

        return back()->with('success', 'Votre demande de partenariat a bien été enregistrée. Un email de confirmation vous a été envoyé.');
    }
}
