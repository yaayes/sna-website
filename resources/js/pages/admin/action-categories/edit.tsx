import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

type ActionCategoryItem = {
    id: number;
    name: string;
    slug: string;
};

export default function ActionCategoryEditPage({
    category,
}: {
    category: ActionCategoryItem;
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Admin', href: admin.dashboard() },
        { title: 'Categories actions', href: admin.actionCategories.index() },
        { title: category.name, href: admin.actionCategories.edit(category.slug) },
    ];

    const { data, setData, submit, processing, errors } = useForm({
        name: category.name,
    });

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        submit(admin.actionCategories.update(category.slug), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin — Modifier ${category.name}`} />

            <div className="mx-auto w-full max-w-2xl p-6">
                <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border bg-white p-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Modifier la categorie</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Renommez cette categorie. Le slug sera ajuste automatiquement si besoin.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Nom</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(event) => setData('name', event.target.value)}
                        />
                        {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" asChild>
                            <Link href={admin.actionCategories.index()}>Retour</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Mettre a jour
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}