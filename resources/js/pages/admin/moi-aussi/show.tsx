import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

type MoiAussiEntry = {
    id: number;
    ref: string;
    name: string | null;
    email: string | null;
    phone: string | null;
    situation: string;
    testimony: string;
    consequences: string[] | null;
    contacted_institution: boolean | null;
    institution_name: string | null;
    usage_anonymised: boolean;
    usage_collective: boolean;
    usage_legislation: boolean;
    usage_confidential: boolean;
    created_at: string;
    updated_at: string;
};

const breadcrumbs = (ref: string): BreadcrumbItem[] => [
    { title: 'Admin', href: admin.dashboard() },
    { title: 'Moi Aussi', href: admin.moiAussi.index() },
    { title: ref, href: '#' },
];

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

const situationLabels: Record<string, string> = {
    oui: 'En cours',
    en_cours: 'Démarches en cours',
    resolu: 'Résolu',
};

export default function MoiAussiShow({ entry }: { entry: MoiAussiEntry }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs(entry.ref)}>
            <Head title={`Admin — Moi Aussi #${entry.ref}`} />
            <div className="flex max-w-3xl flex-col gap-6 p-6">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={admin.moiAussi.index()}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Formulaire Moi Aussi
                        </h1>
                        <p className="font-mono text-sm text-muted-foreground">
                            Réf. {entry.ref}
                        </p>
                    </div>
                </div>

                <div className="rounded-xl border p-6">
                    <h2 className="mb-4 font-semibold">
                        Informations personnelles
                    </h2>
                    <dl>
                        <DetailRow label="Nom">{entry.name ?? '—'}</DetailRow>
                        <DetailRow label="Email">
                            {entry.email ?? '—'}
                        </DetailRow>
                        <DetailRow label="Téléphone">
                            {entry.phone ?? '—'}
                        </DetailRow>
                        <DetailRow label="Date de soumission">
                            {new Date(entry.created_at).toLocaleString('fr-FR')}
                        </DetailRow>
                    </dl>
                </div>

                <div className="rounded-xl border p-6">
                    <h2 className="mb-4 font-semibold">Témoignage</h2>
                    <dl>
                        <DetailRow label="Situation">
                            <Badge variant="secondary">
                                {situationLabels[entry.situation] ??
                                    entry.situation}
                            </Badge>
                        </DetailRow>
                        <DetailRow label="Témoignage">
                            <span className="whitespace-pre-wrap">
                                {entry.testimony}
                            </span>
                        </DetailRow>
                        {entry.consequences &&
                            entry.consequences.length > 0 && (
                                <DetailRow label="Conséquences">
                                    <div className="flex flex-wrap gap-1">
                                        {entry.consequences.map((c) => (
                                            <Badge key={c} variant="outline">
                                                {c}
                                            </Badge>
                                        ))}
                                    </div>
                                </DetailRow>
                            )}
                        <DetailRow label="Institution contactée">
                            {entry.contacted_institution === null
                                ? '—'
                                : entry.contacted_institution
                                  ? `Oui${entry.institution_name ? ` (${entry.institution_name})` : ''}`
                                  : 'Non'}
                        </DetailRow>
                    </dl>
                </div>

                <div className="rounded-xl border p-6">
                    <h2 className="mb-4 font-semibold">
                        Autorisations d'usage
                    </h2>
                    <dl>
                        <DetailRow label="Usage anonymisé">
                            <Badge
                                variant={
                                    entry.usage_anonymised
                                        ? 'default'
                                        : 'outline'
                                }
                            >
                                {entry.usage_anonymised ? 'Oui' : 'Non'}
                            </Badge>
                        </DetailRow>
                        <DetailRow label="Usage collectif">
                            <Badge
                                variant={
                                    entry.usage_collective
                                        ? 'default'
                                        : 'outline'
                                }
                            >
                                {entry.usage_collective ? 'Oui' : 'Non'}
                            </Badge>
                        </DetailRow>
                        <DetailRow label="Usage législatif">
                            <Badge
                                variant={
                                    entry.usage_legislation
                                        ? 'default'
                                        : 'outline'
                                }
                            >
                                {entry.usage_legislation ? 'Oui' : 'Non'}
                            </Badge>
                        </DetailRow>
                        <DetailRow label="Confidentiel">
                            <Badge
                                variant={
                                    entry.usage_confidential
                                        ? 'destructive'
                                        : 'outline'
                                }
                            >
                                {entry.usage_confidential ? 'Oui' : 'Non'}
                            </Badge>
                        </DetailRow>
                    </dl>
                </div>
            </div>
        </AppLayout>
    );
}
