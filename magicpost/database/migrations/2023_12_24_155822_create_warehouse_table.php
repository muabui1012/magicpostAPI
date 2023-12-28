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
        Schema::create('warehouse', function (Blueprint $table) {
            $table->id();
            $table->string("name")->nullable();
            $table->integer('managerid')->nullable()->default(0);
            $table->string('staffList')->nullable()->default("[]");
            $table->integer('officeid')->nullable()->default(0);
            //$table->string('parceList')->nullable();
            $table->string('incomingFromOffice')->nullable()->default("[]");
            $table->string('incomingFromOtherWarehouse')->nullable()->default("[]");
            $table->string('outgoingToIOtherWarehouse')->nullable()->default("[]");
            $table->string('outgoingToOffice')->nullable()->default("[]");
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
        Schema::dropIfExists('warehouse');
    }
};
