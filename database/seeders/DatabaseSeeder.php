<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        $this->call([
            RolesTableSeeder::class,
            UserTableSeeder::class,
            StatesTableSeeder::class,
            CustomersTableSeeder::class,
            StaffTableSeeder::class,
            InvoicesTableSeeder::class,
            TimeZoneSeeder::class,
            ReminderTableSeeder::class,
            InvoiceReminderTableSeeder::class,
            ProductTableSeeder::class,
            TransactionTableSeeder::class,
            VisionPlansTableSeeder::class,
            VisionPlanPermissionTableSeeder::class,
            QuestionsTableSeeder::class,
            QuestionPermissionsTableSeeder::class,
            LenseMaterialsTableSeeder::class
          
        ]);
    }
}
