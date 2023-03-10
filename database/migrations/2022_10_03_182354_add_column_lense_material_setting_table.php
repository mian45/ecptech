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
            $table->enum('status', ['active', 'inactive'])->default('inactive');
            $table->decimal('price',10,2);
            $table->dropColumn('title');
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
            $table->dropColumn('status');
            $table->dropColumn('price');
        });
    }
};

