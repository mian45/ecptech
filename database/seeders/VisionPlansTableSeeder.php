<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VisionPlansTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('vision_plans')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        DB::table('vision_plans')->insert(array(
            array(

                'title' => "VSP Signature",
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            )
        ));
    }
}
