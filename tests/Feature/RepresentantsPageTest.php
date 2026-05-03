<?php

namespace Tests\Feature;

use App\Models\Representant;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RepresentantsPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_representants_page_returns_ok(): void
    {
        $response = $this->get('/representants');

        $response->assertStatus(200);
    }

    public function test_representants_page_renders_inertia_component(): void
    {
        $response = $this->get('/representants');

        $response->assertInertia(fn ($page) => $page->component('representants'));
    }

    public function test_representants_page_passes_active_representatives_to_view(): void
    {
        Representant::factory()->create([
            'first_name' => 'Margaux',
            'last_name' => 'MENEYROL',
            'department_code' => '75',
            'department_name' => 'Paris',
            'is_active' => true,
        ]);

        Representant::factory()->create([
            'first_name' => 'Inactive',
            'last_name' => 'PERSON',
            'department_code' => '01',
            'department_name' => 'Ain',
            'is_active' => false,
        ]);

        $response = $this->get('/representants');

        $response->assertInertia(fn ($page) => $page
            ->component('representants')
            ->has('representants', 1)
            ->where('representants.0.first_name', 'Margaux')
        );
    }

    public function test_representants_page_excludes_inactive_representatives(): void
    {
        Representant::factory()->count(3)->create(['is_active' => true]);
        Representant::factory()->count(2)->create(['is_active' => false]);

        $response = $this->get('/representants');

        $response->assertInertia(fn ($page) => $page
            ->has('representants', 3)
        );
    }
}
