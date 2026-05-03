<?php

namespace Tests\Feature\Admin;

use App\Models\Representant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminRepresentantManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_list_representants(): void
    {
        $admin = User::factory()->admin()->create();

        Representant::factory()->count(3)->create();

        $this->actingAs($admin)
            ->get('/@/representants')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('admin/representants/index')
                ->has('representants', 3)
            );
    }

    public function test_admin_can_access_create_page(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get('/@/representants/create')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('admin/representants/create'));
    }

    public function test_admin_can_access_edit_page(): void
    {
        $admin = User::factory()->admin()->create();
        $representant = Representant::factory()->create();

        $this->actingAs($admin)
            ->get('/@/representants/'.$representant->id.'/edit')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('admin/representants/edit'));
    }

    public function test_admin_can_store_representant(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->post('/@/representants', [
            'department_code' => '75',
            'department_name' => 'Paris',
            'first_name' => 'Margaux',
            'last_name' => 'MENEYROL',
            'role' => 'Représentante départementale',
            'short_bio' => 'Experte en politiques publiques.',
            'is_active' => true,
        ]);

        $response->assertRedirect('/@/representants');

        $this->assertDatabaseHas('representants', [
            'first_name' => 'Margaux',
            'last_name' => 'MENEYROL',
            'department_code' => '75',
        ]);
    }

    public function test_admin_can_update_representant(): void
    {
        $admin = User::factory()->admin()->create();
        $representant = Representant::factory()->create([
            'first_name' => 'Laurent',
            'last_name' => 'MANCHON',
            'department_code' => '29',
            'department_name' => 'Finistère',
            'role' => 'Représentant départemental',
            'short_bio' => 'Bio initiale.',
            'is_active' => true,
        ]);

        $response = $this->actingAs($admin)->patch('/@/representants/'.$representant->id, [
            'department_code' => '29',
            'department_name' => 'Finistère',
            'first_name' => 'Laurent',
            'last_name' => 'MANCHON',
            'role' => 'Représentant départemental',
            'short_bio' => 'Bio mise à jour.',
            'is_active' => true,
        ]);

        $response->assertRedirect('/@/representants');

        $this->assertDatabaseHas('representants', [
            'id' => $representant->id,
            'short_bio' => 'Bio mise à jour.',
        ]);
    }

    public function test_admin_can_delete_representant(): void
    {
        $admin = User::factory()->admin()->create();
        $representant = Representant::factory()->create();

        $response = $this->actingAs($admin)->delete('/@/representants/'.$representant->id);

        $response->assertRedirect('/@/representants');

        $this->assertDatabaseMissing('representants', ['id' => $representant->id]);
    }

    public function test_non_admin_cannot_access_representants_admin(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get('/@/representants')
            ->assertStatus(403);
    }

    public function test_store_validation_requires_mandatory_fields(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->post('/@/representants', []);

        $response->assertSessionHasErrors(['department_code', 'department_name', 'first_name', 'last_name', 'role', 'short_bio']);
    }
}
