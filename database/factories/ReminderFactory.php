<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reminder>
 */
class ReminderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'type' => "test",
            'invoice_type' => fake()->randomElement(['paid','unpaid']),
            'subject' => "Hello",
            'body' => "testing",
            'user_id' => User::all()->random()->id,
            'send_date' => 1,
            'send_time' => "2022-09-12",
            'time_zone' => "GMT+5",
            'is_active' => true,
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ];
    }
}
