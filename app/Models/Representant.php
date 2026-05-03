<?php

namespace App\Models;

use Database\Factories\RepresentantFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Representant extends Model
{
    /** @use HasFactory<RepresentantFactory> */
    use HasFactory;

    protected $fillable = [
        'department_code',
        'department_name',
        'first_name',
        'last_name',
        'role',
        'short_bio',
        'photo_path',
        'sort_order',
        'is_active',
    ];

    public function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function getFullNameAttribute(): string
    {
        return $this->first_name.' '.$this->last_name;
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
