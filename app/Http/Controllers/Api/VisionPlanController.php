<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\VisionPlan;
use App\Models\VisionPlanPermission;
use App\Models\Question;
use App\Models\QuestionPermission;
use DB;
use Validator;

class VisionPlanController extends Controller
{
    public function getClientVisionPlans(Request $request){

        $plans = VisionPlan::leftJoin('vision_plan_permissions as setting', function($join){
            $join->on('vision_plans.id', '=', 'setting.vision_plan_id')
            ->where('setting.user_id',  auth()->user()->id);            
        })->where('vision_plans.status',1)
        ->select('vision_plans.id','vision_plans.title',DB::raw('IFNULL(setting.status,0) as status'))
        ->get(); 
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
        
        if($user_id != auth()->user()->id){
            return $this->sendError('invalid user id!');
        }
        $permission = VisionPlanPermission::select('id','user_id','vision_plan_id','status')->updateOrCreate(
            ['user_id' => $user_id, 'vision_plan_id' => $vision_plan_id],
            ['status' => $status]
        );
        if($permission){
            return $this->sendResponse($permission, 'Successfully updated user permission');
        }
        return $this->sendError('Something went wrong!');
    }

    public function getClientPlanQuestions(Request $request){

        $validator = Validator::make($request->all(),[ 
            'visionPlanId' => 'required'
        ]);   

        if($validator->fails()) {          
        
           return response()->json(['error'=>$validator->errors()], 401);                        
        } 
       
      $vision_plan_id = $request->visionPlanId;
        $questions = Question::leftJoin('question_permissions as setting', function($join){
            $join->on('questions.id', '=', 'setting.question_id')
            ->where('setting.user_id',  auth()->user()->id);            
        })->where('questions.status',1)->where('questions.vision_plan_id',$vision_plan_id)
        ->select('questions.id','questions.vision_plan_id','questions.title',DB::raw('IFNULL(setting.status,0) as status'),DB::raw('IFNULL(setting.optional,0) as optional'))
        ->get(); 

        return $this->sendResponse($questions, 'Questions list get successfully');
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
        
        return $this->sendResponse($permission, 'Successfully updated user permission');
        
    }
}
