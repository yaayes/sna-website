<?php

namespace Tests\Feature\Admin;

use App\Models\ActionCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminActionCategoryManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_access_category_pages(): void
    {
        $admin = User::factory()->admin()->create();
        $category = ActionCategory::factory()->create([
            'name' => 'Transformation des politiques publiques',
            'slug' => 'transformation-des-politiques-publiques',
        ]);

        $this->actingAs($admin)
            ->get('/@/action-categories')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('admin/action-categories/index'));

        $this->actingAs($admin)
            ->get('/@/action-categories/create')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('admin/action-categories/create'));

        $this->actingAs($admin)
            ->get('/@/action-categories/'.$category->slug.'/edit')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('admin/action-categories/edit'));
    }

    public function test_admin_can_store_and_reorder_categories(): void
    {
        $admin = User::factory()->admin()->create();

        $storeResponse = $this->actingAs($admin)->post('/@/action-categories', [
            'name' => 'Reconnaissance et statut des aidants',
        ]);

        $storeResponse->assertRedirect('/@/action-categories');

        $first = ActionCategory::query()->firstOrFail();
        $second = ActionCategory::factory()->create([
            'name' => 'Transformation des politiques publiques',
            'slug' => 'transformation-des-politiques-publiques',
            'sort_order' => 2,
        ]);

        $reorderResponse = $this->actingAs($admin)->patch('/@/action-categories/reorder', [
            'categories' => [
                ['id' => $second->id, 'sort_order' => 1],
                ['id' => $first->id, 'sort_order' => 2],
            ],
        ]);

        $reorderResponse->assertRedirect('/@/action-categories');

        $this->assertDatabaseHas('action_categories', [
            'name' => 'Reconnaissance et statut des aidants',
            'slug' => 'reconnaissance-et-statut-des-aidants',
            'sort_order' => 2,
        ]);

        $this->assertDatabaseHas('action_categories', [
            'id' => $second->id,
            'sort_order' => 1,
        ]);
    }
}
