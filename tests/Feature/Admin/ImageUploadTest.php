<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ImageUploadTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_upload_an_image(): void
    {
        Storage::fake('public');

        $admin = User::factory()->admin()->create();
        $file = UploadedFile::fake()->image('photo.jpg', 800, 600);

        $response = $this->actingAs($admin)
            ->postJson('/@/wysiwyg/images', ['image' => $file]);

        $response->assertOk();
        $response->assertJsonStructure(['url']);

        $url = $response->json('url');
        $this->assertStringContainsString('wysiwyg-images/', $url);

        Storage::disk('public')->assertExists(
            'wysiwyg-images/'.basename($url),
        );
    }

    public function test_non_admin_cannot_upload_an_image(): void
    {
        Storage::fake('public');

        $user = User::factory()->create();
        $file = UploadedFile::fake()->image('photo.jpg');

        $response = $this->actingAs($user)
            ->postJson('/@/wysiwyg/images', ['image' => $file]);

        $response->assertStatus(403);
    }

    public function test_unauthenticated_user_cannot_upload_an_image(): void
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->image('photo.jpg');

        $response = $this->postJson('/@/wysiwyg/images', ['image' => $file]);

        $response->assertUnauthorized();
    }

    public function test_upload_fails_when_no_file_sent(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)
            ->postJson('/@/wysiwyg/images', []);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['image']);
    }

    public function test_upload_fails_for_non_image_file(): void
    {
        $admin = User::factory()->admin()->create();
        $file = UploadedFile::fake()->create('document.pdf', 100, 'application/pdf');

        $response = $this->actingAs($admin)
            ->postJson('/@/wysiwyg/images', ['image' => $file]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['image']);
    }

    public function test_upload_fails_for_oversized_file(): void
    {
        $admin = User::factory()->admin()->create();
        // 6 MB — over the 5 MB limit
        $file = UploadedFile::fake()->image('big.jpg')->size(6144);

        $response = $this->actingAs($admin)
            ->postJson('/@/wysiwyg/images', ['image' => $file]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['image']);
    }
}
