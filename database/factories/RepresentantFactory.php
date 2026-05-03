<?php

namespace Database\Factories;

use App\Models\Representant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Representant>
 */
class RepresentantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'department_code' => fake()->numerify('##'),
            'department_name' => fake()->city(),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'role' => 'Représentant(e) départemental(e)',
            'short_bio' => fake()->paragraph(3),
            'photo_path' => null,
            'sort_order' => fake()->numberBetween(1, 100),
            'is_active' => true,
        ];
    }
}
