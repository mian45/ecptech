<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $this->call([
            RolesTableSeeder::class,
            UserTableSeeder::class,
            StatesTableSeeder::class,
            CustomersTableSeeder::class,
            StaffTableSeeder::class,
            InvoicesTableSeeder::class,
            ReminderTableSeeder::class,
            InvoiceReminderTableSeeder::class,
            ProductTableSeeder::class,
            TransactionTableSeeder::class,
            PrescriptionTableSeeder::class
        ]);
    }
}
