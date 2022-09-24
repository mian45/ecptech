<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LenseType;
use Illuminate\Support\Facades\DB;

class BrandsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('brands')->truncate();
        DB::table('brands')->insert(array(
            array(

                'title' => "No Brand",
                'lens_type_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'title' => "Shamir",
                'lens_type_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'title' => "Essilor",
                'lens_type_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'title' => "Hoya",
                'lens_type_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'title' => "Signet Armorlite",
                'lens_type_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'title' => "Maui Jim",
                'lens_type_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'title' => "Seiko",
                'lens_type_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'title' => "Carl Zeiss Vision",
                'lens_type_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'title' => "VSP",
                'lens_type_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'title' => "NeuroLens",
                'lens_type_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
        ));
    }
}
