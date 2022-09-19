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
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('sphere_from', 5, 2);
            $table->decimal('sphere_to', 5, 2);
            $table->decimal('cylinder_from', 5, 2);
            $table->decimal('cylinder_to', 5, 2);
            $table->bigInteger('user_id')->unsigned();
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
        Schema::dropIfExists('prescriptions');
    }
};
