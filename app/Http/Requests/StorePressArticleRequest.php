<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePressArticleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['required', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'publication_date' => ['nullable', 'date'],
            'is_published' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Le titre de l\'article est obligatoire.',
            'title.max' => 'Le titre ne peut pas dépasser 255 caractères.',
            'excerpt.required' => 'Le résumé de l\'article est obligatoire.',
            'excerpt.max' => 'Le résumé ne peut pas dépasser 500 caractères.',
            'content.required' => 'Le contenu de l\'article est obligatoire.',
            'publication_date.date' => 'La date de publication doit être une date valide.',
        ];
    }
}
