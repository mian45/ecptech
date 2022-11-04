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
        Schema::table('prescriptions', function (Blueprint $table) {
            $table->string('name')->nullable()->change();
            $table->decimal('sphere_from', 5, 2)->nullable()->change();
            $table->decimal('sphere_to', 5, 2)->nullable()->change();
            $table->decimal('cylinder_from', 5, 2)->nullable()->change();
            $table->decimal('cylinder_to', 5, 2)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('prescriptions', function (Blueprint $table) {
            $table->string('name')->nullable(false)->change();
            $table->decimal('sphere_from', 5, 2)->nullable(false)->change();
            $table->decimal('sphere_to', 5, 2)->nullable(false)->change();
            $table->decimal('cylinder_from', 5, 2)->nullable(false)->change();
            $table->decimal('cylinder_to', 5, 2)->nullable(false)->change();
        });
    }
};
