<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CalculaterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        $this->call([
            VisionPlansTableSeeder::class,
            QuestionsTableSeeder::class,
            LenseTypesTableSeeder::class,
            BrandsTableSeeder::class,
            LenseMaterialsTableSeeder::class,
            CollectionsTableSeeder::class,
            LensesTableSeeder::class,
            CodesTableSeeder::class,
            CharacteristicsTableSeeder::class         
        ]);
    }
}
