import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

type PartenaireEntry = {
    id: number;
    ref: string;
    organisation_name: string;
    legal_status: string;
    address: string;
    phone: string | null;
    email: string;
    contact_name: string;
    partnership_moral: boolean;
    partnership_moral_details: string | null;
    partnership_technical: boolean;
    partnership_technical_details: string | null;
    partnership_financial: boolean;
    objectives: string;
    comment_libre: string | null;
    commitment_projects: boolean;
    commitment_communication: boolean;
    commitment_expertise: boolean;
    consents_email: boolean;
    consents_rgpd: boolean;
    created_at: string;
    updated_at: string;
    attachments?: Array<{
        id: number;
        file_path: string;
        original_name: string;
    }>;
};

const breadcrumbs = (ref: string): BreadcrumbItem[] => [
    { title: 'Admin', href: admin.dashboard() },
    { title: 'Partenaire', href: admin.partenaire.index() },
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

export default function PartenaireShow({ entry }: { entry: PartenaireEntry }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs(entry.ref)}>
            <Head title={`Admin — Partenaire #${entry.ref}`} />
            <div className="flex max-w-3xl flex-col gap-6 p-6">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={admin.partenaire.index()}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Formulaire Partenaire
                        </h1>
                        <p className="font-mono text-sm text-muted-foreground">
                            Réf. {entry.ref}
                        </p>
                    </div>
                </div>

                <div className="rounded-xl border p-6">
                    <h2 className="mb-4 font-semibold">
                        Informations de l'organisation
                    </h2>
                    <dl>
                        <DetailRow label="Organisation">
                            {entry.organisation_name}
                        </DetailRow>
                        <DetailRow label="Statut légal">
                            {entry.legal_status}
                        </DetailRow>
                        <DetailRow label="Adresse">
                            {entry.address}
                        </DetailRow>
                        <DetailRow label="Téléphone">
                            {entry.phone || '—'}
                        </DetailRow>
                        <DetailRow label="Contact">
                            {entry.contact_name}
                        </DetailRow>
                        <DetailRow label="Email">{entry.email}</DetailRow>
                        <DetailRow label="Date de soumission">
                            {new Date(entry.created_at).toLocaleString('fr-FR')}
                        </DetailRow>
                    </dl>
                </div>

                <div className="rounded-xl border p-6">
                    <h2 className="mb-4 font-semibold">
                        Types de partenariat souhaités
                    </h2>
                    <dl>
                        <DetailRow label="Moral">
                            <BoolBadge value={entry.partnership_moral} />
                        </DetailRow>
                        {entry.partnership_moral_details && (
                            <DetailRow label="Détails moral">
                                <span className="whitespace-pre-wrap">
                                    {entry.partnership_moral_details}
                                </span>
                            </DetailRow>
                        )}
                        <DetailRow label="Technique">
                            <BoolBadge value={entry.partnership_technical} />
                        </DetailRow>
                        {entry.partnership_technical_details && (
                            <DetailRow label="Détails technique">
                                <span className="whitespace-pre-wrap">
                                    {entry.partnership_technical_details}
                                </span>
                            </DetailRow>
                        )}
                        <DetailRow label="Financier">
                            <BoolBadge value={entry.partnership_financial} />
                        </DetailRow>
                    </dl>
                </div>

                <div className="rounded-xl border p-6">
                    <h2 className="mb-4 font-semibold">
                        Objectifs & engagements
                    </h2>
                    <dl>
                        <DetailRow label="Objectifs">
                            <span className="whitespace-pre-wrap">
                                {entry.objectives}
                            </span>
                        </DetailRow>
                        <DetailRow label="Projets">
                            <BoolBadge value={entry.commitment_projects} />
                        </DetailRow>
                        <DetailRow label="Communication">
                            <BoolBadge value={entry.commitment_communication} />
                        </DetailRow>
                        <DetailRow label="Expertise">
                            <BoolBadge value={entry.commitment_expertise} />
                        </DetailRow>
                    </dl>
                </div>

                {entry.comment_libre && (
                    <div className="rounded-xl border p-6">
                        <h2 className="mb-4 font-semibold">Commentaire libre</h2>
                        <p className="whitespace-pre-wrap text-sm">
                            {entry.comment_libre}
                        </p>
                    </div>
                )}

                {entry.attachments && entry.attachments.length > 0 && (
                    <div className="rounded-xl border p-6">
                        <h2 className="mb-4 font-semibold">Pièces jointes</h2>
                        <ul className="space-y-2">
                            {entry.attachments.map((attachment) => (
                                <li key={attachment.id}>
                                    <a
                                        href={`/storage/${attachment.file_path}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm text-sna-green hover:underline"
                                    >
                                        📄 {attachment.original_name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

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
