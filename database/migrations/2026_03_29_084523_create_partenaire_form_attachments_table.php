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
        Schema::create('partenaire_form_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('partenaire_form_id')->constrained('partenaire_forms')->cascadeOnDelete();
            $table->string('file_path');
            $table->string('original_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partenaire_form_attachments');
    }
};
