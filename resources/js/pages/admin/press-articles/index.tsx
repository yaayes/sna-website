import { Head, Link, router } from '@inertiajs/react';
import { GripVertical, Pencil, Plus, Save, Search, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

type PressArticleItem = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    publication_date: string;
    sort_order: number;
    is_published: boolean;
    updated_at: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard() },
    { title: 'Revue de presse', href: admin.pressArticles.index() },
];

export default function PressArticleAdminIndex({
    articles,
    filters,
}: {
    articles: PressArticleItem[];
    filters: { search: string };
}) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [orderedArticles, setOrderedArticles] = useState<PressArticleItem[]>(articles);
    const [hasPendingOrder, setHasPendingOrder] = useState(false);

    const submitSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(
            admin.pressArticles.index().url,
            { search },
            { preserveState: true, replace: true },
        );
    };

    const onDrop = (draggedId: number, targetId: number) => {
        if (draggedId === targetId) {
            return;
        }

        const draggedIndex = orderedArticles.findIndex((item) => item.id === draggedId);
        const targetIndex = orderedArticles.findIndex((item) => item.id === targetId);

        if (draggedIndex === -1 || targetIndex === -1) {
            return;
        }

        const updated = [...orderedArticles];
        const [moved] = updated.splice(draggedIndex, 1);

        updated.splice(targetIndex, 0, moved);

        setOrderedArticles(updated);
        setHasPendingOrder(true);
    };

    const saveOrder = () => {
        router.patch(
            admin.pressArticles.reorder().url,
            {
                articles: orderedArticles.map((item, index) => ({
                    id: item.id,
                    sort_order: index + 1,
                })),
            },
            {
                preserveScroll: true,
                onSuccess: () => setHasPendingOrder(false),
            },
        );
    };

    const deleteArticle = (article: PressArticleItem) => {
        if (!window.confirm(`Supprimer l'article "${article.title}" ?`)) {
            return;
        }

        router.delete(admin.pressArticles.destroy(article.slug).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin — Revue de presse" />

            <div className="flex h-full flex-1 flex-col gap-5 p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Revue de presse</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {orderedArticles.length} article{orderedArticles.length !== 1 ? 's' : ''} de
                            presse.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="secondary"
                            onClick={saveOrder}
                            disabled={!hasPendingOrder}
                        >
                            <Save className="h-4 w-4" />
                            Enregistrer l'ordre
                        </Button>
                        <Button asChild>
                            <Link href={admin.pressArticles.create()}>
                                <Plus className="h-4 w-4" />
                                Nouvel article
                            </Link>
                        </Button>
                    </div>
                </div>

                <form onSubmit={submitSearch} className="flex max-w-sm gap-2">
                    <Input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Rechercher par titre ou résumé"
                    />
                    <Button type="submit" variant="secondary">
                        <Search className="h-4 w-4" />
                    </Button>
                </form>

                <div className="space-y-3">
                    {orderedArticles.length === 0 && (
                        <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                            Aucun article trouvé.
                        </div>
                    )}

                    {orderedArticles.map((article) => (
                        <div
                            key={article.id}
                            draggable
                            onDragStart={(event) => {
                                event.dataTransfer.setData('text/article-id', String(article.id));
                                event.dataTransfer.effectAllowed = 'move';
                            }}
                            onDragOver={(event) => {
                                event.preventDefault();
                                event.dataTransfer.dropEffect = 'move';
                            }}
                            onDrop={(event) => {
                                event.preventDefault();
                                const raw = event.dataTransfer.getData('text/article-id');
                                const draggedId = Number(raw);

                                if (!Number.isNaN(draggedId)) {
                                    onDrop(draggedId, article.id);
                                }
                            }}
                            className="group rounded-xl border bg-white p-4 transition-all hover:border-sna-teal/40 hover:shadow-md"
                        >
                            <div className="flex flex-wrap items-start gap-3">
                                <button
                                    type="button"
                                    className="mt-0.5 rounded-md p-1 text-gray-400 transition-colors group-hover:text-gray-600"
                                    title="Glisser-deposer"
                                >
                                    <GripVertical className="h-4 w-4" />
                                </button>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h2 className="truncate font-semibold text-gray-900">{article.title}</h2>
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${article.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}
                                        >
                                            {article.is_published ? 'Publiee' : 'Brouillon'}
                                        </span>
                                    </div>
                                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                                        {article.excerpt}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        /revue-de-presse/{article.slug} • {article.publication_date} • Maj
                                        {' '}
                                        {new Date(article.updated_at).toLocaleDateString('fr-FR')}
                                    </p>
                                </div>

                                <div className="ml-auto flex items-center gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={admin.pressArticles.edit(article.slug)}>
                                            <Pencil className="h-4 w-4" />
                                            Modifier
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => deleteArticle(article)}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-600" />
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
