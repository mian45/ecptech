<?php

namespace App\Providers;

use App\Providers\UserAddonPermission;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;


use App\Models\AddOn;
use App\Models\AddonType;
use App\Models\UserAddOnSetting;
use App\Models\VisionPlan;

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
        $vision_plans = VisionPlan::all();
        foreach($vision_plans as $vision_plan){

            $addon_types = AddonType::where('vision_plan_id',$vision_plan->id)->get();
            foreach($addon_types as $addon_type){
                
                $addons = AddOn::where('addon_type_id',$addon_type->id)->get();
                foreach($addons as $addon){
                    if(
                        (
                            strpos(strtolower($addon_type->title), 'photochrom') !== false
                                                    
                        )
                        OR
                        (
                            strpos(strtolower($addon_type->title), 'reflective') !== false AND 
                            (
                                strpos(strtolower($addon->title), 'glacier') !== false 
                                OR strpos(strtolower($addon->title), 'sunshield') !== false
                            )                          
                        )
                        OR
                        (
                            strpos(strtolower($addon_type->title), 'sunglass') !== false                 
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
}
