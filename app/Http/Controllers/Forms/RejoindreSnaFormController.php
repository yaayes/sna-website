<?php

namespace App\Http\Controllers\Forms;

use App\Actions\NotifyOnFormSubmissionCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRejoindreSnaFormRequest;
use App\Models\FormSubmission;
use App\Models\RejoindreSnaForm;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class RejoindreSnaFormController extends Controller
{
    public function store(StoreRejoindreSnaFormRequest $request): RedirectResponse
    {
        $form = RejoindreSnaForm::create($request->validated());

        $submission = FormSubmission::create([
            'email' => $form->email,
            'type' => 'rejoindre_sna',
            'formable_type' => RejoindreSnaForm::class,
            'formable_id' => $form->id,
            'access_token' => Str::random(64),
            'token_expires_at' => now()->addDays(30),
        ]);

        (new NotifyOnFormSubmissionCreated)($submission);

        return back()->with('success', 'Merci. Votre demande d implication a bien ete enregistree.');
    }
}
