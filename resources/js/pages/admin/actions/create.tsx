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

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard() },
    { title: 'Actions SNA', href: admin.actions.index() },
    { title: 'Nouvelle action', href: admin.actions.create() },
];

type CategoryOption = {
    id: number;
    name: string;
};

export default function ActionCreatePage({ categories }: { categories: CategoryOption[] }) {
    const { data, setData, submit, processing, errors } = useForm({
        title: '',
        action_category_id: categories[0]?.id ?? 0,
        content: '<p>Decrivez ici cette action du SNA...</p>',
        is_published: true,
    });

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        submit(admin.actions.store(), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin — Nouvelle action" />

            <div className="mx-auto w-full max-w-4xl p-6">
                <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border bg-white p-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Nouvelle action</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Creez une action visible sur la page publique Nos Actions.
                        </p>
                    </div>

                    {categories.length === 0 && (
                        <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
                            Creez d abord une categorie pour pouvoir enregistrer une action.
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
                                placeholder="Ex: Observatoire national des aidants"
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
                            Publier cette action
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
                            <Link href={admin.actions.index()}>Annuler</Link>
                        </Button>
                        <Button type="submit" disabled={processing || categories.length === 0}>
                            Enregistrer
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
