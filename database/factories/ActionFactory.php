<?php

namespace Database\Factories;

use App\Models\Action;
use App\Models\ActionCategory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Action>
 */
class ActionFactory extends Factory
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
            'action_category_id' => ActionCategory::factory(),
            'content' => '<p>'.fake()->paragraph(3).'</p><ul><li>'.fake()->sentence().'</li><li>'.fake()->sentence().'</li></ul>',
            'sort_order' => fake()->numberBetween(1, 40),
            'is_published' => true,
        ];
    }
}
