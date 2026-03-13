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
        Schema::create('moi_aussi_forms', function (Blueprint $table) {
            $table->id();
            $table->string('situation'); // oui, en_cours, resolu
            $table->text('testimony');
            $table->json('consequences')->nullable(); // array of selected consequences
            $table->boolean('contacted_institution')->nullable();
            $table->string('institution_name')->nullable();
            $table->boolean('usage_anonymised')->default(false);
            $table->boolean('usage_collective')->default(false);
            $table->boolean('usage_legislation')->default(false);
            $table->boolean('usage_confidential')->default(false);
            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('moi_aussi_forms');
    }
};
