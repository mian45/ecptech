<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LensesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('lenses')->truncate();
        DB::table('lenses')->insert(array(
            array(

                'title' => "Digital 1.60 High-index Plastic",
                'collection_id' => 4,
                'lens_material_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Digital 1.60 High-index Plastic Transitions Signature GEN 8 / XTRActive",
                'collection_id' => 4,
                'lens_material_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Digital 1.60 High-index Plastic Polarized",
                'collection_id' => 4,
                'lens_material_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Digital 1.50 Plastic",
                'collection_id' => 4,
                'lens_material_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Digital 1.67 High-index Plastic",
                'collection_id' => 4,
                'lens_material_id' => 4,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            )
        ));
    }
}
