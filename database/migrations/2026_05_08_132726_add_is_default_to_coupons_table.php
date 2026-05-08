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
        Schema::table('coupons', function (Blueprint $table) {
            $table->boolean('is_default')->default(false)->after('is_active');
        });

        // Partial unique index: only one row may have is_default = true.
        // Uses a WHERE clause so it only constrains the is_default=true row.
        DB::statement('CREATE UNIQUE INDEX coupons_single_default ON coupons (is_default) WHERE (is_default = true)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP INDEX IF EXISTS coupons_single_default');

        Schema::table('coupons', function (Blueprint $table) {
            $table->dropColumn('is_default');
        });
    }
};
