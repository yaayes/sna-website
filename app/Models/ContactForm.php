<?php

namespace App\Models;

use App\Concerns\HasRef;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class ContactForm extends Model
{
    use HasFactory, HasRef;

    protected $fillable = [
        'ref',
        'name',
        'city',
        'email',
        'phone',
        'subject',
        'message',
        'profile',
        'contact_preference',
    ];

    protected function casts(): array
    {
        return [];
    }

    public function submission(): MorphOne
    {
        return $this->morphOne(FormSubmission::class, 'formable');
    }
}
