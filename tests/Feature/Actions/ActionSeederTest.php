<?php

namespace Tests\Feature\Actions;

use App\Models\Action;
use App\Models\ActionCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ActionSeederTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function database_seeder_populates_expected_public_actions(): void
    {
        $this->seed();

        $this->assertSame(21, Action::query()->count());
        $this->assertSame(4, ActionCategory::query()->count());

        $economicRightsCategory = ActionCategory::query()
            ->where('slug', 'droits-sociaux-emploi-et-protection-economique')
            ->firstOrFail();

        $healthCategory = ActionCategory::query()
            ->where('slug', 'sante-repit-et-prevention-de-l-epuisement')
            ->firstOrFail();

        $transformationCategory = ActionCategory::query()
            ->where('slug', 'transformation-des-politiques-publiques')
            ->firstOrFail();

        $carePathCategory = ActionCategory::query()
            ->where('slug', 'parcours-de-soins')
            ->firstOrFail();

        $this->assertDatabaseHas('actions', [
            'title' => 'Statut du salarié aidant',
            'action_category_id' => $economicRightsCategory->id,
            'sort_order' => 1,
            'is_published' => true,
        ]);

        $this->assertDatabaseHas('actions', [
            'title' => 'Indice national d\'épuisement des aidants (INVIA)',
            'action_category_id' => $healthCategory->id,
            'sort_order' => 1,
            'is_published' => true,
        ]);

        $this->assertDatabaseHas('actions', [
            'slug' => 'parking-chu-acces-aux-soins',
            'action_category_id' => $transformationCategory->id,
            'sort_order' => 6,
            'is_published' => true,
        ]);

        $this->assertDatabaseHas('actions', [
            'title' => 'Réforme CDAPH (former pour orienter, pas juger)',
            'action_category_id' => $transformationCategory->id,
            'sort_order' => 2,
            'is_published' => true,
        ]);

        $this->assertDatabaseHas('actions', [
            'slug' => 'reconnaitre-les-aidants-comme-partenaires-essentiels-du-parcours-de-soin',
            'action_category_id' => $carePathCategory->id,
            'sort_order' => 1,
            'is_published' => true,
        ]);

        $this->assertDatabaseHas('actions', [
            'slug' => 'reconnaissance-des-competences-des-aidants',
            'action_category_id' => $economicRightsCategory->id,
            'sort_order' => 6,
            'is_published' => true,
        ]);

        $this->assertDatabaseHas('actions', [
            'slug' => 'reconnaissance-de-la-presence-hospitaliere-des-aidants',
            'action_category_id' => $carePathCategory->id,
            'sort_order' => 2,
            'is_published' => true,
        ]);

        $this->assertDatabaseHas('actions', [
            'slug' => 'securiser-le-passage-a-la-majorite-en-situation-de-handicap',
            'action_category_id' => $transformationCategory->id,
            'sort_order' => 7,
            'is_published' => true,
        ]);

        $this->assertDatabaseHas('actions', [
            'slug' => 'creer-un-statut-national-de-laidant',
            'action_category_id' => $economicRightsCategory->id,
            'sort_order' => 7,
            'is_published' => true,
        ]);
    }
}
