<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class FormSubmission extends Model
{
    protected $fillable = [
        'email',
        'type',
        'formable_type',
        'formable_id',
        'access_token',
        'token_expires_at',
        'last_accessed_at',
    ];

    protected function casts(): array
    {
        return [
            'token_expires_at' => 'datetime',
            'last_accessed_at' => 'datetime',
        ];
    }

    public function formable(): MorphTo
    {
        return $this->morphTo();
    }

    public function isTokenValid(): bool
    {
        return $this->access_token !== null
            && $this->token_expires_at !== null
            && $this->token_expires_at->isFuture();
    }
}
