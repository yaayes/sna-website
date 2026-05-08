<?php

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePartenaireFormRequest;
use App\Models\FormSubmission;
use App\Models\PartenaireForm;
use App\Models\PartenaireFormAttachment;
use App\Models\Payment;
use App\Services\CawlPaymentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class PartenaireFormController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('forms/partenaire', [
            'membershipFeeCents' => config('cawl.membership_fee_cents'),
            'prefillData' => session('partenaire_prefill'),
        ]);
    }

    public function store(StorePartenaireFormRequest $request): RedirectResponse|SymfonyResponse
    {
        $validated = $request->validated();
        $pendingFormId = $validated['pending_form_id'] ?? null;
        $attachments = $validated['attachments'] ?? [];
        $donAmountCents = $this->normalizeDonationAmountToCents($validated['don_amount'] ?? null);

        unset($validated['attachments'], $validated['don_amount'], $validated['pending_form_id']);
        $validated['don_amount_cents'] = $donAmountCents;

        $membershipFeeCents = (int) config('cawl.membership_fee_cents');
        $totalCents = $membershipFeeCents + ($donAmountCents ?? 0);

        return DB::transaction(function () use ($validated, $pendingFormId, $attachments, $totalCents) {
            if ($pendingFormId) {
                $form = PartenaireForm::whereKey($pendingFormId)
                    ->where('email', $validated['email'])
                    ->first();

                if ($form) {
                    $submission = $form->submission;
                    $isPaid = $submission?->payments()->whereIn('status', ['captured', 'authorized'])->exists();

                    if ($isPaid) {
                        return back()->with('success', 'Votre demande de partenariat a bien ete enregistree. Un email de confirmation vous a ete envoye.');
                    }

                    $form->update($validated);
                    $this->storeAttachments($form, $attachments);

                    if (! $submission) {
                        $submission = FormSubmission::create([
                            'email' => $form->email,
                            'type' => 'partenaire',
                            'formable_type' => PartenaireForm::class,
                            'formable_id' => $form->id,
                            'access_token' => Str::random(64),
                            'token_expires_at' => now()->addDays(30),
                        ]);
                    }

                    return $this->redirectToPaymentOrSuccess($submission, $totalCents);
                }
            }

            $form = PartenaireForm::create($validated);
            $this->storeAttachments($form, $attachments);

            $submission = FormSubmission::create([
                'email' => $form->email,
                'type' => 'partenaire',
                'formable_type' => PartenaireForm::class,
                'formable_id' => $form->id,
                'access_token' => Str::random(64),
                'token_expires_at' => now()->addDays(30),
            ]);

            return $this->redirectToPaymentOrSuccess($submission, $totalCents);
        });
    }

    /**
     * @param  UploadedFile[]  $attachments
     */
    private function storeAttachments(PartenaireForm $form, array $attachments): void
    {
        if (empty($attachments)) {
            return;
        }

        foreach ($attachments as $file) {
            $path = $file->store('partenaire-forms', 'public');
            PartenaireFormAttachment::create([
                'partenaire_form_id' => $form->id,
                'file_path' => $path,
                'original_name' => $file->getClientOriginalName(),
            ]);
        }
    }

    private function redirectToPaymentOrSuccess(FormSubmission $submission, int $totalCents): RedirectResponse|SymfonyResponse
    {
        if ($totalCents > 0) {
            $merchantReference = 'PAR-'.strtoupper(Str::random(10));
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

        return back()->with('success', 'Votre demande de partenariat a bien ete enregistree. Un email de confirmation vous a ete envoye.');
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
