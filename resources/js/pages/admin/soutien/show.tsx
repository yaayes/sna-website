import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

type SoutienEntry = {
    id: number;
    ref: string;
    name: string;
    address: string;
    email: string;
    phone: string | null;
    wants_events: boolean;
    wants_participation: boolean;
    message: string | null;
    consents_email: boolean;
    consents_rgpd: boolean;
    created_at: string;
    updated_at: string;
};

const breadcrumbs = (ref: string): BreadcrumbItem[] => [
    { title: 'Admin', href: admin.dashboard() },
    { title: 'Soutien', href: admin.soutien.index() },
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

function BoolBadge({ value }: { value: boolean }) {
    return (
        <Badge variant={value ? 'default' : 'outline'}>
            {value ? 'Oui' : 'Non'}
        </Badge>
    );
}

export default function SoutienShow({ entry }: { entry: SoutienEntry }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs(entry.ref)}>
            <Head title={`Admin — Soutien #${entry.ref}`} />
            <div className="flex max-w-3xl flex-col gap-6 p-6">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={admin.soutien.index()}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Formulaire Soutien
                        </h1>
                        <p className="font-mono text-sm text-muted-foreground">
                            Réf. {entry.ref}
                        </p>
                    </div>
                </div>

                <div className="rounded-xl border p-6">
                    <h2 className="mb-4 font-semibold">Informations</h2>
                    <dl>
                        <DetailRow label="Nom">{entry.name}</DetailRow>
                        <DetailRow label="Adresse">{entry.address}</DetailRow>
                        <DetailRow label="Email">{entry.email}</DetailRow>
                        <DetailRow label="Téléphone">
                            {entry.phone ?? '—'}
                        </DetailRow>
                        <DetailRow label="Date de soumission">
                            {new Date(entry.created_at).toLocaleString('fr-FR')}
                        </DetailRow>
                    </dl>
                </div>

                <div className="rounded-xl border p-6">
                    <h2 className="mb-4 font-semibold">
                        Souhaits d'implication
                    </h2>
                    <dl>
                        <DetailRow label="Événements">
                            <BoolBadge value={entry.wants_events} />
                        </DetailRow>
                        <DetailRow label="Participation">
                            <BoolBadge value={entry.wants_participation} />
                        </DetailRow>
                        {entry.message && (
                            <DetailRow label="Message">
                                <span className="whitespace-pre-wrap">
                                    {entry.message}
                                </span>
                            </DetailRow>
                        )}
                    </dl>
                </div>

                <div className="rounded-xl border p-6">
                    <h2 className="mb-4 font-semibold">Consentements</h2>
                    <dl>
                        <DetailRow label="Emails">
                            <BoolBadge value={entry.consents_email} />
                        </DetailRow>
                        <DetailRow label="RGPD">
                            <BoolBadge value={entry.consents_rgpd} />
                        </DetailRow>
                    </dl>
                </div>
            </div>
        </AppLayout>
    );
}
