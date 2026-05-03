<?php

namespace Tests\Feature;

use Tests\TestCase;

class RejoindrePageTest extends TestCase
{
    public function test_rejoindre_page_returns_ok(): void
    {
        $response = $this->get('/rejoindre');

        $response->assertStatus(200);
    }

    public function test_rejoindre_page_renders_rejoindre_inertia_component(): void
    {
        $response = $this->get('/rejoindre');

        $response->assertInertia(fn ($page) => $page->component('rejoindre'));
    }
}
