<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Prescription;
use App\Models\Invoices;
use App\Models\Customer;
use Illuminate\Http\Transactions;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Validator;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;

class InvoicesController extends Controller
{
    public function index(Request $request){
        $validator = Validator::make($request->all(), [
            'userId' => 'required'
        ]);
        
        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }
        $user_id = $request->userId;
        $invoices = Invoices::with('customer')->where('user_id',$user_id)->whereNot('status', 'discard')->latest()->take(10)->get();
        return $this->sendResponse($invoices, 'Invoices list get successfully');
    }
    
    public function saveInvoice(Request $request){
        
        $validator = Validator::make($request->all(), [
            'userId' => 'required',
            'staffId' => 'required',
            'fname' => 'required',
            'lname' => 'required',
            'dob' => 'required',
            'email' => 'required',
            'amount' => 'required',
            'invoiceName' => 'required',
            'vpState' => 'required',
            'userState' => 'required',
            'status' => 'required|in:paid,unpaid,draft'
        ]);
        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }
    
      $dob = Carbon::parse($request->dob)->format('Y-m-d');
  
      $customer = new Customer;
      $customer->user_id = $request->userId;
      $customer->fname = $request->fname;
      $customer->lname = $request->lname;
      $customer->dob = $dob;
      $customer->email = $request->email;
      $customer->phone = $request->phone;
      $customer->created_by = $request->userId;
      
      $customer->save();

      $invoice = new Invoices;
      $invoice->user_id = $request->userId;
      $invoice->staff_id = $request->staffId;
      $invoice->customer_id = $customer->id;
      $invoice->name = $request->invoiceName;
      $invoice->amount = $request->amount;
      $invoice->vp_state = json_encode($request->vpState);
      $invoice->user_state = json_encode($request->userState);
      $invoice->created_by = $request->userId;
      $invoice->status = $request->status;

      $invoice->save();

      if($invoice){
        return $this->sendResponse($invoice, 'Invoice created successfully');
      }

      return $this->sendError('Something went wrong!');
    }
    public function viewInvoice(Request $request){

        $validator = Validator::make($request->all(), [
            'id' => 'required'
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $id = $request->id;
       $invoice = Invoices::where('id',$id)->first();
       if($invoice){
        
        $user = $invoice->user;
        $customer = $invoice->customer;
        $staff = $invoice->staff;

        if($user){
            
            $userData['id'] = $user->id;
            $userData['name'] = $user->name;
            $userData['email'] = $user->email;
            $invoice['user'] = $userData; 
        }
        if($customer){
            $customerData['id'] = $customer->id;
            $customerData['fname'] = $customer->fname;
            $customerData['lname'] = $customer->lname;
            $customerData['dob'] = $customer->dob;
            $customerData['email'] = $customer->email;
            $customerData['phone'] = $customer->phone;
            $invoice['customer'] = $customerData;
        }
        if($staff){
            $staffData['id'] = $staff->id;
            $staffData['name'] = $staff->name;
            $invoice['staff'] = $staffData;
        }

      
       }else{
        $invoice = [];
       }
       
       return $this->sendResponse($invoice, 'Invoice data get successfully');
    }

    public function saveEditInvoice(Request $request){
        
        
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'userId' => 'required',
            'staffId' => 'required',
            'invoiceName' => 'required',
            'amount' => 'required',
            'vpState' => 'required',
            'userState' => 'required',
            'status' => 'required|in:paid,unpaid,draft'
            
        ]);
        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }
  
      $invoice = Invoices::where('id',$request->id)->first();
     
      if($invoice){

          if($invoice->status == 'discard'){
            return $this->sendError('Cannot update discarded invoice');
          }
       $a2 = json_encode($request->userState);
       $a1 = $invoice->user_state;
     
      if($a1 == $a2 && $invoice->name == $request->invoiceName){
            if($invoice->status  == $request->status){
                return $this->sendResponse($invoice, 'No update in invoice');
            }else{
                $invoice->status = $request->status;
                $invoice->save();
                return $this->sendResponse($invoice, 'Invoice status update successfully.');
            }
      }else{

            $invoice->status = 'discard';
            $invoice->save();

            $newInvoice = new Invoices;
            $newInvoice->user_id = $request->userId;
            $newInvoice->staff_id = $request->staffId;
            $newInvoice->customer_id = $invoice->customer_id;
            $newInvoice->name = $request->invoiceName;
            $newInvoice->amount = $request->amount;
            $newInvoice->vp_state = json_encode($request->vpState);
            $newInvoice->user_state = json_encode($request->userState);
            $newInvoice->created_by = $request->userId;
            $newInvoice->status = $request->status;
            $newInvoice->save();
      
            if($newInvoice){
              return $this->sendResponse($newInvoice, 'New invoice created successfully');
            }

        }
    
    }
      
      return $this->sendError('Something went wrong!');
    }
    public function search(Request $request){

        $validator = Validator::make($request->all(), [
            'firstName' => 'min:3|max:30|nullable|required_without_all:lastName,email,dob,phoneNo',
            'lastName' => 'min:3|max:30|nullable',
            'email' => 'email|max:100|nullable',
            'dob'  => 'date|date_format:Y-m-d|nullable'
        ],[
            'firstName.required_without_all' => 'One of the field is required'
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $user = auth()->user();
        $userId=$user->id;
        if($user->role_id===3){
          $userId=  $user->client_id;
        }
        $invoices = Invoices::with('customer')->newQuery();

        if ($request->has('firstName')) {
            $invoices->whereHas('customer', function ($query) use ($request) {
                $query->where('fname', $request->firstName);
            });
        }
        if ($request->has('lastName')) {
            $invoices->whereHas('customer', function ($query) use ($request) {
                $query->where('lname', $request->lastName);
            });
        }
        if ($request->has('email')) {
            $invoices->whereHas('customer', function ($query) use ($request) {
                $query->where('email', $request->email);
            });
        }
        if ($request->has('phoneNo')) {
            $invoices->whereHas('customer', function ($query) use ($request) {
                $query->where('phone', $request->phoneNo);
            });
        }
        if ($request->has('dob')) {
            $invoices->whereHas('customer', function ($query) use ($request) {
                $query->where('dob', $request->dob);
            });
        }
        $invoices = $invoices->where('user_id',$userId)->whereNot('status', 'discard')->get();
        return $this->sendResponse($invoices, 'Invoices list get successfully');

    }

}