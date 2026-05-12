<?php

namespace App\Http\Controllers\Forms;

use App\Actions\NotifyOnFormSubmissionCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactFormRequest;
use App\Models\ContactForm;
use App\Models\FormSubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class ContactFormController extends Controller
{
    public function store(StoreContactFormRequest $request): RedirectResponse
    {
        $payload = $request->validated();
        $form = ContactForm::create($payload);

        $submission = FormSubmission::create([
            'email' => $form->email,
            'type' => 'contact',
            'formable_type' => ContactForm::class,
            'formable_id' => $form->id,
            'access_token' => Str::random(64),
            'token_expires_at' => now()->addDays(30),
        ]);

        (new NotifyOnFormSubmissionCreated)($submission);

        return back()->with('success', 'Votre message a bien été envoyé. Merci pour votre prise de contact.');
    }
}
