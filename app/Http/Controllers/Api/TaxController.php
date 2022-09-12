<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tax;

use App\Models\State;
use Illuminate\Http\Request;

use Validator;

class TaxController extends Controller
{
    public function getTaxes(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'userId' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $tax =  Tax::select('id','user_id','name','value','state_id')->with('state')->where('user_id',$request->userId)->get();
        if($tax){
            return $this->sendResponse($tax, 'Tax list get successfully');
        }

        return $this->sendResponse([], 'Tax list not found');
    }

    public function addTax(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'userId' => 'required',
            'name' => 'required',
            'value' => 'required',
            'stateId' => 'required',

        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $tax = new Tax;
        $tax->user_id = $request->userId;
        $tax->name = $request->name;
        $tax->value = $request->value;
        $tax->state_id = $request->stateId;
        $tax->save();

        if($tax){
            $success['id'] = $tax->id;
            $success['user_id'] = $tax->user_id;
            $success['name'] = $tax->name;
            $success['value'] = $tax->value;
            return $this->sendResponse($success, 'Tax add successfully');
        }
        return $this->sendError('Something went wrong!');


    }

    public function editTax(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'name' => 'required',
            'value' => 'required',
            'stateId' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $tax =  Tax::find($request->id);
        if($tax){

            $tax->name = $request->name;
            $tax->value = $request->value;
            $tax->state_id = $request->stateId;
            $tax->save();
            $success['id'] = $tax->id;
            $success['user_id'] = $tax->user_id;
            $success['name'] = $tax->name;
            $success['value'] = $tax->value;


            $state['id'] =  $tax->state_id;
            if($tax->state->name){
                $state['name'] =  $tax->state->name;
            }else{
                $state['name'] = null;
            }

            $success['state'] = $state;
            return $this->sendResponse($success, 'Tax edit successfully');
        }

        return $this->sendError('Tax not found');
    }

    public function deleteTax(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => 'required',

        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $tax =  tax::find($request->id);
        if($tax){
            $tax->delete();
            $success['id'] = $tax->id;

            return $this->sendResponse($success, 'Tax delete successfully');
        }

        return $this->sendError('Tax not found');
    }


    public function getStates(Request $request)
    {


        $state =  State::select('id','name')->get();
        if($state){
            return $this->sendResponse($state, 'State list get successfully');
        }

        return $this->sendResponse([], 'State list not found');
    }


}
