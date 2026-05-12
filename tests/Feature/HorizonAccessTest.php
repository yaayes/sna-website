<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Gate;
use Tests\TestCase;

class HorizonAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_view_horizon_gate_allows_admin_user(): void
    {
        $admin = User::factory()->admin()->create();

        $this->assertTrue(Gate::forUser($admin)->allows('viewHorizon'));
    }

    public function test_view_horizon_gate_denies_non_admin_user(): void
    {
        $user = User::factory()->create(['is_admin' => false]);

        $this->assertFalse(Gate::forUser($user)->allows('viewHorizon'));
    }

    public function test_view_horizon_gate_denies_guest(): void
    {
        $this->assertFalse(Gate::allows('viewHorizon'));
    }
}
