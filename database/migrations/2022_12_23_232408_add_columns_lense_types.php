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
        Schema::table('lense_types', function (Blueprint $table) {
            $table->integer('is_category')->default(0)->nullable();
            $table->integer('is_sub_category')->default(0)->nullable();
            $table->unsignedBigInteger('lense_type_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('lense_types', function (Blueprint $table) {
            $table->dropColumn('is_category');
            $table->dropColumn('is_sub_category');
            $table->dropColumn('lense_type_id');
        });
    }
};
