import { Head, Link } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import AdminTableWrapper from '@/components/admin-table-wrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard() },
    { title: 'Contact', href: admin.contact.index() },
];

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

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
    prev_page_url: string | null;
    next_page_url: string | null;
};

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

export default function ContactIndex({
    entries,
    filters,
}: {
    entries: Paginated<ContactEntry>;
    filters: { search: string };
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin — Formulaires Contact" />
            <AdminTableWrapper
                title="Formulaires Contact"
                description={`${entries.total} soumission${entries.total !== 1 ? 's' : ''} au total.`}
                search={filters.search ?? ''}
                searchPlaceholder="Rechercher par email, ref, nom, ville ou objet…"
                searchUrl={admin.contact.index}
                pagination={entries}
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ref.</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Ville</TableHead>
                            <TableHead>Objet</TableHead>
                            <TableHead>Profil</TableHead>
                            <TableHead>Recontact</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="w-10" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {entries.data.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={9}
                                    className="py-10 text-center text-muted-foreground"
                                >
                                    Aucun resultat trouve.
                                </TableCell>
                            </TableRow>
                        )}
                        {entries.data.map((entry) => (
                            <TableRow key={entry.id}>
                                <TableCell className="font-mono text-xs">
                                    {entry.ref}
                                </TableCell>
                                <TableCell>{entry.name}</TableCell>
                                <TableCell>{entry.email}</TableCell>
                                <TableCell>{entry.city}</TableCell>
                                <TableCell className="max-w-52 truncate" title={entry.subject}>
                                    {entry.subject}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">
                                        {profileLabel[entry.profile] ?? entry.profile}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">
                                        {contactPreferenceLabel[entry.contact_preference] ?? entry.contact_preference}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground">
                                    {new Date(entry.created_at).toLocaleDateString('fr-FR')}
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon" asChild>
                                        <Link href={`/@/contact/${entry.id}`}>
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </AdminTableWrapper>
        </AppLayout>
    );
}
