<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\VisionPlan;
use App\Models\VisionPlanPermission;
use App\Models\Question;
use App\Models\QuestionPermission;
use Validator;

class VisionPlanController extends Controller
{
    public function getClientVisionPlans(Request $request){
        $plans = VisionPlanPermission::select('id','user_id','vision_plan_id','status')->with('VisionPlan')->where('user_id',1)->get();
        return $this->sendResponse($plans, 'vision plan List');
        
    }
    public function updateVisionPlanPermission(Request $request){
        
        $validator = Validator::make($request->all(),[ 
            'userId' => 'required',
            'visionPlanId' => 'required',
            'status' => 'required'
        ]);   

        if($validator->fails()) {          
        
           return response()->json(['error'=>$validator->errors()], 401);                        
        } 
        $user_id = $request->userId;
        $vision_plan_id = $request->visionPlanId;
        $status = $request->status;
        
        
        $permission = VisionPlanPermission::select('id','user_id','vision_plan_id','status')->updateOrCreate(
            ['user_id' => $user_id, 'vision_plan_id' => $vision_plan_id],
            ['status' => $status]
        );
        if($permission){
            return $this->sendResponse($permission, 'successfully update user permission');
        }
        return $this->sendError('Something went wrong!');
    }

    public function getClientPlanQuestions(Request $request){

        $questions = QuestionPermission::select('id','user_id','question_id','optional','status')->with(['Question' => function ($query) {
            $query->select('id', 'title','vision_plan_id');
        }])->where('user_id',1)->get();
        return $this->sendResponse($questions, 'Questions List');
        
    }

    public function updatePlanQuestionPermission(Request $request){

        $validator = Validator::make($request->all(),[ 
            'user_id' => 'required',
            'vision_plan_id' => 'required',
            'question_id' => 'required',
            'optional' => 'required',
            'status' => 'required'
        ]);   

        if($validator->fails()) {          
        
           return response()->json(['error'=>$validator->errors()], 401);                        
        } 
        $user_id = $request->user_id;
        $vision_plan_id = $request->vision_plan_id;
        $question_id = $request->question_id;
        $optional = $request->optional;
        $status = $request->status;
        $question_id_arr = explode(",", $question_id);
        $optional_ar = explode(",", $optional);
        $status_ar = explode(",", $status);
        $i = 0;
        foreach($question_id_arr as $question_id){

            $questions = QuestionPermission::select('id','user_id','vision_plan_id','question_id','optional','status',)->updateOrCreate(
                ['user_id' => $user_id, 'vision_plan_id' => $vision_plan_id,'question_id' => $question_id],
                ['status' => $status_ar[$i],'optional' => $optional_ar[$i]]
            );
            
            $permission[$i] = $questions;
            $i++;
        }
        
        return $this->sendResponse($permission, 'successfully update user permission');
        
    }
}
