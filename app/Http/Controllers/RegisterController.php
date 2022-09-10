<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\UserRole;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
class RegisterController extends Controller
{

    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'roleId' => 'required'

        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $name = $request->name;
        $email = $request->email;
        $password = $request->password;
        $roleId = $request->roleId;        

        $roleData = Role::find($roleId);
        if (empty($roleData)) {
            return $this->sendError('Givin role cannot exists');
        }
        $role = $roleData->name;
        if ($role == 'staff' && $request->clientId == '') {
            return $this->sendError('clientId required.');
        }

        $emailExist = User::where('email', $email)->first();
        if ($emailExist) {
            return $this->sendError('The email address is already associated with another user.');
        }
        $userData['name'] = $name;
        $userData['email'] = $email;
        $userData['password'] = bcrypt($password);
        $userData['role_id'] = $roleId;        
      

        if ($role == 'staff') {
            $userData['client_id'] = $request->clientId;
        }
        //return $this->sendResponse($userData, 'User register successfully.');
        $user = User::create($userData);

        $success['id'] =  $user->id;
        $success['name'] =  $user->name;
        $success['email'] =  $user->email;
        $success['token'] =  $user->createToken('ECP')->accessToken;
        return $this->sendResponse($success, 'User register successfully.');
    }

    public function login(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();

            $success['id'] =  $user->id;
            $success['name'] =  $user->name;
            $success['email'] =  $user->email;
            $success['business_name'] =  $user->business_name;
            $success['theme_color'] =  $user->theme_color;
            $success['theme_mode'] =  $user->theme_mode;
            $role['id'] = $user->role_id;
            $role['name'] =  $user->role->name;
            $success['role'] =  $role;

            if($user->role->name == 'client'){

                $staff = $user->staff;
                $staffData['id'] = $staff->id;
                $staffData['name'] = $staff->name;
                $staffData['email'] = $staff->email;
                $staffData['password'] = $staff->password;
                $success['staffAuth'] = $staffData;
            }
            if ($user->role->name == 'staff') {

                $client = $user->client;
                $clientData['id'] = $client->id;
                $clientData['name'] = $client->name;
                $success['client'] =  $clientData;
            }



            $success['token'] =  $user->createToken('ECP')->accessToken;
            return $this->sendResponse($success, 'User login successfully.');
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
      $user = User::where('email',$request->email)->first();
        if ($user) {
            $verification_code = '123456';
            $user->verification_code = $verification_code;
            $user->save();
            $success['email'] = $user->email;
            return $this->sendResponse($success, 'six digit code sent to givin email');
        } else {
            return $this->sendError('givin email cannot found in system.', ['error' => 'givin email cannot found in system']);
        }
    }

    public function verifyCode(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required',
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $user = User::where(['email' => $request->email, 'verification_code' => $request->code])->first();
        if ($user) {

            $password = '123456';
            $user->password =  bcrypt($password);
            $user->save();
            $success['email'] = $user->email;
            return $this->sendResponse($success, 'new password sent to email');
        } else {
            return $this->sendError('verification code cannot match.', ['error' => 'verification code cannot cannot match']);
        }
    }
    public function addRole(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',

        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $roleData['name'] = $request->name;
        $userRole = Role::create($roleData);

        return $this->sendResponse($userRole, 'Role Added Successfully.');
    }

    public function change_password(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'old_password' => 'required',
            'password' => 'required',
            'password_confirmation' => 'required|required_with:password|same:password'

        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401); 
        }
        $user_id = $request->user_id;
        $old_password = $request->old_password;
        $password = bcrypt($old_password);
        $passExist = User::where('id', $user_id)->first();        
        if (Hash::check($old_password, $passExist->password)) {
            $newpassword = bcrypt($request->password);
            $user = User::find($user_id);
            $user->password = $newpassword;
            $result = $user->save();
            if($result){
                return response()->json([                
                    "success" => true,
                    "message" => "password save successfully.",                                  
                ]);   
            } else {
                return response()->json(['error'=> 'Something Went Wrong.'], 401);
            }
        } else {
            return response()->json(['error'=>'Invalid old password Please enter a valid password'], 401); 
        }
    }
}
