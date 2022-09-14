<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Validator;

class ProfitComparisonController extends Controller
{
    public function profitComparison(Request $request){
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'start_date' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $user_id = $request->user_id;
        $date_type = $request->date_type; 
        $start = $request->start_date;
        $end = $request->end_date;
        $start_date = Carbon::parse($start);
        $end_date = Carbon::parse($end);
        
        $where_clouse['user_id'] = $user_id;
        $where_clouse['status'] = 'paid';
        if($date_type == 'today'){
            $yesterday = Carbon::yesterday();
            $today = Carbon::now();    
            $where_clouse['created_at'] = $yesterday;        
            $lastday = DB::table('transactions')        
                ->where($where_clouse)
                ->sum('amount');
            $where_clouse['created_at'] = $today->format('Y-m-d');    
            $currentday = DB::table('transactions')        
                ->where($where_clouse)
                ->sum('amount'); 
            $data['yesterday'] = [
                'date' => $yesterday->format('D Y'),
                'amount' => $lastday
            ];
            $data['today'] = [
                'date' => $today->format('D Y'),
                'amount' => $currentday
            ]; 

        } else if ($date_type == 'week') {
            $now = Carbon::now();
            $weekStartDate = $now->startOfWeek()->format('Y-m-d');            
            $weekEndDate = $now->endOfWeek()->format('Y-m-d');            
            $lastweekenddate = $now->subDays($now->dayOfWeek)->subWeek();
            $lastweekStartDate = $lastweekenddate->startOfWeek()->format('Y-m-d');
            $lastweekEndDate = $lastweekenddate->endOfWeek()->format('Y-m-d');
            $lastweek = DB::table('transactions')        
                ->where($where_clouse)
                ->whereBetween('created_at', [$lastweekStartDate, $lastweekEndDate])
                ->sum('amount');
            $thisweek = DB::table('transactions')        
                ->where($where_clouse)
                ->whereBetween('created_at', [$weekStartDate, $weekEndDate])
                ->sum('amount'); 
            $data['last_week'] = [
                'date' => 'Previous Week',
                'amount' => $lastweek
            ];
            $data['current_week'] = [
                'date' => 'Current Week',
                'amount' => $thisweek
            ]; 
            
        } else if($date_type == 'month'){
            $start = new Carbon('first day of last month');
            $end = new Carbon('last day of last month');
            $this_month = new Carbon('first day of this month');
            $now = Carbon::now();            
            $lastmonth = DB::table('transactions')        
                ->where($where_clouse)
                ->whereBetween('created_at', [$start, $end])
                ->sum('amount');
            $thistmonth = DB::table('transactions')        
                ->where($where_clouse)
                ->whereBetween('created_at', [$this_month, $now])
                ->sum('amount'); 
            $data['last_month'] = [
                'date' => $start->format('M Y'),
                'amount' => $lastmonth
            ];
            $data['current_month'] = [
                'date' => $now->format('M Y'),
                'amount' => $thistmonth
            ];                   
        } else if($date_type == 'quarter'){
            $date = new \Carbon\Carbon();
            $currentfirstOfQuarter = $date->firstOfQuarter();            
            $currentlastOfQuarter = $date->lastOfQuarter();            
            $lastdate = new \Carbon\Carbon('-3 months');
            $lastfirstOfQuarter = $lastdate->firstOfQuarter();            
            $lastlastOfQuarter = $lastdate->lastOfQuarter();
            $lastquarter = DB::table('transactions')        
                ->where($where_clouse)
                ->whereBetween('created_at', [$lastfirstOfQuarter, $lastlastOfQuarter])
                ->sum('amount');
            $thistquarter = DB::table('transactions')        
                ->where($where_clouse)
                ->whereBetween('created_at', [$currentfirstOfQuarter, $currentlastOfQuarter])
                ->sum('amount'); 
            $data['last_month'] = [
                'date' => $lastdate->format('M Y'),
                'amount' => $lastquarter
            ];
            $data['current_month'] = [
                'date' => $date->format('M Y'),
                'amount' => $thistquarter
            ];             
        } else if($date_type == 'year'){
            $year = Carbon::now()->format('Y');            
        } else {                        
            $start = explode('/', $start);
            $end = explode('/', $end);
            $get_start_year = $start[2];
            $get_end_year = $end[2];
            if($get_start_year === $get_end_year){
                $last_year = $start[2] - 1;
                $pre_start_date = $start[0].'/'.$start[1].'/'.$last_year;
                $pre_end_date = $end[0].'/'.$end[1].'/'.$last_year;
                $prestartdate = Carbon::parse($pre_start_date);
                $preenddate = Carbon::parse($pre_end_date);
            } else {
                $last_year = ($get_end_year - $get_start_year);
                $start_year = $start[2] - $last_year;
                $last_year = $end[2] - $last_year;
                $pre_start_date = $start[0].'/'.$start[1].'/'.$start_year;
                $pre_end_date = $end[0].'/'.$end[1].'/'.$last_year;
                $prestartdate = Carbon::parse($pre_start_date);
                $preenddate = Carbon::parse($pre_end_date);
            }
            
            $date_start = DB::table('transactions')
                ->where($where_clouse)
                ->whereBetween('created_at', [$start_date->format('Y-m-d'), $end_date->format('Y-m-d')])
                ->sum('amount'); 
            $date_end = DB::table('transactions')
                ->where($where_clouse)
                ->whereBetween('created_at', [$prestartdate->format('Y-m-d'), $preenddate->format('Y-m-d')])
                ->sum('amount'); 
            $data['previous'] = [
                'date' => $prestartdate->format('M Y').' - '.$preenddate->format('M Y'),
                'amount' => $date_end
            ];      
            $data['current'] = [
                'date' => $start_date->format('M Y').' - '. $end_date->format('M Y'),
                'amount' => $date_start
            ];            
        }        
        
        return $this->sendResponse($data, 'Profit Comparison');
    }
}