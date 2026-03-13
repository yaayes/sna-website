<?php

namespace Tests\Feature\Admin;

use App\Models\MoiAussiForm;
use App\Models\PartenaireForm;
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
}
