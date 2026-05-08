<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCouponRequest;
use App\Http\Requests\Admin\UpdateCouponRequest;
use App\Models\Coupon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CouponController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Coupon::query()->latest();

        if ($search = $request->string('search')->trim()->value()) {
            $query->where(function ($q) use ($search): void {
                $q->where('code', 'ilike', "%{$search}%")
                    ->orWhere('description', 'ilike', "%{$search}%");
            });
        }

        return Inertia::render('admin/coupons/index', [
            'coupons' => $query->paginate(20)->withQueryString()->through(fn (Coupon $coupon) => [
                'id' => $coupon->id,
                'code' => $coupon->code,
                'description' => $coupon->description,
                'discount_euros' => number_format($coupon->discount_cents / 100, 2, '.', ''),
                'max_uses' => $coupon->max_uses,
                'uses_count' => $coupon->uses_count,
                'expires_at' => $coupon->expires_at?->format('d/m/Y'),
                'is_active' => $coupon->is_active,
                'is_default' => $coupon->is_default,
                'is_valid' => $coupon->isValid(),
            ]),
            'filters' => ['search' => $request->string('search')->trim()->value()],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/coupons/create');
    }

    public function store(StoreCouponRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $isDefault = (bool) ($validated['is_default'] ?? false);

        DB::transaction(function () use ($validated, $isDefault): void {
            if ($isDefault) {
                Coupon::where('is_default', true)->update(['is_default' => false]);
            }

            Coupon::create([
                'code' => Str::upper($validated['code']),
                'description' => $validated['description'] ?? null,
                'discount_cents' => (int) round((float) $validated['discount_euros'] * 100),
                'max_uses' => $validated['max_uses'] ?? null,
                'expires_at' => $validated['expires_at'] ?? null,
                'is_active' => (bool) ($validated['is_active'] ?? true),
                'is_default' => $isDefault,
            ]);
        });

        return redirect()->route('admin.coupons.index')->with('success', 'Coupon créé avec succès.');
    }

    public function edit(Coupon $coupon): Response
    {
        return Inertia::render('admin/coupons/edit', [
            'coupon' => [
                'id' => $coupon->id,
                'code' => $coupon->code,
                'description' => $coupon->description,
                'discount_euros' => number_format($coupon->discount_cents / 100, 2, '.', ''),
                'max_uses' => $coupon->max_uses,
                'uses_count' => $coupon->uses_count,
                'expires_at' => $coupon->expires_at?->format('Y-m-d'),
                'is_active' => $coupon->is_active,
                'is_default' => $coupon->is_default,
            ],
        ]);
    }

    public function update(UpdateCouponRequest $request, Coupon $coupon): RedirectResponse
    {
        $validated = $request->validated();
        $isDefault = (bool) ($validated['is_default'] ?? false);

        DB::transaction(function () use ($validated, $coupon, $isDefault): void {
            if ($isDefault) {
                Coupon::where('is_default', true)
                    ->where('id', '!=', $coupon->id)
                    ->update(['is_default' => false]);
            }

            $coupon->update([
                'code' => Str::upper($validated['code']),
                'description' => $validated['description'] ?? null,
                'discount_cents' => (int) round((float) $validated['discount_euros'] * 100),
                'max_uses' => $validated['max_uses'] ?? null,
                'expires_at' => $validated['expires_at'] ?? null,
                'is_active' => (bool) ($validated['is_active'] ?? false),
                'is_default' => $isDefault,
            ]);
        });

        return redirect()->route('admin.coupons.index')->with('success', 'Coupon mis à jour.');
    }

    public function destroy(Coupon $coupon): RedirectResponse
    {
        $coupon->delete();

        return redirect()->route('admin.coupons.index')->with('success', 'Coupon supprimé.');
    }
}
