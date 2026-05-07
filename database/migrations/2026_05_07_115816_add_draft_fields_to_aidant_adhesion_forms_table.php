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
            $table->string('draft_token', 64)->nullable()->unique()->after('ref');
            $table->unsignedTinyInteger('draft_step')->nullable()->after('draft_token');
            $table->timestamp('draft_saved_at')->nullable()->after('draft_step');
            $table->timestamp('draft_completed_at')->nullable()->after('draft_saved_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('aidant_adhesion_forms', function (Blueprint $table) {
            $table->dropColumn(['draft_token', 'draft_step', 'draft_saved_at', 'draft_completed_at']);
        });
    }
};
