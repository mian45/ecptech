<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PrescriptionFactory extends Factory
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
            'sphere_from' => fake()->randomDigit,            
            'sphere_to' => fake()->randomDigit,
            'cylinder_from' => fake()->randomDigit,
            'cylinder_to' => fake()->randomDigit,
            'user_id' => User::all()->random()->id,
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s"),
            'created_by' => User::all()->random()->id,
        ];
    }
}
