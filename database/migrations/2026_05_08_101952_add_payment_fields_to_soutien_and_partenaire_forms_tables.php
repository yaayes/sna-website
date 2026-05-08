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
        Schema::table('soutien_forms', function (Blueprint $table) {
            $table->unsignedInteger('don_amount_cents')->nullable()->after('consents_rgpd');
        });

        Schema::table('partenaire_forms', function (Blueprint $table) {
            $table->unsignedInteger('don_amount_cents')->nullable()->after('consents_rgpd');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('soutien_forms', function (Blueprint $table) {
            $table->dropColumn('don_amount_cents');
        });

        Schema::table('partenaire_forms', function (Blueprint $table) {
            $table->dropColumn('don_amount_cents');
        });
    }
};
