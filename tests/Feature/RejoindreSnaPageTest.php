<?php

namespace Tests\Feature;

use App\Models\FormSubmission;
use App\Models\RejoindreSnaForm;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RejoindreSnaPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_rejoindre_page_renders(): void
    {
        $this->get('/rejoindre-le-sna')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('rejoindre-le-sna'));
    }

    public function test_rejoindre_submission_is_stored(): void
    {
        $response = $this->post('/rejoindre-le-sna', [
            'involvement_types' => ['benevole', 'projet_specifique'],
            'main_skills' => ['dev_info', 'autre'],
            'other_skill' => 'Mediation locale',
            'experience' => 'Experience de coordination de terrain.',
            'availability' => '1_2_mois',
            'integration_preferences' => ['cercle', 'projet_national'],
            'name' => 'Claire Martin',
            'city' => 'Lyon',
            'email' => 'claire@example.test',
            'phone' => '+33601020304',
        ]);

        $response->assertRedirect();

        $form = RejoindreSnaForm::query()->firstOrFail();

        $this->assertSame(['benevole', 'projet_specifique'], $form->involvement_types);
        $this->assertSame(['dev_info', 'autre'], $form->main_skills);
        $this->assertSame(['cercle', 'projet_national'], $form->integration_preferences);

        $this->assertDatabaseHas('rejoindre_sna_forms', [
            'id' => $form->id,
            'email' => 'claire@example.test',
            'name' => 'Claire Martin',
        ]);

        $this->assertDatabaseHas('form_submissions', [
            'email' => 'claire@example.test',
            'type' => 'rejoindre_sna',
            'formable_type' => RejoindreSnaForm::class,
            'formable_id' => $form->id,
        ]);

        $this->assertTrue(FormSubmission::query()->exists());
    }
}
