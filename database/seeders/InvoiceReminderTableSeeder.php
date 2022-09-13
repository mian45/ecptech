<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InvoiceReminderTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('invoice_reminder')->insert(
            array(
                'reminder_id' => 3,
                'invoice_id' => 1
            )                
        );

        DB::table('invoice_reminder')->insert(
            array(
                'reminder_id' => 5,
                'invoice_id' => 4
            )                
        );


        DB::table('invoice_reminder')->insert(
            array(
                'reminder_id' => 5,
                'invoice_id' => 2
            )                
        );
    }
}
