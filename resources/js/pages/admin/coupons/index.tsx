import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import AdminTableWrapper from '@/components/admin-table-wrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard() },
    { title: 'Coupons', href: admin.coupons.index() },
];

type CouponItem = {
    id: number;
    code: string;
    description: string | null;
    discount_euros: string;
    max_uses: number | null;
    uses_count: number;
    expires_at: string | null;
    is_active: boolean;
    is_valid: boolean;
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

export default function CouponsIndex({
    coupons,
    filters,
}: {
    coupons: Paginated<CouponItem>;
    filters: { search: string };
}) {
    const handleDelete = (id: number, code: string) => {
        if (confirm(`Supprimer le coupon "${code}" ?`)) {
            router.delete(admin.coupons.destroy(id), { preserveScroll: true });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin — Coupons" />
            <div className="px-6 pt-6">
                <Button asChild size="sm">
                    <Link href={admin.coupons.create()}>
                        <Plus className="mr-1 h-4 w-4" />
                        Nouveau coupon
                    </Link>
                </Button>
            </div>
            <AdminTableWrapper
                title="Coupons"
                description={`${coupons.total} coupon${coupons.total !== 1 ? 's' : ''} au total.`}
                search={filters.search ?? ''}
                searchPlaceholder="Rechercher par code ou description…"
                searchUrl={admin.coupons.index}
                pagination={coupons}
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Réduction</TableHead>
                            <TableHead>Utilisations</TableHead>
                            <TableHead>Expiration</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="w-20" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {coupons.data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                                    Aucun coupon trouvé.
                                </TableCell>
                            </TableRow>
                        )}
                        {coupons.data.map((coupon) => (
                            <TableRow key={coupon.id}>
                                <TableCell className="font-mono font-semibold">{coupon.code}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">{coupon.description ?? '—'}</TableCell>
                                <TableCell className="font-medium">{coupon.discount_euros} €</TableCell>
                                <TableCell className="text-sm">
                                    {coupon.uses_count}
                                    {coupon.max_uses !== null && ` / ${coupon.max_uses}`}
                                </TableCell>
                                <TableCell className="text-sm">{coupon.expires_at ?? '—'}</TableCell>
                                <TableCell>
                                    {coupon.is_valid ? (
                                        <Badge>Actif</Badge>
                                    ) : coupon.is_active ? (
                                        <Badge variant="secondary">Épuisé / Expiré</Badge>
                                    ) : (
                                        <Badge variant="outline">Inactif</Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={admin.coupons.edit(coupon.id)}>
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() => handleDelete(coupon.id, coupon.code)}
                                        >
                                            <Trash2 className="h-4 w-4" />
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
