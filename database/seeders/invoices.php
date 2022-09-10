<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class invoices extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('invoices')->insert(
            array(
                'name' => 'Peter New Invoice',
                'customer_id' => 1,
                'user_id' => 9,
                'staff_id' => 1,
                'amount' => '880',
                'status' => 'created',
                'payment_mode' => '1'
            )                
        );

        DB::table('invoices')->insert(
            array(
                'name' => 'Devid Frame',
                'customer_id' => 1,
                'user_id' => 9,
                'staff_id' => 1,
                'amount' => '326',
                'status' => 'created',
                'payment_mode' => '1'
            )                
        );

        DB::table('invoices')->insert(
            array(
                'name' => 'Stephen Smith Glasses',
                'customer_id' => 1,
                'user_id' => 9,
                'staff_id' => 1,
                'amount' => '449',
                'status' => 'created',
                'payment_mode' => '1'
            )                
        );

         DB::table('invoices')->insert(
            array(
                'name' => 'John Smith Glasses',
                'customer_id' => 1,
                'user_id' => 9,
                'staff_id' => 1,
                'amount' => '449',
                'status' => 'created',
                'payment_mode' => '1'
            )                
        );
    }
}
