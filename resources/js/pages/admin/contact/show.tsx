import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

type ContactEntry = {
    id: number;
    ref: string;
    name: string;
    city: string;
    email: string;
    phone: string | null;
    subject: string;
    message: string;
    profile: string;
    contact_preference: string;
    created_at: string;
};

const breadcrumbs = (ref: string): BreadcrumbItem[] => [
    { title: 'Admin', href: admin.dashboard() },
    { title: 'Contact', href: admin.contact.index() },
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

const profileLabel: Record<string, string> = {
    aidant: 'Aidant(e)',
    professionnel: 'Professionnel(le)',
    institution: 'Institution',
    etudiant: 'Etudiant(e) / chercheur(se)',
    journaliste: 'Journaliste',
    autre: 'Autre',
};

const contactPreferenceLabel: Record<string, string> = {
    email: 'Email',
    phone: 'Telephone',
    none: 'Sans recontact',
};

export default function ContactShow({ entry }: { entry: ContactEntry }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs(entry.ref)}>
            <Head title={`Admin — Contact #${entry.ref}`} />
            <div className="flex max-w-3xl flex-col gap-6 p-6">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={admin.contact.index()}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Formulaire Contact
                        </h1>
                        <p className="font-mono text-sm text-muted-foreground">
                            Ref. {entry.ref}
                        </p>
                    </div>
                </div>

                <div className="rounded-xl border p-6">
                    <h2 className="mb-4 font-semibold">Coordonnees</h2>
                    <dl>
                        <DetailRow label="Nom">{entry.name}</DetailRow>
                        <DetailRow label="Email">{entry.email}</DetailRow>
                        <DetailRow label="Telephone">{entry.phone ?? '—'}</DetailRow>
                        <DetailRow label="Ville">{entry.city}</DetailRow>
                        <DetailRow label="Date de soumission">
                            {new Date(entry.created_at).toLocaleString('fr-FR')}
                        </DetailRow>
                    </dl>
                </div>

                <div className="rounded-xl border p-6">
                    <h2 className="mb-4 font-semibold">Demande</h2>
                    <dl>
                        <DetailRow label="Objet">{entry.subject}</DetailRow>
                        <DetailRow label="Profil">
                            <Badge variant="secondary">
                                {profileLabel[entry.profile] ?? entry.profile}
                            </Badge>
                        </DetailRow>
                        <DetailRow label="Preference de recontact">
                            <Badge variant="outline">
                                {contactPreferenceLabel[entry.contact_preference] ?? entry.contact_preference}
                            </Badge>
                        </DetailRow>
                        <DetailRow label="Message">
                            <span className="whitespace-pre-wrap">
                                {entry.message}
                            </span>
                        </DetailRow>
                    </dl>
                </div>
            </div>
        </AppLayout>
    );
}
