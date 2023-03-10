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
        Schema::table('user_lense_material_settings', function (Blueprint $table) {
            $table->string('display_name')->nullable();
            $table->decimal('price',10,2)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_lense_material_settings', function (Blueprint $table) {

            $table->dropColumn('display_name');
            $table->decimal('price',10,2)->nullable(false)->change();
        });
    }
};
