<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Prescription;
use App\Models\Invoices;
use Illuminate\Http\Transactions;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Validator;

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