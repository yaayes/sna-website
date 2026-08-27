import { Head, Link, router } from '@inertiajs/react';
import { CheckCircle2, Circle, Eye, Mail } from 'lucide-react';
import { useState } from 'react';
import AdminTableWrapper from '@/components/admin-table-wrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { buildGmailReplyUrl } from '@/lib/gmail';
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
    responded_at: string | null;
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
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [selectionPage, setSelectionPage] = useState(entries.current_page);

    if (selectionPage !== entries.current_page) {
        setSelectionPage(entries.current_page);
        setSelectedIds([]);
    }

    const toggleResponded = (id: number) => {
        router.patch(
            admin.contact.toggleResponded(id).url,
            {},
            { preserveScroll: true },
        );
    };

    const respondableIds = entries.data
        .filter((entry) => !entry.responded_at)
        .map((entry) => entry.id);

    const allSelected =
        respondableIds.length > 0 &&
        respondableIds.every((id) => selectedIds.includes(id));

    const toggleSelectAll = () => {
        setSelectedIds(allSelected ? [] : respondableIds);
    };

    const toggleSelectOne = (id: number) => {
        setSelectedIds((current) =>
            current.includes(id)
                ? current.filter((selectedId) => selectedId !== id)
                : [...current, id],
        );
    };

    const bulkMarkResponded = () => {
        router.patch(
            admin.contact.bulkRespond().url,
            { ids: selectedIds },
            { preserveScroll: true, onSuccess: () => setSelectedIds([]) },
        );
    };

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
                {selectedIds.length > 0 && (
                    <div className="flex items-center justify-between gap-4 border-b bg-muted/50 px-4 py-2">
                        <p className="text-sm text-muted-foreground">
                            {selectedIds.length} sélectionné
                            {selectedIds.length > 1 ? 's' : ''}
                        </p>
                        <Button size="sm" onClick={bulkMarkResponded}>
                            <CheckCircle2 className="h-4 w-4" />
                            Marquer comme répondu
                        </Button>
                    </div>
                )}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-10">
                                <Checkbox
                                    checked={allSelected}
                                    disabled={respondableIds.length === 0}
                                    onCheckedChange={toggleSelectAll}
                                    aria-label="Tout sélectionner"
                                />
                            </TableHead>
                            <TableHead>Ref.</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Ville</TableHead>
                            <TableHead>Objet</TableHead>
                            <TableHead>Profil</TableHead>
                            <TableHead>Recontact</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="w-24" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {entries.data.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={11}
                                    className="py-10 text-center text-muted-foreground"
                                >
                                    Aucun resultat trouve.
                                </TableCell>
                            </TableRow>
                        )}
                        {entries.data.map((entry) => (
                            <TableRow
                                key={entry.id}
                                className="cursor-pointer"
                                onClick={() =>
                                    router.visit(
                                        admin.contact.show(entry.id).url,
                                    )
                                }
                            >
                                <TableCell onClick={(e) => e.stopPropagation()}>
                                    <Checkbox
                                        checked={selectedIds.includes(entry.id)}
                                        disabled={!!entry.responded_at}
                                        onCheckedChange={() =>
                                            toggleSelectOne(entry.id)
                                        }
                                        aria-label={`Sélectionner ${entry.ref}`}
                                    />
                                </TableCell>
                                <TableCell className="font-mono text-xs">
                                    {entry.ref}
                                </TableCell>
                                <TableCell>{entry.name}</TableCell>
                                <TableCell>{entry.email}</TableCell>
                                <TableCell>{entry.city}</TableCell>
                                <TableCell
                                    className="max-w-52 truncate"
                                    title={entry.subject}
                                >
                                    {entry.subject}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">
                                        {profileLabel[entry.profile] ??
                                            entry.profile}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">
                                        {contactPreferenceLabel[
                                            entry.contact_preference
                                        ] ?? entry.contact_preference}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            entry.responded_at
                                                ? 'default'
                                                : 'secondary'
                                        }
                                    >
                                        {entry.responded_at
                                            ? 'Répondu'
                                            : 'Nouveau'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground">
                                    {new Date(
                                        entry.created_at,
                                    ).toLocaleDateString('fr-FR')}
                                </TableCell>
                                <TableCell onClick={(e) => e.stopPropagation()}>
                                    <div className="flex items-center justify-end gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                        >
                                            <Link
                                                href={admin.contact.show(
                                                    entry.id,
                                                )}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                        >
                                            <a
                                                href={buildGmailReplyUrl(entry)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Mail className="h-4 w-4" />
                                            </a>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            title={
                                                entry.responded_at
                                                    ? 'Marquer comme non répondu'
                                                    : 'Marquer comme répondu'
                                            }
                                            onClick={() =>
                                                toggleResponded(entry.id)
                                            }
                                        >
                                            {entry.responded_at ? (
                                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                            ) : (
                                                <Circle className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </AdminTableWrapper>
        </AppLayout>
    );
}
