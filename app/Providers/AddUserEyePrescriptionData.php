<?php

namespace App\Providers;

use App\Providers\UserEyePrescriptionData;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Models\Prescription;
class AddUserEyePrescriptionData
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Providers\UserEyePrescriptionData  $event
     * @return void
     */
    public function handle(UserEyePrescriptionData $event)
    {

        
        $user = $event->user;
        
        $data = array(
            [
                "name" => "Trivex",
                "sphere_from" => "",
                "sphere_to" => "",
            ],
            [
                "name" => "Hi Index 1.67",
                "sphere_from" => "",
                "sphere_to" => "",
            ],
            [
                "name" => "Hi Index 1.70",
                "sphere_from" => "",
                "sphere_to" => "",
            ]
       
        );
        
        
            

        // 'name' => fake()->name(),
        // 'sphere_from' => fake()->randomDigit,            
        // 'sphere_to' => fake()->randomDigit,
        // 'cylinder_from' => fake()->randomDigit,
        // 'cylinder_to' => fake()->randomDigit,
        // 'user_id' => User::all()->random()->id,
        // 'created_at' => date("Y-m-d H:i:s"),
        // 'updated_at' => date("Y-m-d H:i:s"),
        // 'created_by' => User::all()->random()->id,
    }
}
