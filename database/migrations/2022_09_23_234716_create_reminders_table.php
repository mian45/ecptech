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
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->integer('deleted_by')->nullable();
            $table->softDeletes();
            $table->timestamps();

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
