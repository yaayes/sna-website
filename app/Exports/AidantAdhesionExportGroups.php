<?php

namespace App\Exports;

use App\Models\AidantAdhesionForm;
use App\Models\Payment;

class AidantAdhesionExportGroups extends ExportFieldGroups
{
    /**
     * @var array<string, string>
     */
    private const GENRES = [
        'homme' => 'Homme',
        'femme' => 'Femme',
        'non_renseigne' => 'Non renseigné',
    ];

    /**
     * @var array<string, string>
     */
    private const AIDANT_TYPES = [
        'parent_handicap' => "Parent d'un enfant en situation de handicap",
        'conjoint' => 'Conjoint(e)',
        'parent_aine' => "Parent d'un aîné",
        'proche' => 'Proche',
        'autre' => 'Autre',
    ];

    /**
     * @var array<string, string>
     */
    private const AGE_RANGES = [
        'moins_18' => 'Moins de 18 ans',
        '18_65' => '18 à 65 ans',
        'plus_65' => 'Plus de 65 ans',
    ];

    /**
     * @var array<string, string>
     */
    private const AIDE_PROFILES = [
        'enfant' => 'Enfant',
        'adulte' => 'Adulte',
    ];

    /**
     * @var array<string, string>
     */
    private const PRO_SITUATIONS = [
        'cdi_temps_plein' => 'CDI temps plein',
        'cdi_temps_partiel' => 'CDI temps partiel',
        'cdd_interim' => 'CDD / Interim',
        'independant' => 'Travailleur(se) indépendant(e)',
        'sans_emploi' => 'Sans emploi',
        'conge_proche_aidant' => 'Congé proche aidant / AJPP',
        'arret_maladie' => 'Arrêt maladie longue durée',
        'cessation_activite' => "Cessation d'activité pour vous occuper de votre proche",
        'retire' => 'Retraité(e)',
    ];

    /**
     * @var array<string, string>
     */
    private const PAYMENT_STATUSES = [
        'captured' => 'Payé',
        'pending' => 'En attente',
        'authorized' => 'Autorisé',
        'rejected' => 'Refusé',
        'cancelled' => 'Annulé',
    ];

