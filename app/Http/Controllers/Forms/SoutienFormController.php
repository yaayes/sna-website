<?php

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSoutienFormRequest;
use App\Models\FormSubmission;
use App\Models\SoutienForm;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class SoutienFormController extends Controller
{
    public function store(StoreSoutienFormRequest $request): RedirectResponse
    {
        $form = SoutienForm::create($request->validated());

        FormSubmission::create([
            'email' => $form->email,
            'type' => 'soutien',
            'formable_type' => SoutienForm::class,
            'formable_id' => $form->id,
            'access_token' => Str::random(64),
            'token_expires_at' => now()->addDays(30),
        ]);

        return back()->with('success', 'Votre demande de soutien a bien été enregistrée. Un email de confirmation vous a été envoyé.');
    }
}
