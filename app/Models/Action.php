<?php

namespace App\Models;

use Database\Factories\ActionFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Action extends Model
{
    /** @use HasFactory<ActionFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'action_category_id',
        'content',
        'sort_order',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
        ];
    }

    public function scopePublished(Builder $query): void
    {
        $query->where('is_published', true);
    }

    public function moiAussiForms(): HasMany
    {
        return $this->hasMany(MoiAussiForm::class);
    }

    public function actionCategory(): BelongsTo
    {
        return $this->belongsTo(ActionCategory::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
