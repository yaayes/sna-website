import { Head, Link } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import AdminTableWrapper from '@/components/admin-table-wrapper';
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
    { title: 'Soutien', href: admin.soutien.index() },
];

type SoutienEntry = {
    id: number;
    ref: string;
    name: string;
    address: string;
    email: string;
    phone: string | null;
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

export default function SoutienIndex({
    entries,
    filters,
}: {
    entries: Paginated<SoutienEntry>;
    filters: { search: string };
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin — Formulaires Soutien" />
            <AdminTableWrapper
                title="Formulaires Soutien"
                description={`${entries.total} soumission${entries.total !== 1 ? 's' : ''} au total.`}
                search={filters.search ?? ''}
                searchPlaceholder="Rechercher par email, ref, nom, adresse, telephone…"
                searchUrl={admin.soutien.index}
                pagination={entries}
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Réf.</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Adresse</TableHead>
                            <TableHead>Téléphone</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="w-10" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {entries.data.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
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
                                <TableCell>{entry.name}</TableCell>
                                <TableCell>{entry.email}</TableCell>
                                <TableCell>{entry.address}</TableCell>
                                <TableCell>{entry.phone ?? '—'}</TableCell>
                                <TableCell className="text-xs text-muted-foreground">
                                    {new Date(
                                        entry.created_at,
                                    ).toLocaleDateString('fr-FR')}
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon" asChild>
                                        <Link
                                            href={admin.soutien.show(entry.id)}
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
