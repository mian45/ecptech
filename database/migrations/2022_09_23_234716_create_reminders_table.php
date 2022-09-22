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
        Schema::create('reminders', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->enum('type', ['welcome', 'thankyou','reminder'])->nullable();
            $table->enum('invoice_type', ['paid', 'unpaid'])->nullable();
            $table->string('subject');
            $table->string('body');
            $table->integer('send_after_day')->nullable();
            $table->string('send_time',50);
            $table->unsignedBigInteger('timezone_id');
            $table->boolean('is_active');
            $table->softDeletes();
            $table->timestamps();

            $table->unsignedBigInteger('created_by');
            $table->unsignedBigInteger('updated_by');
            $table->unsignedBigInteger('deleted_by');

            $table->foreign('created_by')->references('id')->on('users');
            $table->foreign('updated_by')->references('id')->on('users');
            $table->foreign('deleted_by')->references('id')->on('users');

            $table->foreign('timezone_id')->references('id')->on('timezones');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reminders');
    }
};
