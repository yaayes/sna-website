<?php

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestFormAccessLinkRequest;
use App\Models\FormAccessToken;
use App\Models\FormSubmission;
use App\Notifications\FormAccessLinkNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Notifications\AnonymousNotifiable;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class FormAccessController extends Controller
{
    public function showRequestForm(): Response
    {
        return Inertia::render('forms/access-request');
    }

    public function sendAccessLink(RequestFormAccessLinkRequest $request): RedirectResponse
    {
        $email = $request->validated('email');

        $hasSubmissions = FormSubmission::where('email', $email)->exists();

        if ($hasSubmissions) {
            $token = FormAccessToken::create([
                'email' => $email,
                'token' => Str::random(64),
                'expires_at' => now()->addHour(),
            ]);

            $notification = new FormAccessLinkNotification($token->token);

            (new AnonymousNotifiable)
                ->route('mail', $email)
                ->notify($notification);
        }

        // Always show success to prevent email enumeration
        return back()->with('success', 'Si des formulaires sont associés à cet email, un lien d\'accès vous a été envoyé.');
    }

    public function show(Request $request, string $token): Response|RedirectResponse
    {
        $accessToken = FormAccessToken::where('token', $token)->first();

        if (! $accessToken || ! $accessToken->isValid()) {
            return redirect()->route('forms.access.request')
                ->with('error', 'Ce lien est invalide ou a expiré. Veuillez en demander un nouveau.');
        }

        $accessToken->update(['used_at' => now()]);

        $submissions = FormSubmission::with('formable')
            ->where('email', $accessToken->email)
            ->latest()
            ->get()
            ->map(fn (FormSubmission $submission) => [
                'id' => $submission->id,
                'type' => $submission->type,
                'created_at' => $submission->created_at->format('d/m/Y à H:i'),
                'data' => $submission->formable,
            ]);

        return Inertia::render('forms/my-submissions', [
            'email' => $accessToken->email,
            'submissions' => $submissions,
        ]);
    }
}
