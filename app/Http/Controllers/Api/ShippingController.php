<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shipping;
use Validator;
class ShippingController extends Controller
{
    public function getShipping(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'userId' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user_id = $request->userId;
        $shipping = Shipping::select('id','user_id','name','value')->where('user_id',$user_id)->orderBy('created_at', 'desc')->first();

        if($shipping){
            $success['id'] = $shipping->id;
            $success['user_id'] = $shipping->user_id;
            $success['name'] = $shipping->name;
            $success['value'] = $shipping->value;

            return $this->sendResponse($success, 'Shipping get successfully');
        }

        return $this->sendError('Shipping not found');
    }
    public function addShipping(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'userId' => 'required',
            'name' => 'required',
            'value' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user_id = $request->userId;
        $name = $request->name;
        $value = $request->value;
        $shipping = Shipping::updateOrCreate(
            ['user_id' => $user_id, 'name' => $name],
            ['value' => $value]
        );

        if($shipping){
            $success['id'] = $shipping->id;

            $success['user_id'] = $shipping->user_id;
            $success['name'] = $shipping->name;
            $success['value'] = $shipping->value;


            return $this->sendResponse($success, 'Shipping add successfully');
        }


        return $this->sendError('Something went wrong!');
    }

    public function deleteShipping(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => 'required',

        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $shipping =  Shipping::find($request->id);
        if($shipping){
            $shipping->delete();
            $success['id'] = $shipping->id;

            return $this->sendResponse($success, 'Shipping delete successfully');
        }

        return $this->sendError('Shipping not found');
    }
}