    /**
     * @return array<string, array{label: string, columns: array<string, callable(AidantAdhesionForm): (string|null)>}>
     */
    protected static function definition(): array
    {
        return [
            'ref' => [
                'label' => 'Référence',
                'columns' => [
                    'Référence' => fn (AidantAdhesionForm $form): ?string => $form->ref,
                ],
            ],
            'identite' => [
                'label' => "Identité de l'aidant",
                'columns' => [
                    'Genre' => fn (AidantAdhesionForm $form): ?string => self::label(self::GENRES, $form->genre),
                    'Nom' => fn (AidantAdhesionForm $form): ?string => $form->nom,
                    'Prénom' => fn (AidantAdhesionForm $form): ?string => $form->prenom,
                    'Âge' => fn (AidantAdhesionForm $form): ?string => $form->age,
                    'Département' => fn (AidantAdhesionForm $form): ?string => $form->departement,
                    'Commune' => fn (AidantAdhesionForm $form): ?string => $form->commune,
                ],
            ],
            'email' => [
                'label' => 'Email',
                'columns' => [
                    'Email' => fn (AidantAdhesionForm $form): ?string => $form->email,
                ],
            ],
            'phone' => [
                'label' => 'Téléphone',
                'columns' => [
                    'Téléphone' => fn (AidantAdhesionForm $form): ?string => $form->phone,
                ],
            ],
            'situation_aidant' => [
                'label' => "Situation d'aidant",
                'columns' => [
                    "Type d'aidant" => fn (AidantAdhesionForm $form): ?string => self::withPrecisions(
                        self::label(self::AIDANT_TYPES, $form->aidant_type),
                        $form->aidant_type_autre_precisions,
                    ),
                    'Situation familiale' => fn (AidantAdhesionForm $form): ?string => self::withPrecisions(
                        $form->situation_familiale,
                        $form->situation_familiale_autre_precisions,
                    ),
                    "Tranche d'âge de la personne aidée" => fn (AidantAdhesionForm $form): ?string => self::label(self::AGE_RANGES, $form->aide_tranche_age),
                    'Type de situation' => fn (AidantAdhesionForm $form): ?string => self::withPrecisions(
                        self::joinList($form->type_situation),
                        $form->type_situation_autre_precisions,
                    ),
                    'Reconnaissance administrative' => fn (AidantAdhesionForm $form): ?string => $form->reconnaissance_administrative,
                ],
            ],
            'personne_aidee' => [
                'label' => 'Personne aidée principale',
                'columns' => [
                    'Genre personne aidée' => fn (AidantAdhesionForm $form): ?string => self::label(self::GENRES, $form->aide_genre),
                    'Âge personne aidée' => fn (AidantAdhesionForm $form): ?string => $form->aide_age,
                    'Scolarisation' => fn (AidantAdhesionForm $form): ?string => self::withPrecisions(
                        $form->scolarisation,
                        $form->scolarisation_autre_precisions,
                    ),
                    'Situation adulte' => fn (AidantAdhesionForm $form): ?string => self::withPrecisions(
                        $form->situation_adulte,
                        $form->situation_adulte_autre_precisions,
                    ),
                    "Lieu d'habitation" => fn (AidantAdhesionForm $form): ?string => self::withPrecisions(
                        $form->lieu_habitation,
                        $form->lieu_habitation_autre_precisions,
                    ),
                ],
            ],
            'impact_pro' => [
                'label' => 'Impact & situation professionnelle',
                'columns' => [
                    'Impacts' => fn (AidantAdhesionForm $form): ?string => self::withPrecisions(
                        self::joinList($form->impacts),
                        $form->impacts_autre_precisions,
                    ),
                    'Situation professionnelle' => fn (AidantAdhesionForm $form): ?string => self::label(self::PRO_SITUATIONS, $form->situation_professionnelle),
                ],
            ],
            'expression_libre' => [
                'label' => 'Expression libre',
                'columns' => [
                    'Expression libre' => fn (AidantAdhesionForm $form): ?string => $form->expression_libre,
                ],
            ],
            'aidants' => [
                'label' => 'Tous les aidants',
                'columns' => [
                    'Tous les aidants' => fn (AidantAdhesionForm $form): ?string => self::formatAidants($form->aidants),
                ],
            ],
            'aides' => [
                'label' => 'Toutes les personnes aidées',
                'columns' => [
                    'Toutes les personnes aidées' => fn (AidantAdhesionForm $form): ?string => self::formatAides($form->aides),
                ],
            ],
            'don_coupon' => [
                'label' => 'Don & coupon',
                'columns' => [
                    'Montant du don' => fn (AidantAdhesionForm $form): ?string => self::euros($form->don_amount_cents),
                    'Code coupon' => fn (AidantAdhesionForm $form): ?string => $form->coupon_code,
                    'Réduction coupon' => fn (AidantAdhesionForm $form): ?string => self::euros($form->coupon_discount_cents),
                ],
            ],
            'paiement' => [
                'label' => 'Paiement',
                'columns' => [
                    'Statut paiement' => fn (AidantAdhesionForm $form): ?string => self::label(self::PAYMENT_STATUSES, self::successfulPayment($form)?->status),
                    'Montant payé' => fn (AidantAdhesionForm $form): ?string => self::euros(self::successfulPayment($form)?->amount_cents),
                    'Référence marchand' => fn (AidantAdhesionForm $form): ?string => self::successfulPayment($form)?->merchant_reference,
                    'Date paiement' => fn (AidantAdhesionForm $form): ?string => self::successfulPayment($form)?->created_at?->format('d/m/Y H:i'),
                ],
            ],
            'consentements' => [
                'label' => 'Soutien & consentements',
                'columns' => [
                    'Soutient le SNA' => fn (AidantAdhesionForm $form): string => self::bool($form->soutient_sna),
                    'Souhaite être informé' => fn (AidantAdhesionForm $form): string => self::bool($form->wants_info),
                    'RGPD' => fn (AidantAdhesionForm $form): string => self::bool($form->consents_rgpd),
                    "Déclaration sur l'honneur" => fn (AidantAdhesionForm $form): string => self::bool($form->declaration_honneur),
                ],
            ],
            'meta' => [
                'label' => 'Métadonnées',
                'columns' => [
                    'Date de soumission' => fn (AidantAdhesionForm $form): ?string => $form->created_at?->format('d/m/Y H:i'),
                ],
            ],
        ];
    }

