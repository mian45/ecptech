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
            $table->string('name')->nullable()->change();
            $table->unsignedBigInteger('lense_type_id')->nullable();
            $table->string('category')->nullable();
            $table->unsignedBigInteger('lense_material_id')->nullable();
            
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
            $table->string('name')->nullable(false)->change();
            $table->dropColumn('lense_type_id');
            $table->dropColumn('lense_material_id');
            $table->dropColumn('category');

        });
    }
};
