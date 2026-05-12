<?php

namespace App\Models;

use Database\Factories\FormSubmissionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class FormSubmission extends Model
{
    /** @use HasFactory<FormSubmissionFactory> */
    use HasFactory;

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
            'notified_at' => 'datetime',
            'token_expires_at' => 'datetime',
            'last_accessed_at' => 'datetime',
        ];
    }

    public function formable(): MorphTo
    {
        return $this->morphTo();
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function isTokenValid(): bool
    {
        return $this->access_token !== null
            && $this->token_expires_at !== null
            && $this->token_expires_at->isFuture();
    }

    public function getSubmitterName(): ?string
    {
        $formable = $this->formable;

        if ($formable === null) {
            return null;
        }

        if (isset($formable->prenom, $formable->nom)) {
            return trim($formable->prenom.' '.$formable->nom) ?: null;
        }

        if (isset($formable->contact_name) && $formable->contact_name !== '') {
            return $formable->contact_name;
        }

        if (isset($formable->name) && $formable->name !== '') {
            return $formable->name;
        }

        return null;
    }
}
