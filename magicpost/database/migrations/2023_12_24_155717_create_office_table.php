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
        Schema::create('office', function (Blueprint $table) {
            $table->id();
            $table->string("name")->nullable()->default("");
            $table->integer('managerid')->nullable()->default(0);
            $table->string('staffList')->nullable()->default("[]");
            $table->string('incomingFromCustomer')->nullable()->default("[]");
            $table->string('incomingFromWarehouse')->nullable()->default("[]");
            $table->string('outgoingToWarehouse')->nullable()->default("[]");
            $table->string('outgoingToCustomer')->nullable()->default("[]");
            $table->string('failed')->nullable()->default("[]");
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
        Schema::dropIfExists('office');
    }
};
