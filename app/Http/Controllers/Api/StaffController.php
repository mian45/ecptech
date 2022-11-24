<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Staff;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Validation\ValidationException;


class StaffController extends Controller
{

    public function getStaff(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'userId' => 'required',
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }
      $staff = Staff::select('id','name')->where('user_id',$request->userId)->get();
        return $this->sendResponse($staff, 'Staff list get successfully');

    }


    public function addStaff(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'userId' => 'required',
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }
        $user_id = $request->userId;
        $name = $request->name;
        $staffExist = Staff::where([
            ['user_id', '=' ,$user_id],
            ['name', '=' ,$name]
        ])->exists();
        
        if ($staffExist) {
            return response()->json(['message'=>"Staff name already exists"], 422);
        }

        $staff = new Staff;
        $staff->user_id = $user_id;
        $staff->name = $name;
        $staff->save();

        $success['id'] =  $staff->id;
        $success['name'] =  $staff->name;
        return $this->sendResponse($success, 'Staff added successfully');

    }

    public function editStaff(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'id' => 'required',
            'userId' => 'required',
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }
        $id = $request->id;
        $user_id = $request->userId;
        $name = $request->name;

        $staffExist = Staff::where([
            ['user_id', '=' ,$user_id],
            ['name', '=' ,$name],
            ['id', '!=' , $id]
        ])->exists();

        if ($staffExist) {
            return response()->json(['message'=>"Staff name already exists"], 422);
        }

        $staff = Staff::find($id);
        if($staff){
            $staff->name = $name;
            $staff->save();
            $success['id'] =  $staff->id;
            $success['name'] =  $staff->name;

            return $this->sendResponse($success, 'Staff updated successfully');
        }

        return $this->sendError('Staff not found');
    }

     public function deleteStaff(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => 'required',

        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $staff =  Staff::find($request->id);
        if($staff){
            $staff->delete();
            $success['id'] = $staff->id;

            return $this->sendResponse($success, 'Staff deleted successfully');
        }

        return $this->sendError('Staff not found');
    }
}
