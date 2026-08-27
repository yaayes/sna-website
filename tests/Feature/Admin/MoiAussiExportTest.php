<?php

namespace Tests\Feature\Admin;

use App\Models\Action;
use App\Models\MoiAussiForm;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\TestResponse;
use Tests\TestCase;

class MoiAussiExportTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @param  array<string, mixed>  $params
     */
    private function exportUrl(array $params): string
    {
        return '/@/moi-aussi/export?'.http_build_query($params);
    }

    private function fileContent(TestResponse $response): string
    {
        return $response->baseResponse->getFile()->getContent();
    }

    public function test_export_is_forbidden_for_non_admin(): void
    {
        $this->actingAs(User::factory()->create())
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
        MoiAussiForm::factory()->create();

        $response = $this->actingAs($admin)->get($this->exportUrl([
            'format' => 'xlsx',
            'groups' => ['ref', 'nom', 'email'],
        ]));

        $response->assertOk();
        $disposition = $response->headers->get('content-disposition');
        $this->assertStringContainsString('moi-aussi-', $disposition);
        $this->assertStringContainsString('.xlsx', $disposition);
    }

    public function test_csv_export_contains_only_the_selected_group_headings_and_values(): void
    {
        $admin = User::factory()->admin()->create();
        $action = Action::factory()->create(['title' => 'Campagne test']);
        $form = MoiAussiForm::factory()->create([
            'action_id' => $action->id,
            'email' => 'temoin@example.com',
            'situation' => 'resolu',
            'consequences' => ['Isolement', 'Perte financière'],
        ]);

        $response = $this->actingAs($admin)->get($this->exportUrl([
            'format' => 'csv',
            'groups' => ['ref', 'email', 'action', 'temoignage'],
        ]));

        $response->assertOk();
        $content = $this->fileContent($response);

        $this->assertStringContainsString('Référence', $content);
        $this->assertStringContainsString('Email', $content);
        $this->assertStringContainsString('Action liée', $content);
        $this->assertStringContainsString('Conséquences', $content);
        $this->assertStringContainsString($form->ref, $content);
        $this->assertStringContainsString('temoin@example.com', $content);
        $this->assertStringContainsString('Campagne test', $content);
        $this->assertStringContainsString('Résolu', $content);
        $this->assertStringContainsString('Isolement, Perte financière', $content);

        $this->assertStringNotContainsString('Usage anonymisé', $content);
        $this->assertStringNotContainsString('Téléphone', $content);
    }

    public function test_contacted_institution_is_exported_as_a_tri_state_value(): void
    {
        $admin = User::factory()->admin()->create();
        $yes = MoiAussiForm::factory()->create(['contacted_institution' => true, 'institution_name' => 'MDPH']);
        $unknown = MoiAussiForm::factory()->create(['contacted_institution' => null, 'institution_name' => null]);

        $content = $this->fileContent($this->actingAs($admin)->get($this->exportUrl([
            'format' => 'csv',
            'groups' => ['ref', 'institution'],
        ])));

        $lines = array_values(array_filter(explode("\n", trim($content))));
        $yesLine = collect($lines)->first(fn (string $line) => str_contains($line, $yes->ref));
        $unknownLine = collect($lines)->first(fn (string $line) => str_contains($line, $unknown->ref));

        $this->assertStringContainsString('Oui', $yesLine);
        $this->assertStringContainsString('MDPH', $yesLine);
        $this->assertStringNotContainsString('Oui', $unknownLine);
        $this->assertStringNotContainsString('Non', $unknownLine);
    }

    public function test_search_filter_narrows_the_export(): void
    {
        $admin = User::factory()->admin()->create();
        $match = MoiAussiForm::factory()->create(['email' => 'alice@example.com']);
        $other = MoiAussiForm::factory()->create(['email' => 'bob@example.com']);

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
        $inRange = MoiAussiForm::factory()->create(['created_at' => '2026-06-15 10:00:00']);
        $tooOld = MoiAussiForm::factory()->create(['created_at' => '2026-01-01 10:00:00']);

        $content = $this->fileContent($this->actingAs($admin)->get($this->exportUrl([
            'format' => 'csv',
            'groups' => ['ref'],
            'date_from' => '2026-06-01',
            'date_to' => '2026-06-30',
        ])));

        $this->assertStringContainsString($inRange->ref, $content);
        $this->assertStringNotContainsString($tooOld->ref, $content);
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
            ->get('/@/moi-aussi')
            ->assertInertia(fn ($page) => $page
                ->component('admin/moi-aussi/index')
                ->has('fieldGroups', 9)
                ->where('fieldGroups.0.key', 'ref')
            );
    }
}
