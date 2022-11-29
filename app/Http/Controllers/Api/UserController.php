<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\UserRole;
use App\Models\Client;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;


class UserController extends Controller
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    { 

        $validator = Validator::make($request->all(),[ 
         'userId' => 'required',
         'logo' => 'sometimes|mimes:jpeg,jpg,png,gif|max:'.config('app.logo_size')
        ]);   

        if($validator->fails()) {          
            
            return response()->json(['error'=>$validator->errors()], 401);                        
        }  

         $user_id = $request->userId;
         if($user_id != auth()->user()->id){
            return $this->sendError('invalid user id!');
        }
        $path = '';
       
        if ($file = $request->file('logo')) {
            
            $file_name = time().'.'.$file->extension();
            $path = $file->move(public_path('uploads/'.$user_id), $file_name);
            $name = $file->getClientOriginalName();                                        
        }

        $client = Client::firstOrNew(['user_id' =>  $user_id]);
       
        if($request->file('logo')){
            $client->logo = $file_name;
        }
        if($request->business_name){
            $client->business_name = $request->business_name;
        }
        if($request->theme_color){
            $client->theme_color = $request->theme_color;
        }
        if($request->theme_mode){
            $client->theme_mode = $request->theme_mode;
        }
        
        $result = $client->save();
        if($result){
            return response()->json([                
                "success" => true,
                "message" => "Profile updated successfully",
                "data" => [
                    'logo' => config('app.url').'/'.'uploads/'.$user_id.'/'.$client->logo,
                    'business_name' => $client->business_name,
                    'theme_color' => $client->theme_color,
                    'theme_mode' => $client->theme_mode
                ]                
            ]);
        } else {
            return response()->json(['error'=> 'Something went wrong!'], 401);
        }
    }

    public function addCard(Request $request){

        $validator = Validator::make($request->all(), [
            'card_no' => 'required|integer',
            'card_name' => 'required',
            'card_expiry' => 'required|date_format:m/y'
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $client_card = Client::where('user_id',auth()->user()->id)->first();
        if(!$client_card){
            $client_card = new Client();
            $client_card->user_id = auth()->user()->id;
        }
        $client_card->card_no = $request->card_no;
        $client_card->card_name = $request->card_name;
        $client_card->card_expiry = $request->card_expiry;

        $client_card->save();

        if($client_card){
            return $this->sendResponse([], 'Card added successfully');
        }

        return $this->sendError('Something went wrong!');

    }

    public function getCard(Request $request){

        $client_card = Client::select('id','card_name','card_no','card_expiry')->where('user_id',auth()->user()->id)->first();
        
        if($client_card){
            return $this->sendResponse($client_card, 'Card get successfully');
        }

        return $this->sendError('Card not found');
    }
}
