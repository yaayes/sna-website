<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@sna-aidants.fr'],
            [
                'name' => 'Admin SNA',
                'email' => 'admin@sna-aidants.fr',
                'password' => Hash::make('Admin@1234!'),
                'email_verified_at' => now(),
                'is_admin' => true,
            ]
        );
    }
}
