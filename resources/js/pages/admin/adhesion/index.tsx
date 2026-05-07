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
    { title: 'Adhésions', href: admin.adhesion.index() },
];

type AdhesionEntry = {
    id: number;
    ref: string;
    nom: string;
    prenom: string;
    email: string;
    phone: string | null;
    departement: string | null;
    commune: string | null;
    aidant_type: string | null;
    created_at: string;
    payment_status: string | null;
    payment_amount_cents: number | null;
};

const paymentStatusLabel: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
    captured: { label: 'Payé', variant: 'default' },
    pending: { label: 'En attente', variant: 'secondary' },
    authorized: { label: 'Autorisé', variant: 'secondary' },
    rejected: { label: 'Refusé', variant: 'destructive' },
    cancelled: { label: 'Annulé', variant: 'outline' },
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

export default function AdhesionIndex({
    entries,
    filters,
}: {
    entries: Paginated<AdhesionEntry>;
    filters: { search: string };
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin — Formulaires Adhésion" />
            <AdminTableWrapper
                title="Formulaires Adhésion Aidants"
                description={`${entries.total} soumission${entries.total !== 1 ? 's' : ''} au total.`}
                search={filters.search ?? ''}
                searchPlaceholder="Rechercher par email, réf, nom, prénom, téléphone…"
                searchUrl={admin.adhesion.index}
                pagination={entries}
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Réf.</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Téléphone</TableHead>
                            <TableHead>Localisation</TableHead>
                            <TableHead>Paiement</TableHead>
                            <TableHead>Montant</TableHead>
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
                                    Aucun résultat trouvé.
                                </TableCell>
                            </TableRow>
                        )}
                        {entries.data.map((entry) => (
                            <TableRow key={entry.id}>
                                <TableCell className="font-mono text-xs">
                                    {entry.ref}
                                </TableCell>
                                <TableCell>
                                    {entry.prenom} {entry.nom}
                                </TableCell>
                                <TableCell>{entry.email}</TableCell>
                                <TableCell>{entry.phone ?? '—'}</TableCell>
                                <TableCell>
                                    {[entry.commune, entry.departement]
                                        .filter(Boolean)
                                        .join(', ') || '—'}
                                </TableCell>
                                <TableCell>
                                    {entry.payment_status ? (
                                        <Badge variant={paymentStatusLabel[entry.payment_status]?.variant ?? 'outline'}>
                                            {paymentStatusLabel[entry.payment_status]?.label ?? entry.payment_status}
                                        </Badge>
                                    ) : (
                                        <span className="text-xs text-muted-foreground">—</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-xs">
                                    {entry.payment_amount_cents !== null
                                        ? (entry.payment_amount_cents / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
                                        : '—'}
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground">
                                    {new Date(
                                        entry.created_at,
                                    ).toLocaleDateString('fr-FR')}
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon" asChild>
                                        <Link
                                            href={admin.adhesion.show(entry.id)}
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
