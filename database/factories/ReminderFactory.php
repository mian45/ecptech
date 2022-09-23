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
            'type' => "reminder",
            'invoice_type' => fake()->randomElement(['paid','unpaid']),
            'subject' => "pay invoice to confirm your order",
            'body' => "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without",
            'user_id' => User::all()->random()->id,
            'send_date' => 1,
            'send_time' => "9999-12-31 23:59:59",
            'time_zone' => "Washington, DC, USA (GMT-4)",
            'is_active' => true,
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ];
    }
}
