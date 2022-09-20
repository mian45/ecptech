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
        Schema::create('user_lense_settings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('vision_plan_id');
            $table->unsignedBigInteger('lense_type_id');
            $table->unsignedBigInteger('brand_id');
            $table->unsignedBigInteger('collection_id');
            $table->unsignedBigInteger('base_lense_id');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('vision_plan_id')->references('id')->on('vision_plans');
            $table->foreign('lense_type_id')->references('id')->on('lense_types');
            $table->foreign('brand_id')->references('id')->on('brands');
            $table->foreign('collection_id')->references('id')->on('collections');
            $table->foreign('base_lense_id')->references('id')->on('base_lenses');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_lense_settings');
    }
};
