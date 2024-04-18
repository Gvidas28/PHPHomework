<?php

namespace Database\Seeders;

use App\Models\Conference;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Conference::factory()->create([
            'name' => 'Name',
            'description' => 'Description',
            'location' => 'Location',
            'date' => now()->format('Y-m-d H:i'),
        ]);

        Conference::factory()->create([
            'name' => 'Name2',
            'description' => 'Description2',
            'location' => 'Location2',
            'date' => now()->format('Y-m-d H:i'),
        ]);
    }
}
