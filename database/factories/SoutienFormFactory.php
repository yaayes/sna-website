<?php

namespace Database\Factories;

use App\Models\SoutienForm;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SoutienForm>
 */
class SoutienFormFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'address' => fake()->streetAddress(),
            'email' => fake()->safeEmail(),
            'phone' => fake()->optional()->phoneNumber(),
            'wants_events' => fake()->boolean(),
            'wants_participation' => fake()->boolean(),
            'message' => fake()->optional()->paragraph(),
            'consents_email' => fake()->boolean(),
            'consents_rgpd' => true,
        ];
    }
}
