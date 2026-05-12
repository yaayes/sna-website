<?php

namespace Tests\Feature;

use App\Models\FormAccessToken;
use App\Models\User;
use App\Notifications\FormSubmissionAdminNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class ContactFormNotificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_form_sends_notification_only_after_successful_submission(): void
    {
        Notification::fake();

        $admin = User::factory()->admin()->create();

        $response = $this->from(route('forms.contact.page'))->post(route('forms.contact.store'), [
            'name' => 'Marie Dupont',
            'city' => 'Paris',
            'email' => 'marie@example.com',
            'phone' => '0600000000',
            'subject' => 'Demande de contact',
            'message' => 'Bonjour, je souhaite être recontactée.',
            'profile' => 'aidant',
            'contact_preference' => 'email',
        ]);

        $response->assertRedirect(route('forms.contact.page'));
        $response->assertSessionHas('success');

        Notification::assertSentTo($admin, FormSubmissionAdminNotification::class);
        $this->assertSame(1, FormAccessToken::where('email', 'marie@example.com')->count());
    }
}
