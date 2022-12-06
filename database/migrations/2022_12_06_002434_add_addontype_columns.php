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
        Schema::table('addon_types', function (Blueprint $table) {
            $table->unsignedBigInteger('vision_plan_id')->nullable();
            $table->string('type')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('addon_types', function (Blueprint $table) {
            $table->dropColumn('vision_plan_id');
            $table->dropColumn('type');
        });
    }
};
