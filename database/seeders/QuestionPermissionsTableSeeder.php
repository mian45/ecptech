<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class QuestionPermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('question_permissions')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        DB::table('question_permissions')->insert(array(
            array(

                'user_id' => 1,
                'vision_plan_id' => 1,
                'question_id' => 1,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 1,
                'question_id' => 2,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 1,
                'question_id' => 3,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 1,
                'question_id' => 4,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 1,
                'question_id' => 5,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 1,
                'question_id' => 6,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 1,
                'question_id' => 7,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 1,
                'question_id' => 8,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 1,
                'question_id' => 9,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 1,
                'question_id' => 10,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 1,
                'question_id' => 11,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 1,
                'question_id' => 12,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 1,
                'question_id' => 13,
                'optional' => 0,
                'status' => 1
            ),
            
          
            
            array(

                'user_id' => 1,
                'vision_plan_id' => 2,
                'question_id' => 1,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 2,
                'question_id' => 2,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 2,
                'question_id' => 3,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 2,
                'question_id' => 4,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 2,
                'question_id' => 5,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 2,
                'question_id' => 6,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 2,
                'question_id' => 7,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 2,
                'question_id' => 8,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 2,
                'question_id' => 9,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 2,
                'question_id' => 10,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 2,
                'question_id' => 11,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 2,
                'question_id' => 12,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 2,
                'question_id' => 13,
                'optional' => 0,
                'status' => 1
            ),
            
          

            array(

                'user_id' => 1,
                'vision_plan_id' => 3,
                'question_id' => 1,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 3,
                'question_id' => 2,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 3,
                'question_id' => 3,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 3,
                'question_id' => 4,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 3,
                'question_id' => 5,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 3,
                'question_id' => 6,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 3,
                'question_id' => 7,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 3,
                'question_id' => 8,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 3,
                'question_id' => 9,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 3,
                'question_id' => 10,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 3,
                'question_id' => 11,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 3,
                'question_id' => 12,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 3,
                'question_id' => 13,
                'optional' => 0,
                'status' => 1
            ),
            
           
            array(

                'user_id' => 1,
                'vision_plan_id' => 4,
                'question_id' => 1,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 4,
                'question_id' => 2,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 4,
                'question_id' => 3,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 4,
                'question_id' => 4,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 4,
                'question_id' => 5,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 4,
                'question_id' => 6,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 4,
                'question_id' => 7,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 1,
                'question_id' => 8,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 4,
                'question_id' => 9,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 4,
                'question_id' => 10,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 4,
                'question_id' => 11,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 4,
                'question_id' => 12,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 4,
                'question_id' => 13,
                'optional' => 0,
                'status' => 1
            ),
            
           
            array(

                'user_id' => 1,
                'vision_plan_id' => 5,
                'question_id' => 1,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 5,
                'question_id' => 2,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 5,
                'question_id' => 3,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 5,
                'question_id' => 4,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 5,
                'question_id' => 5,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 5,
                'question_id' => 6,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 5,
                'question_id' => 7,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 5,
                'question_id' => 8,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 5,
                'question_id' => 9,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 5,
                'question_id' => 10,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 5,
                'question_id' => 11,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 5,
                'question_id' => 12,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 5,
                'question_id' => 13,
                'optional' => 0,
                'status' => 1
            ),
            
     
            array(

                'user_id' => 1,
                'vision_plan_id' => 6,
                'question_id' => 1,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 6,
                'question_id' => 2,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 6,
                'question_id' => 3,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 6,
                'question_id' => 4,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 6,
                'question_id' => 5,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 6,
                'question_id' => 6,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 6,
                'question_id' => 7,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 6,
                'question_id' => 8,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 6,
                'question_id' => 9,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 6,
                'question_id' => 10,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 6,
                'question_id' => 11,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 6,
                'question_id' => 12,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 6,
                'question_id' => 13,
                'optional' => 0,
                'status' => 1
            ),
            
           

            array(

                'user_id' => 1,
                'vision_plan_id' => 7,
                'question_id' => 1,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 7,
                'question_id' => 2,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 7,
                'question_id' => 3,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 7,
                'question_id' => 4,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 7,
                'question_id' => 5,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 7,
                'question_id' => 6,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 7,
                'question_id' => 7,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 7,
                'question_id' => 8,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 7,
                'question_id' => 9,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 7,
                'question_id' => 10,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 7,
                'question_id' => 11,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 7,
                'question_id' => 12,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 7,
                'question_id' => 13,
                'optional' => 0,
                'status' => 1
            ),
            
         

            array(

                'user_id' => 1,
                'vision_plan_id' => 8,
                'question_id' => 1,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 8,
                'question_id' => 2,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 8,
                'question_id' => 3,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 8,
                'question_id' => 4,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 8,
                'question_id' => 5,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 8,
                'question_id' => 6,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 8,
                'question_id' => 7,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 8,
                'question_id' => 8,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 8,
                'question_id' => 9,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 8,
                'question_id' => 10,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 8,
                'question_id' => 11,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 8,
                'question_id' => 12,
                'optional' => 0,
                'status' => 1
            ),
            array(

                'user_id' => 1,
                'vision_plan_id' => 8,
                'question_id' => 13,
                'optional' => 0,
                'status' => 1
            )
            
         
        ));
    }
}
