<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UpdateTransactions extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('transactions')->where('id', 1)->update(['product_id' => 1]);
        DB::table('transactions')->where('id', 2)->update(['product_id' => 2]);
        DB::table('transactions')->where('id', 3)->update(['product_id' => 3]);
        DB::table('transactions')->where('id', 4)->update(['product_id' => 1]);
        DB::table('transactions')->where('id', 5)->update(['product_id' => 2]);
        DB::table('transactions')->where('id', 6)->update(['product_id' => 3]);
        DB::table('transactions')->where('id', 7)->update(['product_id' => 1]);
        DB::table('transactions')->where('id', 8)->update(['product_id' => 2]);
        DB::table('transactions')->where('id', 9)->update(['product_id' => 3]);
        DB::table('transactions')->where('id', 10)->update(['product_id' => 1]);
        DB::table('transactions')->where('id', 11)->update(['product_id' => 2]);
        DB::table('transactions')->where('id', 12)->update(['product_id' => 3]);
    }
}
