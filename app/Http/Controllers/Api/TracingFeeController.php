<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TracingFee;
use Validator;
use Illuminate\Validation\ValidationException;
class TracingFeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
       
        $validator = Validator::make($request->all(), [
            'userId' => 'required',
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $user_id = $request->userId;
        $fee = TracingFee::select('id','user_id','name','value','status','created_at')->where('user_id',$user_id)->first();
        return $this->sendResponse($fee, 'TracingFee get successfully');
        
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'userId' => 'required',
            'name' => 'required',
            'value' => 'required|regex:/^(([0-9]*)(\.([0-9]+))?)$/'
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $user_id = $request->userId;
        $name = $request->name;
        $value = $request->value;

        $fee = TracingFee::updateOrCreate(
            ['user_id' => $user_id],
            ['name' => $name,'value' => $value,'status' => 'active'] 
        );

        if($fee){
            $success['id'] = $fee->id;
            $success['user_id'] = $fee->user_id;
            $success['name'] = $fee->name;
            $success['value'] = $fee->value;
            $success['status'] = $fee->status;
            return $this->sendResponse($success, 'Tracing Fee added successfully');
        }
        return $this->sendError('Something went wrong!');
    }

    public function update(Request $request,$id)
    {

        $validator = Validator::make($request->all(), [
            'userId' => "required",
            'status' => "required|in:active,inactive",

        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $fee =  TracingFee::where('id',$id)->first();
       
        if($fee){
            $fee->status = $request->status;
            $fee->save();
            $success['id'] = $fee->id;
            $success['user_id'] = $fee->user_id;
            $success['name'] = $fee->name;
            $success['value'] = $fee->value;
            $success['status'] = $fee->status;
            $success['created_at'] = $fee->created_at;
            return $this->sendResponse($success, 'Tracing Fee status changed successfully');
        }

        return $this->sendError('Tracing Fee not found');
    }

    public function destroy(Request $request,$id)
    {
        $fee =  TracingFee::find($id);
        if($fee){
            $fee->delete();
            $success['id'] = $fee->id;

            return $this->sendResponse($success, 'Tracing Fee deleted successfully');
        }

        return $this->sendError('Tracing Fee not found');

    }
}
