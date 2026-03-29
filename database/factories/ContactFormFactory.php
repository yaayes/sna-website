<?php

namespace Database\Factories;

use App\Models\ContactForm;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ContactForm>
 */
class ContactFormFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $profiles = ['aidant', 'professionnel', 'institution', 'etudiant', 'journaliste', 'autre'];
        $contactPreferences = ['email', 'phone', 'none'];
        return [
            'name' => $this->faker->name(),
            'city' => $this->faker->city(),
            'email' => $this->faker->safeEmail(),
            'phone' => $this->faker->optional()->phoneNumber(),
            'subject' => $this->faker->sentence(4),
            'message' => $this->faker->paragraph(),
            'profile' => $this->faker->randomElement($profiles),
            'contact_preference' => $this->faker->randomElement($contactPreferences),
        ];
    }
}
