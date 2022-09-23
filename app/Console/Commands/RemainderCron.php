<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Reminder;
use App\Models\Invoice;
use App\Jobs\SendRemainderJob;
use Carbon\Carbon;
class RemainderCron extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'remainder:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

       $reminders = Reminder::where('is_active',1)->where('type', '!=' , 'orderComplete')->get();
       foreach($reminders as $reminder){
             
         $invoice_type = $reminder->invoice_type;
         $body = $reminder->body;
         $TimeZone = $reminder->TimeZone;
         $timezone = $TimeZone->name;
         $day_after = $reminder->send_after_day;
         if($invoice_type == 'paid' || $invoice_type == 'unpaid'){
            $invoices = Invoice::where('status',$invoice_type)->get();
         }else{
            $invoices = Invoice::get();
         }
         foreach($invoices as $invoice){

            config(['app.timezone' => $timezone]);
            
            $invoice_created =Carbon::createFromFormat('Y-m-d H:i:s', $invoice->created_at)->format('Y-m-d');
            $current_date = Carbon::now()->format('Y-m-d');
            $invoice_date = $invoice_created->addDays($day_after);
            $day_after = $invoice_created->addDays($day_after + 1);

            $send_time = date("H:i", strtotime($invoice->send_time));
            if($current_date > $invoice_date && $current_date < $day_after){
              
              $sending_date = $current_date.' '.$send_time;
              $today_date = Carbon::now();
              $result = $sending_date->eq($today_date);
             if($result && $invoice->customer->email){
              
                  $email = $invoice->customer->email;
                  $details = [
                   'email' => $email,
                   'title' => 'Mail from ECPTech.com',
                   'body' => $body
                  ];
   
                  dispatch(new SendRemainderJob($details));
   
            }
            }
           
            
             
         }

       } 
       return 0;
    }
}
