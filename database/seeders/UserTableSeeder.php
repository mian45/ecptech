<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('users')->truncate();
        
        DB::table('users')->insert(array(

            array(
                'name' => 'admin',
                'email' => 'admin@gmail.com',
                'email_verified_at' => now(),
                'role_id' => 1,
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'remember_token' => Str::random(10),
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(
                'name' => 'ECP QA/Dev',
                'email' => 'qa@ecp-wadic.net',
                'email_verified_at' => now(),
                'role_id' => 2,
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'remember_token' => Str::random(10),
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            )
        ));
        DB::table('prescriptions')->truncate();
        DB::table('prescriptions')->insert(array(
            array(

                'name' => "Hi index 1.70",
                'sphere_from' => 5,
                'sphere_to' => 20,
                'user_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'name' => "Hi index 1.70",
                'sphere_from' => -5,
                'sphere_to' => -20,
                'user_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'name' => "Hi Index 1.67",
                'sphere_from' => -4.25,
                'sphere_to' => 4.25,
                'user_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'name' => "Hi Index 1.67",
                'sphere_from' => -4.50,
                'sphere_to' => 4.50,
                'user_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'name' => "Hi Index 1.67",
                'sphere_from' => -4.75,
                'sphere_to' => 4.75,
                'user_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'name' => "Trivex",
                'sphere_from' => -4,
                'sphere_to' => 4,
                'user_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            )
            
        ));
    }
}
