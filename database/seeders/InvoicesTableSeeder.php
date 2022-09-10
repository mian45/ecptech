<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class InvoicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('invoices')->insert(array(
            array(

                'name' => "jhon_son_lenzez",
                'customer_id' => 2,
                'user_id' => 44,
                'staff_id' => 5,
                'amount' => 220,
                'status' => "unpaid",
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'name' => "jhon_son_lenzez",
                'customer_id' => 2,
                'user_id' => 44,
                'staff_id' => 5,
                'amount' => 220,
                'status' => "paid",
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
        ));
    }
}
