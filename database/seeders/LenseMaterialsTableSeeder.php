<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LenseMaterial;
use Illuminate\Support\Facades\DB;

class LenseMaterialsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('lens_materials')->truncate();
        DB::table('lens_materials')->insert(array(
            array(

                'title' => "CR39",
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'title' => "Polycarbonate",
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'title' => "Trivex",
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'title' => "Hi Index 1.67",
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'title' => "Hi index 1.70 and above",
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'title' => "Hi index 1.60",
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ) 
           
        ));
    }
}
