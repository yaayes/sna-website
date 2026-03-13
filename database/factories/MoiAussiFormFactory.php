<?php

namespace Database\Factories;

use App\Models\MoiAussiForm;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<MoiAussiForm>
 */
class MoiAussiFormFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'situation' => fake()->randomElement(['oui', 'en_cours', 'resolu']),
            'testimony' => fake()->paragraph(),
            'consequences' => fake()->randomElements(['isolement', 'stress', 'perte_emploi'], 2),
            'contacted_institution' => fake()->boolean(),
            'institution_name' => fake()->company(),
            'usage_anonymised' => fake()->boolean(),
            'usage_collective' => fake()->boolean(),
            'usage_legislation' => fake()->boolean(),
            'usage_confidential' => fake()->boolean(),
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'phone' => fake()->phoneNumber(),
        ];
    }
}
