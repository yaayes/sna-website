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
        Schema::table('partenaire_forms', function (Blueprint $table) {
            $table->string('address')->after('legal_status');
            $table->string('phone')->nullable()->after('address');
            $table->text('partnership_moral_details')->nullable()->after('partnership_moral');
            $table->text('partnership_technical_details')->nullable()->after('partnership_technical');
            $table->text('comment_libre')->nullable()->after('objectives');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('partenaire_forms', function (Blueprint $table) {
            $table->dropColumn(['address', 'phone', 'partnership_moral_details', 'partnership_technical_details', 'comment_libre']);
        });
    }
};
