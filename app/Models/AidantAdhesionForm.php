<?php

namespace App\Models;

use App\Concerns\HasRef;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class AidantAdhesionForm extends Model
{
    use HasFactory, HasRef;

    protected $fillable = [
        'ref',
        'genre',
        'nom',
        'prenom',
        'age',
        'email',
        'phone',
        'departement',
        'commune',
        'aidant_type',
        'situation_familiale',
        'aide_tranche_age',
        'aide_age',
        'type_situation',
        'reconnaissance_administrative',
        'aide_genre',
        'scolarisation',
        'situation_adulte',
        'lieu_habitation',
        'impacts',
        'situation_professionnelle',
        'expression_libre',
        'soutient_sna',
        'wants_info',
        'consents_rgpd',
    ];

    protected function casts(): array
    {
        return [
            'type_situation' => 'array',
            'impacts' => 'array',
            'soutient_sna' => 'boolean',
            'wants_info' => 'boolean',
            'consents_rgpd' => 'boolean',
        ];
    }

    public function submission(): MorphOne
    {
        return $this->morphOne(FormSubmission::class, 'formable');
    }
}
