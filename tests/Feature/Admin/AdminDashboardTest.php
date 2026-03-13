<?php

namespace Tests\Feature\Admin;

use App\Models\MoiAussiForm;
use App\Models\PartenaireForm;
use App\Models\SoutienForm;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_dashboard_is_accessible_by_admin(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->get('/@');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('admin/dashboard'));
    }

    public function test_admin_dashboard_is_forbidden_for_non_admin(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/@');

        $response->assertStatus(403);
    }

    public function test_admin_dashboard_redirects_unauthenticated_users(): void
    {
        $response = $this->get('/@');

        $response->assertRedirect('/login');
    }

    public function test_admin_dashboard_shows_stats(): void
    {
        $admin = User::factory()->admin()->create();
        MoiAussiForm::factory()->count(3)->create();
        SoutienForm::factory()->count(5)->create();
        PartenaireForm::factory()->count(2)->create();

        $response = $this->actingAs($admin)->get('/@');

        $response->assertInertia(
            fn ($page) => $page
                ->component('admin/dashboard')
                ->where('stats.moi_aussi', 3)
                ->where('stats.soutien', 5)
                ->where('stats.partenaire', 2)
        );
    }
}
