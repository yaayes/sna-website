<?php

namespace Tests\Feature\Admin;

use App\Http\Middleware\HandleInertiaRequests;
use App\Models\Action;
use App\Models\ActionCategory;
use App\Models\MoiAussiForm;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminActionManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_access_actions_pages(): void
    {
        $admin = User::factory()->admin()->create();
        $category = ActionCategory::factory()->create(['name' => 'Transformation des politiques publiques']);
        $action = Action::factory()->create([
            'slug' => 'securisation-transport-taxi',
            'action_category_id' => $category->id,
        ]);

        $this->actingAs($admin)
            ->get('/@/actions')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('admin/actions/index'));

        $this->actingAs($admin)
            ->get('/@/actions/create')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('admin/actions/create'));

        $this->actingAs($admin)
            ->get('/@/actions/'.$action->slug.'/edit')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('admin/actions/edit'));
    }

    public function test_admin_can_store_action(): void
    {
        $admin = User::factory()->admin()->create();
        $category = ActionCategory::factory()->create([
            'name' => 'Transformation des politiques publiques',
            'slug' => 'transformation-des-politiques-publiques',
            'sort_order' => 1,
        ]);

        $response = $this->actingAs($admin)->post('/@/actions', [
            'title' => 'Observatoire national des aidants',
            'action_category_id' => $category->id,
            'content' => '<p>Une action structurante.</p>',
            'is_published' => true,
        ]);

        $response->assertRedirect('/@/actions');

        $this->assertDatabaseHas('actions', [
            'title' => 'Observatoire national des aidants',
            'slug' => 'observatoire-national-des-aidants',
            'action_category_id' => $category->id,
            'sort_order' => 1,
            'is_published' => true,
        ]);
    }

    public function test_admin_can_reorder_actions(): void
    {
        $admin = User::factory()->admin()->create();

        $first = Action::factory()->create(['sort_order' => 1]);
        $second = Action::factory()->create(['sort_order' => 2]);

        $response = $this->actingAs($admin)->patch('/@/actions/reorder', [
            'actions' => [
                ['id' => $second->id, 'sort_order' => 1],
                ['id' => $first->id, 'sort_order' => 2],
            ],
        ]);

        $response->assertRedirect('/@/actions');

        $this->assertDatabaseHas('actions', [
            'id' => $second->id,
            'sort_order' => 1,
        ]);

        $this->assertDatabaseHas('actions', [
            'id' => $first->id,
            'sort_order' => 2,
        ]);
    }

    public function test_admin_actions_index_includes_moi_aussi_count(): void
    {
        $this->withoutMiddleware(HandleInertiaRequests::class);

        $admin = User::factory()->admin()->create();
        $action = Action::factory()->create();
        MoiAussiForm::factory()->count(3)->create(['action_id' => $action->id]);

        $response = $this->actingAs($admin)
            ->withHeaders([
                'X-Inertia' => 'true',
                'X-Requested-With' => 'XMLHttpRequest',
                'Accept' => 'application/json',
            ])
            ->get('/@/actions');

        $response->assertOk();
        $payload = json_decode($response->getContent(), true);

        $found = collect($payload['props']['actions'])->firstWhere('id', $action->id);
        $this->assertNotNull($found);
        $this->assertEquals(3, $found['moi_aussi_count']);
    }
}
