<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('soutien_forms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('organisation')->nullable();
            $table->string('statut'); // physique, morale
            $table->string('email');
            $table->string('phone')->nullable();
            $table->boolean('wants_partnership')->default(false);
            $table->boolean('wants_events')->default(false);
            $table->boolean('wants_participation')->default(false);
            $table->text('message')->nullable();
            $table->boolean('consents_email')->default(false);
            $table->boolean('consents_rgpd')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('soutien_forms');
    }
};
