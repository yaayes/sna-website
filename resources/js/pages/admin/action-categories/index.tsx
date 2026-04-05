import { Head, Link, router } from '@inertiajs/react';
import { GripVertical, Pencil, Plus, Save, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

type ActionCategoryItem = {
    id: number;
    name: string;
    slug: string;
    sort_order: number;
    actions_count: number;
    updated_at: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard() },
    { title: 'Categories actions', href: admin.actionCategories.index() },
];

export default function ActionCategoriesIndex({
    categories,
}: {
    categories: ActionCategoryItem[];
}) {
    const [orderedCategories, setOrderedCategories] = useState(categories);
    const [hasPendingOrder, setHasPendingOrder] = useState(false);

    const totalActions = useMemo(() => {
        return orderedCategories.reduce((total, category) => total + category.actions_count, 0);
    }, [orderedCategories]);

    const moveCategory = (draggedId: number, targetId: number) => {
        if (draggedId === targetId) {
            return;
        }

        const draggedIndex = orderedCategories.findIndex((item) => item.id === draggedId);
        const targetIndex = orderedCategories.findIndex((item) => item.id === targetId);

        if (draggedIndex === -1 || targetIndex === -1) {
            return;
        }

        const updated = [...orderedCategories];
        const [moved] = updated.splice(draggedIndex, 1);

        updated.splice(targetIndex, 0, moved);

        setOrderedCategories(updated);
        setHasPendingOrder(true);
    };

    const saveOrder = () => {
        router.patch(
            admin.actionCategories.reorder().url,
            {
                categories: orderedCategories.map((category, index) => ({
                    id: category.id,
                    sort_order: index + 1,
                })),
            },
            {
                preserveScroll: true,
                onSuccess: () => setHasPendingOrder(false),
            },
        );
    };

    const deleteCategory = (category: ActionCategoryItem) => {
        if (!window.confirm(`Supprimer la categorie "${category.name}" ?`)) {
            return;
        }

        router.delete(admin.actionCategories.destroy(category.slug).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin — Categories actions" />

            <div className="flex h-full flex-1 flex-col gap-5 p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Categories actions</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {orderedCategories.length} categorie{orderedCategories.length > 1 ? 's' : ''} pour{' '}
                            {totalActions} action{totalActions > 1 ? 's' : ''} rattachee{totalActions > 1 ? 's' : ''}.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="secondary" onClick={saveOrder} disabled={!hasPendingOrder}>
                            <Save className="h-4 w-4" />
                            Enregistrer l'ordre
                        </Button>
                        <Button asChild>
                            <Link href={admin.actionCategories.create()}>
                                <Plus className="h-4 w-4" />
                                Nouvelle categorie
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="space-y-3">
                    {orderedCategories.length === 0 && (
                        <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                            Aucune categorie trouvee.
                        </div>
                    )}

                    {orderedCategories.map((category) => (
                        <div
                            key={category.id}
                            draggable
                            onDragStart={(event) => {
                                event.dataTransfer.setData('text/category-id', String(category.id));
                                event.dataTransfer.effectAllowed = 'move';
                            }}
                            onDragOver={(event) => {
                                event.preventDefault();
                                event.dataTransfer.dropEffect = 'move';
                            }}
                            onDrop={(event) => {
                                event.preventDefault();
                                const raw = event.dataTransfer.getData('text/category-id');
                                const draggedId = Number(raw);

                                if (!Number.isNaN(draggedId)) {
                                    moveCategory(draggedId, category.id);
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
                                        <h2 className="truncate font-semibold text-gray-900">{category.name}</h2>
                                        <span className="rounded-full bg-sna-teal/10 px-2 py-0.5 text-xs font-medium text-sna-teal-dark">
                                            {category.actions_count} action{category.actions_count > 1 ? 's' : ''}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        slug: {category.slug} • Maj le{' '}
                                        {new Date(category.updated_at).toLocaleDateString('fr-FR')}
                                    </p>
                                </div>

                                <div className="ml-auto flex items-center gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={admin.actionCategories.edit(category.slug)}>
                                            <Pencil className="h-4 w-4" />
                                            Modifier
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => deleteCategory(category)}
                                        disabled={category.actions_count > 0}
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