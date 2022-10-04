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
        $plans = VisionPlanPermission::select('id','vision_plan_id','status')->with('VisionPlan')->where('user_id',1)->get();
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

      $vision_plan_id = $request->visionPlanId;
        $questions = QuestionPermission::select('id','question_id','optional','status')->with(['Question' => function ($query) {
            $query->select('id', 'title','vision_plan_id'); 
        }])->where('user_id',1)->where('vision_plan_id',$vision_plan_id)->get();
        return $this->sendResponse($questions, 'Questions List');
        
    }

    public function updatePlanQuestionPermission(Request $request){

        $validator = Validator::make($request->all(),[ 
            'user_id' => 'required',
            'vision_plan_id' => 'required',
            'data' => 'required',
        ]);   

        if($validator->fails()) {          
        
           return response()->json(['error'=>$validator->errors()], 401);                        
        } 
        $user_id = $request->user_id;
        $vision_plan_id = $request->vision_plan_id;
        $data = $request->data;
        $i = 0;
        foreach($data as $row){
            
            $questions = QuestionPermission::select('id','user_id','vision_plan_id','question_id','optional','status',)->updateOrCreate(
                ['user_id' => $user_id, 'vision_plan_id' => $vision_plan_id,'question_id' => $row['question_id']],
                ['status' => $row['status'],'optional' => $row['optional']]
            );
            $permission[$i] = $questions;
            $i++;
        }
        
        return $this->sendResponse($permission, 'successfully update user permission');
        
    }
}
