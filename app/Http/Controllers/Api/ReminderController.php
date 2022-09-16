<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reminder;
use Illuminate\Http\Request;
use Validator;


class ReminderController extends Controller
{
    public function getReminders(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'userId' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
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
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $reminder = new Reminder;
        $reminder->user_id = $request->userId;
        $reminder->type = $request->type;
        $reminder->invoice_type = $request->invoiceType;
        $reminder->subject = $request->subject;
        $reminder->body = $request->body;
        $reminder->send_date = $request->sendDate;
        $reminder->send_time = $request->sendTime;
        $reminder->time_zone = $request->TimeZone;
        $reminder->is_active = 1;

        $reminder->save();
        $success['id'] = $reminder->id;
        return $this->sendResponse($success, 'Reminder add successfully');

    }

    public function editReminder(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'type' => 'required',
            'invoiceType' => 'required',
            'subject' => 'required',
            'body' => 'required',
            'sendDate' => 'required',
            'sendTime' => 'required',
            'TimeZone' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $reminder =  Reminder::find($request->id);
        if($reminder){

            $reminder->type = $request->type;
            $reminder->invoice_type = $request->invoiceType;
            $reminder->subject = $request->subject;
            $reminder->body = $request->body;
            $reminder->send_date = $request->sendDate;
            $reminder->send_time = $request->sendTime;
            $reminder->time_zone = $request->TimeZone;
            $reminder->is_active = true;

            $reminder->save();
            $success['id'] = $reminder->id;
            return $this->sendResponse($success, 'Reminder edit successfully');
        }

        return $this->sendError('Remainder not found');
    }

    public function activeInactiveReminder(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'isActive' => 'required',

        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $reminder =  Reminder::find($request->id);
        if($reminder){
            $reminder->is_active = $request->isActive;
            $reminder->save();
            $success['id'] = $reminder->id;
            $success['is_active'] = $reminder->is_active;
            return $this->sendResponse($success, 'Reminder update successfully');
        }

        return $this->sendError('Remainder not found');
    }

    public function deleteReminder(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => 'required',

        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $reminder =  Reminder::find($request->id);
        if($reminder){
            $reminder->delete();
            $success['id'] = $reminder->id;

            return $this->sendResponse($success, 'Reminder delete successfully');
        }

        return $this->sendError('Remainder not found');
    }
}
