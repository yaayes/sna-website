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
        Schema::create('aidant_adhesion_forms', function (Blueprint $table) {
            $table->id();
            $table->string('ref')->unique()->nullable();
            // 1. Identité de l'aidant
            $table->string('genre')->nullable();
            $table->string('nom');
            $table->string('prenom');
            $table->string('age')->nullable();
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('departement')->nullable();
            $table->string('commune')->nullable();
            // 2. Situation d'aidant
            $table->string('aidant_type'); // parent_handicap, conjoint, parent_aine, proche, autre
            $table->string('situation_familiale')->nullable(); // en_couple, separe, divorce, veuf, autre
            $table->string('aide_tranche_age')->nullable(); // moins_18, 18_65, plus_65
            $table->string('aide_age')->nullable();
            $table->json('type_situation')->nullable(); // array of handicap types
            $table->string('reconnaissance_administrative')->nullable();
            // 3. Personne aidée principale
            $table->string('aide_genre')->nullable();
            $table->string('scolarisation')->nullable();
            $table->string('situation_adulte')->nullable();
            $table->string('lieu_habitation')->nullable();
            // 4. Impact
            $table->json('impacts')->nullable();
            // 5. Situation professionnelle
            $table->string('situation_professionnelle')->nullable();
            // 6. Expression libre
            $table->text('expression_libre')->nullable();
            // 7. Soutien SNA
            $table->boolean('soutient_sna')->default(false);
            $table->boolean('wants_info')->default(false);
            // Consents
            $table->boolean('consents_rgpd')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aidant_adhesion_forms');
    }
};
