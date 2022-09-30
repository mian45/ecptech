<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Validator;
use App\Models\Invoice;

class ProfitComparisonController extends Controller
{
    
    public function calculateProfitComparison(Request $request){
        $validator = Validator::make($request->all(), [
            'start_date' => 'required',
            'end_date' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user_id = auth()->user()->id;
        $start = $request->start_date;
        $end = $request->end_date;
        $start_date = Carbon::parse($start);
        $end_date = Carbon::parse($end);
        $where_clouse['user_id'] = $user_id;
        $where_clouse['status'] = 'paid';
        $data = [];
        $days = $end_date->diffInDays($start_date);
        $months = $end_date->diffInMonths($start_date);  

        $start_day_month_year = $start_date->format('M Y');
        $end_day_month_year = $end_date->format('M Y');

        $start_day_month = $start_date->format('m');
        $end_day_month = $end_date->format('m');
        
 
        $sum = [];
        $type = '';
        if($start_date == $end_date){     
            $type = 'hour';       
            for ($i = 1; $i <= 24; $i++) {
                
                $amount = Invoice::where($where_clouse)->whereBetween('created_at', [$start_date->format('Y-m-d '.$i.':00:00'), $end_date->format('Y-m-d '.$i.':59:59')])
                    ->sum('amount');

                $sum[$i] = [
                    'hour' => $i,
                    'total' => (int) $amount
                ];
            }                                    
        } else if ($days === 7) {
            $type = 'week';
            $period = CarbonPeriod::create($start_date->toDateString(),$end_date->toDateString());
            $i =1;
            foreach ($period as $key=>$date) {

                $amount = Invoice::where($where_clouse)
                    ->whereBetween('created_at', [$date->format('Y-m-d 00:00:00'), $date->format('Y-m-d 23:59:59')])
                    ->sum('amount');

                $sum[$i] = [
                    'week' => $date->format('Y-m-d'),
                    'total' => (int) $amount
                ];
                $i++;
                
            }
        } else if (($start_day_month_year==$end_day_month_year)) {
            $type = 'month';
            $period = CarbonPeriod::create($start_date->toDateString(), $end_date->toDateString());
            $i =1;
            foreach ($period as $key=>$date) {                 
                $amount = Invoice::where($where_clouse)
                    ->whereBetween('created_at', [$date->format('Y-m-d 00:00:00'), $date->format('Y-m-d 23:59:59')])                    
                    ->sum('amount');

                $sum[$i] = [
                    'month' => $date->format('Y-m-d'),
                    'total' => (int) $amount
                ];
                $i++;
            }
        } else if ($months === 2){
            $type = 'quarter';
            for ($i = 1; $i <= $months+1; $i++) {
                
                $month[$i] = $start_date->toDateString();
                $next_month[$i] = $start_date->addMonth(1)->toDateString();
                     
                $amount = Invoice::where($where_clouse)
                    ->where('created_at', '>=',$month[$i])->where('created_at', '<=',$next_month[$i] )
                    ->sum('amount');
                $sum[$i] = [
                    'month' => $month[$i],
                    'total' => $amount
                ];    
            }
        } else if ($months === 12){
            $type = 'year';
            for ($i = 1; $i <= $months+1; $i++) {
                
                $month[$i] = $start_date->toDateString();
                $next_month[$i] = $start_date->addMonth(1)->toDateString();
                     
                $amount = Invoice::where($where_clouse)
                    ->where('created_at', '>=',$month[$i])->where('created_at', '<=',$next_month[$i] )
                    ->sum('amount');
                $sum[$i] = [
                    'year' => $month[$i],
                    'total' => $amount
                ];    
            }
        } else{
            $type = 'custom'; 
            $period = CarbonPeriod::create($start_date->toDateString(),$end_date->toDateString());
            $i =1;
            foreach ($period as $key=>$date) {

                $amount = Invoice::where($where_clouse)
                    ->whereBetween('created_at', [$date->format('Y-m-d 00:00:00'), $date->format('Y-m-d 23:59:59')])
                    ->sum('amount');

                $sum[$i] = [
                    'custom' => $date->format('Y-m-d'),
                    'total' => (int) $amount
                ];
                $i++;
                
            }

        }      



        $data = [
            'type' => $type,
            'start_date' => $start,
            'end_date' => $end,
            'range' => $sum
        ]; 
        return $this->sendResponse($data, 'Profit Comparison');
    }
}