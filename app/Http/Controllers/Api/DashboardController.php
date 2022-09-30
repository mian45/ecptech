<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Invoice;
use Validator;
use Carbon\Carbon;

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

        
        $request->start_date = Carbon::parse($request->start_date)->toDateString();
        $request->end_date = Carbon::parse($request->end_date)->toDateString();

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
        $end_date_prev = $end_date->subDays($diff);
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

    public function getInvoiceStats(Request $request){

        $validator = Validator::make($request->all(), [
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $request->start_date = Carbon::parse($request->start_date)->toDateString();
        $request->end_date = Carbon::parse($request->end_date)->toDateString();

        $client_id = auth()->user()->id;
        $total_invoices = Invoice::where('user_id',$client_id)->where('created_at','>=',$request->start_date)->where('created_at','<=',$request->end_date)->count();
        $total_paid_invoices = Invoice::where('user_id',$client_id)->where('created_at','>=',$request->start_date)->where('created_at','<=',$request->end_date)->where('status','paid')->count();
        $total_unpaid_invoices = Invoice::where('user_id',$client_id)->where('created_at','>=',$request->start_date)->where('created_at','<=',$request->end_date)->where('status','unpaid')->count();
        
        $capture_rate = ($total_invoices>0)? round(($total_paid_invoices/$total_invoices)*100):0;
        
       

        $total_office_paid_invoices = Invoice::where('user_id',$client_id)->where('created_at','>=',$request->start_date)->where('created_at','<=',$request->end_date)->where('status','paid')->where('payment_mode','office')->count();
        $total_online_paid_invoices = Invoice::where('user_id',$client_id)->where('created_at','>=',$request->start_date)->where('created_at','<=',$request->end_date)->where('status','paid')->where('payment_mode','online')->count();

        $data['invoice']['generated'] = $total_invoices;
        $data['invoice']['office_paid'] = $total_office_paid_invoices;
        $data['invoice']['office_paid_percent'] = ($total_paid_invoices>0) ?round(($total_office_paid_invoices/$total_paid_invoices)*100):0;
        $data['invoice']['online_paid'] = $total_online_paid_invoices;
        $data['invoice']['online_paid_percent'] = ($total_paid_invoices>0)? round(($total_online_paid_invoices/$total_paid_invoices)*100):0;
        $data['invoice']['capture_rate'] = $capture_rate;
        $data['invoice']['unpaid'] = $total_unpaid_invoices;

        return $this->sendResponse($data, 'Invoice Data');

       
    }

    public function getTeamProgress(Request $request){

        $validator = Validator::make($request->all(), [
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $request->start_date = Carbon::parse($request->start_date)->toDateString();
        $request->end_date = Carbon::parse($request->end_date)->toDateString();

        $client_id = auth()->user()->id;

        $team_progress = Invoice::join('staffs as s', 's.id', '=', 'invoices.staff_id')
                            ->leftJoin('invoice_reminder', 'invoices.id', '=', 'invoice_reminder.invoice_id')
                            ->select('s.name as staff_name')
                            ->selectRaw('concat("$",sum(invoices.amount)) as total_sales,
                            concat(case when count(if(invoices.status="paid",invoices.id,NULL))=0 then 0 else round((count(IF((invoices.payment_mode="office" AND invoices.status="paid"), invoices.id, NULL))/count(if(invoices.status="paid",invoices.id,NULL)))*100) end,"%") as paid_in_office,
                            concat(case when count(if(invoices.status="paid",invoices.id,NULL))=0 then 0 else round((count(IF((invoices.payment_mode="online" AND invoices.status="paid"), invoices.id, NULL))/count(if(invoices.status="paid",invoices.id,NULL)))*100) end,"%") as paid_online,
                            concat(case when count(invoices.id)=0 then 0 else round((count(IF((invoices.status="paid"), invoices.id, NULL))/count(invoices.id))*100) end,"%") as capture_rate,
                            count(invoice_reminder.reminder_id) as reminder_sent')                            
                            ->where('invoices.user_id',$client_id)
                            ->where('invoices.created_at','>=',$request->start_date)
                            ->where('invoices.created_at','<=',$request->end_date)
                            ->groupBy('invoices.staff_id')
                            ->get();

        return $this->sendResponse($team_progress, 'Team Progress');
  
    }


    public function getTeamPerformance(Request $request){
        
        $validator = Validator::make($request->all(), [
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $request->start_date = Carbon::parse($request->start_date)->toDateString();
        $request->end_date = Carbon::parse($request->end_date)->toDateString();

        $client_id = auth()->user()->id;

        $prev_dates = $this->getPreviousRanges($request->start_date,$request->end_date);

        $current_sales = Invoice::selectRaw('if(sum(invoices.amount) IS NULL,0,sum(invoices.amount))')
                    ->whereColumn('invoices.staff_id', 's.id')
                    ->where('invoices.created_at','>=',$request->start_date)
                    ->where('invoices.created_at','<=',$request->end_date)
                    ->where('invoices.user_id',$client_id)
                    ->getQuery();

        

        $prev_sales = Invoice::selectRaw('if(sum(invoices.amount) IS NULL,0,sum(invoices.amount))')
                    ->whereColumn('invoices.staff_id', 's.id')
                    ->where('invoices.created_at','>=',$prev_dates['start_date'])
                    ->where('invoices.created_at','<=',$prev_dates['end_date'])
                    ->where('invoices.user_id',$client_id)
                    ->getQuery();
        

        $team_progress = Invoice::join('staffs as s', 's.id', '=', 'invoices.staff_id')
                        ->select('s.name as staff_name','s.id')
                        ->selectRaw('sum(invoices.amount) as current_sales') 
                        ->selectSub( $current_sales,'current_sales')
                        ->selectSub($prev_sales,'prev_sales')                           
                        ->where('invoices.user_id',$client_id)
                        ->groupBy('invoices.staff_id')
                        ->get();

        return $this->sendResponse($team_progress, 'Team Performance');

    }

}
