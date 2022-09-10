<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EyePrescriptions extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         // Insert some stuff
         DB::table('eye_prescription_setting')->insert(
            array(
                'name' => 'CR39',
                'sphere_from' => '-1.25',
                'sphere_to' => '-10.75',
                'cylinder_from' => '-15.75',
                'cylinder_to' => '1.75',
                'user_id' => 9
            )                
        );
        DB::table('eye_prescription_setting')->insert(
            array(
                'name' => 'Polycarbonate',
                'sphere_from' => '-2.25',
                'sphere_to' => '-11.75',
                'cylinder_from' => '-16.75',
                'cylinder_to' => '1.75',
                'user_id' => 9
            )               
        );
        DB::table('eye_prescription_setting')->insert(
            array(
                'name' => 'Trivex',
                'sphere_from' => '-3.25',
                'sphere_to' => '-12.75',
                'cylinder_from' => '-17.75',
                'cylinder_to' => '0.75',
                'user_id' => 9
            )              
        );
        DB::table('eye_prescription_setting')->insert(
            array(
                'name' => 'Hi Index 1.67',
                'sphere_from' => '-4.25',
                'sphere_to' => '-13.75',
                'cylinder_from' => '-18.75',
                'cylinder_to' => '-1.75',
                'user_id' => 9
            )             
        );
        DB::table('eye_prescription_setting')->insert(
            array(
                'name' => 'Hi Index 1.70 & Above',
                'sphere_from' => '-5.25',
                'sphere_to' => '-14.75',
                'cylinder_from' => '-19.75',
                'cylinder_to' => '-2.75',
                'user_id' => 9
            )           
        );
        DB::table('eye_prescription_setting')->insert(
            array(
                'name' => 'Hi Index 1.60',
                'sphere_from' => '-6.25',
                'sphere_to' => '-15.75',
                'cylinder_from' => '-20.75',
                'cylinder_to' => '-3.75',
                'user_id' => 9
            )           
        ); 
    }
}
