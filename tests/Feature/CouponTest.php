<?php

namespace Tests\Feature;

use App\Models\Coupon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CouponTest extends TestCase
{
    use RefreshDatabase;

    public function test_is_valid_returns_true_for_active_coupon(): void
    {
        $coupon = Coupon::factory()->create([
            'is_active' => true,
            'expires_at' => null,
            'max_uses' => null,
            'uses_count' => 0,
        ]);

        $this->assertTrue($coupon->isValid());
    }

    public function test_is_valid_returns_false_when_inactive(): void
    {
        $coupon = Coupon::factory()->inactive()->create();

        $this->assertFalse($coupon->isValid());
    }

    public function test_is_valid_returns_false_when_expired(): void
    {
        $coupon = Coupon::factory()->expired()->create();

        $this->assertFalse($coupon->isValid());
    }

    public function test_is_valid_returns_false_when_exhausted(): void
    {
        $coupon = Coupon::factory()->exhausted()->create();

        $this->assertFalse($coupon->isValid());
    }

    public function test_validate_coupon_endpoint_returns_valid_for_active_coupon(): void
    {
        $coupon = Coupon::factory()->create(['code' => 'TESTCODE', 'discount_cents' => 2000]);

        $response = $this->getJson(route('forms.adhesion.validate-coupon', ['code' => 'TESTCODE']));

        $response->assertOk()
            ->assertJson(['valid' => true, 'discount_cents' => 2000]);
    }

    public function test_validate_coupon_endpoint_returns_invalid_for_inactive_coupon(): void
    {
        Coupon::factory()->inactive()->create(['code' => 'INACTIVE']);

        $response = $this->getJson(route('forms.adhesion.validate-coupon', ['code' => 'INACTIVE']));

        $response->assertOk()->assertJson(['valid' => false]);
    }

    public function test_validate_coupon_endpoint_is_case_insensitive(): void
    {
        Coupon::factory()->create(['code' => 'UPPERCASE', 'discount_cents' => 1000]);

        $response = $this->getJson(route('forms.adhesion.validate-coupon', ['code' => 'uppercase']));

        $response->assertOk()->assertJson(['valid' => true]);
    }
}
