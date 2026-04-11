<?php

namespace Tests\Feature;

use Tests\TestCase;

class HomePageTest extends TestCase
{
    public function test_home_page_returns_ok(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_home_page_renders_welcome_inertia_component(): void
    {
        $response = $this->get('/');

        $response->assertInertia(fn ($page) => $page->component('welcome'));
    }

    public function test_home_page_renders_valid_inertia_payload(): void
    {
        $response = $this->get('/');

        $response->assertInertia(fn ($page) => $page->component('welcome'));
    }

    public function test_a_propos_nous_page_returns_ok(): void
    {
        $response = $this->get('/a-propos-nous');

        $response->assertStatus(200);
    }

    public function test_a_propos_nous_page_renders_component(): void
    {
        $response = $this->get('/a-propos-nous');

        $response->assertInertia(fn ($page) => $page->component('a-propos-nous'));
    }
}
