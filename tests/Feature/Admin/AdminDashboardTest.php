<?php

namespace Tests\Feature\Admin;

use App\Models\AidantAdhesionForm;
use App\Models\Coupon;
use App\Models\FormSubmission;
use App\Models\MoiAussiForm;
use App\Models\PartenaireForm;
use App\Models\Payment;
use App\Models\SoutienForm;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_dashboard_is_accessible_by_admin(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->get('/@');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('admin/dashboard'));
    }

    public function test_admin_dashboard_is_forbidden_for_non_admin(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/@');

        $response->assertStatus(403);
    }

    public function test_admin_dashboard_redirects_unauthenticated_users(): void
    {
        $response = $this->get('/@');

        $response->assertRedirect('/login');
    }

    public function test_admin_dashboard_shows_stats(): void
    {
        $admin = User::factory()->admin()->create();
        MoiAussiForm::factory()->count(3)->create();
        $soutienForms = SoutienForm::factory()->count(5)->create();
        $partenaireForms = PartenaireForm::factory()->count(2)->create();

        foreach ($soutienForms as $form) {
            $submission = FormSubmission::factory()->create([
                'email' => $form->email,
                'type' => 'soutien',
                'formable_type' => SoutienForm::class,
                'formable_id' => $form->id,
            ]);

            Payment::factory()->create([
                'form_submission_id' => $submission->id,
                'status' => 'captured',
                'amount_cents' => 2000,
            ]);
        }

        foreach ($partenaireForms as $form) {
            $submission = FormSubmission::factory()->create([
                'email' => $form->email,
                'type' => 'partenaire',
                'formable_type' => PartenaireForm::class,
                'formable_id' => $form->id,
            ]);

            Payment::factory()->create([
                'form_submission_id' => $submission->id,
                'status' => 'captured',
                'amount_cents' => 10000,
            ]);
        }
        Coupon::factory()->count(4)->create();

        $response = $this->actingAs($admin)->get('/@');

        $response->assertInertia(
            fn ($page) => $page
                ->component('admin/dashboard')
                ->where('stats.moi_aussi', 3)
                ->where('stats.soutien', 5)
                ->where('stats.partenaire', 2)
                ->where('stats.coupons', 4)
        );
    }

    public function test_admin_dashboard_counts_only_paid_soutien_and_partenaire(): void
    {
        $admin = User::factory()->admin()->create();

        $paidSoutien = SoutienForm::factory()->create();
        $pendingSoutien = SoutienForm::factory()->create();
        $paidPartenaire = PartenaireForm::factory()->create();
        $pendingPartenaire = PartenaireForm::factory()->create();

        $paidSoutienSubmission = FormSubmission::factory()->create([
            'email' => $paidSoutien->email,
            'type' => 'soutien',
            'formable_type' => SoutienForm::class,
            'formable_id' => $paidSoutien->id,
        ]);

        $pendingSoutienSubmission = FormSubmission::factory()->create([
            'email' => $pendingSoutien->email,
            'type' => 'soutien',
            'formable_type' => SoutienForm::class,
            'formable_id' => $pendingSoutien->id,
        ]);

        $paidPartenaireSubmission = FormSubmission::factory()->create([
            'email' => $paidPartenaire->email,
            'type' => 'partenaire',
            'formable_type' => PartenaireForm::class,
            'formable_id' => $paidPartenaire->id,
        ]);

        $pendingPartenaireSubmission = FormSubmission::factory()->create([
            'email' => $pendingPartenaire->email,
            'type' => 'partenaire',
            'formable_type' => PartenaireForm::class,
            'formable_id' => $pendingPartenaire->id,
        ]);

        Payment::factory()->create([
            'form_submission_id' => $paidSoutienSubmission->id,
            'status' => 'captured',
            'amount_cents' => 2000,
        ]);

        Payment::factory()->create([
            'form_submission_id' => $pendingSoutienSubmission->id,
            'status' => 'pending',
            'amount_cents' => 2000,
        ]);

        Payment::factory()->create([
            'form_submission_id' => $paidPartenaireSubmission->id,
            'status' => 'authorized',
            'amount_cents' => 10000,
        ]);

        Payment::factory()->create([
            'form_submission_id' => $pendingPartenaireSubmission->id,
            'status' => 'pending',
            'amount_cents' => 10000,
        ]);

        $this->actingAs($admin)
            ->get('/@')
            ->assertInertia(fn ($page) => $page
                ->component('admin/dashboard')
                ->where('stats.soutien', 1)
                ->where('stats.partenaire', 1));
    }

    public function test_adhesion_stat_counts_only_completed_submissions(): void
    {
        $admin = User::factory()->admin()->create();
        AidantAdhesionForm::factory()->count(2)->completed()->create();
        AidantAdhesionForm::factory()->count(3)->draft()->create();

        $response = $this->actingAs($admin)->get('/@');

        $response->assertInertia(
            fn ($page) => $page
                ->component('admin/dashboard')
                ->where('stats.adhesion', 2)
        );
    }
}
