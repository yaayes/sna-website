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
        Schema::create('partenaire_forms', function (Blueprint $table) {
            $table->id();
            $table->string('organisation_name');
            $table->string('legal_status');
            $table->string('email');
            $table->string('contact_name');
            $table->boolean('partnership_moral')->default(false);
            $table->boolean('partnership_technical')->default(false);
            $table->boolean('partnership_financial')->default(false);
            $table->text('objectives');
            $table->boolean('commitment_projects')->default(false);
            $table->boolean('commitment_communication')->default(false);
            $table->boolean('commitment_expertise')->default(false);
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
        Schema::dropIfExists('partenaire_forms');
    }
};
