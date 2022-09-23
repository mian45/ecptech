<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
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
            'business_name' => fake()->name(),
            'theme_color' => fake()->randomElement(['red','blue']),
            'theme_mode' => fake()->randomElement(['dark','light']),
            'created_by' => User::all()->random()->id,
        ];
    }
}
