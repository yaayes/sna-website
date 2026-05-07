<?php

namespace Tests\Feature\Admin;

use App\Models\Representant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RepresentantFilterTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->admin()->create();
    }

    public function test_admin_index_passes_departments_and_filters_props(): void
    {
        $admin = $this->admin();

        Representant::factory()->create(['department_code' => '75', 'department_name' => 'Paris']);
        Representant::factory()->create(['department_code' => '69', 'department_name' => 'Rhône']);

        $this->actingAs($admin)
            ->get('/@/representants')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('admin/representants/index')
                ->has('representants', 2)
                ->has('departments')
                ->has('filters')
                ->where('filters.search', '')
                ->where('filters.department', '')
            );
    }

    public function test_admin_can_filter_representants_by_name(): void
    {
        $admin = $this->admin();

        Representant::factory()->create(['first_name' => 'Laurent', 'last_name' => 'Manchon', 'department_code' => '29', 'department_name' => 'Finistère']);
        Representant::factory()->create(['first_name' => 'Margaux', 'last_name' => 'Meneyrol', 'department_code' => '75', 'department_name' => 'Paris']);

        $this->actingAs($admin)
            ->get('/@/representants?search=laurent')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('admin/representants/index')
                ->has('representants', 1)
                ->where('representants.0.first_name', 'Laurent')
                ->where('filters.search', 'laurent')
            );
    }

    public function test_admin_can_filter_representants_by_department_code(): void
    {
        $admin = $this->admin();

        Representant::factory()->create(['department_code' => '29', 'department_name' => 'Finistère', 'first_name' => 'Laurent', 'last_name' => 'Manchon']);
        Representant::factory()->create(['department_code' => '75', 'department_name' => 'Paris', 'first_name' => 'Margaux', 'last_name' => 'Meneyrol']);

        $this->actingAs($admin)
            ->get('/@/representants?department=29')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('admin/representants/index')
                ->has('representants', 1)
                ->where('representants.0.department_code', '29')
                ->where('filters.department', '29')
            );
    }

    public function test_admin_can_combine_search_and_department_filters(): void
    {
        $admin = $this->admin();

        Representant::factory()->create(['department_code' => '75', 'department_name' => 'Paris', 'first_name' => 'Margaux', 'last_name' => 'Meneyrol', 'role' => 'Représentante départementale']);
        Representant::factory()->create(['department_code' => '75', 'department_name' => 'Paris', 'first_name' => 'Jean', 'last_name' => 'Dupont', 'role' => 'Représentant']);
        Representant::factory()->create(['department_code' => '69', 'department_name' => 'Rhône', 'first_name' => 'Hakim', 'last_name' => 'Kecili', 'role' => 'Représentant']);

        $this->actingAs($admin)
            ->get('/@/representants?search=margaux&department=75')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('admin/representants/index')
                ->has('representants', 1)
                ->where('representants.0.first_name', 'Margaux')
            );
    }

    public function test_departments_list_contains_unique_departments(): void
    {
        $admin = $this->admin();

        Representant::factory()->create(['department_code' => '75', 'department_name' => 'Paris', 'first_name' => 'A', 'last_name' => 'B']);
        Representant::factory()->create(['department_code' => '75', 'department_name' => 'Paris', 'first_name' => 'C', 'last_name' => 'D']);
        Representant::factory()->create(['department_code' => '69', 'department_name' => 'Rhône', 'first_name' => 'E', 'last_name' => 'F']);

        $this->actingAs($admin)
            ->get('/@/representants')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('admin/representants/index')
                ->has('representants', 3)
                ->has('departments', 2)
            );
    }

    public function test_multiple_representants_can_belong_to_same_department(): void
    {
        $admin = $this->admin();

        Representant::factory()->create(['department_code' => '75', 'department_name' => 'Paris', 'first_name' => 'Alice', 'last_name' => 'Martin']);
        Representant::factory()->create(['department_code' => '75', 'department_name' => 'Paris', 'first_name' => 'Bob', 'last_name' => 'Durand']);

        $this->actingAs($admin)
            ->get('/@/representants')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('admin/representants/index')
                ->has('representants', 2)
            );
    }
}
