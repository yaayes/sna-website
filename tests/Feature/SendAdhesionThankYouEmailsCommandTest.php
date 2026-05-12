<?php

namespace Tests\Feature;

use App\Models\AidantAdhesionForm;
use App\Models\FormAccessToken;
use App\Models\FormSubmission;
use App\Models\Payment;
use App\Notifications\FormSubmissionConfirmationNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class SendAdhesionThankYouEmailsCommandTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @return array{form: AidantAdhesionForm, submission: FormSubmission}
     */
    private function createAdhesionSubmission(array $submissionOverrides = [], array $formOverrides = []): array
    {
        $form = AidantAdhesionForm::factory()->create($formOverrides);

        $submission = FormSubmission::factory()->create(array_merge([
            'type' => 'adhesion',
            'email' => 'member@example.com',
            'formable_type' => AidantAdhesionForm::class,
            'formable_id' => $form->id,
            'notified_at' => null,
        ], $submissionOverrides));

        return [
            'form' => $form,
            'submission' => $submission,
        ];
    }

    public function test_command_sends_thank_you_email_to_eligible_unnotified_adhesion_submissions(): void
    {
        Notification::fake();

        $eligible = $this->createAdhesionSubmission([
            'email' => 'eligible@example.com',
        ]);

        Payment::factory()->captured()->create([
            'form_submission_id' => $eligible['submission']->id,
            'amount_cents' => 3000,
        ]);

        $alreadyNotified = $this->createAdhesionSubmission([
            'email' => 'already-notified@example.com',
            'notified_at' => now()->subDay(),
        ]);

        Payment::factory()->captured()->create([
            'form_submission_id' => $alreadyNotified['submission']->id,
            'amount_cents' => 2100,
        ]);

        $failedPayment = $this->createAdhesionSubmission([
            'email' => 'failed-payment@example.com',
        ]);

        Payment::factory()->rejected()->create([
            'form_submission_id' => $failedPayment['submission']->id,
            'amount_cents' => 1800,
        ]);

        $draft = $this->createAdhesionSubmission([
            'email' => 'draft@example.com',
        ], [
            'status' => AidantAdhesionForm::STATUS_DRAFT,
        ]);

        Payment::factory()->captured()->create([
            'form_submission_id' => $draft['submission']->id,
            'amount_cents' => 2700,
        ]);

        $this->artisan('app:send-adhesion-thank-you-emails')
            ->expectsOutput('Thank-you emails sent: 1. Skipped: 0.')
            ->assertExitCode(0);

        Notification::assertSentOnDemand(FormSubmissionConfirmationNotification::class, function (FormSubmissionConfirmationNotification $notification, array $channels, object $notifiable): bool {
            return $notifiable->routes['mail'] === 'eligible@example.com';
        });

        $this->assertNotNull($eligible['submission']->fresh()->notified_at);
        $this->assertSame(1, FormAccessToken::query()->where('email', 'eligible@example.com')->count());
        $this->assertNull($failedPayment['submission']->fresh()->notified_at);
        $this->assertNull($draft['submission']->fresh()->notified_at);
    }

    public function test_command_dry_run_does_not_send_or_update_anything(): void
    {
        Notification::fake();

        $submissionData = $this->createAdhesionSubmission([
            'email' => 'dry-run@example.com',
        ]);

        Payment::factory()->captured()->create([
            'form_submission_id' => $submissionData['submission']->id,
            'amount_cents' => 2500,
        ]);

        $this->artisan('app:send-adhesion-thank-you-emails --dry-run')
            ->expectsOutput('Dry run: 1 adhesion submission(s) would receive a thank-you email.')
            ->assertExitCode(0);

        Notification::assertNothingSent();
        $this->assertNull($submissionData['submission']->fresh()->notified_at);
        $this->assertDatabaseCount('form_access_tokens', 0);
    }

    public function test_command_paid_only_option_excludes_submissions_without_payment(): void
    {
        Notification::fake();

        $withoutPayment = $this->createAdhesionSubmission([
            'email' => 'without-payment@example.com',
        ]);

        $withPayment = $this->createAdhesionSubmission([
            'email' => 'with-payment@example.com',
        ]);

        Payment::factory()->captured()->create([
            'form_submission_id' => $withPayment['submission']->id,
            'amount_cents' => 1900,
        ]);

        $this->artisan('app:send-adhesion-thank-you-emails --paid-only')
            ->expectsOutput('Thank-you emails sent: 1. Skipped: 0.')
            ->assertExitCode(0);

        Notification::assertSentOnDemand(FormSubmissionConfirmationNotification::class, function (FormSubmissionConfirmationNotification $notification, array $channels, object $notifiable): bool {
            return $notifiable->routes['mail'] === 'with-payment@example.com';
        });

        $this->assertNull($withoutPayment['submission']->fresh()->notified_at);
        $this->assertNotNull($withPayment['submission']->fresh()->notified_at);
        $this->assertDatabaseHas('form_access_tokens', [
            'email' => 'with-payment@example.com',
        ]);
    }

    public function test_command_limit_option_restricts_processed_submissions(): void
    {
        Notification::fake();

        $first = $this->createAdhesionSubmission([
            'email' => 'first@example.com',
        ]);

        $second = $this->createAdhesionSubmission([
            'email' => 'second@example.com',
        ]);

        Payment::factory()->captured()->create([
            'form_submission_id' => $first['submission']->id,
            'amount_cents' => 1000,
        ]);

        Payment::factory()->captured()->create([
            'form_submission_id' => $second['submission']->id,
            'amount_cents' => 1000,
        ]);

        $this->artisan('app:send-adhesion-thank-you-emails --limit=1')
            ->expectsOutput('Thank-you emails sent: 1. Skipped: 0.')
            ->assertExitCode(0);

        $this->assertNotNull($first['submission']->fresh()->notified_at);
        $this->assertNull($second['submission']->fresh()->notified_at);

        Notification::assertSentOnDemand(FormSubmissionConfirmationNotification::class, function (FormSubmissionConfirmationNotification $notification, array $channels, object $notifiable): bool {
            return $notifiable->routes['mail'] === 'first@example.com';
        });
    }
}
