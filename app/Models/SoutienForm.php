<?php

namespace App\Models;

use App\Concerns\HasRef;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class SoutienForm extends Model
{
    use HasFactory, HasRef;

    protected $fillable = [
        'ref',
        'name',
        'address',
        'email',
        'phone',
        'wants_events',
        'wants_participation',
        'message',
        'consents_email',
        'consents_rgpd',
        'don_amount_cents',
    ];

    protected function casts(): array
    {
        return [
            'wants_events' => 'boolean',
            'wants_participation' => 'boolean',
            'consents_email' => 'boolean',
            'consents_rgpd' => 'boolean',
            'don_amount_cents' => 'integer',
        ];
    }

    public function submission(): MorphOne
    {
        return $this->morphOne(FormSubmission::class, 'formable');
    }
}
