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
        $base = [
            'aidants' => [
                [
                    'genre' => 'femme',
                    'nom' => 'Dupont',
                    'prenom' => 'Marie',
                    'age' => '42',
                    'email' => 'marie@exemple.fr',
                    'phone' => '+33600000000',
                    'departement' => '75',
                    'commune' => 'Paris',
                    'aidant_type' => 'parent_handicap',
                    'aidant_type_autre_precisions' => '',
                    'situation_familiale' => 'en_couple',
                    'situation_familiale_autre_precisions' => '',
                ],
            ],
            'aides' => [
                [
                    'aide_genre' => 'homme',
                    'aide_profile' => 'enfant',
                    'scolarisation' => 'ulis',
                    'scolarisation_autre_precisions' => '',
                    'situation_adulte' => '',
                    'situation_adulte_autre_precisions' => '',
                    'lieu_habitation' => 'domicile_familial',
                    'lieu_habitation_autre_precisions' => '',
                ],
            ],
            'aide_tranche_age' => 'moins_18',
            'aide_age' => '8',
            'type_situation' => ['Handicap intellectuel'],
            'type_situation_autre_precisions' => '',
            'reconnaissance_administrative' => 'droits_mdph_ouverts',
            'aide_genre' => 'homme',
            'scolarisation' => 'ulis',
            'scolarisation_autre_precisions' => '',
            'situation_adulte' => '',
            'situation_adulte_autre_precisions' => '',
            'lieu_habitation' => 'domicile_familial',
            'lieu_habitation_autre_precisions' => '',
            'impacts' => ['Epuisement physique'],
            'impacts_autre_precisions' => '',
            'situation_professionnelle' => 'cdi_temps_partiel',
            'expression_libre' => "Etre aidante, c'est donner tout ce que l'on a.",
            'soutient_sna' => true,
            'wants_info' => true,
            'declaration_honneur' => true,
            'consents_rgpd' => true,
            'don_amount' => '',
        ];

        return array_merge($base, $overrides);
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
            'type' => 'adhesion',
        ]);
    }

    public function test_submission_persists_multiple_aidants_and_aides(): void
    {
        $payload = $this->validPayload([
            'aidants' => [
                [
                    'genre' => 'femme',
                    'nom' => 'Dupont',
                    'prenom' => 'Marie',
                    'age' => '42',
                    'email' => 'marie@exemple.fr',
                    'phone' => '+33600000000',
                    'departement' => '75',
                    'commune' => 'Paris',
                    'aidant_type' => 'parent_handicap',
                    'aidant_type_autre_precisions' => '',
                    'situation_familiale' => 'en_couple',
                    'situation_familiale_autre_precisions' => '',
                ],
                [
                    'genre' => 'homme',
                    'nom' => 'Martin',
                    'prenom' => 'Luc',
                    'age' => '39',
                    'email' => 'luc@exemple.fr',
                    'phone' => '+33700000000',
                    'departement' => '69',
                    'commune' => 'Lyon',
                    'aidant_type' => 'proche',
                    'aidant_type_autre_precisions' => '',
                    'situation_familiale' => 'celibataire',
                    'situation_familiale_autre_precisions' => '',
                ],
            ],
            'aides' => [
                [
                    'aide_tranche_age' => 'moins_18',
                    'aide_age' => '8',
                    'type_situation' => ['Handicap intellectuel'],
                    'type_situation_autre_precisions' => '',
                    'reconnaissance_administrative' => 'droits_mdph_ouverts',
                    'aide_genre' => 'homme',
                    'aide_profile' => 'enfant',
                    'scolarisation' => 'ulis',
                    'scolarisation_autre_precisions' => '',
                    'situation_adulte' => '',
                    'situation_adulte_autre_precisions' => '',
                    'lieu_habitation' => 'domicile_familial',
                    'lieu_habitation_autre_precisions' => '',
                ],
                [
                    'aide_tranche_age' => '18_65',
                    'aide_age' => '26',
                    'type_situation' => ['Troubles du neurodeveloppement (TSA, TDAH, DYS...)'],
                    'type_situation_autre_precisions' => '',
                    'reconnaissance_administrative' => 'droits_mdph_ouverts',
                    'aide_genre' => 'femme',
                    'aide_profile' => 'adulte',
                    'scolarisation' => '',
                    'scolarisation_autre_precisions' => '',
                    'situation_adulte' => 'travailleur_esat',
                    'situation_adulte_autre_precisions' => '',
                    'lieu_habitation' => 'domicile_autonome',
                    'lieu_habitation_autre_precisions' => '',
                ],
            ],
        ]);

        $response = $this->post('/formulaire/adhesion', $payload);

        $response->assertRedirect();

        $form = AidantAdhesionForm::query()->firstOrFail();

        $this->assertCount(2, $form->aidants);
        $this->assertCount(2, $form->aides);
        $this->assertSame('Luc', $form->aidants[1]['prenom']);
        $this->assertSame('adulte', $form->aides[1]['aide_profile']);
        $this->assertSame('travailleur_esat', $form->aides[1]['situation_adulte']);
    }

    private function withAidantOverride(string $field, mixed $value): array
    {
        $payload = $this->validPayload();
        $payload['aidants'][0][$field] = $value;

        return $payload;
    }

    public function test_nom_is_required(): void
    {
        $response = $this->post('/formulaire/adhesion', $this->withAidantOverride('nom', ''));
        $response->assertSessionHasErrors('aidants.0.nom');
        $this->assertDatabaseCount('aidant_adhesion_forms', 0);
    }

    public function test_prenom_is_required(): void
    {
        $response = $this->post('/formulaire/adhesion', $this->withAidantOverride('prenom', ''));
        $response->assertSessionHasErrors('aidants.0.prenom');
    }

    public function test_email_is_required(): void
    {
        $response = $this->post('/formulaire/adhesion', $this->withAidantOverride('email', ''));
        $response->assertSessionHasErrors('aidants.0.email');
    }

    public function test_invalid_email_is_rejected(): void
    {
        $response = $this->post('/formulaire/adhesion', $this->withAidantOverride('email', 'not-an-email'));
        $response->assertSessionHasErrors('aidants.0.email');
    }

    public function test_aidant_type_is_required(): void
    {
        $response = $this->post('/formulaire/adhesion', $this->withAidantOverride('aidant_type', ''));
        $response->assertSessionHasErrors('aidants.0.aidant_type');
    }

    public function test_invalid_aidant_type_is_rejected(): void
    {
        $response = $this->post('/formulaire/adhesion', $this->withAidantOverride('aidant_type', 'invalid_value'));
        $response->assertSessionHasErrors('aidants.0.aidant_type');
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
            'aidants' => [[
                'nom' => 'Martin',
                'prenom' => 'Jean',
                'email' => 'jean@exemple.fr',
                'aidant_type' => 'proche',
            ]],
            'aides' => [[
                'aide_genre' => '',
                'aide_profile' => '',
                'scolarisation' => '',
                'scolarisation_autre_precisions' => '',
                'situation_adulte' => '',
                'situation_adulte_autre_precisions' => '',
                'lieu_habitation' => '',
                'lieu_habitation_autre_precisions' => '',
            ]],
            'declaration_honneur' => true,
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
