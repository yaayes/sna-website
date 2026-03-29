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
        'aidants',
        'aides',
        'aidant_type',
        'aidant_type_autre_precisions',
        'situation_familiale',
        'situation_familiale_autre_precisions',
        'aide_tranche_age',
        'aide_age',
        'type_situation',
        'type_situation_autre_precisions',
        'reconnaissance_administrative',
        'aide_genre',
        'scolarisation',
        'scolarisation_autre_precisions',
        'situation_adulte',
        'situation_adulte_autre_precisions',
        'lieu_habitation',
        'lieu_habitation_autre_precisions',
        'impacts',
        'impacts_autre_precisions',
        'situation_professionnelle',
        'expression_libre',
        'soutient_sna',
        'wants_info',
        'consents_rgpd',
        'declaration_honneur',
        'don_amount_cents',
    ];

    protected function casts(): array
    {
        return [
            'aidants' => 'array',
            'aides' => 'array',
            'type_situation' => 'array',
            'impacts' => 'array',
            'soutient_sna' => 'boolean',
            'wants_info' => 'boolean',
            'consents_rgpd' => 'boolean',
            'declaration_honneur' => 'boolean',
        ];
    }

    public function submission(): MorphOne
    {
        return $this->morphOne(FormSubmission::class, 'formable');
    }
}
