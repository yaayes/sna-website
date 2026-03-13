<?php

namespace Tests\Feature;

use Tests\TestCase;

class HomePageTest extends TestCase
{
    public function test_home_page_returns_ok(): void
    {
        $response = $this->withHeaders(['X-Inertia' => 'true'])->get('/');

        $response->assertStatus(200);
    }

    public function test_home_page_renders_welcome_inertia_component(): void
    {
        $response = $this->withHeaders(['X-Inertia' => 'true'])->get('/');

        $response->assertInertia(fn ($page) => $page->component('welcome'));
    }

    public function test_home_page_passes_can_register_prop(): void
    {
        $response = $this->withHeaders(['X-Inertia' => 'true'])->get('/');

        $response->assertInertia(fn ($page) => $page
            ->component('welcome')
            ->has('canRegister')
        );
    }
}
