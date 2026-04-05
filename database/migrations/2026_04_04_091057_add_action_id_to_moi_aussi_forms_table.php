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
        Schema::table('moi_aussi_forms', function (Blueprint $table) {
            $table->foreignId('action_id')
                ->nullable()
                ->constrained('actions')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('moi_aussi_forms', function (Blueprint $table) {
            $table->dropConstrainedForeignId('action_id');
        });
    }
};
