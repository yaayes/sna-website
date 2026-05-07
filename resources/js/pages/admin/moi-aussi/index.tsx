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
    { title: 'Moi Aussi', href: admin.moiAussi.index() },
];

type ActionSummary = {
    id: number;
    title: string;
    slug: string;
};

type MoiAussiEntry = {
    id: number;
    ref: string;
    name: string | null;
    email: string | null;
    situation: string;
    usage_confidential: boolean;
    created_at: string;
    action: ActionSummary | null;
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

const situationLabels: Record<string, string> = {
    oui: 'En cours',
    en_cours: 'Démarches en cours',
    resolu: 'Résolu',
};

export default function MoiAussiIndex({
    entries,
    filters,
}: {
    entries: Paginated<MoiAussiEntry>;
    filters: { search: string };
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin — Formulaires Moi Aussi" />
            <AdminTableWrapper
                title="Formulaires Moi Aussi"
                description={`${entries.total} soumission${entries.total !== 1 ? 's' : ''} au total.`}
                search={filters.search ?? ''}
                searchPlaceholder="Rechercher par email, ref, nom…"
                searchUrl={admin.moiAussi.index}
                pagination={entries}
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Réf.</TableHead>
                            <TableHead>Action liée</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Situation</TableHead>
                            <TableHead>Confidentiel</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="w-10" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {entries.data.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={8}
                                    className="py-10 text-center text-muted-foreground"
                                >
                                    Aucun résultat trouvé.
                                </TableCell>
                            </TableRow>
                        )}
                        {entries.data.map((entry) => (
                            <TableRow key={entry.id}>
                                <TableCell className="font-mono text-xs">
                                    {entry.ref}
                                </TableCell>
                                <TableCell className="max-w-[180px]">
                                    {entry.action ? (
                                        <Link
                                            href={`/nos-actions/${entry.action.slug}`}
                                            className="line-clamp-2 text-xs font-medium text-blue-600 hover:underline"
                                            target="_blank"
                                        >
                                            {entry.action.title}
                                        </Link>
                                    ) : (
                                        <span className="text-muted-foreground">—</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {entry.name ?? (
                                        <span className="text-muted-foreground">
                                            —
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {entry.email ?? (
                                        <span className="text-muted-foreground">
                                            —
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">
                                        {situationLabels[entry.situation] ??
                                            entry.situation}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {entry.usage_confidential ? (
                                        <Badge variant="destructive">Oui</Badge>
                                    ) : (
                                        <Badge variant="outline">Non</Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground">
                                    {new Date(
                                        entry.created_at,
                                    ).toLocaleDateString('fr-FR')}
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon" asChild>
                                        <Link
                                            href={admin.moiAussi.show(entry.id)}
                                        >
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
