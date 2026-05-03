<?php

namespace Database\Factories;

use App\Models\PressArticle;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<PressArticle>
 */
class PressArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(4);

        return [
            'title' => $title,
            'slug' => Str::slug($title).'-'.fake()->unique()->numberBetween(100, 999),
            'excerpt' => fake()->paragraph(1),
            'content' => '<p>'.fake()->paragraph(3).'</p><p>'.fake()->paragraph(2).'</p>',
            'publication_date' => fake()->dateTimeBetween('-3 months', 'now'),
            'sort_order' => fake()->numberBetween(1, 50),
            'is_published' => true,
        ];
    }
}
