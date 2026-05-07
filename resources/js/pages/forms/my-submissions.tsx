import { Head, Link } from '@inertiajs/react';
import PublicSiteHeader from '@/components/public-site-header';
import forms from '@/routes/forms';

type SoutienData = {
    name: string;
    address: string;
    email: string;
    phone: string | null;
    wants_events: boolean;
    wants_participation: boolean;
    message: string | null;
};

type PartenaireData = {
    organisation_name: string;
    legal_status: string;
    email: string;
    contact_name: string;
    partnership_moral: boolean;
    partnership_technical: boolean;
    partnership_financial: boolean;
    objectives: string;
};

type MoiAussiData = {
    situation: string;
    testimony: string;
    consequences: string[] | null;
    institution_name: string | null;
    name: string | null;
    email: string | null;
};

type AdhesionData = {
    nom: string;
    prenom: string;
    email: string;
    phone: string | null;
    departement: string | null;
    commune: string | null;
    aidant_type: string | null;
    situation_professionnelle: string | null;
    soutient_sna: boolean;
    wants_info: boolean;
};

type Submission = {
    id: number;
    type: 'soutien' | 'partenaire' | 'moi_aussi' | 'adhesion';
    created_at: string;
    data: SoutienData | PartenaireData | MoiAussiData | AdhesionData | null;
};

type Props = {
    email: string;
    submissions: Submission[];
};

const typeLabels: Record<string, { label: string; color: string; bg: string }> =
    {
        soutien: {
            label: 'Membre soutien',
            color: 'text-teal-700',
            bg: 'bg-teal-50 border-teal-200',
        },
        partenaire: {
            label: 'Partenariat',
            color: 'text-green-700',
            bg: 'bg-green-50 border-green-200',
        },
        moi_aussi: {
            label: 'Témoignage',
            color: 'text-blue-700',
            bg: 'bg-blue-50 border-blue-200',
        },
        adhesion: {
            label: 'Adhésion aidant',
            color: 'text-purple-700',
            bg: 'bg-purple-50 border-purple-200',
        },
    };

const aidantTypeLabels: Record<string, string> = {
    parent_handicap: "Parent d'un enfant en situation de handicap",
    conjoint: 'Conjoint(e)',
    parent_aine: "Parent d'un aîné",
    proche: 'Proche',
    autre: 'Autre',
};

function AdhesionDetails({ data }: { data: AdhesionData }) {
    return (
        <dl className="space-y-2 text-sm text-gray-600">
            <div className="flex gap-2">
                <dt className="min-w-32 font-semibold text-gray-700">Nom :</dt>
                <dd>
                    {data.prenom} {data.nom}
                </dd>
            </div>
            <div className="flex gap-2">
                <dt className="min-w-32 font-semibold text-gray-700">Email :</dt>
                <dd>{data.email}</dd>
            </div>
            {data.phone && (
                <div className="flex gap-2">
                    <dt className="min-w-32 font-semibold text-gray-700">
                        Téléphone :
                    </dt>
                    <dd>{data.phone}</dd>
                </div>
            )}
            {(data.departement || data.commune) && (
                <div className="flex gap-2">
                    <dt className="min-w-32 font-semibold text-gray-700">
                        Localisation :
                    </dt>
                    <dd>
                        {[data.commune, data.departement]
                            .filter(Boolean)
                            .join(', ')}
                    </dd>
                </div>
            )}
            {data.aidant_type && (
                <div className="flex gap-2">
                    <dt className="min-w-32 font-semibold text-gray-700">
                        Type d'aidant :
                    </dt>
                    <dd>
                        {aidantTypeLabels[data.aidant_type] ??
                            data.aidant_type}
                    </dd>
                </div>
            )}
            {data.situation_professionnelle && (
                <div className="flex gap-2">
                    <dt className="min-w-32 font-semibold text-gray-700">
                        Situation professionnelle :
                    </dt>
                    <dd>{data.situation_professionnelle}</dd>
                </div>
            )}
            <div className="flex gap-2">
                <dt className="min-w-32 font-semibold text-gray-700">
                    Soutient le SNA :
                </dt>
                <dd>{data.soutient_sna ? 'Oui' : 'Non'}</dd>
            </div>
        </dl>
    );
}

