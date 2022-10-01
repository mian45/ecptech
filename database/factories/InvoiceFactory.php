<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Staff;
use App\Models\Customer;
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
            'customer_id' => Customer::all()->random()->id,
            'user_id' => User::all()->random()->id,
            'staff_id' => Staff::all()->random()->id,
            'name' => fake()->name(),
            'amount' => fake()->randomDigit,
            'status' => fake()->randomElement(['paid','unpaid']),
            'payment_mode' => fake()->randomElement(['office','online']),
            'created_at' => fake()->randomElement([fake()->dateTimeBetween($startDate = '-1 years', $endDate = 'now',$timezone='UTC'),fake()->dateTimeBetween($startDate = 'now', $endDate = 'now',$timezone='UTC')]),
            'updated_at' => fake()->dateTimeBetween($startDate = '-1 years', $endDate = 'now',$timezone='UTC'),
            'created_by' => User::all()->random()->id
        ];
    }
}
