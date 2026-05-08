<?php

namespace Database\Factories;

use App\Models\PartenaireForm;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PartenaireForm>
 */
class PartenaireFormFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'organisation_name' => fake()->company(),
            'legal_status' => fake()->randomElement(['association', 'entreprise', 'fondation']),
            'address' => fake()->streetAddress(),
            'phone' => fake()->optional()->phoneNumber(),
            'email' => fake()->safeEmail(),
            'contact_name' => fake()->name(),
            'partnership_moral' => fake()->boolean(),
            'partnership_moral_details' => fake()->optional()->sentence(),
            'partnership_technical' => fake()->boolean(),
            'partnership_technical_details' => fake()->optional()->sentence(),
            'partnership_financial' => fake()->boolean(),
            'objectives' => fake()->paragraph(),
            'comment_libre' => fake()->optional()->paragraph(),
            'commitment_projects' => fake()->boolean(),
            'commitment_communication' => fake()->boolean(),
            'commitment_expertise' => fake()->boolean(),
            'consents_email' => fake()->boolean(),
            'consents_rgpd' => true,
            'don_amount_cents' => fake()->optional()->numberBetween(100, 5000),
        ];
    }
}