function SoutienDetails({ data }: { data: SoutienData }) {
    const engagements = [
        data.wants_events && 'Informé des événements',
        data.wants_participation && 'Participation',
    ].filter(Boolean);

    return (
        <dl className="space-y-2 text-sm text-gray-600">
            <div className="flex gap-2">
                <dt className="min-w-32 font-semibold text-gray-700">Nom :</dt>
                <dd>{data.name}</dd>
            </div>
            <div className="flex gap-2">
                <dt className="min-w-32 font-semibold text-gray-700">
                    Adresse :
                </dt>
                <dd>{data.address}</dd>
            </div>
            <div className="flex gap-2">
                <dt className="min-w-32 font-semibold text-gray-700">
                    Email :
                </dt>
                <dd>{data.email}</dd>
            </div>
            {data.phone && (
                <div className="flex gap-2">
                    <dt className="min-w-32 font-semibold text-gray-700">
                        Téléphone :
                    </dt>
                    <dd>{data.phone}</dd>
                </div>
            )}
            {engagements.length > 0 && (
                <div className="flex gap-2">
                    <dt className="min-w-32 font-semibold text-gray-700">
                        Engagements :
                    </dt>
                    <dd>{engagements.join(', ')}</dd>
                </div>
            )}
            {data.message && (
                <div>
                    <dt className="mb-1 font-semibold text-gray-700">
                        Message :
                    </dt>
                    <dd className="rounded-xl bg-gray-50 p-3 text-xs leading-relaxed">
                        {data.message}
                    </dd>
                </div>
            )}
        </dl>
    );
}

function PartenaireDetails({ data }: { data: PartenaireData }) {
    const partnerships = [
        data.partnership_moral && 'Soutien moral / promotionnel',
        data.partnership_technical && 'Soutien technique / expertise',
        data.partnership_financial && 'Soutien financier',
    ].filter(Boolean);

    return (
        <dl className="space-y-2 text-sm text-gray-600">
            <div className="flex gap-2">
                <dt className="min-w-32 font-semibold text-gray-700">
                    Organisation :
                </dt>
                <dd>{data.organisation_name}</dd>
            </div>
            <div className="flex gap-2">
                <dt className="min-w-32 font-semibold text-gray-700">
                    Statut juridique :
                </dt>
                <dd>{data.legal_status}</dd>
            </div>
            <div className="flex gap-2">
                <dt className="min-w-32 font-semibold text-gray-700">
                    Contact :
                </dt>
                <dd>{data.contact_name}</dd>
            </div>
            <div className="flex gap-2">
                <dt className="min-w-32 font-semibold text-gray-700">
                    Email :
                </dt>
                <dd>{data.email}</dd>
            </div>
            {partnerships.length > 0 && (
                <div className="flex gap-2">
                    <dt className="min-w-32 font-semibold text-gray-700">
                        Type de partenariat :
                    </dt>
                    <dd>{partnerships.join(', ')}</dd>
                </div>
            )}
            <div>
                <dt className="mb-1 font-semibold text-gray-700">
                    Objectifs :
                </dt>
                <dd className="rounded-xl bg-gray-50 p-3 text-xs leading-relaxed">
                    {data.objectives}
                </dd>
            </div>
        </dl>
    );
}

