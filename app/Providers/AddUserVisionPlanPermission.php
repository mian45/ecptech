<?php

namespace App\Providers;

use App\Providers\UserVisionPlanPermissionPermission;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

use App\Models\VisionPlan;
use App\Models\VisionPlanPermission;
use App\Models\Question;
use App\Models\QuestionPermission;



class AddUserVisionPlanPermission
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
     * @param  \App\Providers\UserVisionPlanPermissionPermission  $event
     * @return void
     */
    public function handle(UserVisionPlanPermissionPermission $event)
    {
        $user = $event->user;
        $vision_plans = VisionPlan::all();
        
        foreach($vision_plans as $vsp){
            $setting_plans = VisionPlanPermission::updateOrCreate(
                ['user_id' => $user->id, 'vision_plan_id' => $vsp->id],
                ['status' => 1]
            );

            $questions = Question::where('vision_plan_id',$vsp->id)->get();
            foreach($questions as $q){
                $setting_questions = QuestionPermission::updateOrCreate(
                    ['user_id' => $user->id, 'vision_plan_id' => $vsp->id, 'question_id' => $q->id],
                    ['status' => 1, 'optional' => 1]
                );
            }
            
        } 
    }
}
