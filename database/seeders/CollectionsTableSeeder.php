<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LenseType;
use Illuminate\Support\Facades\DB;

class CollectionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('collections')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        DB::table('collections')->insert(array(
            array(

                'title' => "Single Vision",
                'brand_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),

            array(

                'title' => "Single Vision Digital Aspheric",
                'brand_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),

            array(

                'title' => "Shamir Autograph III SV",
                'brand_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),

            array(

                'title' => "Shamir Attitude III SV",
                'brand_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),

            array(

                'title' => "Shamir Relax 50/65/80",
                'brand_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),

            array(

                'title' => "Essilor Single Vision 360",
                'brand_id' => 3,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),

            array(

                'title' => "Essilor Eyezen+",
                'brand_id' => 3,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),

            array(

                'title' => "Hoyalux iD SV",
                'brand_id' => 4,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),

            array(

                'title' => "Hoya Sync III",
                'brand_id' => 4,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),

            array(

                'title' => "Kodak Digital Single Vision",
                'brand_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),

            array(

                'title' => "Kodak PowerUp",
                'brand_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),

            array(

                'title' => "Maui Jim Ophthalmic Single Vision",
                'brand_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),

            array(

                'title' => "Superior SV",
                'brand_id' => 7,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),

            array(

                'title' => "synchrony HDC SV",
                'brand_id' => 8,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),

            array(

                'title' => "Unity Relieve",
                'brand_id' => 9,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'title' => "UNITY SVx",
                'brand_id' => 9,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'title' => "NeuroLens SV",
                'brand_id' => 10,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            )           
        ));
    }
}
