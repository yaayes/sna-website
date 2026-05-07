import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

type AidantData = {
    genre: string | null;
    nom: string | null;
    prenom: string | null;
    age: string | null;
    email: string | null;
    phone: string | null;
    departement: string | null;
    commune: string | null;
    aidant_type: string | null;
    aidant_type_autre_precisions: string | null;
    situation_familiale: string | null;
    situation_familiale_autre_precisions: string | null;
};

type AideData = {
    aide_tranche_age?: string | null;
    aide_age?: string | null;
    type_situation?: string[] | null;
    type_situation_autre_precisions?: string | null;
    reconnaissance_administrative?: string | null;
    aide_genre: string | null;
    aide_profile?: string | null;
    scolarisation: string | null;
    scolarisation_autre_precisions: string | null;
    situation_adulte: string | null;
    situation_adulte_autre_precisions: string | null;
    lieu_habitation: string | null;
    lieu_habitation_autre_precisions: string | null;
};

type AdhesionEntry = {
    id: number;
    ref: string;
    genre: string | null;
    nom: string;
    prenom: string;
    age: string | null;
    email: string;
    phone: string | null;
    departement: string | null;
    commune: string | null;
    aidants?: AidantData[] | null;
    aides?: AideData[] | null;
    aidant_type: string | null;
    aidant_type_autre_precisions: string | null;
    situation_familiale: string | null;
    aide_tranche_age: string | null;
    type_situation: string[] | null;
    reconnaissance_administrative: string | null;
    aide_genre: string | null;
    scolarisation: string | null;
    situation_adulte: string | null;
    lieu_habitation: string | null;
    impacts: string[] | null;
    situation_professionnelle: string | null;
    expression_libre: string | null;
    soutient_sna: boolean;
    wants_info: boolean;
    consents_rgpd: boolean;
    declaration_honneur: boolean;
    don_amount_cents: number | null;
    coupon_code: string | null;
    coupon_discount_cents: number | null;
    created_at: string;
    updated_at: string;
};

type PaymentData = {
    status: string;
    amount_cents: number | null;
    merchant_reference: string;
    created_at: string;
} | null;

const paymentStatusLabel: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
    captured: { label: 'Payé', variant: 'default' },
    pending: { label: 'En attente', variant: 'secondary' },
    authorized: { label: 'Autorisé', variant: 'secondary' },
    rejected: { label: 'Refusé', variant: 'destructive' },
    cancelled: { label: 'Annulé', variant: 'outline' },
};

const aidantTypeLabels: Record<string, string> = {
    parent_handicap: "Parent d'un enfant en situation de handicap",
    conjoint: 'Conjoint(e)',
    parent_aine: "Parent d'un aîné",
    proche: 'Proche',
    autre: 'Autre',
};

const breadcrumbs = (ref: string): BreadcrumbItem[] => [
    { title: 'Admin', href: admin.dashboard() },
    { title: 'Adhésions', href: admin.adhesion.index() },
    { title: ref, href: '#' },
];

const aideProfileLabels: Record<string, string> = {
    enfant: 'Enfant',
    adulte: 'Adulte',
};

const ageRangeLabels: Record<string, string> = {
    moins_18: 'Moins de 18 ans',
    '18_65': '18 à 65 ans',
    plus_65: 'Plus de 65 ans',
};

function displayValue(value: string | null | undefined): string {
    return value && value.trim() !== '' ? value : '—';
}

function formatLocation(commune: string | null, departement: string | null): string {
    const parts = [commune, departement].filter((value): value is string => Boolean(value && value.trim() !== ''));

    return parts.length > 0 ? parts.join(', ') : '—';
}

function renderPrecisions(value: string | null | undefined): React.ReactNode {
    if (! value || value.trim() === '') {
        return null;
    }

    return <span className="ml-1 text-muted-foreground">({value})</span>;
}

