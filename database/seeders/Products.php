<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Products extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(DB::table('products')->count() == 0){
            DB::table('products')->insert([
                [
                    'user_id' => 9,
                    'name' => 'Double-Gauss lens',
                    'price' => 123,
                    'created_at' => date('Y-m-d H:i:s'),
                ],
                [
                    'user_id' => 9,
                    'name' => 'Inverted telephoto (retrofocus)',
                    'price' => 746,
                    'created_at' => date('Y-m-d H:i:s'),
                ],
                [
                    'user_id' => 9,
                    'name' => 'Frazier lens',
                    'price' => 234,
                    'created_at' => date('Y-m-d H:i:s'),
                ]

            ]);
        }
    }
}
