<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\UserRole;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Validation\Rule;
class UserController extends Controller
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    { 
        $user_id = $request->user_id;
        $validator = Validator::make($request->all(),[ 
                'logo' => 'required|mimes:png,jpg,svg,doc,docx,pdf,txt,csv|dimensions:width=200,height=40',
        ]);   

        if($validator->fails()) {          
            
            return response()->json(['error'=>$validator->errors()], 401);                        
        }  

        $path = '';
        if ($file = $request->file('logo')) {
            $file_name = time().'.'.$file->extension();
            $path = $file->move(public_path('uploads'),$file_name);
            $name = $file->getClientOriginalName();                                        
        }

        $user = User::find($user_id);
        $user->logo = $file_name;
        $user->business_name = $request->business_name;
        $user->theme_color = $request->theme_color;
        $user->theme_mode = $request->theme_mode;
        $result = $user->save();
        if($result){
            return response()->json([                
                "success" => true,
                "message" => "Profile updated successfully.",
                "data" => [
                    'logo' => config('app.url').'uploads/'.$user->logo,
                    'business_name' => $user->business_name,
                    'theme_color' => $user->theme_color,
                    'theme_mode' => $user->theme_mode
                ]                
            ]);
        } else {
            return response()->json(['error'=> 'Something Went Wrong.'], 401);
        }
    }
}