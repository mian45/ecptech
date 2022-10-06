<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class VisionPlanPermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('vision_plan_permissions')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        DB::table('vision_plan_permissions')->insert(array(
            array(

                'user_id' => 2,
                'vision_plan_id' => 1,
                'status' => 1
            ),
            array(

                'user_id' => 2,
                'vision_plan_id' => 2,
                'status' => 1
            ),
            array(

                'user_id' => 2,
                'vision_plan_id' => 3,
                'status' => 1
            ),
            array(

                'user_id' => 2,
                'vision_plan_id' => 4,
                'status' => 1
            ),
            array(

                'user_id' => 2,
                'vision_plan_id' => 5,
                'status' => 1
            ),
            array(

                'user_id' => 2,
                'vision_plan_id' => 6,
                'status' => 1
            ),
            array(

                'user_id' => 2,
                'vision_plan_id' => 7,
                'status' => 1
            ),
            array(

                'user_id' => 2,
                'vision_plan_id' => 8,
                'status' => 1
            )
            
            
        ));
    }  
}
