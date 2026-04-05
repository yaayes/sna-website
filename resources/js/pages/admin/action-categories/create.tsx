import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard() },
    { title: 'Categories actions', href: admin.actionCategories.index() },
    { title: 'Nouvelle categorie', href: admin.actionCategories.create() },
];

export default function ActionCategoryCreatePage() {
    const { data, setData, submit, processing, errors } = useForm({
        name: '',
    });

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        submit(admin.actionCategories.store(), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin — Nouvelle categorie" />

            <div className="mx-auto w-full max-w-2xl p-6">
                <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border bg-white p-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Nouvelle categorie</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Creez une categorie qui pourra ensuite etre associee aux actions SNA.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Nom</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(event) => setData('name', event.target.value)}
                            placeholder="Ex: Transformation des politiques publiques"
                        />
                        {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" asChild>
                            <Link href={admin.actionCategories.index()}>Annuler</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Enregistrer
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}