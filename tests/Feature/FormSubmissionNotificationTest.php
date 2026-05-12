<?php

namespace Tests\Feature;

use App\Actions\NotifyOnFormSubmissionCreated;
use App\Models\FormAccessToken;
use App\Models\FormSubmission;
use App\Models\Payment;
use App\Models\User;
use App\Notifications\FormSubmissionAdminNotification;
use App\Notifications\FormSubmissionConfirmationNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class FormSubmissionNotificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_form_submission_does_not_notify_on_create(): void
    {
        Notification::fake();

        User::factory()->admin()->create(['email' => 'admin1@example.com']);

        FormSubmission::create([
            'email' => 'submitter@example.com',
            'type' => 'contact',
            'formable_type' => 'App\Models\ContactForm',
            'formable_id' => 1,
            'access_token' => 'token123',
            'token_expires_at' => now()->addDays(30),
        ]);

        Notification::assertNothingSent();
        $this->assertDatabaseMissing('form_access_tokens', [
            'email' => 'submitter@example.com',
        ]);
    }

    public function test_form_submission_completion_sends_notification_to_admin_users(): void
    {
        Notification::fake();

        $admin1 = User::factory()->admin()->create(['email' => 'admin1@example.com']);
        $admin2 = User::factory()->admin()->create(['email' => 'admin2@example.com']);
        User::factory()->create(['email' => 'user@example.com', 'is_admin' => false]);

        $submission = FormSubmission::create([
            'email' => 'submitter@example.com',
            'type' => 'contact',
            'formable_type' => 'App\Models\ContactForm',
            'formable_id' => 1,
            'access_token' => 'token123',
            'token_expires_at' => now()->addDays(30),
        ]);

        (new NotifyOnFormSubmissionCreated)($submission);

        Notification::assertSentTo($admin1, FormSubmissionAdminNotification::class);
        Notification::assertSentTo($admin2, FormSubmissionAdminNotification::class);

        $user = User::where('is_admin', false)->first();
        Notification::assertNotSentTo($user, FormSubmissionAdminNotification::class);
    }

    public function test_form_submission_completion_generates_access_token_for_submitter(): void
    {
        Notification::fake();

        User::factory()->admin()->create();

        $submission = FormSubmission::create([
            'email' => 'submitter@example.com',
            'type' => 'contact',
            'formable_type' => 'App\Models\ContactForm',
            'formable_id' => 1,
            'access_token' => 'token123',
            'token_expires_at' => now()->addDays(30),
        ]);

        (new NotifyOnFormSubmissionCreated)($submission);

        $token = FormAccessToken::where('email', 'submitter@example.com')->first();

        $this->assertNotNull($token);
        $this->assertNotNull($token->token);
        $this->assertTrue($token->expires_at->isFuture());
        $this->assertLessThanOrEqual(3600, $token->expires_at->diffInSeconds(now()));
    }

    public function test_form_submission_completion_includes_submission_details_for_admin(): void
    {
        Notification::fake();

        $admin = User::factory()->admin()->create();

        $submission = FormSubmission::create([
            'email' => 'submitter@example.com',
            'type' => 'adhesion',
            'formable_type' => 'App\Models\AidantAdhesionForm',
            'formable_id' => 42,
            'access_token' => 'token123',
            'token_expires_at' => now()->addDays(30),
        ]);

        (new NotifyOnFormSubmissionCreated)($submission);

        Notification::assertSentTo($admin, FormSubmissionAdminNotification::class);

        $this->assertDatabaseHas('form_submissions', [
            'email' => 'submitter@example.com',
            'type' => 'adhesion',
        ]);
    }

    public function test_form_submission_completion_without_admins_still_creates_access_token(): void
    {
        Notification::fake();

        $submission = FormSubmission::create([
            'email' => 'submitter@example.com',
            'type' => 'soutien',
            'formable_type' => 'App\Models\SoutienForm',
            'formable_id' => 1,
            'access_token' => 'token123',
            'token_expires_at' => now()->addDays(30),
        ]);

        (new NotifyOnFormSubmissionCreated)($submission);

        $token = FormAccessToken::where('email', 'submitter@example.com')->first();
        $this->assertNotNull($token);
    }

    public function test_form_submission_completion_admin_receives_correct_form_type_label(): void
    {
        Notification::fake();

        $admin = User::factory()->admin()->create();

        $submission = FormSubmission::create([
            'email' => 'submitter@example.com',
            'type' => 'soutien',
            'formable_type' => 'App\Models\SoutienForm',
            'formable_id' => 1,
            'access_token' => 'token123',
            'token_expires_at' => now()->addDays(30),
        ]);

        (new NotifyOnFormSubmissionCreated)($submission);

        Notification::assertSentTo($admin, FormSubmissionAdminNotification::class);
    }

    public function test_multiple_form_submission_completions_each_trigger_notifications(): void
    {
        Notification::fake();

        $admin = User::factory()->admin()->create();

        $submission1 = FormSubmission::create([
            'email' => 'user1@example.com',
            'type' => 'contact',
            'formable_type' => 'App\Models\ContactForm',
            'formable_id' => 1,
            'access_token' => 'token1',
            'token_expires_at' => now()->addDays(30),
        ]);

        $submission2 = FormSubmission::create([
            'email' => 'user2@example.com',
            'type' => 'adhesion',
            'formable_type' => 'App\Models\AidantAdhesionForm',
            'formable_id' => 2,
            'access_token' => 'token2',
            'token_expires_at' => now()->addDays(30),
        ]);

        (new NotifyOnFormSubmissionCreated)($submission1);
        (new NotifyOnFormSubmissionCreated)($submission2);

        $sentNotifications = Notification::sent($admin, FormSubmissionAdminNotification::class);
        $this->assertCount(2, $sentNotifications);

        $token1 = FormAccessToken::where('email', 'user1@example.com')->first();
        $token2 = FormAccessToken::where('email', 'user2@example.com')->first();
        $this->assertNotNull($token1);
        $this->assertNotNull($token2);
    }

    public function test_form_submission_completion_is_idempotent(): void
    {
        Notification::fake();

        $admin = User::factory()->admin()->create();

        $submission = FormSubmission::create([
            'email' => 'submitter@example.com',
            'type' => 'contact',
            'formable_type' => 'App\Models\ContactForm',
            'formable_id' => 1,
            'access_token' => 'token123',
            'token_expires_at' => now()->addDays(30),
        ]);

        (new NotifyOnFormSubmissionCreated)($submission);
        (new NotifyOnFormSubmissionCreated)($submission);

        $this->assertCount(1, Notification::sent($admin, FormSubmissionAdminNotification::class));
        $this->assertSame(1, FormAccessToken::where('email', 'submitter@example.com')->count());
        $this->assertNotNull($submission->fresh()->notified_at);
    }

    public function test_notifications_include_payment_information_when_submission_has_payment(): void
    {
        Notification::fake();

        $admin = User::factory()->admin()->create();

        $submission = FormSubmission::create([
            'email' => 'paying@example.com',
            'type' => 'adhesion',
            'formable_type' => 'App\Models\AidantAdhesionForm',
            'formable_id' => 10,
            'access_token' => 'token123',
            'token_expires_at' => now()->addDays(30),
        ]);

        Payment::factory()->captured()->create([
            'form_submission_id' => $submission->id,
            'amount_cents' => 2550,
            'currency' => 'EUR',
            'merchant_reference' => 'ADH-PAY-001',
            'cawl_payment_id' => '9000001234_1',
        ]);

        (new NotifyOnFormSubmissionCreated)($submission);

        Notification::assertSentTo($admin, FormSubmissionAdminNotification::class, function (FormSubmissionAdminNotification $notification, array $channels) use ($admin): bool {
            $mail = $notification->toMail($admin);

            return ($mail->viewData['paymentInfo']['amountEuros'] ?? null) === '25,50'
                && ($mail->viewData['paymentInfo']['merchantReference'] ?? null) === 'ADH-PAY-001';
        });

        Notification::assertSentOnDemand(FormSubmissionConfirmationNotification::class, function (FormSubmissionConfirmationNotification $notification, array $channels, object $notifiable): bool {
            $mail = $notification->toMail($notifiable);

            return ($mail->viewData['paymentInfo']['amountEuros'] ?? null) === '25,50'
                && ($mail->viewData['paymentInfo']['merchantReference'] ?? null) === 'ADH-PAY-001';
        });
    }

    public function test_notifications_do_not_include_payment_information_when_submission_has_no_payment(): void
    {
        Notification::fake();

        $admin = User::factory()->admin()->create();

        $submission = FormSubmission::create([
            'email' => 'nopayment@example.com',
            'type' => 'contact',
            'formable_type' => 'App\Models\ContactForm',
            'formable_id' => 11,
            'access_token' => 'token123',
            'token_expires_at' => now()->addDays(30),
        ]);

        (new NotifyOnFormSubmissionCreated)($submission);

        Notification::assertSentTo($admin, FormSubmissionAdminNotification::class, function (FormSubmissionAdminNotification $notification, array $channels) use ($admin): bool {
            $mail = $notification->toMail($admin);

            return ($mail->viewData['paymentInfo'] ?? null) === null;
        });

        Notification::assertSentOnDemand(FormSubmissionConfirmationNotification::class, function (FormSubmissionConfirmationNotification $notification, array $channels, object $notifiable): bool {
            $mail = $notification->toMail($notifiable);

            return ($mail->viewData['paymentInfo'] ?? null) === null;
        });
    }
}
