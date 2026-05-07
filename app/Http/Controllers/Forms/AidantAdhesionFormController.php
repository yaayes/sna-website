<?php

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use App\Http\Requests\Forms\SaveAidantAdhesionDraftRequest;
use App\Http\Requests\Forms\StoreAidantAdhesionFormRequest;
use App\Models\AidantAdhesionForm;
use App\Models\Coupon;
use App\Models\FormSubmission;
use App\Models\Payment;
use App\Services\CawlPaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class AidantAdhesionFormController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('forms/adhesion', [
            'membershipFeeCents' => config('cawl.membership_fee_cents'),
            'prefillData' => session('adhesion_prefill'),
        ]);
    }

    public function validateCoupon(Request $request): JsonResponse
    {
        $code = strtoupper(trim($request->string('code')->value()));

        if (empty($code)) {
            return response()->json(['valid' => false, 'message' => 'Veuillez saisir un code coupon.']);
        }

        $coupon = Coupon::where('code', $code)->first();

        if (! $coupon || ! $coupon->isValid()) {
            return response()->json(['valid' => false, 'message' => 'Ce code coupon est invalide ou expiré.']);
        }

        return response()->json([
            'valid' => true,
            'discount_cents' => $coupon->discount_cents,
            'message' => 'Coupon appliqué : -'.number_format($coupon->discount_cents / 100, 2, ',', '').' €',
        ]);
    }

    public function saveDraft(SaveAidantAdhesionDraftRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $draftToken = $validated['draft_token'] ?? null;

        $payload = $this->buildDraftPayload($validated);

        if ($draftToken) {
            $form = AidantAdhesionForm::where('draft_token', $draftToken)
                ->where('status', AidantAdhesionForm::STATUS_DRAFT)
                ->whereNull('draft_completed_at')
                ->first();

            if ($form) {
                $form->update($payload);

                return response()->json([
                    'draft_token' => $form->draft_token,
                    'draft_id' => $form->id,
                    'step' => $form->draft_step,
                ]);
            }
        }

        $aidants = $validated['aidants'] ?? [];

        $form = AidantAdhesionForm::create(array_merge($payload, [
            'draft_token' => Str::random(64),
            'status' => AidantAdhesionForm::STATUS_DRAFT,
            'nom' => $aidants[0]['nom'] ?? '',
            'prenom' => $aidants[0]['prenom'] ?? '',
            'aidant_type' => $aidants[0]['aidant_type'] ?? 'autre',
            'email' => $aidants[0]['email'] ?? '',
        ]));

        return response()->json([
            'draft_token' => $form->draft_token,
            'draft_id' => $form->id,
            'step' => $form->draft_step,
        ]);
    }

    public function fetchDraft(Request $request): JsonResponse
    {
        $token = $request->string('draft_token')->value();

        if (empty($token)) {
            return response()->json(['found' => false], 404);
        }

        $form = AidantAdhesionForm::where('draft_token', $token)
            ->where('status', AidantAdhesionForm::STATUS_DRAFT)
            ->whereNull('draft_completed_at')
            ->first();

        if (! $form) {
            return response()->json(['found' => false], 404);
        }

        return response()->json([
            'found' => true,
            'step' => $form->draft_step ?? 0,
            'draft_token' => $form->draft_token,
            'draft_id' => $form->id,
            'data' => $this->buildFormDataFromDraft($form),
        ]);
    }

    public function store(StoreAidantAdhesionFormRequest $request): RedirectResponse|SymfonyResponse
    {
        $validated = $request->validated();
        $pendingFormId = $validated['pending_form_id'] ?? null;

        // Resolve pending form from draft_token if pending_form_id was not explicitly provided
        if (! $pendingFormId && ! empty($validated['draft_token'])) {
            $draftForm = AidantAdhesionForm::where('draft_token', $validated['draft_token'])
                ->where('status', AidantAdhesionForm::STATUS_DRAFT)
                ->whereNull('draft_completed_at')
                ->first();
            if ($draftForm) {
                $pendingFormId = $draftForm->id;
            }
        }

        $aidants = $validated['aidants'] ?? [];
        $primaryAidant = $aidants[0] ?? [];
        $aides = $validated['aides'] ?? [];
        $primaryAide = $aides[0] ?? [];

        // Resolve coupon server-side
        $couponCode = isset($validated['coupon_code']) ? strtoupper(trim($validated['coupon_code'])) : null;
        $couponDiscountCents = 0;
        $coupon = null;

        if ($couponCode) {
            $coupon = Coupon::where('code', $couponCode)->first();
            if ($coupon && $coupon->isValid()) {
                $couponDiscountCents = $coupon->discount_cents;
            } else {
                $coupon = null;
                $couponCode = null;
            }
        }

        $donAmountCents = $this->normalizeDonationAmountToCents($validated['don_amount'] ?? null);

        $payload = array_merge($validated, [
            'aidants' => $aidants,
            'aides' => $aides,
            'genre' => $validated['genre'] ?? ($primaryAidant['genre'] ?? null),
            'nom' => $validated['nom'] ?? ($primaryAidant['nom'] ?? null),
            'prenom' => $validated['prenom'] ?? ($primaryAidant['prenom'] ?? null),
            'age' => $validated['age'] ?? ($primaryAidant['age'] ?? null),
            'email' => $validated['email'] ?? ($primaryAidant['email'] ?? null),
            'phone' => $validated['phone'] ?? ($primaryAidant['phone'] ?? null),
            'departement' => $validated['departement'] ?? ($primaryAidant['departement'] ?? null),
            'commune' => $validated['commune'] ?? ($primaryAidant['commune'] ?? null),
            'aidant_type' => $validated['aidant_type'] ?? ($primaryAidant['aidant_type'] ?? null),
            'aidant_type_autre_precisions' => $validated['aidant_type_autre_precisions'] ?? ($primaryAidant['aidant_type_autre_precisions'] ?? null),
            'situation_familiale' => $validated['situation_familiale'] ?? ($primaryAidant['situation_familiale'] ?? null),
            'situation_familiale_autre_precisions' => $validated['situation_familiale_autre_precisions'] ?? ($primaryAidant['situation_familiale_autre_precisions'] ?? null),
            'aide_tranche_age' => $validated['aide_tranche_age'] ?? ($primaryAide['aide_tranche_age'] ?? null),
            'aide_age' => $validated['aide_age'] ?? ($primaryAide['aide_age'] ?? null),
            'type_situation' => $validated['type_situation'] ?? ($primaryAide['type_situation'] ?? []),
            'type_situation_autre_precisions' => $validated['type_situation_autre_precisions'] ?? ($primaryAide['type_situation_autre_precisions'] ?? null),
            'reconnaissance_administrative' => $validated['reconnaissance_administrative'] ?? ($primaryAide['reconnaissance_administrative'] ?? null),
            'aide_genre' => $validated['aide_genre'] ?? ($primaryAide['aide_genre'] ?? null),
            'scolarisation' => $validated['scolarisation'] ?? ($primaryAide['scolarisation'] ?? null),
            'scolarisation_autre_precisions' => $validated['scolarisation_autre_precisions'] ?? ($primaryAide['scolarisation_autre_precisions'] ?? null),
            'situation_adulte' => $validated['situation_adulte'] ?? ($primaryAide['situation_adulte'] ?? null),
            'situation_adulte_autre_precisions' => $validated['situation_adulte_autre_precisions'] ?? ($primaryAide['situation_adulte_autre_precisions'] ?? null),
            'lieu_habitation' => $validated['lieu_habitation'] ?? ($primaryAide['lieu_habitation'] ?? null),
            'lieu_habitation_autre_precisions' => $validated['lieu_habitation_autre_precisions'] ?? ($primaryAide['lieu_habitation_autre_precisions'] ?? null),
            'don_amount_cents' => $donAmountCents,
            'coupon_code' => $couponCode,
            'coupon_discount_cents' => $couponDiscountCents > 0 ? $couponDiscountCents : null,
        ]);

        unset($payload['don_amount'], $payload['pending_form_id']);

        $membershipFeeCents = config('cawl.membership_fee_cents');
        $totalCents = max(0, $membershipFeeCents - $couponDiscountCents) + ($donAmountCents ?? 0);

        return DB::transaction(function () use ($payload, $pendingFormId, $coupon, $totalCents) {
            if ($pendingFormId) {
                $form = AidantAdhesionForm::find($pendingFormId);

                // Only reuse if this submission is pending (not already captured)
                if ($form) {
                    $submission = $form->submission;
                    $isCaptured = $submission?->payments()->whereIn('status', ['captured', 'authorized'])->exists();

                    if (! $isCaptured) {
                        $form->update(array_merge($payload, [
                            'status' => AidantAdhesionForm::STATUS_COMPLETED,
                            'draft_completed_at' => now(),
                        ]));
                        $form->refresh();

                        // Only increment coupon uses_count if the coupon changed
                        if ($coupon && $form->coupon_code !== $coupon->code) {
                            $coupon->increment('uses_count');
                        }

                        if (! $submission) {
                            $submission = FormSubmission::create([
                                'email' => $form->email,
                                'type' => 'adhesion',
                                'formable_type' => AidantAdhesionForm::class,
                                'formable_id' => $form->id,
                                'access_token' => Str::random(64),
                                'token_expires_at' => now()->addDays(30),
                            ]);
                        }

                        return $this->redirectToPaymentOrSuccess($form, $submission, $totalCents);
                    }
                }
            }

            // Fresh submission
            $form = AidantAdhesionForm::create(array_merge($payload, [
                'status' => AidantAdhesionForm::STATUS_COMPLETED,
                'draft_completed_at' => now(),
            ]));

            if ($coupon) {
                $coupon->increment('uses_count');
            }

            $submission = FormSubmission::create([
                'email' => $form->email,
                'type' => 'adhesion',
                'formable_type' => AidantAdhesionForm::class,
                'formable_id' => $form->id,
                'access_token' => Str::random(64),
                'token_expires_at' => now()->addDays(30),
            ]);

            return $this->redirectToPaymentOrSuccess($form, $submission, $totalCents);
        });
    }

    private function redirectToPaymentOrSuccess(AidantAdhesionForm $form, FormSubmission $submission, int $totalCents): RedirectResponse|SymfonyResponse
    {
        if ($totalCents > 0) {
            $merchantReference = 'ADH-'.strtoupper(Str::random(10));
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

        return back()->with('success', 'Votre adhesion a bien ete enregistree. Merci de soutenir le SNA !');
    }

    /** @param array<string, mixed> $validated */
    private function buildDraftPayload(array $validated): array
    {
        return [
            'status' => AidantAdhesionForm::STATUS_DRAFT,
            'draft_step' => $validated['step'],
            'draft_saved_at' => now(),
            'draft_completed_at' => null,
            'aidants' => $validated['aidants'] ?? null,
            'aides' => $validated['aides'] ?? null,
            'aide_tranche_age' => $validated['aide_tranche_age'] ?? null,
            'aide_age' => $validated['aide_age'] ?? null,
            'type_situation' => $validated['type_situation'] ?? null,
            'type_situation_autre_precisions' => $validated['type_situation_autre_precisions'] ?? null,
            'reconnaissance_administrative' => $validated['reconnaissance_administrative'] ?? null,
            'aide_genre' => $validated['aide_genre'] ?? null,
            'scolarisation' => $validated['scolarisation'] ?? null,
            'scolarisation_autre_precisions' => $validated['scolarisation_autre_precisions'] ?? null,
            'situation_adulte' => $validated['situation_adulte'] ?? null,
            'situation_adulte_autre_precisions' => $validated['situation_adulte_autre_precisions'] ?? null,
            'lieu_habitation' => $validated['lieu_habitation'] ?? null,
            'lieu_habitation_autre_precisions' => $validated['lieu_habitation_autre_precisions'] ?? null,
            'impacts' => $validated['impacts'] ?? null,
            'impacts_autre_precisions' => $validated['impacts_autre_precisions'] ?? null,
            'situation_professionnelle' => $validated['situation_professionnelle'] ?? null,
            'expression_libre' => $validated['expression_libre'] ?? null,
            'soutient_sna' => $validated['soutient_sna'] ?? false,
            'wants_info' => $validated['wants_info'] ?? false,
            'declaration_honneur' => $validated['declaration_honneur'] ?? false,
            'consents_rgpd' => $validated['consents_rgpd'] ?? false,
            'don_amount_cents' => $this->normalizeDonationAmountToCents($validated['don_amount'] ?? null),
            'coupon_code' => isset($validated['coupon_code']) ? strtoupper(trim($validated['coupon_code'])) : null,
        ];
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

    private function buildFormDataFromDraft(AidantAdhesionForm $form): array
    {
        return [
            'aidants' => $form->aidants ?? [],
            'aides' => $form->aides ?? [],
            'aide_tranche_age' => $form->aide_tranche_age ?? '',
            'aide_age' => $form->aide_age ?? '',
            'type_situation' => $form->type_situation ?? [],
            'type_situation_autre_precisions' => $form->type_situation_autre_precisions ?? '',
            'reconnaissance_administrative' => $form->reconnaissance_administrative ?? '',
            'aide_genre' => $form->aide_genre ?? '',
            'scolarisation' => $form->scolarisation ?? '',
            'scolarisation_autre_precisions' => $form->scolarisation_autre_precisions ?? '',
            'situation_adulte' => $form->situation_adulte ?? '',
            'situation_adulte_autre_precisions' => $form->situation_adulte_autre_precisions ?? '',
            'lieu_habitation' => $form->lieu_habitation ?? '',
            'lieu_habitation_autre_precisions' => $form->lieu_habitation_autre_precisions ?? '',
            'impacts' => $form->impacts ?? [],
            'impacts_autre_precisions' => $form->impacts_autre_precisions ?? '',
            'situation_professionnelle' => $form->situation_professionnelle ?? '',
            'expression_libre' => $form->expression_libre ?? '',
            'soutient_sna' => (bool) $form->soutient_sna,
            'wants_info' => (bool) $form->wants_info,
            'declaration_honneur' => (bool) $form->declaration_honneur,
            'consents_rgpd' => (bool) $form->consents_rgpd,
            'don_amount' => $form->don_amount_cents !== null && $form->don_amount_cents > 0
                ? number_format($form->don_amount_cents / 100, 2, '.', '')
                : '',
            'coupon_code' => $form->coupon_code ?? '',
            'coupon_discount_cents' => $form->coupon_discount_cents ?? 0,
        ];
    }
}
