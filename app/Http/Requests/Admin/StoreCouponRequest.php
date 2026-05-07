<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreCouponRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'code' => ['required', 'string', 'max:50', 'unique:coupons,code'],
            'description' => ['nullable', 'string', 'max:255'],
            'discount_euros' => ['required', 'numeric', 'min:0.01', 'max:999999'],
            'max_uses' => ['nullable', 'integer', 'min:1'],
            'expires_at' => ['nullable', 'date', 'after:today'],
            'is_active' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'code.required' => 'Le code coupon est obligatoire.',
            'code.unique' => 'Ce code coupon existe deja.',
            'discount_euros.required' => 'Le montant de la reduction est obligatoire.',
            'expires_at.after' => "La date d'expiration doit etre dans le futur.",
        ];
    }
}
