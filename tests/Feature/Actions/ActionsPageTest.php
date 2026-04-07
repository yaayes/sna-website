<?php

namespace Tests\Feature\Actions;

use App\Models\Action;
use App\Models\ActionCategory;
use App\Models\MoiAussiForm;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ActionsPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_actions_index_lists_only_published_actions(): void
    {
        $category = ActionCategory::factory()->create([
            'name' => 'Fratrie',
            'slug' => 'fratrie',
            'sort_order' => 1,
        ]);

        $published = Action::factory()->create([
            'title' => 'Observatoire national des aidants',
            'slug' => 'observatoire-national-aidants',
            'action_category_id' => $category->id,
            'is_published' => true,
            'sort_order' => 1,
        ]);

        Action::factory()->create([
            'title' => 'Action masquee',
            'slug' => 'action-masquee',
            'action_category_id' => $category->id,
            'is_published' => false,
        ]);

        $this->get('/nos-actions')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('actions/index')
                ->where('categories.Fratrie.0.slug', $published->slug)
            );
    }

    public function test_action_show_returns_404_for_unpublished_action(): void
    {
        $action = Action::factory()->create([
            'slug' => 'action-privee',
            'is_published' => false,
        ]);

        $this->get('/nos-actions/'.$action->slug)->assertStatus(404);
    }

    public function test_action_show_renders_public_action_page(): void
    {
        $action = Action::factory()->create([
            'title' => 'Reforme CDAPH',
            'slug' => 'reforme-cdaph',
            'is_published' => true,
        ]);

        $this->get('/nos-actions/'.$action->slug)
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('actions/show')
                ->where('actionItem.slug', 'reforme-cdaph')
            );
    }

    public function test_moi_aussi_submission_can_be_attached_to_action(): void
    {
        $action = Action::factory()->create();

        $response = $this->post('/formulaire/moi-aussi', [
            'action_id' => $action->id,
            'situation' => 'oui',
            'testimony' => 'Le transport n etait pas adapte et a impacte nos droits.',
        ]);

        $response->assertRedirect();

        $this->assertDatabaseHas('moi_aussi_forms', [
            'id' => MoiAussiForm::firstOrFail()->id,
            'action_id' => $action->id,
        ]);
    }

    public function test_moi_aussi_submission_can_store_a_custom_other_consequence(): void
    {
        $response = $this->post('/formulaire/moi-aussi', [
            'situation' => 'oui',
            'testimony' => 'Le dispositif ne couvrait pas notre situation.',
            'consequences' => ['Autre : Refus de prise en charge locale'],
        ]);

        $response->assertRedirect();

        $this->assertSame(
            ['Autre : Refus de prise en charge locale'],
            MoiAussiForm::query()->firstOrFail()->consequences,
        );
    }
}