function MoiAussiDetails({ data }: { data: MoiAussiData }) {
    const situationLabels: Record<string, string> = {
        oui: 'Oui',
        en_cours: 'En cours',
        resolu: 'Résolu mais difficile',
    };

    return (
        <dl className="space-y-2 text-sm text-gray-600">
            <div className="flex gap-2">
                <dt className="min-w-32 font-semibold text-gray-700">
                    Situation :
                </dt>
                <dd>{situationLabels[data.situation] ?? data.situation}</dd>
            </div>
            {data.name && (
                <div className="flex gap-2">
                    <dt className="min-w-32 font-semibold text-gray-700">
                        Nom :
                    </dt>
                    <dd>{data.name}</dd>
                </div>
            )}
            {data.email && (
                <div className="flex gap-2">
                    <dt className="min-w-32 font-semibold text-gray-700">
                        Email :
                    </dt>
                    <dd>{data.email}</dd>
                </div>
            )}
            {data.consequences && data.consequences.length > 0 && (
                <div className="flex gap-2">
                    <dt className="min-w-32 font-semibold text-gray-700">
                        Conséquences :
                    </dt>
                    <dd>{data.consequences.join(', ')}</dd>
                </div>
            )}
            {data.institution_name && (
                <div className="flex gap-2">
                    <dt className="min-w-32 font-semibold text-gray-700">
                        Institution :
                    </dt>
                    <dd>{data.institution_name}</dd>
                </div>
            )}
            <div>
                <dt className="mb-1 font-semibold text-gray-700">
                    Témoignage :
                </dt>
                <dd className="rounded-xl bg-gray-50 p-3 text-xs leading-relaxed whitespace-pre-wrap">
                    {data.testimony}
                </dd>
            </div>
        </dl>
    );
}

export default function MySubmissions({ email, submissions }: Props) {
    return (
        <>
            <Head title="Mes formulaires – SNA" />

            <div className="min-h-screen bg-linear-to-br from-[#e8f8f8] via-white to-[#f0f9e8]">
                <PublicSiteHeader />

                <div className="mx-auto max-w-3xl space-y-8 px-4 py-16">
                    {/* Header */}
                    <div className="space-y-2 text-center">
                        <h1 className="mt-4 text-2xl font-bold text-gray-800">
                            Mes formulaires
                        </h1>
                        <p className="text-sm text-gray-500">
                            Formulaires soumis avec l'adresse{' '}
                            <strong>{email}</strong>
                        </p>
                    </div>

                    {submissions.length === 0 ? (
                        <div className="rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">
                            <span className="text-4xl">📭</span>
                            <p className="mt-4 text-gray-500">
                                Aucun formulaire trouvé pour cet email.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {submissions.map((submission) => {
                                const meta = typeLabels[submission.type] ?? {
                                    label: submission.type,
                                    color: 'text-gray-700',
                                    bg: 'bg-gray-50 border-gray-200',
                                };

                                return (
                                    <div
                                        key={submission.id}
                                        className="space-y-4 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <span
                                                className={`rounded-full border px-3 py-1 text-xs font-semibold ${meta.bg} ${meta.color}`}
                                            >
                                                {meta.label}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                Soumis le{' '}
                                                {submission.created_at}
                                            </span>
                                        </div>

                                        {submission.data && (
                                            <>
                                                {submission.type ===
                                                    'soutien' && (
                                                    <SoutienDetails
                                                        data={
                                                            submission.data as SoutienData
                                                        }
                                                    />
                                                )}
                                                {submission.type ===
                                                    'partenaire' && (
                                                    <PartenaireDetails
                                                        data={
                                                            submission.data as PartenaireData
                                                        }
                                                    />
                                                )}
                                                {submission.type ===
                                                    'moi_aussi' && (
                                                    <MoiAussiDetails
                                                        data={
                                                            submission.data as MoiAussiData
                                                        }
                                                    />
                                                )}
                                                {submission.type ===
                                                    'adhesion' && (
                                                    <AdhesionDetails
                                                        data={
                                                            submission.data as AdhesionData
                                                        }
                                                    />
                                                )}
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <div className="space-y-3 text-center">
                        <Link
                            href={forms.access.request().url}
                            className="inline-block text-sm text-teal-600 hover:underline"
                        >
                            Accéder de nouveau avec un autre email
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
