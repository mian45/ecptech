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
        Schema::create('eye_prescription_setting', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('sphere_from', 5, 2);
            $table->decimal('sphere_to', 5, 2);
            $table->decimal('cylinder_from', 5, 2);
            $table->decimal('cylinder_to', 5, 2);
            $table->integer('user_id')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });       
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('eye_prescription_setting');
    }
};
