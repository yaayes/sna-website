<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('aidant_adhesion_forms', function (Blueprint $table) {
            $table->string('status', 20)->default('draft')->index()->after('draft_completed_at');
        });

        DB::table('aidant_adhesion_forms')
            ->whereNotNull('draft_completed_at')
            ->update(['status' => 'completed']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('aidant_adhesion_forms', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
