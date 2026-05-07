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
            $table->string('coupon_code')->nullable()->after('don_amount_cents');
            $table->unsignedInteger('coupon_discount_cents')->nullable()->after('coupon_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('aidant_adhesion_forms', function (Blueprint $table) {
            $table->dropColumn(['coupon_code', 'coupon_discount_cents']);
        });
    }
};
