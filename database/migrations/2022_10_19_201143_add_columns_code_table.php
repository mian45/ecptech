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
        Schema::table('codes', function (Blueprint $table) {
            $table->unsignedBigInteger('vision_plan_id');
            $table->foreign('vision_plan_id')->references('id')->on('vision_plans');
            $table->string('lense_type')->nullable();
            $table->string('price')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('codes', function (Blueprint $table) {
            $table->dropColumn('vision_plan_id');
            $table->dropColumn('lense_type');
            $table->string('price')->nullable(false)->change();
        });
    }
};
