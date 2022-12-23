<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SheetDataResetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        DB::table('lense_types')->truncate();
        DB::table('brands')->truncate();
        DB::table('collections')->truncate();
        DB::table('lenses')->truncate();
        DB::table('characteristics')->truncate();
        DB::table('brand_permissions')->truncate();
        DB::table('collections_permissions')->truncate();
        DB::table('codes')->truncate();
        
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
