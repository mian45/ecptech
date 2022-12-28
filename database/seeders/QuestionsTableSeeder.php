<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuestionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('questions')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        DB::table('questions')->insert(array(
            array(

                'title' => "Select Vision Plan",
                'vision_plan_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Frame Benefit Available",
                'vision_plan_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Lens Benefit Available",
                'vision_plan_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Material Copay",
                'vision_plan_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Frame Order",
                'vision_plan_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            
            array(

                'title' => "Lens Type",
                'vision_plan_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Lens Material",
                'vision_plan_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Photochromics",
                'vision_plan_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Sunglass Options",
                'vision_plan_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Anti-Reflective Properties",
                'vision_plan_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Any copay lowered than standard",
                'vision_plan_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Protection Plan",
                'vision_plan_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Add Shipping",
                'vision_plan_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "Discount",
                'vision_plan_id' => 1,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),


            array(

                'title' => "Select Vision Plan",
                'vision_plan_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Frame Benefit Available",
                'vision_plan_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Lens Benefit Available",
                'vision_plan_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Material Copay",
                'vision_plan_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Frame Order",
                'vision_plan_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            
            array(

                'title' => "Lens Type",
                'vision_plan_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Lens Material",
                'vision_plan_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Photochromics",
                'vision_plan_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Sunglass Options",
                'vision_plan_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Anti-Reflective Properties",
                'vision_plan_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Any copay lowered than standard",
                'vision_plan_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Protection Plan",
                'vision_plan_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Add Shipping",
                'vision_plan_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "Discount",
                'vision_plan_id' => 2,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

           

            array(

                'title' => "Select Vision Plan",
                'vision_plan_id' => 3,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Frame Benefit Available",
                'vision_plan_id' => 3,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Lens Benefit Available",
                'vision_plan_id' => 3,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Material Copay",
                'vision_plan_id' => 3,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Frame Order",
                'vision_plan_id' => 3,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Lens Type",
                'vision_plan_id' => 3,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Lens Material",
                'vision_plan_id' => 3,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Photochromics",
                'vision_plan_id' => 3,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Sunglass Options",
                'vision_plan_id' => 3,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Anti-Reflective Properties",
                'vision_plan_id' => 3,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Any copay lowered than standard",
                'vision_plan_id' => 3,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Protection Plan",
                'vision_plan_id' => 3,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Add Shipping",
                'vision_plan_id' => 3,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "Discount",
                'vision_plan_id' => 3,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

           

            array(

                'title' => "Select Vision Plan",
                'vision_plan_id' => 4,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Frame Benefit Available",
                'vision_plan_id' => 4,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Lens Benefit Available",
                'vision_plan_id' => 4,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Material Copay",
                'vision_plan_id' => 4,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Frame Order",
                'vision_plan_id' => 4,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Lens Type",
                'vision_plan_id' => 4,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Lens Material",
                'vision_plan_id' => 4,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Photochromics",
                'vision_plan_id' => 4,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Sunglass Options",
                'vision_plan_id' => 4,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Anti-Reflective Properties",
                'vision_plan_id' => 4,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Slab Off",
                'vision_plan_id' => 4,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Speciality Lens",
                'vision_plan_id' => 4,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Polish",
                'vision_plan_id' => 4,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Any copay lowered than standard",
                'vision_plan_id' => 4,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Protection Plan",
                'vision_plan_id' => 4,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Add Shipping",
                'vision_plan_id' => 4,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Discount",
                'vision_plan_id' => 4,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "Select Vision Plan",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Frame Benefit Available",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Lens Benefit Available",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Material Copay",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Frame Order",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Lens Type",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Lens Material",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Photochromics",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Sunglass Options",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Anti-Reflective Properties",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Protection Plan",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Add Shipping",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "Discount",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "Chemistrie Clip",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "Edge Coating",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "Miscellaneous Lens Options",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "One Year Scratch Warranty",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "Oversize Lenses",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "Polish",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "Scratch Coating",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "UV Coating",
                'vision_plan_id' => 5,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            
           

            array(

                'title' => "Select Vision Plan",
                'vision_plan_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Frame Benefit Available",
                'vision_plan_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Lens Benefit Available",
                'vision_plan_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Material Copay",
                'vision_plan_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Frame Order",
                'vision_plan_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            
            array(

                'title' => "Lens Type",
                'vision_plan_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Lens Material",
                'vision_plan_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Photochromics",
                'vision_plan_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Sunglass Options",
                'vision_plan_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Anti-Reflective Properties",
                'vision_plan_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Blue Light Filtering",
                'vision_plan_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Slab Off",
                'vision_plan_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Speciality Lens",
                'vision_plan_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Polish",
                'vision_plan_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Any copay lowered than standard",
                'vision_plan_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Protection Plan",
                'vision_plan_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Add Shipping",
                'vision_plan_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "Discount",
                'vision_plan_id' => 6,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

          

            array(

                'title' => "Select Vision Plan",
                'vision_plan_id' => 7,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Frame Benefit Available",
                'vision_plan_id' => 7,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Lens Benefit Available",
                'vision_plan_id' => 7,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Material Copay",
                'vision_plan_id' => 7,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Frame Order",
                'vision_plan_id' => 7,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            
            array(

                'title' => "Lens Type",
                'vision_plan_id' => 7,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Lens Material",
                'vision_plan_id' => 7,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Photochromics",
                'vision_plan_id' => 7,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Sunglass Options",
                'vision_plan_id' => 7,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Anti-Reflective Properties",
                'vision_plan_id' => 7,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Protection Plan",
                'vision_plan_id' => 7,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Add Shipping",
                'vision_plan_id' => 7,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "Discount",
                'vision_plan_id' => 7,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "Aspheric",
                'vision_plan_id' => 7,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "Blue Protection",
                'vision_plan_id' => 7,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "Roll & Polish",
                'vision_plan_id' => 7,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "Licensed Specialty Enhancement",
                'vision_plan_id' => 7,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "Scratch Resistant Coatings",
                'vision_plan_id' => 7,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            
       

            array(

                'title' => "Select Vision Plan",
                'vision_plan_id' => 8,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Frame Benefit Available",
                'vision_plan_id' => 8,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Lens Benefit Available",
                'vision_plan_id' => 8,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Material Copay",
                'vision_plan_id' => 8,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Frame Order",
                'vision_plan_id' => 8,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            
            array(

                'title' => "Lens Type",
                'vision_plan_id' => 8,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Lens Material",
                'vision_plan_id' => 8,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Photochromics",
                'vision_plan_id' => 8,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Sunglass Options",
                'vision_plan_id' => 8,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Anti-Reflective Properties",
                'vision_plan_id' => 8,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Any copay lowered than standard",
                'vision_plan_id' => 8,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Protection Plan",
                'vision_plan_id' => 8,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
            array(

                'title' => "Add Shipping",
                'vision_plan_id' => 8,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),

            array(

                'title' => "Discount",
                'vision_plan_id' => 8,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ),
        ));
    }
}
