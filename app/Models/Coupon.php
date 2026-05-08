<?php

namespace App\Models;

use Database\Factories\CouponFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    /** @use HasFactory<CouponFactory> */
    use HasFactory;

    protected $fillable = [
        'code',
        'description',
        'discount_cents',
        'max_uses',
        'uses_count',
        'expires_at',
        'is_active',
        'is_default',
    ];

    protected function casts(): array
    {
        return [
            'expires_at' => 'datetime',
            'is_active' => 'boolean',
            'is_default' => 'boolean',
        ];
    }

    /**
     * Returns the default coupon only if it is currently valid, otherwise null.
     */
    public static function validDefault(): ?self
    {
        $coupon = self::where('is_default', true)->first();

        return $coupon?->isValid() ? $coupon : null;
    }

    public function isValid(): bool
    {
        if (! $this->is_active) {
            return false;
        }

        if ($this->expires_at !== null && $this->expires_at->isPast()) {
            return false;
        }

        if ($this->max_uses !== null && $this->uses_count >= $this->max_uses) {
            return false;
        }

        return true;
    }
}
