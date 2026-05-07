<?php

namespace Tests\Feature;

use App\Models\Payment;
use App\Services\CawlPaymentService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery\MockInterface;
use OnlinePayments\Sdk\Webhooks\SignatureValidationException;
use Tests\TestCase;

class PaymentControllerTest extends TestCase
{
    use RefreshDatabase;

    // ─── /payment/return ────────────────────────────────────────────────────────

    public function test_return_updates_payment_and_renders_success_page_when_captured(): void
    {
        $payment = Payment::factory()->create([
            'hosted_checkout_id' => 'hco_abc123',
            'status' => 'pending',
        ]);

        $this->mock(CawlPaymentService::class, function (MockInterface $mock): void {
            $mock->shouldReceive('getHostedCheckoutStatus')
                ->once()
                ->with('hco_abc123')
                ->andReturn([
                    'status' => 'CAPTURED',
                    'status_code' => 9,
                    'cawl_payment_id' => '9000001234_1',
                    'raw' => ['status' => 'CAPTURED'],
                ]);
        });

        $response = $this->get('/payment/return?hostedCheckoutId=hco_abc123');

        $response->assertInertia(fn ($page) => $page->component('payment/success'));

        $this->assertDatabaseHas('payments', [
            'id' => $payment->id,
            'status' => 'captured',
            'cawl_payment_id' => '9000001234_1',
            'status_code' => 9,
        ]);
    }

    public function test_return_updates_payment_and_renders_success_page_when_pending_capture(): void
    {
        $payment = Payment::factory()->create([
            'hosted_checkout_id' => 'hco_pending_capture',
            'status' => 'pending',
        ]);

        $this->mock(CawlPaymentService::class, function (MockInterface $mock): void {
            $mock->shouldReceive('getHostedCheckoutStatus')
                ->once()
                ->with('hco_pending_capture')
                ->andReturn([
                    'status' => 'PENDING_CAPTURE',
                    'status_code' => 5,
                    'cawl_payment_id' => '9000005678_1',
                    'raw' => ['status' => 'PENDING_CAPTURE'],
                ]);
        });

        $response = $this->get('/payment/return?hostedCheckoutId=hco_pending_capture');

        $response->assertInertia(fn ($page) => $page->component('payment/success'));

        $this->assertDatabaseHas('payments', [
            'id' => $payment->id,
            'status' => 'authorized',
        ]);
    }

    public function test_return_renders_success_when_cawl_returns_payment_created_checkout_status_with_pending_capture_payment(): void
    {
        // Real-world scenario: CAWL redirects back with hosted-checkout status PAYMENT_CREATED
        // but the underlying payment status is PENDING_CAPTURE. The service should return the
        // payment-level status so we show the success page rather than retrying.
        $payment = Payment::factory()->create([
            'hosted_checkout_id' => 'hco_real_world',
            'status' => 'pending',
        ]);

        $this->mock(CawlPaymentService::class, function (MockInterface $mock): void {
            // Service now returns the payment-level status (PENDING_CAPTURE), not the
            // checkout-level status (PAYMENT_CREATED).
            $mock->shouldReceive('getHostedCheckoutStatus')
                ->once()
                ->with('hco_real_world')
                ->andReturn([
                    'status' => 'PENDING_CAPTURE',
                    'status_code' => 5,
                    'cawl_payment_id' => '9000009999_1',
                    'raw' => ['status' => 'PAYMENT_CREATED'],
                ]);
        });

        $response = $this->get('/payment/return?hostedCheckoutId=hco_real_world');

        $response->assertInertia(fn ($page) => $page->component('payment/success'));

        $this->assertDatabaseHas('payments', [
            'id' => $payment->id,
            'status' => 'authorized',
        ]);
    }

    public function test_return_renders_success_page_when_already_authorized(): void
    {
        Payment::factory()->create([
            'hosted_checkout_id' => 'hco_authorized',
            'status' => 'authorized',
        ]);

        $this->mock(CawlPaymentService::class, function (MockInterface $mock): void {
            $mock->shouldNotReceive('getHostedCheckoutStatus');
        });

        $response = $this->get('/payment/return?hostedCheckoutId=hco_authorized');

        $response->assertInertia(fn ($page) => $page->component('payment/success'));
    }

