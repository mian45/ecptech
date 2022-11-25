<?php

namespace App\Providers;

use App\Providers\UserAddonPermission;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;


use App\Models\AddOn;
use App\Models\AddonType;
use App\Models\UserAddOnSetting;

class AddUserAddonPermission
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
     * @param  \App\Providers\UserAddonPermission  $event
     * @return void
     */
    public function handle(UserAddonPermission $event)
    {
        $user = $event->user;
            $addon_types = AddonType::all();
            foreach($addon_types as $addon_type){
                
                $addons = AddOn::where('addon_type_id',$addon_type->id)->get();
                foreach($addons as $addon){
                    if(
                        (
                            strpos($addon_type->title, 'Photochrom') !== false
                                                    
                        )
                        OR
                        (
                            strpos($addon_type->title, 'Anti Reflective') !== false AND 
                            (
                                strpos($addon->title, 'Glacier') !== false 
                                OR strpos($addon->title, 'Sunshield') !== false
                            )                          
                        )
                        OR
                        (
                            strpos($addon_type->title, 'SunGlasses') !== false                 
                        )

                    ){
    
                        $setting = UserAddOnSetting::updateOrCreate(
                            ['user_id' => $user->id, 'addon_id' => $addon->id],
                            ['status' => 'active']
                        );
                    }
                }

            }
    }
}
