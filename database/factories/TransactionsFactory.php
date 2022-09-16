<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Invoice;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transactions>
 */
class TransactionsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => User::all()->random()->id,
            'invoice_id' => Invoice::all()->random()->id,
            'product_id' => fake()->randomElement([1, 2, 3]), 
            'amount' => fake()->randomDigit,
            'status' => fake()->randomElement(['paid','unpaid']),           
            'customer_first_name' => 'John',
            'customer_last_name' => 'Doe',
            'customer_dob' => '9999-12-31',
            'customer_phone' => '123456789',
            'customer_email' => 'it@wadic.com',
            'customer_address' => 'Washington, DC, USA',            
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ];
    }
}
