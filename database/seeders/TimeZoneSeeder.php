<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class TimeZoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('timezones')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        DB::table('timezones')->insert(array(

            array(

                'name' => "Washington, DC, USA (GMT-4)",
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'name' => "Chicago (GMT-5)",
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'name' => "Denver (GMT-6)",
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'name' => "Phoenix (GMT-7)",
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'name' => "Los Angeles (GMT-7)",
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'name' => "Anchorage (GMT-8)",
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ),
            array(

                'name' => "Honolulu (GMT-10)",
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            )

        ));
    }
}
