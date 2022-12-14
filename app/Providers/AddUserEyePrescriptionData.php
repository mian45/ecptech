<?php

namespace App\Providers;

use App\Providers\UserEyePrescriptionData;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;
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
        DB::table('prescriptions')->insert(array(
            array(

                'name' => "Hi index 1.70",
                'sphere_from' => -5,
                'sphere_to' => -20,
                'user_id' => $user->id,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'name' => "Hi index 1.70",
                'sphere_from' => 5,
                'sphere_to' => 20,
                'user_id' => $user->id,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'name' => "Hi Index 1.67",
                'sphere_from' => -4.25,
                'sphere_to' => -4.75,
                'user_id' => $user->id,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'name' => "Hi Index 1.67",
                'sphere_from' => 4.25,
                'sphere_to' => 4.75,
                'user_id' => $user->id,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'name' => "Trivex",
                'sphere_from' => -4,
                'sphere_to' => 4,
                'user_id' => $user->id,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            )
            
        ));
      
    }
}
