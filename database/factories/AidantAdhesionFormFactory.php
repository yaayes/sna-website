<?php

namespace Database\Factories;

use App\Models\AidantAdhesionForm;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AidantAdhesionForm>
 */
class AidantAdhesionFormFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom' => $this->faker->lastName(),
            'prenom' => $this->faker->firstName(),
            'email' => $this->faker->safeEmail(),
            'aidant_type' => 'parent',
            'soutient_sna' => false,
            'wants_info' => false,
            'consents_rgpd' => true,
            'declaration_honneur' => true,
            'status' => AidantAdhesionForm::STATUS_COMPLETED,
        ];
    }

    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => AidantAdhesionForm::STATUS_DRAFT,
        ]);
    }

    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => AidantAdhesionForm::STATUS_COMPLETED,
        ]);
    }
}
