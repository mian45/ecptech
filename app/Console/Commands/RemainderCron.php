<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Reminder;
use App\Models\Invoice;
use App\Jobs\SendRemainderJob;
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

       $reminders = Reminder::where('is_active',1)->get();
       foreach($reminders as $reminder){
             
         $invoice_type = $reminder->invoice_type;
         $body = $reminder->body;
         if($invoice_type == 'paid' || $invoice_type == 'unpaid'){
            $invoices = Invoice::where('status',$invoice_type)->get();
         }else{
            $invoices = Invoice::get();
         }
         foreach($invoices as $invoice){
            if($invoice->customer->email){

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
       return 0;
    }
}
