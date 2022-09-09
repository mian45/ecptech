<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('invoice_id');
            $table->integer('amount');
            $table->string('status');
            $table->string('customer_name');
            $table->string('customer_phone');
            $table->string('customer_email');
            $table->string('customer_address');
            $table->timestamps();
        });

        DB::table('transactions')->insert(
            array(
                'user_id' => 9,
                'invoice_id' => 1,
                'amount' => 880,
                'status' => 'paid',
                'customer_name' => 'Peter',
                'customer_phone' => '1234567890',
                'customer_email' => 'jolyboy@gmail.com',
                'customer_address' => 'Colorado'
            )                
        );

        DB::table('transactions')->insert(
            array(
                'user_id' => 9,
                'invoice_id' => 2,
                'amount' => 326,
                'status' => 'paid',
                'customer_name' => 'David Hustler',
                'customer_phone' => '1234567890',
                'customer_email' => 'david.me@mail.com',
                'customer_address' => 'Colorado'
            )                
        );

        DB::table('transactions')->insert(
            array(
                'user_id' => 9,
                'invoice_id' => 3,
                'amount' => 120,
                'status' => 'paid',
                'customer_name' => 'Stephen Joe',
                'customer_phone' => '1234567890',
                'customer_email' => 'info@stephensons.net',
                'customer_address' => 'Colorado'
            )                
        );

        DB::table('transactions')->insert(
            array(
                'user_id' => 9,
                'invoice_id' => 4,
                'amount' => 449,
                'status' => 'Un paid',
                'customer_name' => 'John Smith',
                'customer_phone' => '1234567890',
                'customer_email' => 'john@mymail.com',
                'customer_address' => 'Colorado'
            )                
        );

        DB::table('transactions')->insert(
            array(
                'user_id' => 9,
                'invoice_id' => 4,
                'amount' => 449,
                'status' => 'Un paid',
                'customer_name' => 'John Smith',
                'customer_phone' => '1234567890',
                'customer_email' => 'john@mymail.com',
                'customer_address' => 'Colorado'
            )                
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('transactions', function (Blueprint $table) {
            //
        });
    }
};
