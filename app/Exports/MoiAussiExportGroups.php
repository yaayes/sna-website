<?php

namespace App\Exports;

use App\Models\MoiAussiForm;

class MoiAussiExportGroups extends ExportFieldGroups
{
    /**
     * Matches the admin show page labels (resources/js/pages/admin/moi-aussi/show.tsx).
     *
     * @var array<string, string>
     */
    private const SITUATIONS = [
        'oui' => 'En cours',
        'en_cours' => 'Démarches en cours',
        'resolu' => 'Résolu',
    ];

    /**
     * @return array<string, array{label: string, columns: array<string, callable(MoiAussiForm): (string|null)>}>
     */
    protected static function definition(): array
    {
        return [
            'ref' => [
                'label' => 'Référence',
                'columns' => [
                    'Référence' => fn (MoiAussiForm $form): ?string => $form->ref,
                ],
            ],
            'nom' => [
                'label' => 'Nom',
                'columns' => [
                    'Nom' => fn (MoiAussiForm $form): ?string => $form->name,
                ],
            ],
            'email' => [
                'label' => 'Email',
                'columns' => [
                    'Email' => fn (MoiAussiForm $form): ?string => $form->email,
                ],
            ],
            'phone' => [
                'label' => 'Téléphone',
                'columns' => [
                    'Téléphone' => fn (MoiAussiForm $form): ?string => $form->phone,
                ],
            ],
            'action' => [
                'label' => 'Action liée',
                'columns' => [
                    'Action liée' => fn (MoiAussiForm $form): ?string => $form->action?->title,
                ],
            ],
            'temoignage' => [
                'label' => 'Témoignage',
                'columns' => [
                    'Situation' => fn (MoiAussiForm $form): ?string => self::label(self::SITUATIONS, $form->situation),
                    'Témoignage' => fn (MoiAussiForm $form): ?string => $form->testimony,
                    'Conséquences' => fn (MoiAussiForm $form): ?string => self::joinList($form->consequences),
                ],
            ],
            'institution' => [
                'label' => 'Institution contactée',
                'columns' => [
                    'Institution contactée' => fn (MoiAussiForm $form): ?string => self::nullableBool($form->contacted_institution),
                    "Nom de l'institution" => fn (MoiAussiForm $form): ?string => $form->institution_name,
                ],
            ],
            'usages' => [
                'label' => "Autorisations d'usage",
                'columns' => [
                    'Usage anonymisé' => fn (MoiAussiForm $form): string => self::bool($form->usage_anonymised),
                    'Usage collectif' => fn (MoiAussiForm $form): string => self::bool($form->usage_collective),
                    'Usage législatif' => fn (MoiAussiForm $form): string => self::bool($form->usage_legislation),
                    'Souhaite rester confidentiel' => fn (MoiAussiForm $form): string => self::bool($form->usage_confidential),
                ],
            ],
            'meta' => [
                'label' => 'Métadonnées',
                'columns' => [
                    'Date de soumission' => fn (MoiAussiForm $form): ?string => $form->created_at?->format('d/m/Y H:i'),
                ],
            ],
        ];
    }
}
