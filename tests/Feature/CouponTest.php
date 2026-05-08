<?php

namespace Tests\Feature;

use App\Models\Coupon;
use App\Models\User;
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

    public function test_setting_default_on_store_unsets_previous_default(): void
    {
        $admin = User::factory()->admin()->create();
        $this->actingAs($admin);

        $existing = Coupon::factory()->asDefault()->create(['code' => 'FIRST']);

        $this->assertTrue($existing->fresh()->is_default);

        $response = $this->post(route('admin.coupons.store'), [
            'code' => 'SECOND',
            'discount_euros' => '20.00',
            'is_active' => true,
            'is_default' => true,
        ]);

        $response->assertRedirect(route('admin.coupons.index'));

        $this->assertFalse($existing->fresh()->is_default);
        $this->assertTrue(Coupon::where('code', 'SECOND')->first()->is_default);
    }

    public function test_setting_default_on_update_unsets_previous_default(): void
    {
        $admin = User::factory()->admin()->create();
        $this->actingAs($admin);

        $first = Coupon::factory()->asDefault()->create(['code' => 'ALPHA']);
        $second = Coupon::factory()->create(['code' => 'BETA']);

        $response = $this->patch(route('admin.coupons.update', $second), [
            'code' => 'BETA',
            'discount_euros' => '20.00',
            'is_active' => true,
            'is_default' => true,
        ]);

        $response->assertRedirect(route('admin.coupons.index'));

        $this->assertFalse($first->fresh()->is_default);
        $this->assertTrue($second->fresh()->is_default);
    }

    public function test_unsetting_default_does_not_affect_other_coupons(): void
    {
        $admin = User::factory()->admin()->create();
        $this->actingAs($admin);

        $coupon = Coupon::factory()->asDefault()->create(['code' => 'LONE']);

        $this->patch(route('admin.coupons.update', $coupon), [
            'code' => 'LONE',
            'discount_euros' => '20.00',
            'is_active' => true,
            'is_default' => false,
        ]);

        $this->assertFalse($coupon->fresh()->is_default);
        $this->assertDatabaseMissing('coupons', ['is_default' => true]);
    }

    public function test_valid_default_returns_model(): void
    {
        $coupon = Coupon::factory()->asDefault()->create(['code' => 'DEFCODE']);

        $this->assertNotNull(Coupon::validDefault());
        $this->assertEquals('DEFCODE', Coupon::validDefault()->code);
    }

    public function test_invalid_default_returns_null(): void
    {
        Coupon::factory()->asDefault()->inactive()->create(['code' => 'INACODE']);

        $this->assertNull(Coupon::validDefault());
    }
}
