<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReorderActionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'actions' => ['required', 'array', 'min:1'],
            'actions.*.id' => ['required', 'integer', 'exists:actions,id'],
            'actions.*.sort_order' => ['required', 'integer', 'min:1'],
        ];
    }
}
