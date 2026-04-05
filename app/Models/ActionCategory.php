<?php

namespace App\Models;

use Database\Factories\ActionCategoryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ActionCategory extends Model
{
    /** @use HasFactory<ActionCategoryFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'sort_order',
    ];

    public function actions(): HasMany
    {
        return $this->hasMany(Action::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
