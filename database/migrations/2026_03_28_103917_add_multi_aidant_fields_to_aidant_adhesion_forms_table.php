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
        Schema::table('aidant_adhesion_forms', function (Blueprint $table) {
            $table->json('aidants')->nullable()->after('commune');
            $table->json('aides')->nullable()->after('aidants');
            $table->boolean('declaration_honneur')->default(false)->after('consents_rgpd');
            $table->unsignedInteger('don_amount_cents')->nullable()->after('declaration_honneur');
            $table->string('aidant_type_autre_precisions')->nullable()->after('aidant_type');
            $table->string('situation_familiale_autre_precisions')->nullable()->after('situation_familiale');
            $table->string('type_situation_autre_precisions')->nullable()->after('type_situation');
            $table->string('scolarisation_autre_precisions')->nullable()->after('scolarisation');
            $table->string('situation_adulte_autre_precisions')->nullable()->after('situation_adulte');
            $table->string('lieu_habitation_autre_precisions')->nullable()->after('lieu_habitation');
            $table->string('impacts_autre_precisions')->nullable()->after('impacts');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('aidant_adhesion_forms', function (Blueprint $table) {
            $table->dropColumn([
                'aidants',
                'aides',
                'declaration_honneur',
                'don_amount_cents',
                'aidant_type_autre_precisions',
                'situation_familiale_autre_precisions',
                'type_situation_autre_precisions',
                'scolarisation_autre_precisions',
                'situation_adulte_autre_precisions',
                'lieu_habitation_autre_precisions',
                'impacts_autre_precisions',
            ]);
        });
    }
};
