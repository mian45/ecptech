<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CharacteristicsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('characteristics')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        DB::table('characteristics')->insert(array(
            array(

                'title' => "Digital Aspheric - Plastic",
                'lense_id' => 1,
                'code_id' => 7,
                'type' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "High-index Plastic 1.53-1.60/Trivex",
                'lense_id' => 1,
                'code_id' => 8,
                'type' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Digital Aspheric - Plastic",
                'lense_id' => 2,
                'code_id' => 7,
                'type' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "High-index Plastic 1.53-1.60/Trivex",
                'lense_id' => 2,
                'code_id' => 8,
                'type' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Photochromic-Plastic",
                'lense_id' => 2,
                'code_id' => 23,
                'type' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Digital Aspheric - Plastic",
                'lense_id' => 3,
                'code_id' => 7,
                'type' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Polarized - Plastic",
                'lense_id' => 3,
                'code_id' => 12,
                'type' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "High-index Plastic 1.53-1.60/Trivex",
                'lense_id' => 3,
                'code_id' => 13,
                'type' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Digital Aspheric - Plastic",
                'lense_id' => 4,
                'code_id' => 7,
                'type' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Digital Aspheric - Plastic",
                'lense_id' => 5,
                'code_id' => 7,
                'type' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "High-index Plastic 1.66/1.67",
                'lense_id' => 5,
                'code_id' => 9,
                'type' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => " Digital Aspheric - Plastic",
                'lense_id' => 5,
                'code_id' => 7,
                'type' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            )

           

            
            

        ));
    }
}
