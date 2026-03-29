<?php

namespace App\Models;

use App\Concerns\HasRef;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class PartenaireForm extends Model
{
    use HasFactory, HasRef;

    protected $fillable = [
        'ref',
        'organisation_name',
        'legal_status',
        'address',
        'phone',
        'email',
        'contact_name',
        'partnership_moral',
        'partnership_moral_details',
        'partnership_technical',
        'partnership_technical_details',
        'partnership_financial',
        'objectives',
        'comment_libre',
        'commitment_projects',
        'commitment_communication',
        'commitment_expertise',
        'consents_email',
        'consents_rgpd',
    ];

    protected function casts(): array
    {
        return [
            'partnership_moral' => 'boolean',
            'partnership_technical' => 'boolean',
            'partnership_financial' => 'boolean',
            'commitment_projects' => 'boolean',
            'commitment_communication' => 'boolean',
            'commitment_expertise' => 'boolean',
            'consents_email' => 'boolean',
            'consents_rgpd' => 'boolean',
        ];
    }

    public function submission(): MorphOne
    {
        return $this->morphOne(FormSubmission::class, 'formable');
    }

    public function attachments()
    {
        return $this->hasMany(PartenaireFormAttachment::class);
    }
}
