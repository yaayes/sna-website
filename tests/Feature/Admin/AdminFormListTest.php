<?php

namespace Tests\Feature\Admin;

use App\Http\Middleware\HandleInertiaRequests;
use App\Models\AidantAdhesionForm;
use App\Models\FormSubmission;
use App\Models\MoiAussiForm;
use App\Models\PartenaireForm;
use App\Models\Payment;
use App\Models\SoutienForm;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminFormListTest extends TestCase
{
    use RefreshDatabase;

    // ── Moi Aussi ──────────────────────────────────────────────────────────────

    public function test_moi_aussi_index_is_accessible_by_admin(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get('/@/moi-aussi')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('admin/moi-aussi/index'));
    }

    public function test_moi_aussi_index_search_filters_by_email(): void
    {
        $admin = User::factory()->admin()->create();
        MoiAussiForm::factory()->create(['email' => 'alice@example.com']);
        MoiAussiForm::factory()->create(['email' => 'bob@example.com']);

        $this->actingAs($admin)
            ->get('/@/moi-aussi?search=alice')
            ->assertInertia(
                fn ($page) => $page
                    ->component('admin/moi-aussi/index')
                    ->where('entries.total', 1)
            );
    }

    public function test_moi_aussi_index_search_filters_by_ref(): void
    {
        $admin = User::factory()->admin()->create();
        $form = MoiAussiForm::factory()->create();

        $this->actingAs($admin)
            ->get('/@/moi-aussi?search='.$form->ref)
            ->assertInertia(
                fn ($page) => $page
                    ->where('entries.total', 1)
            );
    }

    public function test_moi_aussi_show_is_accessible_by_admin(): void
    {
        $admin = User::factory()->admin()->create();
        $form = MoiAussiForm::factory()->create();

        $this->actingAs($admin)
            ->get('/@/moi-aussi/'.$form->id)
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('admin/moi-aussi/show'));
    }

    // ── Soutien ────────────────────────────────────────────────────────────────

    public function test_soutien_index_is_accessible_by_admin(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get('/@/soutien')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('admin/soutien/index'));
    }

    public function test_soutien_index_search_filters_by_email(): void
    {
        $admin = User::factory()->admin()->create();
        SoutienForm::factory()->create(['email' => 'alice@example.com']);
        SoutienForm::factory()->create(['email' => 'bob@example.com']);

        $this->actingAs($admin)
            ->get('/@/soutien?search=alice')
            ->assertInertia(fn ($page) => $page->where('entries.total', 1));
    }

    // ── Partenaire ─────────────────────────────────────────────────────────────

    public function test_partenaire_index_is_accessible_by_admin(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get('/@/partenaire')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('admin/partenaire/index'));
    }

    public function test_partenaire_index_search_filters_by_organisation(): void
    {
        $admin = User::factory()->admin()->create();
        PartenaireForm::factory()->create(['organisation_name' => 'Greenpeace']);
        PartenaireForm::factory()->create(['organisation_name' => 'Amnesty']);

        $this->actingAs($admin)
            ->get('/@/partenaire?search=green')
            ->assertInertia(fn ($page) => $page->where('entries.total', 1));
    }

    // ── HasRef trait ───────────────────────────────────────────────────────────

    public function test_moi_aussi_form_gets_unique_ref_on_creation(): void
    {
        $form = MoiAussiForm::factory()->create();

        $this->assertNotNull($form->ref);
        $this->assertEquals(8, strlen($form->ref));
    }

    public function test_soutien_form_gets_unique_ref_on_creation(): void
    {
        $form = SoutienForm::factory()->create();

        $this->assertNotNull($form->ref);
        $this->assertEquals(8, strlen($form->ref));
    }

    public function test_partenaire_form_gets_unique_ref_on_creation(): void
    {
        $form = PartenaireForm::factory()->create();

        $this->assertNotNull($form->ref);
        $this->assertEquals(8, strlen($form->ref));
    }

    // ── Adhésion ───────────────────────────────────────────────────────────────

    public function test_adhesion_index_is_accessible_by_admin(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get('/@/adhesion')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('admin/adhesion/index'));
    }

    public function test_adhesion_index_search_filters_by_email(): void
    {
        $admin = User::factory()->admin()->create();
        AidantAdhesionForm::factory()->create(['email' => 'alice@example.com']);
        AidantAdhesionForm::factory()->create(['email' => 'bob@example.com']);

        $this->actingAs($admin)
            ->get('/@/adhesion?search=alice')
            ->assertInertia(fn ($page) => $page->where('entries.total', 1));
    }

    public function test_adhesion_index_search_filters_by_nom(): void
    {
        $admin = User::factory()->admin()->create();
        AidantAdhesionForm::factory()->create(['nom' => 'Dupont', 'email' => 'a@example.com']);
        AidantAdhesionForm::factory()->create(['nom' => 'Martin', 'email' => 'b@example.com']);

        $this->actingAs($admin)
            ->get('/@/adhesion?search=dupont')
            ->assertInertia(fn ($page) => $page->where('entries.total', 1));
    }

    public function test_adhesion_show_is_accessible_by_admin(): void
    {
        $admin = User::factory()->admin()->create();
        $form = AidantAdhesionForm::factory()->create();

        $this->actingAs($admin)
            ->get('/@/adhesion/'.$form->id)
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('admin/adhesion/show'));
    }

    public function test_adhesion_show_exposes_multiple_aidants_and_aides(): void
    {
        $admin = User::factory()->admin()->create();
        $form = AidantAdhesionForm::factory()->create([
            'nom' => 'Dupont',
            'prenom' => 'Marie',
            'email' => 'marie@example.com',
            'aidant_type' => 'parent_handicap',
            'aidants' => [
                [
                    'genre' => 'femme',
                    'nom' => 'Dupont',
                    'prenom' => 'Marie',
                    'age' => '42',
                    'email' => 'marie@example.com',
                    'phone' => '+33600000000',
                    'departement' => '75',
                    'commune' => 'Paris',
                    'aidant_type' => 'parent_handicap',
                    'aidant_type_autre_precisions' => '',
                    'situation_familiale' => 'en_couple',
                    'situation_familiale_autre_precisions' => '',
                ],
                [
                    'genre' => 'homme',
                    'nom' => 'Martin',
                    'prenom' => 'Luc',
                    'age' => '39',
                    'email' => 'luc@example.com',
                    'phone' => '+33700000000',
                    'departement' => '69',
                    'commune' => 'Lyon',
                    'aidant_type' => 'proche',
                    'aidant_type_autre_precisions' => '',
                    'situation_familiale' => 'celibataire',
                    'situation_familiale_autre_precisions' => '',
                ],
            ],
            'aides' => [
                [
                    'aide_tranche_age' => 'moins_18',
                    'aide_age' => '8',
                    'type_situation' => ['Handicap intellectuel'],
                    'type_situation_autre_precisions' => '',
                    'reconnaissance_administrative' => 'droits_mdph_ouverts',
                    'aide_genre' => 'homme',
                    'aide_profile' => 'enfant',
                    'scolarisation' => 'ulis',
                    'scolarisation_autre_precisions' => '',
                    'situation_adulte' => '',
                    'situation_adulte_autre_precisions' => '',
                    'lieu_habitation' => 'domicile_familial',
                    'lieu_habitation_autre_precisions' => '',
                ],
                [
                    'aide_tranche_age' => '18_65',
                    'aide_age' => '26',
                    'type_situation' => ['Troubles du neurodeveloppement (TSA, TDAH, DYS...)'],
                    'type_situation_autre_precisions' => '',
                    'reconnaissance_administrative' => 'droits_mdph_ouverts',
                    'aide_genre' => 'femme',
                    'aide_profile' => 'adulte',
                    'scolarisation' => '',
                    'scolarisation_autre_precisions' => '',
                    'situation_adulte' => 'travailleur_esat',
                    'situation_adulte_autre_precisions' => '',
                    'lieu_habitation' => 'domicile_autonome',
                    'lieu_habitation_autre_precisions' => '',
                ],
            ],
        ]);

        $this->actingAs($admin)
            ->get('/@/adhesion/'.$form->id)
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('admin/adhesion/show')
                ->where('entry.aidants.1.prenom', 'Luc')
                ->where('entry.aides.1.aide_profile', 'adulte')
                ->where('entry.aides.1.situation_adulte', 'travailleur_esat'));
    }

    public function test_adhesion_index_does_not_expose_cancelled_attempt_amount_as_paid_amount(): void
    {
        $this->withoutMiddleware(HandleInertiaRequests::class);

        $admin = User::factory()->admin()->create();
        $form = AidantAdhesionForm::factory()->create([
            'email' => 'retry@example.com',
            'nom' => 'Dupont',
            'prenom' => 'Marie',
            'aidant_type' => 'parent_handicap',
            'status' => AidantAdhesionForm::STATUS_COMPLETED,
            'draft_completed_at' => now(),
        ]);

        $submission = FormSubmission::factory()->create([
            'email' => $form->email,
            'type' => 'adhesion',
            'formable_type' => AidantAdhesionForm::class,
            'formable_id' => $form->id,
        ]);

        Payment::factory()->create([
            'form_submission_id' => $submission->id,
            'status' => 'cancelled',
            'amount_cents' => 2900,
        ]);

        $response = $this->actingAs($admin)
            ->withHeaders([
                'X-Inertia' => 'true',
                'X-Requested-With' => 'XMLHttpRequest',
                'Accept' => 'application/json',
            ])
            ->get('/@/adhesion?search=retry@example.com');

        $response->assertOk();
        $response->assertHeader('X-Inertia', 'true');

        $payload = json_decode($response->getContent(), true);

        $this->assertIsArray($payload);
        $this->assertEquals('admin/adhesion/index', $payload['component']);
        $this->assertEquals(1, $payload['props']['entries']['total']);
        $this->assertNull($payload['props']['entries']['data'][0]['payment_status']);
        $this->assertNull($payload['props']['entries']['data'][0]['payment_amount_cents']);
    }

    public function test_adhesion_index_requires_admin(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get('/@/adhesion')
            ->assertStatus(403);
    }
}
