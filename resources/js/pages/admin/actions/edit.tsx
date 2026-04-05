import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import WysiwygEditor from '@/components/wysiwyg-editor';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

type ActionItem = {
    id: number;
    slug: string;
    title: string;
    action_category_id: number;
    category_name: string;
    content: string;
    is_published: boolean;
};

type CategoryOption = {
    id: number;
    name: string;
};

export default function ActionEditPage({
    actionItem,
    categories,
}: {
    actionItem: ActionItem;
    categories: CategoryOption[];
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Admin', href: admin.dashboard() },
        { title: 'Actions SNA', href: admin.actions.index() },
        { title: actionItem.title, href: admin.actions.edit(actionItem.slug) },
    ];

    const { data, setData, submit, processing, errors } = useForm({
        title: actionItem.title,
        action_category_id: actionItem.action_category_id,
        content: actionItem.content,
        is_published: actionItem.is_published,
    });

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        submit(admin.actions.update(actionItem.slug), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin — Modifier ${actionItem.title}`} />

            <div className="mx-auto w-full max-w-4xl p-6">
                <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border bg-white p-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Modifier l'action</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Ajustez le titre, la categorie, le contenu et le statut de publication.
                        </p>
                    </div>

                    {categories.length === 0 && (
                        <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
                            Aucune categorie n est disponible. Creez-en une avant de modifier cette action.
                            <span className="ml-1">
                                <Link className="font-semibold underline" href={admin.actionCategories.create()}>
                                    Ajouter une categorie
                                </Link>
                            </span>
                        </div>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="title">Titre</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(event) => setData('title', event.target.value)}
                            />
                            {errors.title && <p className="text-xs text-red-600">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="action_category_id">Categorie</Label>
                            <Select
                                value={String(data.action_category_id)}
                                onValueChange={(value) =>
                                    setData('action_category_id', Number(value))
                                }
                                disabled={categories.length === 0}
                            >
                                <SelectTrigger id="action_category_id" className="w-full">
                                    <SelectValue placeholder="Selectionner une categorie" />
                                </SelectTrigger>
                                <SelectContent align="start" className="max-h-72">
                                    {categories.map((item) => (
                                        <SelectItem key={item.id} value={String(item.id)}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.action_category_id && (
                                <p className="text-xs text-red-600">{errors.action_category_id}</p>
                            )}
                        </div>

                        <label className="flex items-end gap-2 pb-1 text-sm font-medium text-gray-700">
                            <input
                                type="checkbox"
                                checked={data.is_published}
                                onChange={(event) =>
                                    setData('is_published', event.target.checked)
                                }
                                className="h-4 w-4 accent-sna-teal"
                            />
                            Action publiee
                        </label>
                    </div>

                    <div className="space-y-2">
                        <Label>Contenu (WYSIWYG)</Label>
                        <WysiwygEditor
                            value={data.content}
                            onChange={(html) => setData('content', html)}
                        />
                        {errors.content && (
                            <p className="text-xs text-red-600">{errors.content}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" asChild>
                            <Link href={admin.actions.index()}>Retour</Link>
                        </Button>
                        <Button type="submit" disabled={processing || categories.length === 0}>
                            Mettre a jour
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
