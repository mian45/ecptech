<?php

namespace App\Providers;

use App\Providers\UserLenseMaterialPermission;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

use App\Models\LensMaterial;
use App\Models\UserLenseMaterialSetting;

class AddUserLenseMaterialPermission
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
     * @param  \App\Providers\UserLenseMaterialPermission  $event
     * @return void
     */
    public function handle(UserLenseMaterialPermission $event)
    {
        $user = $event->user;
        $lense_materials = LensMaterial::all();
        foreach($lense_materials as $lm){
            $setting = UserLenseMaterialSetting::updateOrCreate(
                ['user_id' => $user->id, 'lens_material_id' => $lm->id],
                ['status' => 'active']
            );
            
        } 
    }
}
