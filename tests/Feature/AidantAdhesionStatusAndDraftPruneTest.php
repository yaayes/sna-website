<?php

namespace Tests\Feature;

use App\Http\Middleware\HandleInertiaRequests;
use App\Models\AidantAdhesionForm;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class AidantAdhesionStatusAndDraftPruneTest extends TestCase
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

    public function test_draft_save_marks_record_as_draft(): void
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

        $draftId = $response->json('draft_id');

        $this->assertDatabaseHas('aidant_adhesion_forms', [
            'id' => $draftId,
            'status' => AidantAdhesionForm::STATUS_DRAFT,
        ]);
    }

    public function test_final_submission_marks_record_as_completed(): void
    {
        Http::fake();

        $draftResponse = $this->postJson(route('forms.adhesion.draft.save'), [
            'step' => 5,
            'aidants' => [[
                'nom' => 'Aidant',
                'prenom' => 'Test',
                'email' => 'test.completed@example.fr',
                'aidant_type' => 'parent_handicap',
            ]],
            'aides' => [[]],
            'declaration_honneur' => true,
        ]);

        $draftToken = $draftResponse->json('draft_token');
        $draftId = $draftResponse->json('draft_id');

        $this->post(route('forms.adhesion.store'), $this->validFormPayload([
            'draft_token' => $draftToken,
        ]));

        $this->assertDatabaseHas('aidant_adhesion_forms', [
            'id' => $draftId,
            'status' => AidantAdhesionForm::STATUS_COMPLETED,
        ]);
    }

    public function test_prune_command_deletes_only_old_drafts(): void
    {
        AidantAdhesionForm::create([
            'ref' => 'OLD-DRAFT-001',
            'nom' => 'Old',
            'prenom' => 'Draft',
            'email' => 'old.draft@example.com',
            'aidant_type' => 'parent_handicap',
            'status' => AidantAdhesionForm::STATUS_DRAFT,
            'draft_saved_at' => now()->subDays(40),
        ]);

        AidantAdhesionForm::create([
            'ref' => 'NEW-DRAFT-001',
            'nom' => 'New',
            'prenom' => 'Draft',
            'email' => 'new.draft@example.com',
            'aidant_type' => 'parent_handicap',
            'status' => AidantAdhesionForm::STATUS_DRAFT,
            'draft_saved_at' => now()->subDays(10),
        ]);

        AidantAdhesionForm::create([
            'ref' => 'COMP-001',
            'nom' => 'Completed',
            'prenom' => 'Record',
            'email' => 'completed.record@example.com',
            'aidant_type' => 'parent_handicap',
            'status' => AidantAdhesionForm::STATUS_COMPLETED,
            'draft_saved_at' => now()->subDays(40),
            'draft_completed_at' => now()->subDays(39),
        ]);

        $this->artisan('app:prune-aidant-adhesion-drafts')
            ->expectsOutput('Pruned 1 old aidant adhesion draft(s).')
            ->assertExitCode(0);

        $this->assertDatabaseMissing('aidant_adhesion_forms', [
            'ref' => 'OLD-DRAFT-001',
        ]);

        $this->assertDatabaseHas('aidant_adhesion_forms', [
            'ref' => 'NEW-DRAFT-001',
        ]);

        $this->assertDatabaseHas('aidant_adhesion_forms', [
            'ref' => 'COMP-001',
        ]);
    }

    public function test_backoffice_list_includes_only_completed_adhesion_submissions(): void
    {
        $this->withoutMiddleware(HandleInertiaRequests::class);

        $admin = User::factory()->admin()->create();

        AidantAdhesionForm::create([
            'ref' => 'DRAFT-ONLY-001',
            'nom' => 'Draft',
            'prenom' => 'Only',
            'email' => 'draft.only@example.com',
            'aidant_type' => 'parent_handicap',
            'status' => AidantAdhesionForm::STATUS_DRAFT,
            'draft_saved_at' => now(),
        ]);

        AidantAdhesionForm::create([
            'ref' => 'COMP-ONLY-001',
            'nom' => 'Completed',
            'prenom' => 'Only',
            'email' => 'completed.only@example.com',
            'aidant_type' => 'parent_handicap',
            'status' => AidantAdhesionForm::STATUS_COMPLETED,
            'draft_completed_at' => now(),
        ]);

        $response = $this->actingAs($admin)
            ->withHeaders([
                'X-Inertia' => 'true',
                'X-Requested-With' => 'XMLHttpRequest',
                'Accept' => 'application/json',
            ])
            ->get('/@/adhesion');

        $response->assertOk();
        $response->assertHeader('X-Inertia', 'true');

        $payload = json_decode($response->getContent(), true);

        $this->assertIsArray($payload);
        $this->assertEquals('admin/adhesion/index', $payload['component']);
        $this->assertEquals(1, $payload['props']['entries']['total']);
        $this->assertEquals('COMP-ONLY-001', $payload['props']['entries']['data'][0]['ref']);
    }
}
