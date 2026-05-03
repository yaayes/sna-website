import { Head, Link, useForm } from '@inertiajs/react';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard() },
    { title: 'Représentants', href: admin.representants.index() },
    { title: 'Nouveau représentant', href: admin.representants.create() },
];

export default function RepresentantCreatePage() {
    const { data, setData, submit, processing, errors } = useForm<{
        department_code: string;
        department_name: string;
        first_name: string;
        last_name: string;
        role: string;
        short_bio: string;
        photo: File | null;
        sort_order: string;
        is_active: boolean;
    }>({
        department_code: '',
        department_name: '',
        first_name: '',
        last_name: '',
        role: 'Représentant(e) départemental(e)',
        short_bio: '',
        photo: null,
        sort_order: '',
        is_active: true,
    });

    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('photo', file);
        if (file) {
            setPhotoPreview(URL.createObjectURL(file));
        } else {
            setPhotoPreview(null);
        }
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        submit(admin.representants.store(), { preserveScroll: true, forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin — Nouveau représentant" />

            <div className="mx-auto w-full max-w-2xl p-6">
                <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border bg-white p-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Nouveau représentant</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Ajoutez un représentant départemental au réseau SNA.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="department_code">Code département</Label>
                            <Input
                                id="department_code"
                                value={data.department_code}
                                onChange={(e) => setData('department_code', e.target.value)}
                                placeholder="Ex: 75"
                            />
                            {errors.department_code && (
                                <p className="text-xs text-red-600">{errors.department_code}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="department_name">Nom du département</Label>
                            <Input
                                id="department_name"
                                value={data.department_name}
                                onChange={(e) => setData('department_name', e.target.value)}
                                placeholder="Ex: Paris"
                            />
                            {errors.department_name && (
                                <p className="text-xs text-red-600">{errors.department_name}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first_name">Prénom</Label>
                            <Input
                                id="first_name"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                placeholder="Ex: Margaux"
                            />
                            {errors.first_name && <p className="text-xs text-red-600">{errors.first_name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="last_name">Nom de famille</Label>
                            <Input
                                id="last_name"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                placeholder="Ex: MENEYROL"
                            />
                            {errors.last_name && <p className="text-xs text-red-600">{errors.last_name}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">Rôle</Label>
                        <Input
                            id="role"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                        />
                        {errors.role && <p className="text-xs text-red-600">{errors.role}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="short_bio">Biographie courte</Label>
                        <textarea
                            id="short_bio"
                            rows={5}
                            value={data.short_bio}
                            onChange={(e) => setData('short_bio', e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition placeholder:text-gray-300 focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/30 focus:outline-none"
                            placeholder="Présentation du représentant…"
                        />
                        {errors.short_bio && <p className="text-xs text-red-600">{errors.short_bio}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="photo">Photo</Label>
                        <div className="flex items-start gap-4">
                            {photoPreview && (
                                <img
                                    src={photoPreview}
                                    alt="Aperçu"
                                    className="h-20 w-20 flex-shrink-0 rounded-xl object-cover ring-1 ring-gray-200"
                                />
                            )}
                            <div className="flex-1 space-y-1">
                                <input
                                    id="photo"
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    onChange={handlePhotoChange}
                                    className="block w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-sna-teal/10 file:px-3 file:py-1 file:text-xs file:font-medium file:text-sna-teal transition hover:border-sna-teal/40"
                                />
                                <p className="text-xs text-gray-400">JPEG, PNG ou WebP — max 3 Mo</p>
                            </div>
                        </div>
                        {errors.photo && <p className="text-xs text-red-600">{errors.photo}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="sort_order">Ordre d'affichage</Label>
                            <Input
                                id="sort_order"
                                type="number"
                                min={0}
                                value={data.sort_order}
                                onChange={(e) => setData('sort_order', e.target.value)}
                                placeholder="Ex: 1"
                            />
                        </div>

                        <div className="flex items-center gap-3 pt-6">
                            <input
                                id="is_active"
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="h-4 w-4 rounded accent-sna-teal"
                            />
                            <Label htmlFor="is_active">Actif (visible sur le site public)</Label>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" asChild>
                            <Link href={admin.representants.index()}>Annuler</Link>
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
