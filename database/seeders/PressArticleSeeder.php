<?php

namespace Database\Seeders;

use App\Models\PressArticle;
use Illuminate\Database\Seeder;

class PressArticleSeeder extends Seeder
{
    public function run(): void
    {
        PressArticle::factory()
            ->count(8)
            ->create();
    }
}
