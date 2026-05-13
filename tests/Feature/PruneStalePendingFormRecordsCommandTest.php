<?php

namespace Tests\Feature;

use App\Models\FormSubmission;
use App\Models\PartenaireForm;
use App\Models\Payment;
use App\Models\SoutienForm;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PruneStalePendingFormRecordsCommandTest extends TestCase
{
    use RefreshDatabase;

    public function test_prune_command_deletes_only_stale_pending_records_older_than_two_weeks(): void
    {
        $stalePendingSoutien = SoutienForm::factory()->create();
        $stalePendingPartenaire = PartenaireForm::factory()->create();
        $recentPendingSoutien = SoutienForm::factory()->create();
        $stalePaidSoutien = SoutienForm::factory()->create();
        $staleNotifiedPartenaire = PartenaireForm::factory()->create();

        $stalePendingSoutienSubmission = $this->createSubmission($stalePendingSoutien, 'soutien');
        $stalePendingPartenaireSubmission = $this->createSubmission($stalePendingPartenaire, 'partenaire');
        $recentPendingSoutienSubmission = $this->createSubmission($recentPendingSoutien, 'soutien');
        $stalePaidSoutienSubmission = $this->createSubmission($stalePaidSoutien, 'soutien');
        $staleNotifiedPartenaireSubmission = $this->createSubmission($staleNotifiedPartenaire, 'partenaire', now()->subDays(20));

        Payment::factory()->create([
            'form_submission_id' => $stalePendingSoutienSubmission->id,
            'status' => 'pending',
        ]);

        Payment::factory()->create([
            'form_submission_id' => $stalePendingPartenaireSubmission->id,
            'status' => 'pending',
        ]);

        Payment::factory()->create([
            'form_submission_id' => $recentPendingSoutienSubmission->id,
            'status' => 'pending',
        ]);

        Payment::factory()->create([
            'form_submission_id' => $stalePaidSoutienSubmission->id,
            'status' => 'captured',
        ]);

        $this->markAsStale($stalePendingSoutien, 20);
        $this->markAsStale($stalePendingPartenaire, 20);
        $this->markAsStale($recentPendingSoutien, 10);
        $this->markAsStale($stalePaidSoutien, 20);
        $this->markAsStale($staleNotifiedPartenaire, 20);

        $this->artisan('app:prune-stale-pending-form-records')
            ->expectsOutput('Pruned 1 stale soutien record(s) and 1 stale partenaire record(s).')
            ->assertExitCode(0);

        $this->assertDatabaseMissing('soutien_forms', ['id' => $stalePendingSoutien->id]);
        $this->assertDatabaseMissing('partenaire_forms', ['id' => $stalePendingPartenaire->id]);
        $this->assertDatabaseMissing('form_submissions', ['id' => $stalePendingSoutienSubmission->id]);
        $this->assertDatabaseMissing('form_submissions', ['id' => $stalePendingPartenaireSubmission->id]);

        $this->assertDatabaseHas('soutien_forms', ['id' => $recentPendingSoutien->id]);
        $this->assertDatabaseHas('soutien_forms', ['id' => $stalePaidSoutien->id]);
        $this->assertDatabaseHas('partenaire_forms', ['id' => $staleNotifiedPartenaire->id]);
        $this->assertDatabaseHas('form_submissions', ['id' => $recentPendingSoutienSubmission->id]);
        $this->assertDatabaseHas('form_submissions', ['id' => $stalePaidSoutienSubmission->id]);
        $this->assertDatabaseHas('form_submissions', ['id' => $staleNotifiedPartenaireSubmission->id]);
    }

    private function createSubmission(SoutienForm|PartenaireForm $form, string $type, mixed $notifiedAt = null): FormSubmission
    {
        return FormSubmission::factory()->create([
            'email' => $form->email,
            'type' => $type,
            'formable_type' => $form::class,
            'formable_id' => $form->id,
            'notified_at' => $notifiedAt,
        ]);
    }

    private function markAsStale(SoutienForm|PartenaireForm $form, int $days): void
    {
        $form->forceFill([
            'updated_at' => now()->subDays($days),
        ])->saveQuietly();
    }
}
