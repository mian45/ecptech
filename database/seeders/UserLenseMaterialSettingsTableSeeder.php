<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserLenseMaterialSettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('user_lense_material_settings')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        DB::table('user_lense_material_settings')->insert(array(
            array(

                'user_id' => 2,
                'lens_material_id' => 1,
                'status' => 'active',
                'price' => 45.40
            ),
            array(

                'user_id' => 2,
                'lens_material_id' => 2,
                'status' => 'active',
                'price' => 65
            ),
            array(

                'user_id' => 2,
                'lens_material_id' => 3,
                'status' => 'active',
                'price' => 62
            ),
            array(

                'user_id' => 2,
                'lens_material_id' => 4,
                'status' => 'active',
                'price' => 45
            ),
            array(

                'user_id' => 2,
                'lens_material_id' => 5,
                'status' => 'active',
                'price' => 89
            ),
            array(

                'user_id' => 2,
                'lens_material_id' => 6,
                'status' => 'active',
                'price' => 98
            )
            
        ));
    }
}