function DetailRow({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="grid grid-cols-3 gap-4 border-b py-3 last:border-0">
            <dt className="text-sm font-medium text-muted-foreground">
                {label}
            </dt>
            <dd className="col-span-2 text-sm">{children}</dd>
        </div>
    );
}

function BoolBadge({ value }: { value: boolean }) {
    return (
        <Badge variant={value ? 'default' : 'outline'}>
            {value ? 'Oui' : 'Non'}
        </Badge>
    );
}

export default function AdhesionShow({ entry, payment }: { entry: AdhesionEntry; payment: PaymentData }) {
    const aidants = entry.aidants ?? [];
    const aides = entry.aides ?? [];

    return (
        <AppLayout breadcrumbs={breadcrumbs(entry.ref)}>
            <Head title={`Admin — Adhésion #${entry.ref}`} />
            <div className="flex max-w-3xl flex-col gap-6 p-6">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={admin.adhesion.index()}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Formulaire Adhésion Aidant
                        </h1>
                        <p className="font-mono text-sm text-muted-foreground">
                            Réf. {entry.ref}
                        </p>
                    </div>
                </div>

                {/* Identité */}
                <div className="rounded-xl border p-6">
                    <h2 className="mb-4 font-semibold">Identité de l'aidant</h2>
                    <dl>
                        <DetailRow label="Nom">
                            {entry.prenom} {entry.nom}
                        </DetailRow>
                        {entry.genre && (
                            <DetailRow label="Genre">{entry.genre}</DetailRow>
                        )}
                        {entry.age && (
                            <DetailRow label="Âge">{entry.age}</DetailRow>
                        )}
                        <DetailRow label="Email">{entry.email}</DetailRow>
                        <DetailRow label="Téléphone">
                            {entry.phone ?? '—'}
                        </DetailRow>
                        {(entry.commune || entry.departement) && (
                            <DetailRow label="Localisation">
                                {[entry.commune, entry.departement]
                                    .filter(Boolean)
                                    .join(', ')}
                            </DetailRow>
                        )}
                        <DetailRow label="Date de soumission">
                            {new Date(entry.created_at).toLocaleString('fr-FR')}
                        </DetailRow>
                    </dl>
                </div>

                {aidants.length > 0 && (
                    <div className="rounded-xl border p-6">
                        <h2 className="mb-4 font-semibold">Tous les aidants</h2>
                        <div className="space-y-6">
                            {aidants.map((aidant, index) => (
                                <div key={`${aidant.email ?? 'aidant'}-${index}`} className="rounded-lg border p-4">
                                    <h3 className="mb-3 font-medium">Aidant {index + 1}</h3>
                                    <dl>
                                        <DetailRow label="Nom">
                                            {[aidant.prenom, aidant.nom].filter(Boolean).join(' ') || '—'}
                                        </DetailRow>
                                        <DetailRow label="Genre">{displayValue(aidant.genre)}</DetailRow>
                                        <DetailRow label="Âge">{displayValue(aidant.age)}</DetailRow>
                                        <DetailRow label="Email">{displayValue(aidant.email)}</DetailRow>
                                        <DetailRow label="Téléphone">{displayValue(aidant.phone)}</DetailRow>
                                        <DetailRow label="Localisation">
                                            {formatLocation(aidant.commune, aidant.departement)}
                                        </DetailRow>
                                        <DetailRow label="Type d'aidant">
                                            {aidant.aidant_type
                                                ? (aidantTypeLabels[aidant.aidant_type] ?? aidant.aidant_type)
                                                : '—'}
                                            {renderPrecisions(aidant.aidant_type_autre_precisions)}
                                        </DetailRow>
                                        <DetailRow label="Situation familiale">
                                            {displayValue(aidant.situation_familiale)}
                                            {renderPrecisions(aidant.situation_familiale_autre_precisions)}
                                        </DetailRow>
                                    </dl>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Situation d'aidant */}
                <div className="rounded-xl border p-6">
                    <h2 className="mb-4 font-semibold">Situation d'aidant</h2>
                    <dl>
                        {entry.aidant_type && (
                            <DetailRow label="Type d'aidant">
                                {aidantTypeLabels[entry.aidant_type] ??
                                    entry.aidant_type}
                                {entry.aidant_type_autre_precisions && (
                                    <span className="ml-1 text-muted-foreground">
                                        ({entry.aidant_type_autre_precisions})
                                    </span>
                                )}
                            </DetailRow>
                        )}
                        {entry.situation_familiale && (
                            <DetailRow label="Situation familiale">
                                {entry.situation_familiale}
                            </DetailRow>
                        )}
                        {entry.aide_tranche_age && (
                            <DetailRow label="Tranche d'âge aidé">
                                {entry.aide_tranche_age}
                            </DetailRow>
                        )}
                        {entry.type_situation && entry.type_situation.length > 0 && (
                            <DetailRow label="Type de situation">
                                {entry.type_situation.join(', ')}
                            </DetailRow>
                        )}
                        {entry.reconnaissance_administrative && (
                            <DetailRow label="Reconnaissance administrative">
                                {entry.reconnaissance_administrative}
                            </DetailRow>
                        )}
                    </dl>
                </div>

                {/* Personne aidée */}
                <div className="rounded-xl border p-6">
                    <h2 className="mb-4 font-semibold">Personne aidée principale</h2>
                    <dl>
                        {entry.aide_genre && (
                            <DetailRow label="Genre">{entry.aide_genre}</DetailRow>
                        )}
                        {entry.scolarisation && (
                            <DetailRow label="Scolarisation">
                                {entry.scolarisation}
                            </DetailRow>
                        )}
                        {entry.situation_adulte && (
                            <DetailRow label="Situation adulte">
                                {entry.situation_adulte}
                            </DetailRow>
                        )}
                        {entry.lieu_habitation && (
                            <DetailRow label="Lieu d'habitation">
                                {entry.lieu_habitation}
                            </DetailRow>
                        )}
                    </dl>
                </div>

                {aides.length > 0 && (
                    <div className="rounded-xl border p-6">
                        <h2 className="mb-4 font-semibold">Toutes les personnes aidées</h2>
                        <div className="space-y-6">
                            {aides.map((aide, index) => (
                                <div key={`${aide.aide_genre ?? 'aide'}-${index}`} className="rounded-lg border p-4">
                                    <h3 className="mb-3 font-medium">Personne aidée {index + 1}</h3>
                                    <dl>
                                        <DetailRow label="Profil">
                                            {aide.aide_profile
                                                ? (aideProfileLabels[aide.aide_profile] ?? aide.aide_profile)
                                                : '—'}
                                        </DetailRow>
                                        <DetailRow label="Genre">{displayValue(aide.aide_genre)}</DetailRow>
                                        <DetailRow label="Tranche d'âge">
                                            {aide.aide_tranche_age
                                                ? (ageRangeLabels[aide.aide_tranche_age] ?? aide.aide_tranche_age)
                                                : '—'}
                                        </DetailRow>
                                        <DetailRow label="Âge">{displayValue(aide.aide_age)}</DetailRow>
                                        <DetailRow label="Type de situation">
                                            {aide.type_situation && aide.type_situation.length > 0
                                                ? aide.type_situation.join(', ')
                                                : '—'}
                                            {renderPrecisions(aide.type_situation_autre_precisions)}
                                        </DetailRow>
                                        <DetailRow label="Reconnaissance administrative">
                                            {displayValue(aide.reconnaissance_administrative)}
                                        </DetailRow>
                                        <DetailRow label="Scolarisation">
                                            {displayValue(aide.scolarisation)}
                                            {renderPrecisions(aide.scolarisation_autre_precisions)}
                                        </DetailRow>
                                        <DetailRow label="Situation adulte">
                                            {displayValue(aide.situation_adulte)}
                                            {renderPrecisions(aide.situation_adulte_autre_precisions)}
                                        </DetailRow>
                                        <DetailRow label="Lieu d'habitation">
                                            {displayValue(aide.lieu_habitation)}
                                            {renderPrecisions(aide.lieu_habitation_autre_precisions)}
                                        </DetailRow>
                                    </dl>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Impact & Situation professionnelle */}
                <div className="rounded-xl border p-6">
                    <h2 className="mb-4 font-semibold">Impact & Situation professionnelle</h2>
                    <dl>
                        {entry.impacts && entry.impacts.length > 0 && (
                            <DetailRow label="Impacts">
                                {entry.impacts.join(', ')}
                            </DetailRow>
                        )}
                        {entry.situation_professionnelle && (
                            <DetailRow label="Situation professionnelle">
                                {entry.situation_professionnelle}
                            </DetailRow>
                        )}
                    </dl>
                </div>

                {/* Expression libre */}
                {entry.expression_libre && (
                    <div className="rounded-xl border p-6">
                        <h2 className="mb-4 font-semibold">Expression libre</h2>
                        <p className="whitespace-pre-wrap text-sm">
                            {entry.expression_libre}
                        </p>
                    </div>
                )}

                {/* Don & Coupon */}
                {(entry.coupon_code || (entry.don_amount_cents !== null && entry.don_amount_cents > 0)) && (
                    <div className="rounded-xl border p-6">
                        <h2 className="mb-4 font-semibold">Don & Coupon</h2>
                        <dl>
                            {entry.coupon_code && (
                                <DetailRow label="Coupon appliqué">
                                    <span className="font-mono font-semibold">{entry.coupon_code}</span>
                                    {entry.coupon_discount_cents !== null && (
                                        <span className="ml-2 text-green-600">
                                            (-{(entry.coupon_discount_cents / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })})
                                        </span>
                                    )}
                                </DetailRow>
                            )}
                            {entry.don_amount_cents !== null && entry.don_amount_cents > 0 && (
                                <DetailRow label="Montant du don">
                                    {(entry.don_amount_cents / 100).toLocaleString('fr-FR', {
                                        style: 'currency',
                                        currency: 'EUR',
                                    })}
                                </DetailRow>
                            )}
                        </dl>
                    </div>
                )}

                {/* Paiement */}
                {payment && (
                    <div className="rounded-xl border p-6">
                        <h2 className="mb-4 font-semibold">Paiement</h2>
                        <dl>
                            <DetailRow label="Statut">
                                <Badge variant={paymentStatusLabel[payment.status]?.variant ?? 'outline'}>
                                    {paymentStatusLabel[payment.status]?.label ?? payment.status}
                                </Badge>
                            </DetailRow>
                            <DetailRow label="Montant payé">
                                {payment.amount_cents !== null
                                    ? (payment.amount_cents / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
                                    : '—'}
                            </DetailRow>
                            <DetailRow label="Référence">
                                <span className="font-mono text-xs">{payment.merchant_reference}</span>
                            </DetailRow>
                            <DetailRow label="Date">
                                {new Date(payment.created_at).toLocaleString('fr-FR')}
                            </DetailRow>
                        </dl>
                    </div>
                )}

                {/* Consentements */}
                <div className="rounded-xl border p-6">
                    <h2 className="mb-4 font-semibold">Soutien & Consentements</h2>
                    <dl>
                        <DetailRow label="Soutient le SNA">
                            <BoolBadge value={entry.soutient_sna} />
                        </DetailRow>
                        <DetailRow label="Souhaite être informé">
                            <BoolBadge value={entry.wants_info} />
                        </DetailRow>
                        <DetailRow label="RGPD">
                            <BoolBadge value={entry.consents_rgpd} />
                        </DetailRow>
                        <DetailRow label="Déclaration sur l'honneur">
                            <BoolBadge value={entry.declaration_honneur} />
                        </DetailRow>
                    </dl>
                </div>
            </div>
        </AppLayout>
    );
}
