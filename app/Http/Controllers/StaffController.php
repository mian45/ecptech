<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Staff;
use Validator;
class StaffController extends Controller
{

    public function getStaff(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'userId' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
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
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $user_id = $request->userId;
        $name = $request->name;
        $staffExist = Staff::where([
            ['user_id', '=' ,$user_id],
            ['name', '=' ,$name]
        ])->first();

        if ($staffExist) {
            return $this->sendError('The staff name already exists.');
        }

        $staff = new Staff;
        $staff->user_id = $user_id;
        $staff->name = $name;
        $staff->save();

        $success['id'] =  $staff->id;
        $success['name'] =  $staff->name;
        return $this->sendResponse($success, 'Staff add successfully');

    }

    public function editStaff(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'id' => 'required',
            'userId' => 'required',
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $id = $request->id;
        $user_id = $request->userId;
        $name = $request->name;

        $staffExist = Staff::where([
            ['user_id', '=' ,$user_id],
            ['name', '=' ,$name],
            ['id', '!=' , $id]
        ])->first();

        if ($staffExist) {
            return $this->sendError('The staff name already exists.');
        }

        $staff = Staff::find($id);
        if($staff){
            $staff->name = $name;
            $staff->save();
            $success['id'] =  $staff->id;
            $success['name'] =  $staff->name;

            return $this->sendResponse($success, 'Staff update successfully.');
        }

        return $this->sendError('Staff not found');
    }
}
