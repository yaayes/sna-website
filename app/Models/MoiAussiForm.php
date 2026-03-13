<?php

namespace App\Models;

use App\Concerns\HasRef;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class MoiAussiForm extends Model
{
    use HasFactory, HasRef;

    protected $fillable = [
        'ref',
        'situation',
        'testimony',
        'consequences',
        'contacted_institution',
        'institution_name',
        'usage_anonymised',
        'usage_collective',
        'usage_legislation',
        'usage_confidential',
        'name',
        'email',
        'phone',
    ];

    protected function casts(): array
    {
        return [
            'consequences' => 'array',
            'contacted_institution' => 'boolean',
            'usage_anonymised' => 'boolean',
            'usage_collective' => 'boolean',
            'usage_legislation' => 'boolean',
            'usage_confidential' => 'boolean',
        ];
    }

    public function submission(): MorphOne
    {
        return $this->morphOne(FormSubmission::class, 'formable');
    }
}
