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
        foreach (['moi_aussi_forms', 'soutien_forms', 'partenaire_forms'] as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                $table->string('ref', 12)->unique()->nullable()->after('id');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        foreach (['moi_aussi_forms', 'soutien_forms', 'partenaire_forms'] as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                $table->dropColumn('ref');
            });
        }
    }
};
