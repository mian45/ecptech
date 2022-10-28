<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Prescription;
use App\Models\User;

class PrescriptionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('prescriptions')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        DB::table('prescriptions')->insert(array(
            array(
            'name' => 'Hi index 1.70 & above',
            'sphere_from' => 0,            
            'sphere_to' => 0,
            'cylinder_from' => 0,
            'cylinder_to' => 0,
            'user_id' =>2,
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s"),
            'created_by' => User::all()->random()->id,
            ),
            array(
            'name' => 'Hi index 1.67',
            'sphere_from' => 0,            
            'sphere_to' => 0,
            'cylinder_from' => 0,
            'cylinder_to' => 0,
            'user_id' => 2,
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s"),
            'created_by' => User::all()->random()->id,
            ),
            array(
            'name' => 'Hi index 1.60',
            'sphere_from' => 0,            
            'sphere_to' => 0,
            'cylinder_from' => 0,
            'cylinder_to' => 0,
            'user_id' => 2,
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s"),
            'created_by' => User::all()->random()->id,
            ),
            array(
            'name' => 'Trivex',
            'sphere_from' => 0,            
            'sphere_to' => 0,
            'cylinder_from' => 0,
            'cylinder_to' => 0,
            'user_id' => 2,
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s"),
            'created_by' => User::all()->random()->id,
            ),
            array(
            'name' => 'Polycarbonate',
            'sphere_from' => 0,            
            'sphere_to' => 0,
            'cylinder_from' => 0,
            'cylinder_to' => 0,
            'user_id' => 2,
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s"),
            'created_by' => User::all()->random()->id,
            ),
            array(
            'name' => 'CR39',
            'sphere_from' => 0,            
            'sphere_to' => 0,
            'cylinder_from' => 0,
            'cylinder_to' => 0,
            'user_id' => 2,
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s"),
            'created_by' => User::all()->random()->id,
            ),
        ));
    }
}
