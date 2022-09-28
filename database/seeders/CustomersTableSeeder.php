<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
class CustomersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('customers')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        DB::table('customers')->insert(array(
            array(

                'user_id' => User::all()->random()->id,
                'fname' => "mark",
                'lname' => "zakr",
                'dob' => date("Y-m-d"),
                'email' => "mark@gmail.com",
                'phone' => "(555) 555-1234",
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'user_id' => User::all()->random()->id,
                'fname' => "jon",
                'lname' => "son",
                'dob' => date("Y-m-d"),
                'email' => "jon@gmail.com",
                'phone' => "(555) 555-1244",
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            )
        ));
    }
}