    public function test_return_renders_failure_page_when_rejected(): void
    {
        Payment::factory()->create([
            'hosted_checkout_id' => 'hco_rejected',
            'status' => 'pending',
        ]);

        $this->mock(CawlPaymentService::class, function (MockInterface $mock): void {
            $mock->shouldReceive('getHostedCheckoutStatus')
                ->once()
                ->andReturn([
                    'status' => 'REJECTED',
                    'status_code' => 2,
                    'cawl_payment_id' => null,
                    'raw' => ['status' => 'REJECTED'],
                ]);
        });

        $response = $this->get('/payment/return?hostedCheckoutId=hco_rejected');

        $response->assertRedirect(route('forms.adhesion.page'));
    }

    public function test_return_returns_422_when_hosted_checkout_id_is_missing(): void
    {
        $this->get('/payment/return')->assertStatus(422);
    }

    public function test_return_returns_404_when_payment_not_found(): void
    {
        $this->get('/payment/return?hostedCheckoutId=not-found')->assertStatus(404);
    }

    public function test_return_does_not_call_cawl_when_already_captured(): void
    {
        Payment::factory()->captured()->create([
            'hosted_checkout_id' => 'hco_already',
        ]);

        $this->mock(CawlPaymentService::class, function (MockInterface $mock): void {
            $mock->shouldNotReceive('getHostedCheckoutStatus');
        });

        $response = $this->get('/payment/return?hostedCheckoutId=hco_already');

        $response->assertInertia(fn ($page) => $page->component('payment/success'));
    }

    // ─── /payment/webhook ───────────────────────────────────────────────────────

    public function test_webhook_returns_204_with_valid_signature(): void
    {
        $payment = Payment::factory()->create([
            'cawl_payment_id' => null,
            'merchant_reference' => 'ADH-TESTREF001',
            'status' => 'pending',
        ]);

        $fakeEvent = $this->buildFakeWebhookEvent('ADH-TESTREF001', '9000001_1', 'CAPTURED', 9);

        $this->mock(CawlPaymentService::class, function (MockInterface $mock) use ($fakeEvent): void {
            $mock->shouldReceive('unmarshalWebhook')
                ->once()
                ->andReturn($fakeEvent);
        });

        $response = $this->postJson('/payment/webhook', [], ['Content-Type' => 'application/json']);

        $response->assertNoContent();

        $this->assertDatabaseHas('payments', [
            'id' => $payment->id,
            'status' => 'captured',
        ]);
    }

    public function test_webhook_returns_401_with_invalid_signature(): void
    {
        $this->mock(CawlPaymentService::class, function (MockInterface $mock): void {
            $mock->shouldReceive('unmarshalWebhook')
                ->once()
                ->andThrow(new SignatureValidationException('invalid'));
        });

        $this->postJson('/payment/webhook')->assertStatus(401);
    }

    public function test_webhook_does_not_update_already_captured_payment(): void
    {
        $payment = Payment::factory()->captured()->create([
            'merchant_reference' => 'ADH-CAPTURED001',
        ]);

        $fakeEvent = $this->buildFakeWebhookEvent('ADH-CAPTURED001', $payment->cawl_payment_id, 'REJECTED', 2);

        $this->mock(CawlPaymentService::class, function (MockInterface $mock) use ($fakeEvent): void {
            $mock->shouldReceive('unmarshalWebhook')->once()->andReturn($fakeEvent);
        });

        $this->postJson('/payment/webhook')->assertNoContent();

        // Status must NOT be downgraded from captured → rejected
        $this->assertDatabaseHas('payments', [
            'id' => $payment->id,
            'status' => 'captured',
        ]);
    }

    // ─── AidantAdhesionFormController ───────────────────────────────────────────

