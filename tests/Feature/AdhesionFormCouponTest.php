<?php

namespace Tests\Feature;

use App\Models\AidantAdhesionForm;
use App\Models\Coupon;
use App\Models\FormSubmission;
use App\Models\Payment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class AdhesionFormCouponTest extends TestCase
{
    use RefreshDatabase;

    /** @return array<string, mixed> */
    private function validFormPayload(array $overrides = []): array
    {
        return array_merge([
            'aidants' => [
                [
                    'nom' => 'Dupont',
                    'prenom' => 'Jean',
                    'email' => 'jean.dupont@example.com',
                    'aidant_type' => 'parent_handicap',
                ],
            ],
            'aides' => [
                [
                    'aide_tranche_age' => 'moins_18',
                ],
            ],
            'declaration_honneur' => '1',
            'consents_rgpd' => '1',
            'don_amount' => '0',
        ], $overrides);
    }

    public function test_coupon_discount_is_applied_server_side_and_stored(): void
    {
        Http::fake();

        $coupon = Coupon::factory()->create([
            'code' => 'FREE2026',
            'discount_cents' => 2000,
        ]);

        $payload = $this->validFormPayload(['coupon_code' => 'FREE2026']);

        $response = $this->post(route('forms.adhesion.store'), $payload);

        $response->assertRedirectContains('/');

        $form = AidantAdhesionForm::latest()->first();
        $this->assertNotNull($form);
        $this->assertEquals('FREE2026', $form->coupon_code);
        $this->assertEquals(2000, $form->coupon_discount_cents);

        $coupon->refresh();
        $this->assertEquals(1, $coupon->uses_count);
    }

    public function test_invalid_coupon_is_ignored(): void
    {
        Http::fake();

        $payload = $this->validFormPayload(['coupon_code' => 'NOTEXIST']);

        $this->post(route('forms.adhesion.store'), $payload);

        $form = AidantAdhesionForm::latest()->first();
        $this->assertNotNull($form);
        $this->assertNull($form->coupon_code);
    }

    public function test_zero_donation_is_stored_as_null(): void
    {
        Http::fake();

        $this->post(route('forms.adhesion.store'), $this->validFormPayload(['don_amount' => '0']));

        $form = AidantAdhesionForm::latest()->first();

        $this->assertNotNull($form);
        $this->assertNull($form->don_amount_cents);
    }

    public function test_retry_with_pending_form_id_reuses_existing_record(): void
    {
        Http::fake();

        // Create initial record
        $form = AidantAdhesionForm::create([
            'ref' => 'TEST-RETRY-001',
            'email' => 'jean.dupont@example.com',
            'nom' => 'Dupont',
            'prenom' => 'Jean',
            'aidant_type' => 'parent_handicap',
            'soutient_sna' => false,
            'wants_info' => false,
            'consents_rgpd' => true,
            'declaration_honneur' => true,
        ]);
        $submission = FormSubmission::create([
            'email' => $form->email,
            'type' => 'adhesion',
            'formable_type' => AidantAdhesionForm::class,
            'formable_id' => $form->id,
            'ref' => 'TEST-REF',
        ]);
        Payment::create([
            'form_submission_id' => $submission->id,
            'amount_cents' => 2000,
            'status' => 'rejected',
            'merchant_reference' => 'REF-001',
            'hosted_checkout_id' => 'HCO-TEST-001',
        ]);

        $payload = $this->validFormPayload(['pending_form_id' => $form->id]);

        $this->post(route('forms.adhesion.store'), $payload);

        // Should not have created a new form
        $this->assertEquals(1, AidantAdhesionForm::count());
    }

    public function test_retry_with_empty_donation_clears_previous_donation_on_reused_form(): void
    {
        Http::fake();

        $form = AidantAdhesionForm::create([
            'ref' => 'TEST-RETRY-002',
            'email' => 'jean.dupont@example.com',
            'nom' => 'Dupont',
            'prenom' => 'Jean',
            'aidant_type' => 'parent_handicap',
            'soutient_sna' => false,
            'wants_info' => false,
            'consents_rgpd' => true,
            'declaration_honneur' => true,
            'don_amount_cents' => 3000,
        ]);

        $submission = FormSubmission::create([
            'email' => $form->email,
            'type' => 'adhesion',
            'formable_type' => AidantAdhesionForm::class,
            'formable_id' => $form->id,
            'ref' => 'TEST-REF-2',
        ]);

        Payment::create([
            'form_submission_id' => $submission->id,
            'amount_cents' => 5000,
            'status' => 'cancelled',
            'merchant_reference' => 'REF-002',
            'hosted_checkout_id' => 'HCO-TEST-002',
        ]);

        $this->post(route('forms.adhesion.store'), $this->validFormPayload([
            'pending_form_id' => $form->id,
            'don_amount' => '',
        ]));

        $this->assertEquals(1, AidantAdhesionForm::count());
        $this->assertNull($form->fresh()->don_amount_cents);
    }

    public function test_payment_retry_prefill_includes_coupon_discount_cents(): void
    {
        // Simulate what PaymentController::return() flashes after a rejected payment
        session()->flash('adhesion_prefill', [
            'aidants' => [],
            'aides' => [],
            'coupon_code' => 'RETRY10',
            'coupon_discount_cents' => 1000,
            'pending_form_id' => 99,
            'soutient_sna' => false,
            'wants_info' => false,
            'declaration_honneur' => false,
            'consents_rgpd' => false,
            'don_amount' => '',
        ]);

        $response = $this->get(route('forms.adhesion.page'));

        $response->assertInertia(fn ($page) => $page
            ->component('forms/adhesion')
            ->where('prefillData.coupon_code', 'RETRY10')
            ->where('prefillData.coupon_discount_cents', 1000)
        );
    }

    public function test_draft_can_be_saved_and_fetched(): void
    {
        $response = $this->postJson(route('forms.adhesion.draft.save'), [
            'step' => 0,
            'aidants' => [[
                'nom' => 'Martin',
                'prenom' => 'Sophie',
                'email' => 'sophie@example.com',
                'aidant_type' => 'conjoint',
            ]],
            'aides' => [[]],
            'declaration_honneur' => true,
        ]);

        $response->assertOk();
        $response->assertJsonStructure(['draft_token', 'draft_id', 'step']);

        $draftToken = $response->json('draft_token');
        $draftId = $response->json('draft_id');

        $this->assertNotEmpty($draftToken);
        $this->assertDatabaseHas('aidant_adhesion_forms', [
            'id' => $draftId,
            'draft_token' => $draftToken,
            'draft_step' => 0,
        ]);

        // Fetch the draft
        $fetchResponse = $this->getJson(route('forms.adhesion.draft.fetch', ['draft_token' => $draftToken]));
        $fetchResponse->assertOk();
        $fetchResponse->assertJson(['found' => true, 'step' => 0]);
        $fetchResponse->assertJsonPath('data.coupon_code', '');
    }

    public function test_draft_update_advances_step(): void
    {
        // Create initial draft
        $createResponse = $this->postJson(route('forms.adhesion.draft.save'), [
            'step' => 0,
            'aidants' => [[
                'nom' => 'Dupont',
                'prenom' => 'Paul',
                'email' => 'paul@example.fr',
                'aidant_type' => 'parent_handicap',
            ]],
            'aides' => [[]],
            'declaration_honneur' => true,
        ]);

        $draftToken = $createResponse->json('draft_token');

        // Update to step 1
        $this->postJson(route('forms.adhesion.draft.save'), [
            'draft_token' => $draftToken,
            'step' => 1,
            'aidants' => [[
                'nom' => 'Dupont',
                'prenom' => 'Paul',
                'email' => 'paul@example.fr',
                'aidant_type' => 'parent_handicap',
            ]],
            'aides' => [[]],
            'aide_tranche_age' => 'moins_18',
            'declaration_honneur' => true,
        ])->assertOk();

        $this->assertDatabaseHas('aidant_adhesion_forms', [
            'draft_token' => $draftToken,
            'draft_step' => 1,
        ]);
        // Only one record should exist
        $this->assertEquals(1, AidantAdhesionForm::where('draft_token', $draftToken)->count());
    }

    public function test_draft_zero_donation_is_stored_as_null(): void
    {
        $response = $this->postJson(route('forms.adhesion.draft.save'), [
            'step' => 5,
            'aidants' => [[
                'nom' => 'Martin',
                'prenom' => 'Sophie',
                'email' => 'sophie@example.com',
                'aidant_type' => 'conjoint',
            ]],
            'aides' => [[]],
            'declaration_honneur' => true,
            'don_amount' => '0',
        ]);

        $draftId = $response->json('draft_id');
        $form = AidantAdhesionForm::find($draftId);

        $this->assertNotNull($form);
        $this->assertNull($form->don_amount_cents);
    }

    public function test_draft_is_marked_completed_on_final_submit(): void
    {
        Http::fake();

        // Create a draft
        $createResponse = $this->postJson(route('forms.adhesion.draft.save'), [
            'step' => 5,
            'aidants' => [[
                'nom' => 'Aidant',
                'prenom' => 'Test',
                'email' => 'test.draft@example.fr',
                'aidant_type' => 'parent_handicap',
            ]],
            'aides' => [[]],
            'declaration_honneur' => true,
        ]);

        $draftToken = $createResponse->json('draft_token');
        $draftId = $createResponse->json('draft_id');

        // Submit the final form using draft_token to resolve the record
        $payload = $this->validFormPayload(['draft_token' => $draftToken]);
        $this->post(route('forms.adhesion.store'), $payload);

        $this->assertDatabaseHas('aidant_adhesion_forms', [
            'id' => $draftId,
        ]);

        $form = AidantAdhesionForm::find($draftId);
        $this->assertNotNull($form->draft_completed_at);
    }

    public function test_completed_draft_cannot_be_fetched(): void
    {
        $form = AidantAdhesionForm::create([
            'email' => 'completed@example.fr',
            'nom' => 'Done',
            'prenom' => 'Draft',
            'aidant_type' => 'autre',
            'soutient_sna' => false,
            'wants_info' => false,
            'consents_rgpd' => false,
            'declaration_honneur' => false,
            'draft_token' => str_pad('completedtoken', 64, '0'),
            'draft_step' => 5,
            'draft_completed_at' => now(),
        ]);

        $this->getJson(route('forms.adhesion.draft.fetch', ['draft_token' => $form->draft_token]))
            ->assertStatus(404)
            ->assertJson(['found' => false]);
    }
}
