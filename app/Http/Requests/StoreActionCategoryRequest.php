<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreActionCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', Rule::unique('action_categories', 'name')],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Le nom de la categorie est obligatoire.',
            'name.unique' => 'Cette categorie existe deja.',
        ];
    }
}
