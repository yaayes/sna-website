<?php

namespace Database\Seeders;

use App\Models\ActionCategory;
use Illuminate\Database\Seeder;

class ActionCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->categories() as $category) {
            ActionCategory::updateOrCreate(
                ['slug' => $category['slug']],
                $category,
            );
        }
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function categories(): array
    {
        return [
            [
                'name' => 'Droits sociaux, emploi et protection économique',
                'slug' => 'droits-sociaux-emploi-et-protection-economique',
                'sort_order' => 1,
            ],
            [
                'name' => 'Santé, répit et prévention de l\'épuisement',
                'slug' => 'sante-repit-et-prevention-de-l-epuisement',
                'sort_order' => 2,
            ],
            [
                'name' => 'Transformation des politiques publiques',
                'slug' => 'transformation-des-politiques-publiques',
                'sort_order' => 3,
            ],
            [
                'name' => 'Parcours de soins',
                'slug' => 'parcours-de-soins',
                'sort_order' => 4,
            ],
        ];
    }
}
