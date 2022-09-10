<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Invoice;
use Validator;

class DashboardController extends Controller
{
    
    public function getInvoiceSummmary(Request $request){

        $validator = Validator::make($request->all(), [
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $client_id = auth()->user()->id;

        $total_sales = Invoice::where('user_id',$client_id)->where('created_at','>=',$request->start_date)->where('created_at','<=',$request->end_date)->where('status','paid')->sum('amount');
        $amount_estimate = Invoice::where('user_id',$client_id)->where('created_at','>=',$request->start_date)->where('created_at','<=',$request->end_date)->sum('amount');
        $total_paid_orders = Invoice::where('user_id',$client_id)->where('created_at','>=',$request->start_date)->where('created_at','<=',$request->end_date)->where('status','paid')->count();

        //Get Start and End Dates for Previous (Month, Week etc)
        $prev_range_dates = $this->getPreviousRanges($request->start_date,$request->end_date);
                
        $total_prev_sales = Invoice::where('user_id',$client_id)->where('created_at','>=',$prev_range_dates['start_date'])->where('created_at','<=',$prev_range_dates['end_date'])->where('status','paid')->sum('amount');
        $previous_sales_precent = $this->calculateDiffFromLastRange($total_sales,$total_prev_sales);

        $amount_prev_estimate = Invoice::where('user_id',$client_id)->where('created_at','>=',$prev_range_dates['start_date'])->where('created_at','<=',$prev_range_dates['end_date'])->sum('amount');
        $previous_estimate_precent = $this->calculateDiffFromLastRange($amount_estimate,$amount_prev_estimate);

        $total_prev_paid_orders = Invoice::where('user_id',$client_id)->where('created_at','>=',$prev_range_dates['start_date'])->where('created_at','<=',$prev_range_dates['end_date'])->where('status','paid')->count();
        $previous_paid_orders_precent = $this->calculateDiffFromLastRange($total_paid_orders,$total_prev_paid_orders);
       
        $data['sales']['total_sale'] = "$".$total_sales;
        $data['sales']['last_range_diff'] = $previous_sales_precent."%";

        $data['estimates']['amount_estimate'] = "$".$amount_estimate;
        $data['estimates']['last_range_diff'] = $previous_estimate_precent."%";

        $data['orders']['total_paid_orders'] = $total_paid_orders;
        $data['orders']['last_range_diff'] = $previous_paid_orders_precent."%";

        return $this->sendResponse($data, 'Data Recived');

    }


    public function getPreviousRanges($start_date,$end_date){

        $start_date = \Carbon\Carbon::parse($start_date);
        $end_date = \Carbon\Carbon::parse($end_date);
        $diff = $start_date->diffInDays($end_date);
        $start_date_prev = $start_date->subDays($diff);
        $end_date_prev = $end_date;
        $dates = array('start_date'=>$start_date_prev,'end_date'=>$end_date_prev);
        return $dates;
    }

    public function calculateDiffFromLastRange($invoice_sum,$invoice_sum_prev){

        if($invoice_sum > $invoice_sum_prev){
            $previous_range = "+".($invoice_sum_prev>0)? round((($invoice_sum_prev/$invoice_sum)*100)-100):'100';
        }else if($invoice_sum_prev > $invoice_sum){
            $previous_range = "-".($invoice_sum>0)?round((($invoice_sum/$invoice_sum_prev)*100)-100):'100';
        }else{
            $previous_range = 0;
        }
        return $previous_range;
    }

}
