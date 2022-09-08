<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Role;
use App\Models\UserRole;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Validation\Rule;
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

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();

            $success['id'] =  $user->id;
            $success['name'] =  $user->name;
            $success['email'] =  $user->email;
            $role['id'] = $user->role_id;
            $role['name'] =  $user->role->name;
            $success['role'] =  $role;

            if($user->role->name == 'client'){

                $staff = $user->staff;
                if($staff){
                    $staffData['id'] = $staff->id;
                    $staffData['name'] = $staff->name;
                    $staffData['email'] = $staff->email;
                    $staffData['password'] = $staff->password;
                    $success['staffAuth'] = $staffData;
                }else{
                    $success['staffAuth'] = [];
                }

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

    public function updateStaffLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
            'id' => 'required'

        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $email = $request->email;
        $password = $request->password;
        $id = $request->id;

        $emailExist = User::where([
            ['email', '=' ,$email],
            ['id', '!=' ,$id]
        ])->first();
        if ($emailExist) {
            return $this->sendError('The email address is already associated with another user.');
        }


        $user = User::find($id);
        if($user){

            $user->email = $email;
            $user->password = bcrypt($password);
            $user->save();
            $success['id'] =  $user->id;
            $success['name'] =  $user->name;
            $success['email'] =  $user->email;
            $success['token'] =  $user->createToken('ECP')->accessToken;
            return $this->sendResponse($success, 'Staff login update successfully.');
        }

        return $this->sendError('Staff login user not found', []);

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
}
