<?php

namespace Tests\Feature\Settings;

use App\Models\AppSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AnalyticsSettingsTest extends TestCase
{
    use RefreshDatabase;

    public function test_analytics_settings_page_is_accessible_to_authenticated_user(): void
    {
        $user = User::factory()->create();

        $response = $this->withoutVite()->actingAs($user)->get('/settings/analytics');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->component('settings/analytics'));
    }

    public function test_admin_can_save_valid_ga_measurement_id(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->put('/settings/analytics', [
            'ga_measurement_id' => 'G-ABC123XYZ9',
        ]);

        $response->assertRedirectToRoute('analytics.edit');
        $this->assertSame('G-ABC123XYZ9', AppSetting::get('ga_measurement_id'));
    }

    public function test_admin_can_clear_ga_measurement_id(): void
    {
        AppSetting::set('ga_measurement_id', 'G-EXISTING1');
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->put('/settings/analytics', [
            'ga_measurement_id' => '',
        ]);

        $response->assertRedirectToRoute('analytics.edit');
        $this->assertSame('', AppSetting::get('ga_measurement_id'));
    }

    public function test_non_admin_cannot_update_analytics_settings(): void
    {
        $user = User::factory()->create(['is_admin' => false]);

        $response = $this->actingAs($user)->put('/settings/analytics', [
            'ga_measurement_id' => 'G-ABC123XYZ9',
        ]);

        $response->assertForbidden();
        $this->assertNull(AppSetting::get('ga_measurement_id'));
    }

    public function test_invalid_ga_measurement_id_format_is_rejected(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->put('/settings/analytics', [
            'ga_measurement_id' => 'UA-12345-1',
        ]);

        $response->assertSessionHasErrors(['ga_measurement_id']);
        $this->assertNull(AppSetting::get('ga_measurement_id'));
    }

    public function test_ga_measurement_id_is_shared_as_inertia_prop(): void
    {
        AppSetting::set('ga_measurement_id', 'G-TESTID1234');
        $user = User::factory()->create();

        $response = $this->withoutVite()->actingAs($user)->get('/settings/analytics');

        $response->assertInertia(
            fn ($page) => $page
                ->component('settings/analytics')
                ->where('ga_measurement_id', 'G-TESTID1234')
        );
    }

    public function test_unauthenticated_user_is_redirected_from_analytics_settings(): void
    {
        $response = $this->get('/settings/analytics');

        $response->assertRedirect('/login');
    }
}
