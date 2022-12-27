<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DrillMount;
use Validator;
use Illuminate\Validation\ValidationException;
class DrillMountController extends Controller
{

    public function index()
    {
        $user = auth()->user();
        $user_id=$user->id;
        if($user->role_id===3){
          $user_id =  $user->client_id;
        } 
        $drillMount = DrillMount::select('id','value','status','user_id','created_at','updated_at')->where('user_id',$user_id)->first();
        return $this->sendResponse($drillMount, 'Drill mount get successfully');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'value' => 'required|regex:/^(([0-9]*)(\.([0-9]+))?)$/'
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }
        $user = auth()->user();
        $user_id=$user->id;
        if($user->role_id===3){
          $user_id=  $user->client_id;
        } 
        $value = $request->value;
        $drillMount = DrillMount::updateOrCreate(
            ['user_id' => $user_id],
            ['value' => $value]
        );

        return $this->sendResponse($drillMount, 'Drill mount added successfully');

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => "required|in:active,inactive",

        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $drillMount =  DrillMount::where('id',$id)->first();       
        if(isset($drillMount)){
            $drillMount->status = $request->status;
            $drillMount->save();
            return $this->sendResponse($drillMount, 'Drill mount status changed successfully');
        }

        return $this->sendError('Drill mount not found');
    }

    public function destroy($id)
    {
        $drillMount =  DrillMount::find($id);
        if(isset($drillMount)){
            $drillMount->delete();
            return $this->sendResponse($drillMount, 'Drill mount deleted successfully');
        }

        return $this->sendError('Drill mount not found');
    }
}
