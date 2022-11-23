<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Discount;
use Validator;
use Illuminate\Validation\ValidationException;

class DiscountController extends Controller
{

    public function getDiscount(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'userId' => 'required',
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $user_id = $request->userId;
        $discount = Discount::select('id','user_id','name','value','status','type','created_at')->where('user_id',$user_id)->orderBy('created_at', 'desc')->get();

        if($discount){
            return $this->sendResponse($discount, 'Discount get successfully');
        }

        return $this->sendError('Discount not found');
    }
    public function addDiscount(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'userId' => 'required',
            'name' => 'required',
            'value' => 'required',
            'type' => "required|in:percentage,amount",
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $user_id = $request->userId;
        $name = $request->name;
        $value = $request->value;
        $type = $request->type;
        $discount = new Discount;
        $discount->user_id = $user_id;
        $discount->name = $name;
        $discount->value = $value;
        $discount->type = $type;
        $discount->status = 'active';
        $discount->save();

        if($discount){
            $success['id'] = $discount->id;
            $success['user_id'] = $discount->user_id;
            $success['name'] = $discount->name;
            $success['value'] = $discount->value;
            $success['status'] = $discount->status;
            $success['type'] = $discount->type;
            $success['created_at'] = $discount->created_at;
            return $this->sendResponse($success, 'Discount add successfully');
        }
        return $this->sendError('Something went wrong!');
    }
    public function EditDiscount(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'name' => 'required',
            'value' => 'required',
            'type' => "required|in:percentage,amount",
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $id = $request->id;
        $name = $request->name;
        $value = $request->value;
        $type = $request->type;
        $discount = Discount::where('id',$id)->first();
        if($discount){
        $discount->name = $name;
        $discount->value = $value;
        $discount->type = $type;
        $discount->save();
        $success['id'] = $discount->id;
        $success['user_id'] = $discount->user_id;
        $success['name'] = $discount->name;
        $success['value'] = $discount->value;
        $success['status'] = $discount->status;
        $success['type'] = $discount->type;
        $success['created_at'] = $discount->created_at;
        return $this->sendResponse($success, 'Discount Edit successfully');

        }
        return $this->sendError('Discount not found');
    }
    public function deleteDiscount(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => 'required',

        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $discount =  Discount::find($request->id);
        if($discount){
            $discount->delete();
            $success['id'] = $discount->id;
            return $this->sendResponse($success, 'Discount delete successfully');
        }

        return $this->sendError('Discount not found');
    }

    public function changeStatus(Request $request){

        $validator = Validator::make($request->all(), [
            'discount_id' => 'required',
            'status' => "required|in:active,inactive",

        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $discount =  Discount::where('id',$request->discount_id)->first();
       
        if($discount){
            $discount->status = $request->status;
            $discount->save();
            $success['id'] = $discount->id;
            $success['user_id'] = $discount->user_id;
            $success['name'] = $discount->name;
            $success['value'] = $discount->value;
            $success['status'] = $discount->status;
            $success['type'] = $discount->type;
            $success['created_at'] = $discount->created_at;
            return $this->sendResponse($success, 'Discount Status Changed Successfully');
        }
        return $this->sendError('Discount not found',[],402);
    }
}
