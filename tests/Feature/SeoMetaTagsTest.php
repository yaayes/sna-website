<?php

namespace Tests\Feature;

use App\Models\Action;
use App\Models\ActionCategory;
use App\Models\PressArticle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SeoMetaTagsTest extends TestCase
{
    use RefreshDatabase;

    // ── Static public pages ──────────────────────────────────────────────────

    public function test_home_page_passes_seo_prop(): void
    {
        $this->get('/')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('welcome')
                ->has('seo.title')
                ->has('seo.description')
                ->has('seo.canonical')
                ->has('seo.jsonld')
                ->where('seo.jsonld.@type', 'Organization')
            );
    }

    public function test_comprendre_aidance_page_passes_seo_prop(): void
    {
        $this->get('/comprendre-laidance')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('comprendre-aidance')
                ->has('seo.title')
                ->has('seo.description')
                ->has('seo.canonical')
            );
    }

    public function test_a_propos_nous_page_passes_seo_prop(): void
    {
        $this->get('/a-propos-nous')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('a-propos-nous')
                ->has('seo.title')
                ->has('seo.description')
                ->has('seo.canonical')
            );
    }

    public function test_representants_page_passes_seo_prop(): void
    {
        $this->get('/representants')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('representants')
                ->has('seo.title')
                ->has('seo.description')
                ->has('seo.canonical')
            );
    }

    // ── Actions pages ────────────────────────────────────────────────────────

    public function test_actions_index_passes_seo_prop(): void
    {
        $this->get('/nos-actions')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('actions/index')
                ->has('seo.title')
                ->has('seo.description')
                ->has('seo.canonical')
            );
    }

    public function test_action_show_passes_dynamic_seo_prop(): void
    {
        $category = ActionCategory::factory()->create();
        Action::factory()->create([
            'title' => 'Observatoire national des aidants',
            'slug' => 'observatoire-national-aidants',
            'content' => '<p>Contenu de l\'action sur l\'observatoire.</p>',
            'action_category_id' => $category->id,
            'is_published' => true,
        ]);

        $this->get('/nos-actions/observatoire-national-aidants')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('actions/show')
                ->where('seo.title', 'Observatoire national des aidants — Nos Actions SNA')
                ->has('seo.description')
                ->where('seo.type', 'article')
                ->has('seo.canonical')
                ->where('seo.jsonld.@type', 'Article')
                ->where('seo.jsonld.headline', 'Observatoire national des aidants')
            );
    }

    public function test_unpublished_action_returns_404(): void
    {
        $category = ActionCategory::factory()->create();
        Action::factory()->create([
            'slug' => 'action-privee',
            'is_published' => false,
            'action_category_id' => $category->id,
        ]);

        $this->get('/nos-actions/action-privee')->assertStatus(404);
    }

    // ── Press article pages ───────────────────────────────────────────────────

    public function test_press_articles_index_passes_seo_prop(): void
    {
        $this->get('/revue-de-presse')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('revue-de-presse')
                ->has('seo.title')
                ->has('seo.description')
                ->has('seo.canonical')
            );
    }

    public function test_press_article_show_passes_dynamic_seo_prop(): void
    {
        PressArticle::factory()->create([
            'title' => 'Les aidants à la une',
            'slug' => 'les-aidants-a-la-une',
            'excerpt' => 'Un article de presse sur les aidants familiaux.',
            'is_published' => true,
        ]);

        $this->get('/revue-de-presse/les-aidants-a-la-une')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('revue-de-presse/show')
                ->where('seo.title', 'Les aidants à la une — Revue de presse SNA')
                ->where('seo.description', 'Un article de presse sur les aidants familiaux.')
                ->where('seo.type', 'article')
                ->has('seo.canonical')
                ->where('seo.jsonld.@type', 'NewsArticle')
                ->where('seo.jsonld.headline', 'Les aidants à la une')
            );
    }

    public function test_unpublished_press_article_returns_404(): void
    {
        PressArticle::factory()->create([
            'slug' => 'article-prive',
            'is_published' => false,
        ]);

        $this->get('/revue-de-presse/article-prive')->assertStatus(404);
    }

    // ── Form pages are noindex ────────────────────────────────────────────────

    public function test_adhesion_form_page_has_noindex_robots(): void
    {
        $this->get('/formulaire/adhesion')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->where('seo.robots', 'noindex, nofollow')
            );
    }

    public function test_soutien_form_page_has_noindex_robots(): void
    {
        $this->get('/formulaire/soutien')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->where('seo.robots', 'noindex, nofollow')
            );
    }

    public function test_partenaire_form_page_has_noindex_robots(): void
    {
        $this->get('/formulaire/partenaire')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->where('seo.robots', 'noindex, nofollow')
            );
    }
}
