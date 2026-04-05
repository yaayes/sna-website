import { Head, Link, router } from '@inertiajs/react';
import { GripVertical, Pencil, Plus, Save, Search, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

type ActionItem = {
    id: number;
    title: string;
    slug: string;
    category: string;
    sort_order: number;
    is_published: boolean;
    updated_at: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard() },
    { title: 'Actions SNA', href: admin.actions.index() },
];

export default function ActionAdminIndex({
    actions,
    filters,
}: {
    actions: ActionItem[];
    filters: { search: string };
}) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [orderedActions, setOrderedActions] = useState<ActionItem[]>(actions);
    const [hasPendingOrder, setHasPendingOrder] = useState(false);

    const categoriesCount = useMemo(() => {
        return new Set(orderedActions.map((item) => item.category)).size;
    }, [orderedActions]);

    const submitSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(
            admin.actions.index().url,
            { search },
            { preserveState: true, replace: true },
        );
    };

    const onDrop = (draggedId: number, targetId: number) => {
        if (draggedId === targetId) {
            return;
        }

        const draggedIndex = orderedActions.findIndex((item) => item.id === draggedId);
        const targetIndex = orderedActions.findIndex((item) => item.id === targetId);

        if (draggedIndex === -1 || targetIndex === -1) {
            return;
        }

        const updated = [...orderedActions];
        const [moved] = updated.splice(draggedIndex, 1);

        updated.splice(targetIndex, 0, moved);

        setOrderedActions(updated);
        setHasPendingOrder(true);
    };

    const saveOrder = () => {
        router.patch(
            admin.actions.reorder().url,
            {
                actions: orderedActions.map((item, index) => ({
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

    const deleteAction = (action: ActionItem) => {
        if (!window.confirm(`Supprimer l'action "${action.title}" ?`)) {
            return;
        }

        router.delete(admin.actions.destroy(action.slug).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin — Actions SNA" />

            <div className="flex h-full flex-1 flex-col gap-5 p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Actions SNA</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {orderedActions.length} action{orderedActions.length !== 1 ? 's' : ''} dans{' '}
                            {categoriesCount} categorie{categoriesCount > 1 ? 's' : ''}.
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
                            <Link href={admin.actions.create()}>
                                <Plus className="h-4 w-4" />
                                Nouvelle action
                            </Link>
                        </Button>
                    </div>
                </div>

                <form onSubmit={submitSearch} className="flex max-w-sm gap-2">
                    <Input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Rechercher par titre ou categorie"
                    />
                    <Button type="submit" variant="secondary">
                        <Search className="h-4 w-4" />
                    </Button>
                </form>

                <div className="space-y-3">
                    {orderedActions.length === 0 && (
                        <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                            Aucune action trouvee.
                        </div>
                    )}

                    {orderedActions.map((action) => (
                        <div
                            key={action.id}
                            draggable
                            onDragStart={(event) => {
                                event.dataTransfer.setData('text/action-id', String(action.id));
                                event.dataTransfer.effectAllowed = 'move';
                            }}
                            onDragOver={(event) => {
                                event.preventDefault();
                                event.dataTransfer.dropEffect = 'move';
                            }}
                            onDrop={(event) => {
                                event.preventDefault();
                                const raw = event.dataTransfer.getData('text/action-id');
                                const draggedId = Number(raw);

                                if (!Number.isNaN(draggedId)) {
                                    onDrop(draggedId, action.id);
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
                                        <h2 className="truncate font-semibold text-gray-900">{action.title}</h2>
                                        <span className="rounded-full bg-sna-teal/10 px-2 py-0.5 text-xs font-medium text-sna-teal-dark">
                                            {action.category}
                                        </span>
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${action.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}
                                        >
                                            {action.is_published ? 'Publiee' : 'Brouillon'}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        /nos-actions/{action.slug} • Maj le{' '}
                                        {new Date(action.updated_at).toLocaleDateString('fr-FR')}
                                    </p>
                                </div>

                                <div className="ml-auto flex items-center gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={admin.actions.edit(action.slug)}>
                                            <Pencil className="h-4 w-4" />
                                            Modifier
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => deleteAction(action)}
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
