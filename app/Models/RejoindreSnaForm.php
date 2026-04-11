<?php

namespace App\Models;

use App\Concerns\HasRef;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class RejoindreSnaForm extends Model
{
    use HasFactory, HasRef;

    protected $fillable = [
        'ref',
        'involvement_types',
        'main_skills',
        'other_skill',
        'experience',
        'availability',
        'integration_preferences',
        'name',
        'city',
        'email',
        'phone',
    ];

    protected function casts(): array
    {
        return [
            'involvement_types' => 'array',
            'main_skills' => 'array',
            'integration_preferences' => 'array',
        ];
    }

    public function submission(): MorphOne
    {
        return $this->morphOne(FormSubmission::class, 'formable');
    }
}
