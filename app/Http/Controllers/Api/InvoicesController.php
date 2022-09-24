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
class InvoicesController extends Controller
{
    public function index(Request $request){
        $validator = Validator::make($request->all(), [
            'user_id' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $user_id = $request->user_id;
        $where_clouse['transactions.user_id'] = $user_id;
        $invoices = DB::table('transactions')
            ->join('invoices', 'transactions.invoice_id', '=', 'invoices.id')
            ->where($where_clouse)
            ->select('invoices.name', DB::Raw("CONCAT(transactions.customer_first_name, ' ', transactions.customer_last_name) AS customer_name"), 'transactions.customer_email', 'transactions.created_at', 'transactions.amount', 'transactions.status')
            ->get();
        return $this->sendResponse($invoices, 'Invoices List');
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
            'vpState' => 'required',
            'userState' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
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
      $invoice->amount = $request->amount;
      $invoice->vp_state = $request->vpState;
      $invoice->user_state = $request->userState;
      $invoice->created_by = $request->userId;

      $invoice->save();

      if($invoice){
        return $this->sendResponse($invoice, 'Invoice Successfully Save.');
      }

      return $this->sendError('Some thing went wrong!');
    }
    public function viewInvoice(Request $request){

        $validator = Validator::make($request->all(), [
            'id' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
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
       
       return $this->sendResponse($invoice, 'Invoice data');
    }
    public function search(Request $request){
        $validator = Validator::make($request->all(), [
            'user_id' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        
        if(isset($request->user_id)){
            $where_clouse['transactions.user_id'] = $request->user_id;
        }
        if(isset($request->first_name)){
            $where_clouse['transactions.customer_first_name'] = $request->first_name;
        }
        if(isset($request->last_name)){
            $where_clouse['transactions.customer_last_name'] = $request->last_name;
        }
        if(isset($request->dob)){
            $where_clouse['transactions.customer_dob'] = $request->dob;
        }
        if(isset($request->email)){
            $where_clouse['transactions.customer_email'] = $request->email;
        }
        if(isset($request->phone_number)){
            $where_clouse['transactions.customer_phone'] = $request->phone_number;
        }
        
        $invoices = DB::table('transactions')
            ->join('invoices', 'transactions.invoice_id', '=', 'invoices.id')
            ->where($where_clouse)
            ->select('invoices.name', DB::Raw("CONCAT(transactions.customer_first_name, ' ', transactions.customer_last_name) AS customer_name"), 'transactions.customer_email', 'transactions.created_at', 'transactions.amount', 'transactions.status')
            ->get();
        return $this->sendResponse($invoices, 'Invoices List');
    }

}