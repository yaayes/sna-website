<?php

namespace Tests\Feature\Admin;

use App\Models\AidantAdhesionForm;
use App\Models\FormSubmission;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\TestResponse;
use Tests\TestCase;

class AidantAdhesionExportTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @param  array<string, mixed>  $params
     */
    private function exportUrl(array $params): string
    {
        return '/@/adhesion/export?'.http_build_query($params);
    }

    private function fileContent(TestResponse $response): string
    {
        return $response->baseResponse->getFile()->getContent();
    }

    public function test_export_is_forbidden_for_non_admin(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get($this->exportUrl(['format' => 'csv', 'groups' => ['ref']]))
            ->assertStatus(403);
    }

    public function test_export_requires_authentication(): void
    {
        $this->get($this->exportUrl(['format' => 'csv', 'groups' => ['ref']]))
            ->assertRedirect('/login');
    }

    public function test_admin_can_download_an_xlsx_export(): void
    {
        $admin = User::factory()->admin()->create();
        AidantAdhesionForm::factory()->create();

        $response = $this->actingAs($admin)->get($this->exportUrl([
            'format' => 'xlsx',
            'groups' => ['ref', 'identite', 'email'],
        ]));

        $response->assertOk();
        $disposition = $response->headers->get('content-disposition');
        $this->assertStringContainsString('adhesions-aidant-', $disposition);
        $this->assertStringContainsString('.xlsx', $disposition);
    }

    public function test_csv_export_contains_only_the_selected_group_headings_and_values(): void
    {
        $admin = User::factory()->admin()->create();
        $form = AidantAdhesionForm::factory()->create([
            'email' => 'marie.durand@example.com',
            'situation_professionnelle' => 'retire',
        ]);

        $response = $this->actingAs($admin)->get($this->exportUrl([
            'format' => 'csv',
            'groups' => ['ref', 'email', 'impact_pro'],
        ]));

        $response->assertOk();
        $content = $this->fileContent($response);

        $this->assertStringContainsString('Référence', $content);
        $this->assertStringContainsString('Email', $content);
        $this->assertStringContainsString('Situation professionnelle', $content);
        $this->assertStringContainsString($form->ref, $content);
        $this->assertStringContainsString('marie.durand@example.com', $content);
        $this->assertStringContainsString('Retraité(e)', $content);

        $this->assertStringNotContainsString('Genre personne aidée', $content);
        $this->assertStringNotContainsString('RGPD', $content);
    }

    public function test_aidants_group_is_exported_as_a_single_readable_cell(): void
    {
        $admin = User::factory()->admin()->create();
        AidantAdhesionForm::factory()->create([
            'aidants' => [
                [
                    'prenom' => 'Jean',
                    'nom' => 'Martin',
                    'email' => 'jean.martin@example.com',
                    'aidant_type' => 'conjoint',
                ],
                [
                    'prenom' => 'Sophie',
                    'nom' => 'Bernard',
                    'email' => 'sophie.bernard@example.com',
                ],
            ],
        ]);

        $content = $this->fileContent($this->actingAs($admin)->get($this->exportUrl([
            'format' => 'csv',
            'groups' => ['aidants'],
        ])));

        $this->assertStringContainsString('Tous les aidants', $content);
        $this->assertStringContainsString('Aidant 1 — Jean Martin', $content);
        $this->assertStringContainsString('Aidant 2 — Sophie Bernard', $content);
        $this->assertStringContainsString('Type : Conjoint(e)', $content);
    }

    public function test_export_only_includes_completed_submissions(): void
    {
        $admin = User::factory()->admin()->create();
        $completed = AidantAdhesionForm::factory()->completed()->create();
        $draft = AidantAdhesionForm::factory()->draft()->create();

        $content = $this->fileContent($this->actingAs($admin)->get($this->exportUrl([
            'format' => 'csv',
            'groups' => ['ref'],
        ])));

        $this->assertStringContainsString($completed->ref, $content);
        $this->assertStringNotContainsString($draft->ref, $content);
    }

    public function test_search_filter_narrows_the_export(): void
    {
        $admin = User::factory()->admin()->create();
        $match = AidantAdhesionForm::factory()->create(['email' => 'alice@example.com']);
        $other = AidantAdhesionForm::factory()->create(['email' => 'bob@example.com']);

        $content = $this->fileContent($this->actingAs($admin)->get($this->exportUrl([
            'format' => 'csv',
            'groups' => ['ref'],
            'search' => 'alice',
        ])));

        $this->assertStringContainsString($match->ref, $content);
        $this->assertStringNotContainsString($other->ref, $content);
    }

    public function test_date_range_filter_narrows_the_export(): void
    {
        $admin = User::factory()->admin()->create();
        $inRange = AidantAdhesionForm::factory()->create(['created_at' => '2026-06-15 10:00:00']);
        $tooOld = AidantAdhesionForm::factory()->create(['created_at' => '2026-01-01 10:00:00']);

        $content = $this->fileContent($this->actingAs($admin)->get($this->exportUrl([
            'format' => 'csv',
            'groups' => ['ref'],
            'date_from' => '2026-06-01',
            'date_to' => '2026-06-30',
        ])));

        $this->assertStringContainsString($inRange->ref, $content);
        $this->assertStringNotContainsString($tooOld->ref, $content);
    }

    public function test_payment_status_filter_selects_paid_and_unpaid_submissions(): void
    {
        $admin = User::factory()->admin()->create();

        $paid = AidantAdhesionForm::factory()->create();
        $paidSubmission = FormSubmission::factory()->for($paid, 'formable')->create();
        Payment::factory()->captured()->create(['form_submission_id' => $paidSubmission->id]);

        $unpaid = AidantAdhesionForm::factory()->create();

        $captured = $this->fileContent($this->actingAs($admin)->get($this->exportUrl([
            'format' => 'csv',
            'groups' => ['ref'],
            'payment_status' => 'captured',
        ])));
        $this->assertStringContainsString($paid->ref, $captured);
        $this->assertStringNotContainsString($unpaid->ref, $captured);

        $none = $this->fileContent($this->actingAs($admin)->get($this->exportUrl([
            'format' => 'csv',
            'groups' => ['ref'],
            'payment_status' => 'none',
        ])));
        $this->assertStringContainsString($unpaid->ref, $none);
        $this->assertStringNotContainsString($paid->ref, $none);
    }

    public function test_export_rejects_an_unknown_field_group(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->getJson($this->exportUrl(['format' => 'xlsx', 'groups' => ['not-a-group']]))
            ->assertStatus(422)
            ->assertJsonValidationErrors('groups.0');
    }

    public function test_export_requires_at_least_one_field_group(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->getJson($this->exportUrl(['format' => 'xlsx']))
            ->assertStatus(422)
            ->assertJsonValidationErrors('groups');
    }

    public function test_export_rejects_an_unsupported_format(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->getJson($this->exportUrl(['format' => 'pdf', 'groups' => ['ref']]))
            ->assertStatus(422)
            ->assertJsonValidationErrors('format');
    }

    public function test_index_exposes_field_group_metadata_to_the_page(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get('/@/adhesion')
            ->assertInertia(fn ($page) => $page
                ->component('admin/adhesion/index')
                ->has('fieldGroups', 14)
                ->where('fieldGroups.0.key', 'ref')
            );
    }
}
