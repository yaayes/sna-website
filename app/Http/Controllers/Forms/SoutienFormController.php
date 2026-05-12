<?php

namespace App\Http\Controllers\Forms;

use App\Actions\NotifyOnFormSubmissionCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSoutienFormRequest;
use App\Models\FormSubmission;
use App\Models\Payment;
use App\Models\SoutienForm;
use App\Services\CawlPaymentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class SoutienFormController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('forms/soutien', [
            'membershipFeeCents' => config('cawl.membership_fee_cents'),
            'prefillData' => session('soutien_prefill'),
        ]);
    }

    public function store(StoreSoutienFormRequest $request): RedirectResponse|SymfonyResponse
    {
        $validated = $request->validated();
        $pendingFormId = $validated['pending_form_id'] ?? null;
        $donAmountCents = $this->normalizeDonationAmountToCents($validated['don_amount'] ?? null);

        $payload = $validated;
        $payload['wants_events'] = $payload['wants_events'] ?? false;
        $payload['wants_participation'] = $payload['wants_participation'] ?? false;
        $payload['consents_email'] = $payload['consents_email'] ?? false;
        $payload['don_amount_cents'] = $donAmountCents;

        unset($payload['don_amount'], $payload['pending_form_id']);

        $membershipFeeCents = (int) config('cawl.membership_fee_cents');
        $totalCents = $membershipFeeCents + ($donAmountCents ?? 0);

        return DB::transaction(function () use ($payload, $pendingFormId, $totalCents) {
            if ($pendingFormId) {
                $form = SoutienForm::whereKey($pendingFormId)
                    ->where('email', $payload['email'])
                    ->first();

                if ($form) {
                    $submission = $form->submission;
                    $isPaid = $submission?->payments()->whereIn('status', ['captured', 'authorized'])->exists();

                    if ($isPaid) {
                        return back()->with('success', 'Votre demande de soutien a bien ete enregistree.');
                    }

                    $form->update($payload);
                    $form->refresh();

                    if (! $submission) {
                        $submission = FormSubmission::create([
                            'email' => $form->email,
                            'type' => 'soutien',
                            'formable_type' => SoutienForm::class,
                            'formable_id' => $form->id,
                            'access_token' => Str::random(64),
                            'token_expires_at' => now()->addDays(30),
                        ]);
                    }

                    return $this->redirectToPaymentOrSuccess($submission, $totalCents);
                }
            }

            $form = SoutienForm::create($payload);

            $submission = FormSubmission::create([
                'email' => $form->email,
                'type' => 'soutien',
                'formable_type' => SoutienForm::class,
                'formable_id' => $form->id,
                'access_token' => Str::random(64),
                'token_expires_at' => now()->addDays(30),
            ]);

            return $this->redirectToPaymentOrSuccess($submission, $totalCents);
        });
    }

    private function redirectToPaymentOrSuccess(FormSubmission $submission, int $totalCents): RedirectResponse|SymfonyResponse
    {
        if ($totalCents > 0) {
            $merchantReference = 'SOU-'.strtoupper(Str::random(10));
            $returnUrl = route('payment.return');
            $webhookUrl = route('payment.webhook');

            $cawl = app(CawlPaymentService::class);
            $checkout = $cawl->createHostedCheckout($totalCents, $merchantReference, $returnUrl, $webhookUrl);

            Payment::create([
                'form_submission_id' => $submission->id,
                'merchant_reference' => $merchantReference,
                'hosted_checkout_id' => $checkout['hosted_checkout_id'],
                'amount_cents' => $totalCents,
                'currency' => 'EUR',
                'status' => 'pending',
            ]);

            return Inertia::location($checkout['redirect_url']);
        }

        (new NotifyOnFormSubmissionCreated)($submission);

        return back()->with('success', 'Votre demande de soutien a bien ete enregistree.');
    }

    private function normalizeDonationAmountToCents(mixed $donAmount): ?int
    {
        if ($donAmount === null || $donAmount === '') {
            return null;
        }

        $amount = (float) $donAmount;

        if ($amount <= 0) {
            return null;
        }

        return (int) round($amount * 100);
    }
}
