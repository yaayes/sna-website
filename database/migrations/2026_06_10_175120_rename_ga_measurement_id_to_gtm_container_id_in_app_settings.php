<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('app_settings')
            ->where('key', 'ga_measurement_id')
            ->update(['key' => 'gtm_container_id']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('app_settings')
            ->where('key', 'gtm_container_id')
            ->update(['key' => 'ga_measurement_id']);
    }
};
