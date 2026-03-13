<?php

namespace App\Concerns;

use Illuminate\Support\Str;

trait HasRef
{
    protected static function bootHasRef(): void
    {
        static::creating(function ($model): void {
            if (empty($model->ref)) {
                $model->ref = static::generateUniqueRef();
            }
        });
    }

    protected static function generateUniqueRef(): string
    {
        do {
            $ref = strtoupper(Str::random(8));
        } while (static::where('ref', $ref)->exists());

        return $ref;
    }
}
