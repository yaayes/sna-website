<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PartenaireFormAttachment extends Model
{
    protected $fillable = [
        'partenaire_form_id',
        'file_path',
        'original_name',
    ];

    public function partenaireForm()
    {
        return $this->belongsTo(PartenaireForm::class);
    }
}
