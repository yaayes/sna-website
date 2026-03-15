<?php

namespace Tests\Feature;

use App\Models\AidantAdhesionForm;
use App\Models\FormSubmission;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AidantAdhesionFormTest extends TestCase
{
    use RefreshDatabase;

    private function validPayload(array $overrides = []): array
    {
        return array_merge([
            'genre' => 'femme',
            'nom' => 'Dupont',
            'prenom' => 'Marie',
            'age' => '42',
            'email' => 'marie@exemple.fr',
            'phone' => '+33600000000',
            'departement' => '75',
            'commune' => 'Paris',
            'aidant_type' => 'parent_handicap',
            'situation_familiale' => 'en_couple',
            'aide_tranche_age' => 'moins_18',
            'aide_age' => '8',
            'type_situation' => ['Handicap intellectuel', 'Troubles du neurodéveloppement (TSA, TDAH, DYS…)'],
            'reconnaissance_administrative' => 'droits_mdph_ouverts',
            'aide_genre' => 'homme',
            'scolarisation' => 'ulis',
            'impacts' => ['Épuisement physique', 'Démarches administratives lourdes'],
            'situation_professionnelle' => 'cdi_temps_partiel',
            'expression_libre' => "Être aidante, c'est donner tout ce que l'on a.",
            'soutient_sna' => true,
            'wants_info' => true,
            'consents_rgpd' => true,
        ], $overrides);
    }

    public function test_valid_submission_creates_form_and_submission_record(): void
    {
        $response = $this->post('/formulaire/adhesion', $this->validPayload());

        $response->assertRedirect();
        $this->assertDatabaseHas('aidant_adhesion_forms', [
            'email' => 'marie@exemple.fr',
            'nom' => 'Dupont',
            'aidant_type' => 'parent_handicap',
        ]);
        $this->assertDatabaseHas('form_submissions', [
            'email' => 'marie@exemple.fr',
            'type' => 'adhesion',
        ]);
    }

    public function test_nom_is_required(): void
    {
        $response = $this->post('/formulaire/adhesion', $this->validPayload(['nom' => '']));
        $response->assertSessionHasErrors('nom');
        $this->assertDatabaseCount('aidant_adhesion_forms', 0);
    }

    public function test_prenom_is_required(): void
    {
        $response = $this->post('/formulaire/adhesion', $this->validPayload(['prenom' => '']));
        $response->assertSessionHasErrors('prenom');
    }

    public function test_email_is_required(): void
    {
        $response = $this->post('/formulaire/adhesion', $this->validPayload(['email' => '']));
        $response->assertSessionHasErrors('email');
    }

    public function test_invalid_email_is_rejected(): void
    {
        $response = $this->post('/formulaire/adhesion', $this->validPayload(['email' => 'not-an-email']));
        $response->assertSessionHasErrors('email');
    }

    public function test_aidant_type_is_required(): void
    {
        $response = $this->post('/formulaire/adhesion', $this->validPayload(['aidant_type' => '']));
        $response->assertSessionHasErrors('aidant_type');
    }

    public function test_invalid_aidant_type_is_rejected(): void
    {
        $response = $this->post('/formulaire/adhesion', $this->validPayload(['aidant_type' => 'invalid_value']));
        $response->assertSessionHasErrors('aidant_type');
    }

    public function test_consents_rgpd_must_be_accepted(): void
    {
        $response = $this->post('/formulaire/adhesion', $this->validPayload(['consents_rgpd' => false]));
        $response->assertSessionHasErrors('consents_rgpd');
        $this->assertDatabaseCount('aidant_adhesion_forms', 0);
    }

    public function test_optional_fields_can_be_omitted(): void
    {
        $payload = [
            'nom' => 'Martin',
            'prenom' => 'Jean',
            'email' => 'jean@exemple.fr',
            'aidant_type' => 'proche',
            'consents_rgpd' => true,
        ];

        $response = $this->post('/formulaire/adhesion', $payload);
        $response->assertRedirect();
        $this->assertDatabaseHas('aidant_adhesion_forms', ['email' => 'jean@exemple.fr']);
    }

    public function test_a_form_submission_is_linked_to_the_adhesion_record(): void
    {
        $this->post('/formulaire/adhesion', $this->validPayload());

        $form = AidantAdhesionForm::first();
        $this->assertInstanceOf(FormSubmission::class, $form->submission);
        $this->assertSame('adhesion', $form->submission->type);
    }
}
