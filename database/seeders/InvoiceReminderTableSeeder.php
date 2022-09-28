<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\InvoiceReminder;

class InvoiceReminderTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('invoice_reminder')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        InvoiceReminder::factory()->count(20)->create();
    }
}
