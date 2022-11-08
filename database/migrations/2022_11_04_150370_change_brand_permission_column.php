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
        Schema::table('brand_permissions', function (Blueprint $table) {
            $table->string('lense_type_title')->nullable();
            $table->string('brand_title')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('brand_permissions', function (Blueprint $table) {
            $table->dropColumn('lense_type_title');
            $table->dropColumn('brand_title');
        });
    }
};