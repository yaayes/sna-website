<?php

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePartenaireFormRequest;
use App\Models\FormSubmission;
use App\Models\PartenaireForm;
use App\Models\PartenaireFormAttachment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PartenaireFormController extends Controller
{
    public function store(StorePartenaireFormRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        // Remove attachments from validated data before creating form
        $attachments = $validated['attachments'] ?? [];
        unset($validated['attachments']);

        $form = PartenaireForm::create($validated);

        // Handle file uploads
        if (!empty($attachments)) {
            foreach ($attachments as $file) {
                $path = $file->store('partenaire-forms', 'public');
                PartenaireFormAttachment::create([
                    'partenaire_form_id' => $form->id,
                    'file_path' => $path,
                    'original_name' => $file->getClientOriginalName(),
                ]);
            }
        }

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

