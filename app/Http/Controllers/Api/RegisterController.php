<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use App\Models\Client;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Rules\IsValidPassword;
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
       
        $validator =  Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'roleId' => 'required',
            'password' => [
                'required',
                'string',
                'confirmed',
                'min:8',             
                'regex:/[a-z]/',      
                'regex:/[A-Z]/',     
                'regex:/[0-9]/',     
                'regex:/[@$!%*#?&]/', 
                new isValidPassword(),
            ],
            
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(),422);
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
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password], $request->remember_me)) {
            $user = Auth::user();

            $success['id'] =  $user->id;
            $success['name'] =  $user->name;
            $success['email'] =  $user->email;


            $user_id = auth()->user()->id;
        
            
                if($user->role->name == 'staff'){
                    $client =  User::find($user->client_id);
                }else{
                    $client = $user;
                }

                $profile = Client::where('user_id',$client->id)->first();
                
                if ($profile) {
                    $success['business_name'] = $profile->business_name;
                    $success['theme_color'] = $profile->theme_color;
                    $success['theme_mode'] = $profile->theme_mode;
                    $success['logo'] = url('uploads/'.$user_id.'/'.$profile->logo);
                }else{
                    $success['business_name'] = null;
                    $success['theme_color'] = null;
                    $success['theme_mode'] = null;
                    $success['logo'] = null;
                }


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
    
    public function logout(Request $request){
        $validator = Validator::make($request->all(), [
            'userId' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        if(auth()->user()->id != $request->userId){
            return $this->sendError('invalid User id',[],403);
        }
        $user = Auth::user()->token();
        $user->revoke();
        $success['user_id'] = $user->user_id;
        return $this->sendResponse($success, 'logout successfully.');
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
       
        $validator =  Validator::make($request->all(), [
            'email' => 'required|email',
            'id' => 'required',
            'password' => [
                'required',
                'string',
                'confirmed',
                'min:8',             
                'regex:/[a-z]/',      
                'regex:/[A-Z]/',     
                'regex:/[0-9]/',     
                'regex:/[@$!%*#?&]/', 
                new isValidPassword(),
            ],
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(),422);
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

    public function getRoles(Request $request)
    {

        $roles = Role::get();
        
        if($roles){
            return $this->sendResponse($roles, 'Role get successfully.');
        }
        return $this->sendError('Roles not found.');
    }

    public function changePassword(Request $request)
    {
        $validator =  Validator::make($request->all(), [
            'old_password' => 'required',
            'password' => [
                'required',
                'string',
                'confirmed',
                'min:8',             
                'regex:/[a-z]/',      
                'regex:/[A-Z]/',     
                'regex:/[0-9]/',     
                'regex:/[@$!%*#?&]/', 
                new isValidPassword(),
            ],
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(),422);
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
                return $this->sendError('Something Went Wrong.');
            }
        } else {
            return $this->sendError('Invalid old password Please enter a valid password');
        }
    }

    public function getUser(Request $request){
    
                $user_id = auth()->user()->id;
        
                 $user = Auth::user();

                 
                 
        
                    $success['id'] =  $user->id;
                    $success['name'] =  $user->name;
                    $success['email'] =  $user->email;
                    if($user->role->name == 'staff'){
                        $client =  User::find($user->client_id);
                    }else{
                        $client = $user;
                    }

                    $profile = Client::where('user_id',$client->id)->first();
                    if ($profile) {
                        $success['business_name'] = $profile->business_name;
                        $success['theme_color'] = $profile->theme_color;
                        $success['theme_mode'] = $profile->theme_mode;
                        $success['logo'] = url('uploads/'.$user_id.'/'.$profile->logo);
                    }else{
                        $success['business_name'] = null;
                        $success['theme_color'] = null;
                        $success['theme_mode'] = null;
                        $success['logo'] = null;
                    }
                    
                    

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
        
        
        
                return $this->sendResponse($success, 'User Details');
            }
}
