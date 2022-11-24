<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reminder;
use App\Models\Timezone;

use Illuminate\Http\Request;
use Validator;
use Illuminate\Validation\ValidationException;

class ReminderController extends Controller
{
    public function getReminders(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'userId' => 'required',
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $reminders =  Reminder::where('user_id',$request->userId)->get();
        if($reminders){
            return $this->sendResponse($reminders, 'Reminders list get successfully');
        }

        return $this->sendResponse([], 'Remindera list not found');
    }
    public function addReminder(Request $request)
    {
        
    
        $validator = Validator::make($request->all(), [
            'userId' => 'required',
            'type' => 'required',
            'invoiceType' => 'required',
            'subject' => 'required',
            'body' => 'required',
        ]);


        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }


        $reminder = new Reminder;
        $reminder->user_id = $request->userId;
        $reminder->type = $request->type;
        $reminder->invoice_type = $request->invoiceType;
        $reminder->subject = $request->subject;
        $reminder->body = $request->body;
        $reminder->send_after_day = $request->afterSend;
        $reminder->after_send_type = $request->afterSendType;
        $reminder->send_time = $request->sendTime;
        $reminder->timezone_id = $request->timezoneId;
        $reminder->is_active = 1;

        $reminder->save();
        $success['id'] = $reminder->id;
        return $this->sendResponse($success, 'Reminder Added Successfully.');

    }

    public function editReminder(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'type' => 'required',
            'invoiceType' => 'required',
            'subject' => 'required',
            'body' => 'required',
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $reminder =  Reminder::find($request->id);
        if($reminder){

            $reminder->type = $request->type;
            $reminder->invoice_type = $request->invoiceType;
            $reminder->subject = $request->subject;
            $reminder->body = $request->body;
            $reminder->send_after_day = $request->afterSend;
            $reminder->after_send_type = $request->afterSendType;
            $reminder->send_time = $request->sendTime;
            $reminder->timezone_id = $request->timezoneId;
            $reminder->is_active = true;

            $reminder->save();
            $success['id'] = $reminder->id;
            return $this->sendResponse($success, 'Reminder Updated Successfully.');
        }

        return $this->sendError('Reminder not found');
    }

    public function activeInactiveReminder(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'isActive' => 'required',

        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $reminder =  Reminder::find($request->id);
        if($reminder){
            $reminder->is_active = $request->isActive;
            $reminder->save();
            $success['id'] = $reminder->id;
            $success['is_active'] = $reminder->is_active;
            return $this->sendResponse($success, 'Reminder Updated Successfully.');
        }

        return $this->sendError('Reminder not found');
    }

    public function deleteReminder(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => 'required',

        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $reminder =  Reminder::find($request->id);
        if($reminder){
            $reminder->delete();
            $success['id'] = $reminder->id;

            return $this->sendResponse($success, 'Reminder Deleted Successfully');
        }

        return $this->sendError('Reminder not found');
    }

    public function getTimeZone(){
       
    $timezone  = Timezone::select('id','name')->get();

    return $this->sendResponse($timezone, 'Time Zone Get Successfully.');
    }
}
