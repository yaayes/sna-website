<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateActionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'action_category_id' => ['required', 'integer', 'exists:action_categories,id'],
            'content' => ['required', 'string'],
            'is_published' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Le titre de l action est obligatoire.',
            'action_category_id.required' => 'La categorie est obligatoire.',
            'action_category_id.exists' => 'La categorie selectionnee est invalide.',
            'content.required' => 'Le contenu de l action est obligatoire.',
        ];
    }
}
