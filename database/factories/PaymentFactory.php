<?php

namespace Database\Factories;

use App\Models\FormSubmission;
use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'form_submission_id' => FormSubmission::factory(),
            'merchant_reference' => strtoupper(fake()->unique()->lexify('PAY-????????')),
            'hosted_checkout_id' => fake()->uuid(),
            'amount_cents' => fake()->numberBetween(500, 10000),
            'currency' => 'EUR',
            'status' => 'pending',
            'cawl_payment_id' => null,
            'status_code' => null,
            'raw_response' => null,
        ];
    }

    public function captured(): static
    {
        return $this->state([
            'status' => 'captured',
            'cawl_payment_id' => fake()->numerify('##########_#'),
            'status_code' => 9,
        ]);
    }

    public function rejected(): static
    {
        return $this->state([
            'status' => 'rejected',
            'status_code' => 2,
        ]);
    }
}
