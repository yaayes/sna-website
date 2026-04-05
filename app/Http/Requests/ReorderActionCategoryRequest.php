<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReorderActionCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'categories' => ['required', 'array', 'min:1'],
            'categories.*.id' => ['required', 'integer', 'exists:action_categories,id'],
            'categories.*.sort_order' => ['required', 'integer', 'min:1'],
        ];
    }
}
