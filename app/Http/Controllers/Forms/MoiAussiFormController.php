<?php

namespace App\Http\Controllers\Forms;

use App\Actions\NotifyOnFormSubmissionCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMoiAussiFormRequest;
use App\Models\FormSubmission;
use App\Models\MoiAussiForm;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class MoiAussiFormController extends Controller
{
    public function store(StoreMoiAussiFormRequest $request): RedirectResponse
    {
        $form = MoiAussiForm::create($request->validated());

        $email = $form->email;

        if ($email) {
            $submission = FormSubmission::create([
                'email' => $email,
                'type' => 'moi_aussi',
                'formable_type' => MoiAussiForm::class,
                'formable_id' => $form->id,
                'access_token' => Str::random(64),
                'token_expires_at' => now()->addDays(30),
            ]);

            (new NotifyOnFormSubmissionCreated)($submission);
        }

        return back()->with('success', 'Votre témoignage a bien été enregistré. Merci pour votre contribution.');
    }
}
