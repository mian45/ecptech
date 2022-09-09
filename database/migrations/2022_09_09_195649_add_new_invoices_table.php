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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('customer_id');
            $table->integer('user_id');
            $table->integer('product_id')->nullable();
            $table->integer('staff_id');
            $table->decimal('amount', 10, 2);
            $table->string('status')->default('unpaid')->nullable();
            $table->string('payment_mode')->nullable();
            $table->timestamps();
        });

        DB::table('invoices')->insert(
            array(
                'name' => 'Peter New Invoice',
                'customer_id' => 1,
                'user_id' => 9,
                'staff_id' => 1,
                'amount' => '880',
                'status' => 'created',
                'payment_mode' => '1'
            )                
        );

        DB::table('invoices')->insert(
            array(
                'name' => 'Devid Frame',
                'customer_id' => 1,
                'user_id' => 9,
                'staff_id' => 1,
                'amount' => '326',
                'status' => 'created',
                'payment_mode' => '1'
            )                
        );

        DB::table('invoices')->insert(
            array(
                'name' => 'Stephen Smith Glasses',
                'customer_id' => 1,
                'user_id' => 9,
                'staff_id' => 1,
                'amount' => '449',
                'status' => 'created',
                'payment_mode' => '1'
            )                
        );

         DB::table('invoices')->insert(
            array(
                'name' => 'John Smith Glasses',
                'customer_id' => 1,
                'user_id' => 9,
                'staff_id' => 1,
                'amount' => '449',
                'status' => 'created',
                'payment_mode' => '1'
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
        Schema::table('invoices', function (Blueprint $table) {
            //
        });
    }
};
