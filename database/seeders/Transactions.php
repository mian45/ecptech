<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Transactions extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('transactions')->insert(
            array(
                'user_id' => 9,
                'invoice_id' => 1,
                'amount' => 880,
                'status' => 'paid',
                'customer_name' => 'Peter',
                'customer_phone' => '1234567890',
                'customer_email' => 'jolyboy@gmail.com',
                'customer_address' => 'Colorado'
            )                
        );

        DB::table('transactions')->insert(
            array(
                'user_id' => 9,
                'invoice_id' => 2,
                'amount' => 326,
                'status' => 'paid',
                'customer_name' => 'David Hustler',
                'customer_phone' => '1234567890',
                'customer_email' => 'david.me@mail.com',
                'customer_address' => 'Colorado'
            )                
        );

        DB::table('transactions')->insert(
            array(
                'user_id' => 9,
                'invoice_id' => 3,
                'amount' => 120,
                'status' => 'paid',
                'customer_name' => 'Stephen Joe',
                'customer_phone' => '1234567890',
                'customer_email' => 'info@stephensons.net',
                'customer_address' => 'Colorado'
            )                
        );

        DB::table('transactions')->insert(
            array(
                'user_id' => 9,
                'invoice_id' => 4,
                'amount' => 449,
                'status' => 'Un paid',
                'customer_name' => 'John Smith',
                'customer_phone' => '1234567890',
                'customer_email' => 'john@mymail.com',
                'customer_address' => 'Colorado'
            )                
        );

        DB::table('transactions')->insert(
            array(
                'user_id' => 9,
                'invoice_id' => 4,
                'amount' => 449,
                'status' => 'Un paid',
                'customer_name' => 'John Smith',
                'customer_phone' => '1234567890',
                'customer_email' => 'john@mymail.com',
                'customer_address' => 'Colorado'
            )                
        );
    }
}
