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
            $table->string('address')->nullable()->after('name');
            $table->dropColumn(['organisation', 'statut', 'wants_partnership']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('soutien_forms', function (Blueprint $table) {
            $table->string('organisation')->nullable()->after('name');
            $table->string('statut')->default('physique')->after('organisation');
            $table->boolean('wants_partnership')->default(false)->after('phone');
            $table->dropColumn('address');
        });
    }
};
