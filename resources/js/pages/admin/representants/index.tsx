import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

type RepresentantItem = {
    id: number;
    department_code: string;
    department_name: string;
    first_name: string;
    last_name: string;
    role: string;
    photo_path: string | null;
    sort_order: number;
    is_active: boolean;
    updated_at: string;
};

type DepartmentOption = {
    code: string;
    name: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard() },
    { title: 'Représentants', href: admin.representants.index() },
];

export default function RepresentantsIndex({
    representants,
    departments,
    filters,
}: {
    representants: RepresentantItem[];
    departments: DepartmentOption[];
    filters: { search: string; department: string };
}) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [department, setDepartment] = useState(filters.department ?? '');

    const applyFilters = (newSearch: string, newDept: string) => {
        router.get(
            admin.representants.index().url,
            {
                search: newSearch || undefined,
                department: newDept || undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const submitSearch = (e: FormEvent) => {
        e.preventDefault();
        applyFilters(search, department);
    };

    const changeDept = (value: string) => {
        const newDept = value === '__all__' ? '' : value;
        setDepartment(newDept);
        applyFilters(search, newDept);
    };

    const clearFilters = () => {
        setSearch('');
        setDepartment('');
        applyFilters('', '');
    };

    const hasFilters = !!filters.search || !!filters.department;

    const deleteRepresentant = (representant: RepresentantItem) => {
        if (!window.confirm(`Supprimer ${representant.first_name} ${representant.last_name} ?`)) {
            return;
        }

        router.delete(admin.representants.destroy(representant.id).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin — Représentants" />

            <div className="flex h-full flex-1 flex-col gap-5 p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Représentants départementaux</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {representants.length} représentant{representants.length > 1 ? 's' : ''} enregistré
                            {representants.length > 1 ? 's' : ''}.
                        </p>
                    </div>

                    <Button asChild>
                        <Link href={admin.representants.create()}>
                            <Plus className="h-4 w-4" />
                            Nouveau représentant
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <form onSubmit={submitSearch} className="flex flex-wrap items-center gap-3">
                    <div className="relative flex-1" style={{ minWidth: '200px' }}>
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher par nom, rôle…"
                            className="pl-9"
                        />
                    </div>

                    <Select value={department || '__all__'} onValueChange={changeDept}>
                        <SelectTrigger className="w-56">
                            <SelectValue placeholder="Tous les départements" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="__all__">Tous les départements</SelectItem>
                            {departments.map((d) => (
                                <SelectItem key={d.code} value={d.code}>
                                    {d.code} — {d.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button type="submit" variant="secondary">
                        <Search className="h-4 w-4" />
                        Filtrer
                    </Button>

                    {hasFilters && (
                        <Button type="button" variant="ghost" onClick={clearFilters}>
                            <X className="h-4 w-4" />
                            Réinitialiser
                        </Button>
                    )}
                </form>

                <div className="space-y-3">
                    {representants.length === 0 && (
                        <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                            Aucun représentant trouvé.
                        </div>
                    )}

                    {representants.map((representant) => (
                        <div
                            key={representant.id}
                            className="group rounded-xl border bg-white p-4 transition-all hover:border-sna-teal/40 hover:shadow-md"
                        >
                            <div className="flex flex-wrap items-start gap-3">
                                {representant.photo_path ? (
                                    <img
                                        src={representant.photo_path}
                                        alt={`${representant.first_name} ${representant.last_name}`}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sna-teal/10 text-sm font-bold text-sna-teal">
                                        {representant.first_name[0]}
                                        {representant.last_name[0]}
                                    </div>
                                )}

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h2 className="truncate font-semibold text-gray-900">
                                            {representant.first_name} {representant.last_name}
                                        </h2>
                                        <span className="rounded-full bg-sna-teal/10 px-2 py-0.5 text-xs font-medium text-sna-teal-dark">
                                            {representant.department_code} — {representant.department_name}
                                        </span>
                                        {!representant.is_active && (
                                            <Badge variant="secondary">Inactif</Badge>
                                        )}
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {representant.role} • Maj le{' '}
                                        {new Date(representant.updated_at).toLocaleDateString('fr-FR')}
                                    </p>
                                </div>

                                <div className="ml-auto flex items-center gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={admin.representants.edit(representant.id)}>
                                            <Pencil className="h-4 w-4" />
                                            Modifier
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => deleteRepresentant(representant)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Supprimer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
