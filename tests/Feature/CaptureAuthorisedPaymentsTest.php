<?php

namespace Tests\Feature;

use App\Models\Payment;
use App\Services\CawlPaymentService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Mockery\MockInterface;
use Tests\TestCase;

class CaptureAuthorisedPaymentsTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    // ─── Dry-run ──────────────────────────────────────────────────────────────

    public function test_dry_run_lists_payments_without_calling_api(): void
    {
        Payment::factory()->count(3)->create([
            'status' => 'authorized',
            'cawl_payment_id' => '9000001_1',
        ]);

        $this->mock(CawlPaymentService::class, function (MockInterface $mock): void {
            $mock->shouldNotReceive('getPaymentStatus');
            $mock->shouldNotReceive('capturePayment');
        });

        $this->artisan('payments:capture-authorised --dry-run')
            ->assertSuccessful();
    }

    public function test_exits_early_when_no_authorised_payments(): void
    {
        $this->mock(CawlPaymentService::class, function (MockInterface $mock): void {
            $mock->shouldNotReceive('getPaymentStatus');
            $mock->shouldNotReceive('capturePayment');
        });

        $this->artisan('payments:capture-authorised')
            ->expectsOutput('No authorised payments found.')
            ->assertSuccessful();
    }

    // ─── Happy path ───────────────────────────────────────────────────────────

    public function test_captures_pending_capture_payments(): void
    {
        $payment = Payment::factory()->create([
            'status' => 'authorized',
            'cawl_payment_id' => '9000002_1',
            'amount_cents' => 1500,
        ]);

        $this->mock(CawlPaymentService::class, function (MockInterface $mock): void {
            $mock->shouldReceive('getPaymentStatus')
                ->once()
                ->with('9000002_1')
                ->andReturn(['status' => 'PENDING_CAPTURE', 'status_code' => 5]);

            $mock->shouldReceive('capturePayment')
                ->once()
                ->with('9000002_1', 1500);
        });

        $this->artisan('payments:capture-authorised')->assertSuccessful();

        $this->assertDatabaseHas('payments', ['id' => $payment->id, 'status' => 'captured']);
    }

    public function test_skips_payment_already_captured_on_cawl(): void
    {
        $payment = Payment::factory()->create([
            'status' => 'authorized',
            'cawl_payment_id' => '9000003_1',
            'amount_cents' => 2000,
        ]);

        $this->mock(CawlPaymentService::class, function (MockInterface $mock): void {
            $mock->shouldReceive('getPaymentStatus')
                ->once()
                ->with('9000003_1')
                ->andReturn(['status' => 'CAPTURED', 'status_code' => 9]);

            $mock->shouldNotReceive('capturePayment');
        });

        $this->artisan('payments:capture-authorised')->assertSuccessful();

        // DB was stale (authorized) — should now be corrected to captured.
        $this->assertDatabaseHas('payments', ['id' => $payment->id, 'status' => 'captured', 'status_code' => 9]);
    }

    public function test_skips_payment_with_capture_already_requested(): void
    {
        $payment = Payment::factory()->create([
            'status' => 'authorized',
            'cawl_payment_id' => '9000004_1',
            'amount_cents' => 2000,
        ]);

        $this->mock(CawlPaymentService::class, function (MockInterface $mock): void {
            $mock->shouldReceive('getPaymentStatus')
                ->once()
                ->with('9000004_1')
                ->andReturn(['status' => 'CAPTURE_REQUESTED', 'status_code' => 91]);

            $mock->shouldNotReceive('capturePayment');
        });

        $this->artisan('payments:capture-authorised')->assertSuccessful();

        // CAPTURE_REQUESTED is in-flight; DB stays as authorized until webhook confirms.
        $this->assertDatabaseHas('payments', ['id' => $payment->id, 'status' => 'authorized']);
    }

    public function test_syncs_stale_db_status_when_already_captured_on_cawl(): void
    {
        // Simulates the scenario where capture succeeded on CAWL in a previous run
        // but the local DB status was never updated (e.g. due to the old chunk() bug).
        $payment = Payment::factory()->create([
            'status' => 'authorized',
            'cawl_payment_id' => '9000009_1',
            'amount_cents' => 3000,
            'status_code' => null,
        ]);

        $this->mock(CawlPaymentService::class, function (MockInterface $mock): void {
            $mock->shouldReceive('getPaymentStatus')
                ->once()
                ->with('9000009_1')
                ->andReturn(['status' => 'CAPTURED', 'status_code' => 9]);

            $mock->shouldNotReceive('capturePayment');
        });

        $this->artisan('payments:capture-authorised')->assertSuccessful();

        $this->assertDatabaseHas('payments', ['id' => $payment->id, 'status' => 'captured', 'status_code' => 9]);
    }

    // ─── Expired / voided authorisations ─────────────────────────────────────

    public function test_marks_expired_authorisation_as_cancelled(): void
    {
        $payment = Payment::factory()->create([
            'status' => 'authorized',
            'cawl_payment_id' => '9000005_1',
        ]);

        $this->mock(CawlPaymentService::class, function (MockInterface $mock): void {
            $mock->shouldReceive('getPaymentStatus')
                ->once()
                ->with('9000005_1')
                ->andReturn(['status' => 'CANCELLED', 'status_code' => 6]);

            $mock->shouldNotReceive('capturePayment');
        });

        $this->artisan('payments:capture-authorised')->assertSuccessful();

        $this->assertDatabaseHas('payments', ['id' => $payment->id, 'status' => 'cancelled']);
    }

    public function test_marks_rejected_authorisation_as_rejected(): void
    {
        $payment = Payment::factory()->create([
            'status' => 'authorized',
            'cawl_payment_id' => '9000006_1',
        ]);

        $this->mock(CawlPaymentService::class, function (MockInterface $mock): void {
            $mock->shouldReceive('getPaymentStatus')
                ->once()
                ->with('9000006_1')
                ->andReturn(['status' => 'REJECTED_CAPTURE', 'status_code' => 93]);

            $mock->shouldNotReceive('capturePayment');
        });

        $this->artisan('payments:capture-authorised')->assertSuccessful();

        $this->assertDatabaseHas('payments', ['id' => $payment->id, 'status' => 'rejected']);
    }

    // ─── Error handling ───────────────────────────────────────────────────────

    public function test_continues_processing_remaining_payments_after_an_error(): void
    {
        $failing = Payment::factory()->create([
            'status' => 'authorized',
            'cawl_payment_id' => '9000007_1',
            'amount_cents' => 500,
            'merchant_reference' => 'ADH-FAIL001',
        ]);

        $succeeding = Payment::factory()->create([
            'status' => 'authorized',
            'cawl_payment_id' => '9000008_1',
            'amount_cents' => 1000,
            'merchant_reference' => 'ADH-OK001',
        ]);

        $this->mock(CawlPaymentService::class, function (MockInterface $mock): void {
            $mock->shouldReceive('getPaymentStatus')
                ->with('9000007_1')
                ->andThrow(new \RuntimeException('API timeout'));

            $mock->shouldReceive('getPaymentStatus')
                ->with('9000008_1')
                ->andReturn(['status' => 'PENDING_CAPTURE', 'status_code' => 5]);

            $mock->shouldReceive('capturePayment')
                ->once()
                ->with('9000008_1', 1000);
        });

        // Returns FAILURE because one payment errored.
        $this->artisan('payments:capture-authorised')->assertFailed();

        // The succeeding payment was still processed.
        $this->assertDatabaseHas('payments', ['id' => $succeeding->id, 'status' => 'captured']);
    }

    public function test_does_not_process_payments_without_cawl_payment_id(): void
    {
        Payment::factory()->create([
            'status' => 'authorized',
            'cawl_payment_id' => null,
        ]);

        $this->mock(CawlPaymentService::class, function (MockInterface $mock): void {
            $mock->shouldNotReceive('getPaymentStatus');
            $mock->shouldNotReceive('capturePayment');
        });

        $this->artisan('payments:capture-authorised')
            ->expectsOutput('No authorised payments found.')
            ->assertSuccessful();
    }
}
