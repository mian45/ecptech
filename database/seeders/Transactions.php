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
                'customer_first_name' => 'Peter',
                'customer_last_name' => '',
                'customer_dob' => '27-09-1988',
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
                'customer_first_name' => 'David',
                'customer_last_name' => 'Hustler',
                'customer_dob' => '27-09-1988',
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
                'customer_first_name' => 'Stephen',
                'customer_last_name' => 'Joe',
                'customer_phone' => '1234567890',
                'customer_dob' => '27-09-1988',
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
                'customer_first_name' => 'John',
                'customer_last_name' => 'Smith',
                'customer_dob' => '27-09-1988',
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
                'customer_first_name' => 'John',
                'customer_last_name' => 'Smith',
                'customer_dob' => '27-09-1988',
                'customer_phone' => '1234567890',
                'customer_email' => 'john@mymail.com',
                'customer_address' => 'Colorado'
            )                
        );
    }
}
