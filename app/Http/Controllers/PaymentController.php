<?php

namespace App\Http\Controllers;

use App\Actions\NotifyOnFormSubmissionCreated;
use App\Models\AidantAdhesionForm;
use App\Models\PartenaireForm;
use App\Models\Payment;
use App\Models\SoutienForm;
use App\Services\CawlPaymentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use OnlinePayments\Sdk\Webhooks\SignatureValidationException;

class PaymentController extends Controller
{
    public function __construct(private readonly CawlPaymentService $cawlPaymentService) {}

    /**
     * Handle the return redirect from CAWL after payment attempt.
     */
    public function return(Request $request): InertiaResponse|RedirectResponse|Response
    {
        $hostedCheckoutId = $request->query('hostedCheckoutId');

        if (! $hostedCheckoutId) {
            abort(422, 'Missing hostedCheckoutId.');
        }

        $payment = Payment::where('hosted_checkout_id', $hostedCheckoutId)->firstOrFail();

        // Only query CAWL if we don't already have a final status (idempotence).
        if ($payment->status === 'pending') {
            $result = $this->cawlPaymentService->getHostedCheckoutStatus($hostedCheckoutId);

            $payment->update([
                'status' => $this->mapStatus($result['status'] ?? ''),
                'cawl_payment_id' => $result['cawl_payment_id'],
                'status_code' => $result['status_code'],
                'raw_response' => $result['raw'],
            ]);

            // PENDING_CAPTURE means the authorisation succeeded but the funds have not yet
            // been transferred. We must explicitly request capture to collect the money.
            if (strtoupper($result['status'] ?? '') === 'PENDING_CAPTURE' && $result['cawl_payment_id']) {
                $this->cawlPaymentService->capturePayment($result['cawl_payment_id'], $payment->amount_cents);
            }

            $payment->refresh();
        }

        if ($payment->isSuccessful()) {
            $submission = $payment->formSubmission()->with('formable')->first();

            if ($submission) {
                (new NotifyOnFormSubmissionCreated)($submission);
            }

            return Inertia::render('payment/success', [
                'amountEuros' => $payment->amountEuros(),
                'merchantReference' => $payment->merchant_reference,
            ]);
        }

        // Flash form prefill data so the user can retry with their data intact
        $submission = $payment->formSubmission()->with('formable')->first();
        $form = $submission?->formable;
        $formType = $submission?->type;

        if ($form && $formType) {
            $prefillData = $this->buildPrefillData($formType, $form);

            if ($prefillData) {
                session()->flash("{$formType}_prefill", array_merge(
                    $prefillData,
                    ['pending_form_id' => $form->id],
                ));
            }

            $routeName = "forms.{$formType}.page";

            if (Route::has($routeName)) {
                return Inertia::location(route($routeName));
            }
        }

        return Inertia::location(route('forms.adhesion.page'));
    }

    /**
     * Handle incoming webhook events from CAWL.
     */
    public function webhook(Request $request): Response
    {
        $body = $request->getContent();
        $headers = collect($request->headers->all())
            ->mapWithKeys(fn ($values, $key) => [$key => $values[0]])
            ->all();

        try {
            $event = $this->cawlPaymentService->unmarshalWebhook($body, $headers);
        } catch (SignatureValidationException) {
            abort(401, 'Invalid webhook signature.');
        }

        $payment = $event->getPayment();

        if ($payment === null) {
            return response()->noContent();
        }

        $paymentId = $payment->getId();
        $statusCode = $payment->getStatusOutput()?->getStatusCode();
        $rawStatus = $payment->getStatus() ?? '';
        $status = $this->mapStatus($rawStatus);

        // Update by cawl_payment_id or hosted_checkout_id from the merchant reference.
        $record = Payment::where('cawl_payment_id', $paymentId)
            ->orWhere('merchant_reference', $payment->getPaymentOutput()?->getReferences()?->getMerchantReference())
            ->first();

        if ($record && $record->status !== 'captured') {
            $record->update([
                'status' => $status,
                'cawl_payment_id' => $paymentId,
                'status_code' => $statusCode,
            ]);

            // PENDING_CAPTURE means the authorisation succeeded but capture was not yet
            // triggered (e.g. the customer never reached the returnUrl). Capture now so
            // the merchant can retrieve the funds.
            if (strtoupper($rawStatus) === 'PENDING_CAPTURE' && $paymentId) {
                $this->cawlPaymentService->capturePayment($paymentId, $record->amount_cents);
            }
        }

        return response()->noContent();
    }

    private function mapStatus(string $cawlStatus): string
    {
        return match (strtoupper($cawlStatus)) {
            'CAPTURED', 'PAID' => 'captured',
            'REJECTED' => 'rejected',
            'CANCELLED' => 'cancelled',
            'AUTHORIZATION_REQUESTED', 'PENDING_CAPTURE', 'CAPTURE_REQUESTED' => 'authorized',
            'CREATED', 'REDIRECTED' => 'pending',
            default => 'pending',
        };
    }

    private function buildPrefillData(string $formType, mixed $form): ?array
    {
        return match ($formType) {
            'adhesion' => $form instanceof AidantAdhesionForm
                ? $this->buildAdhesionPrefillData($form)
                : null,
            'soutien' => $form instanceof SoutienForm
                ? $this->buildSoutienPrefillData($form)
                : null,
            'partenaire' => $form instanceof PartenaireForm
                ? $this->buildPartenairePrefillData($form)
                : null,
            default => null,
        };
    }

    private function buildAdhesionPrefillData(AidantAdhesionForm $form): array
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

    private function buildSoutienPrefillData(SoutienForm $form): array
    {
        return [
            'name' => $form->name,
            'address' => $form->address,
            'email' => $form->email,
            'phone' => $form->phone ?? '',
            'wants_events' => $form->wants_events,
            'wants_participation' => $form->wants_participation,
            'message' => $form->message ?? '',
            'consents_email' => $form->consents_email,
            'consents_rgpd' => $form->consents_rgpd,
            'don_amount' => $form->don_amount_cents !== null && $form->don_amount_cents > 0
                ? number_format($form->don_amount_cents / 100, 2, '.', '')
                : '',
        ];
    }

    private function buildPartenairePrefillData(PartenaireForm $form): array
    {
        return [
            'organisation_name' => $form->organisation_name,
            'legal_status' => $form->legal_status,
            'address' => $form->address,
            'phone' => $form->phone ?? '',
            'email' => $form->email,
            'contact_name' => $form->contact_name,
            'partnership_moral' => $form->partnership_moral,
            'partnership_moral_details' => $form->partnership_moral_details ?? '',
            'partnership_technical' => $form->partnership_technical,
            'partnership_technical_details' => $form->partnership_technical_details ?? '',
            'partnership_financial' => $form->partnership_financial,
            'objectives' => $form->objectives,
            'comment_libre' => $form->comment_libre ?? '',
            'commitment_projects' => $form->commitment_projects,
            'commitment_communication' => $form->commitment_communication,
            'commitment_expertise' => $form->commitment_expertise,
            'consents_email' => $form->consents_email,
            'consents_rgpd' => $form->consents_rgpd,
            'don_amount' => $form->don_amount_cents !== null && $form->don_amount_cents > 0
                ? number_format($form->don_amount_cents / 100, 2, '.', '')
                : '',
        ];
    }
}