    private static function successfulPayment(AidantAdhesionForm $form): ?Payment
    {
        return $form->submission?->payments->first(fn (Payment $payment): bool => $payment->isSuccessful());
    }

    /**
     * @param  array<int, array<string, mixed>>|null  $aidants
     */
    private static function formatAidants(?array $aidants): ?string
    {
        if (empty($aidants)) {
            return null;
        }

        $lines = [];

        foreach ($aidants as $index => $aidant) {
            $parts = array_filter([
                trim(implode(' ', array_filter([$aidant['prenom'] ?? null, $aidant['nom'] ?? null]))),
                $aidant['email'] ?? null,
                $aidant['phone'] ?? null,
                self::joinList(array_values(array_filter([$aidant['commune'] ?? null, $aidant['departement'] ?? null]))),
                self::labelledPart('Type', self::withPrecisions(
                    self::label(self::AIDANT_TYPES, $aidant['aidant_type'] ?? null),
                    $aidant['aidant_type_autre_precisions'] ?? null,
                )),
                self::labelledPart('Situation familiale', self::withPrecisions(
                    $aidant['situation_familiale'] ?? null,
                    $aidant['situation_familiale_autre_precisions'] ?? null,
                )),
            ], fn ($value): bool => $value !== null && $value !== '');

            $lines[] = 'Aidant '.($index + 1).' — '.implode(' | ', $parts);
        }

        return implode("\n", $lines);
    }

    /**
     * @param  array<int, array<string, mixed>>|null  $aides
     */
    private static function formatAides(?array $aides): ?string
    {
        if (empty($aides)) {
            return null;
        }

        $lines = [];

        foreach ($aides as $index => $aide) {
            $parts = array_filter([
                self::labelledPart('Profil', self::label(self::AIDE_PROFILES, $aide['aide_profile'] ?? null)),
                self::labelledPart('Genre', self::label(self::GENRES, $aide['aide_genre'] ?? null)),
                self::labelledPart("Tranche d'âge", self::label(self::AGE_RANGES, $aide['aide_tranche_age'] ?? null)),
                self::labelledPart('Âge', $aide['aide_age'] ?? null),
                self::labelledPart('Type de situation', self::withPrecisions(
                    self::joinList($aide['type_situation'] ?? null),
                    $aide['type_situation_autre_precisions'] ?? null,
                )),
                self::labelledPart('Reconnaissance administrative', $aide['reconnaissance_administrative'] ?? null),
                self::labelledPart('Scolarisation', self::withPrecisions(
                    $aide['scolarisation'] ?? null,
                    $aide['scolarisation_autre_precisions'] ?? null,
                )),
                self::labelledPart('Situation adulte', self::withPrecisions(
                    $aide['situation_adulte'] ?? null,
                    $aide['situation_adulte_autre_precisions'] ?? null,
                )),
                self::labelledPart("Lieu d'habitation", self::withPrecisions(
                    $aide['lieu_habitation'] ?? null,
                    $aide['lieu_habitation_autre_precisions'] ?? null,
                )),
                self::labelledPart("Relation avec l'aidant", self::withPrecisions(
                    self::label(self::AIDANT_TYPES, $aide['aidant_type'] ?? null),
                    $aide['aidant_type_autre_precisions'] ?? null,
                )),
            ], fn ($value): bool => $value !== null && $value !== '');

            $lines[] = 'Personne aidée '.($index + 1).' — '.implode(' | ', $parts);
        }

        return implode("\n", $lines);
    }
}
