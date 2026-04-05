<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('actions', function (Blueprint $table) {
            $table->foreignId('action_category_id')
                ->nullable()
                ->after('slug')
                ->constrained('action_categories');
        });

        $sortOrders = [
            'Fratrie' => 1,
            'Parentalite et handicap' => 2,
            'Reconnaissance et statut des aidants' => 3,
            'Transformation des politiques publiques' => 4,
        ];

        $categories = DB::table('actions')
            ->select('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category')
            ->filter();

        foreach ($categories as $index => $name) {
            $slug = Str::slug($name);

            $categoryId = DB::table('action_categories')->insertGetId([
                'name' => $name,
                'slug' => $slug !== '' ? $slug : 'categorie-'.($index + 1),
                'sort_order' => $sortOrders[$name] ?? ($index + 1),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('actions')
                ->where('category', $name)
                ->update(['action_category_id' => $categoryId]);
        }

        DB::statement('ALTER TABLE actions ALTER COLUMN action_category_id SET NOT NULL');

        Schema::table('actions', function (Blueprint $table) {
            $table->dropColumn('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('actions', function (Blueprint $table) {
            $table->string('category')->nullable()->index();
        });

        $categories = DB::table('action_categories')->pluck('name', 'id');

        foreach ($categories as $id => $name) {
            DB::table('actions')
                ->where('action_category_id', $id)
                ->update(['category' => $name]);
        }

        Schema::table('actions', function (Blueprint $table) {
            $table->dropConstrainedForeignId('action_category_id');
        });
    }
};