    public function test_adhesion_store_redirects_to_cawl_when_total_is_positive(): void
    {
        config(['cawl.membership_fee_cents' => 1000]);

        $this->mock(CawlPaymentService::class, function (MockInterface $mock): void {
            $mock->shouldReceive('createHostedCheckout')
                ->once()
                ->andReturn([
                    'hosted_checkout_id' => 'hco_test001',
                    'redirect_url' => 'https://payment.preprod.cawl-solutions.fr/hostedcheckout/test',
                    'returnmac' => 'mac123',
                ]);
        });

        $response = $this->withHeaders(['X-Inertia' => 'true'])
            ->post('/formulaire/adhesion', $this->validAdhesionPayload());

        $response->assertStatus(409);
        $response->assertHeader('X-Inertia-Location', 'https://payment.preprod.cawl-solutions.fr/hostedcheckout/test');

        $this->assertDatabaseCount('payments', 1);
        $this->assertDatabaseHas('payments', [
            'hosted_checkout_id' => 'hco_test001',
            'amount_cents' => 1000,
            'status' => 'pending',
        ]);
    }

    public function test_adhesion_store_does_not_create_payment_when_total_is_zero(): void
    {
        config(['cawl.membership_fee_cents' => 0]);

        $this->mock(CawlPaymentService::class, function (MockInterface $mock): void {
            $mock->shouldNotReceive('createHostedCheckout');
        });

        $response = $this->post('/formulaire/adhesion', $this->validAdhesionPayload());

        $response->assertRedirect();
        $this->assertDatabaseCount('payments', 0);
    }

    // ─── Helpers ────────────────────────────────────────────────────────────────

    private function validAdhesionPayload(array $overrides = []): array
    {
        return array_merge([
            'declaration_honneur' => true,
            'impacts' => ['Épuisement physique'],
            'situation_professionnelle' => 'cdi_temps_partiel',
            'soutient_sna' => true,
            'wants_info' => true,
            'consents_rgpd' => true,
            'aidants' => [[
                'genre' => 'femme',
                'nom' => 'Dupont',
                'prenom' => 'Marie',
                'age' => '42',
                'email' => 'marie@exemple.fr',
                'phone' => '+33600000000',
                'departement' => '75',
                'commune' => 'Paris',
                'aidant_type' => 'parent_handicap',
                'situation_familiale' => 'en_couple',
            ]],
            'aides' => [[
                'aide_tranche_age' => 'moins_18',
                'aide_age' => '8',
                'type_situation' => ['Handicap intellectuel'],
                'reconnaissance_administrative' => 'droits_mdph_ouverts',
                'aide_genre' => 'homme',
                'scolarisation' => 'ulis',
            ]],
        ], $overrides);
    }

    /**
     * Build a minimal fake webhook event object using anonymous classes
     * (avoids needing to instantiate the full SDK domain object graph).
     */
    private function buildFakeWebhookEvent(
        string $merchantReference,
        string $paymentId,
        string $status,
        int $statusCode,
    ): object {
        $references = new class($merchantReference)
        {
            public function __construct(private readonly string $ref) {}

            public function getMerchantReference(): string
            {
                return $this->ref;
            }
        };

        $paymentOutput = new class($references)
        {
            public function __construct(private readonly object $refs) {}

            public function getReferences(): object
            {
                return $this->refs;
            }
        };

        $statusOutput = new class($statusCode)
        {
            public function __construct(private readonly int $code) {}

            public function getStatusCode(): int
            {
                return $this->code;
            }
        };

        $payment = new class($paymentId, $status, $statusOutput, $paymentOutput)
        {
            public function __construct(
                private readonly string $id,
                private readonly string $status,
                private readonly object $statusOutput,
                private readonly object $paymentOutput,
            ) {}

            public function getId(): string
            {
                return $this->id;
            }

            public function getStatus(): string
            {
                return $this->status;
            }

            public function getStatusOutput(): object
            {
                return $this->statusOutput;
            }

            public function getPaymentOutput(): object
            {
                return $this->paymentOutput;
            }
        };

        return new class($payment)
        {
            public function __construct(private readonly object $payment) {}

            public function getPayment(): object
            {
                return $this->payment;
            }
        };
    }
}
