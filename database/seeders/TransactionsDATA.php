<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Transactions;

class TransactionsDATA extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $Records = [
            [
                'user_id' => 9,
                'invoice_id' => 1,
                'amount' => 234,
                'status' => 'paid',
                'customer_first_name' => 'Peter',
                'customer_last_name' => '',
                'customer_dob' => '27-09-1988',
                'customer_phone' => '1234567890',
                'customer_email' => 'jolyboy@gmail.com',
                'customer_address' => 'Colorado',
                'created_at' => date('Y-m-d', strtotime('2022-08-31'))
            ],
            [
                'user_id' => 9,
                'invoice_id' => 2,
                'amount' => 1050,
                'status' => 'paid',
                'customer_first_name' => 'David',
                'customer_last_name' => 'Hustler',
                'customer_dob' => '27-09-1988',
                'customer_phone' => '1234567890',
                'customer_email' => 'jolyboy@gmail.com',
                'customer_address' => 'Colorado',
                'created_at' => date('Y-m-d', strtotime('2022-08-12'))
            ],
            [
                'user_id' => 9,
                'invoice_id' => 3,
                'amount' => 350,
                'status' => 'paid',
                'customer_first_name' => 'Stephen',
                'customer_last_name' => 'Joe',
                'customer_dob' => '27-09-1988',
                'customer_phone' => '1234567890',
                'customer_email' => 'jolyboy@gmail.com',
                'customer_address' => 'Colorado',
                'created_at' => date('Y-m-d', strtotime('2022-08-14'))
            ],
            [
                'user_id' => 9,
                'invoice_id' => 1,
                'amount' => 234,
                'status' => 'paid',
                'customer_first_name' => 'Peter',
                'customer_last_name' => '',
                'customer_dob' => '27-09-1988',
                'customer_phone' => '1234567890',
                'customer_email' => 'jolyboy@gmail.com',
                'customer_address' => 'Colorado',
                'created_at' => date('Y-m-d', strtotime('2021-08-31'))
            ],
            [
                'user_id' => 9,
                'invoice_id' => 2,
                'amount' => 254,
                'status' => 'paid',
                'customer_first_name' => 'David',
                'customer_last_name' => 'Hustler',
                'customer_dob' => '27-09-1988',
                'customer_phone' => '1234567890',
                'customer_email' => 'jolyboy@gmail.com',
                'customer_address' => 'Colorado',
                'created_at' => date('Y-m-d', strtotime('2021-08-27'))
            ],
            [
                'user_id' => 9,
                'invoice_id' => 3,
                'amount' => 874,
                'status' => 'paid',
                'customer_first_name' => 'Stephen',
                'customer_last_name' => 'Joe',
                'customer_dob' => '27-09-1988',
                'customer_phone' => '1234567890',
                'customer_email' => 'jolyboy@gmail.com',
                'customer_address' => 'Colorado',
                'created_at' => date('Y-m-d', strtotime('2021-09-14'))
            ],
            [
                'user_id' => 9,
                'invoice_id' => 1,
                'amount' => 535,
                'status' => 'paid',
                'customer_first_name' => 'Peter',
                'customer_last_name' => '',
                'customer_dob' => '27-09-1988',
                'customer_phone' => '1234567890',
                'customer_email' => 'jolyboy@gmail.com',
                'customer_address' => 'Colorado',
                'created_at' => date('Y-m-d', strtotime('2021-06-31'))
            ],
            [
                'user_id' => 9,
                'invoice_id' => 2,
                'amount' => 234,
                'status' => 'paid',
                'customer_first_name' => 'David',
                'customer_last_name' => 'Hustler',
                'customer_dob' => '27-09-1988',
                'customer_phone' => '1234567890',
                'customer_email' => 'jolyboy@gmail.com',
                'customer_address' => 'Colorado',
                'created_at' => date('Y-m-d', strtotime('2021-04-12'))
            ],
            [
                'user_id' => 9,
                'invoice_id' => 3,
                'amount' => 456,
                'status' => 'paid',
                'customer_first_name' => 'Stephen',
                'customer_last_name' => 'Joe',
                'customer_dob' => '27-09-1988',
                'customer_phone' => '1234567890',
                'customer_email' => 'jolyboy@gmail.com',
                'customer_address' => 'Colorado',
                'created_at' => date('Y-m-d', strtotime('2021-03-14'))
            ]
            
        ];
        Transactions::insert($Records);
    }
}
