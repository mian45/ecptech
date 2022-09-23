<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Staff;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->name(),
            'customer_id' => 2,
            'user_id' => User::all()->random()->id,
            'staff_id' => Staff::all()->random()->id,
            'amount' => fake()->randomDigit,
            'status' => fake()->randomElement(['paid','unpaid']),
            'payment_mode' => fake()->randomElement(['office','online']),
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s"),
            'created_by' => User::all()->random()->id
        ];
    }
}
