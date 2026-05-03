import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import WysiwygEditor from '@/components/wysiwyg-editor';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

type PressArticleItem = {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    publication_date: string;
    is_published: boolean;
};

export default function PressArticleEditPage({ article }: { article: PressArticleItem }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Admin', href: admin.dashboard() },
        { title: 'Revue de presse', href: admin.pressArticles.index() },
        { title: article.title, href: admin.pressArticles.edit(article.slug) },
    ];

    const { data, setData, submit, processing, errors } = useForm({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        publication_date: article.publication_date,
        is_published: article.is_published,
    });

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        submit(admin.pressArticles.update(article.slug), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin — Modifier ${article.title}`} />

            <div className="mx-auto w-full max-w-4xl p-6">
                <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border bg-white p-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Modifier l'article</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Ajustez le titre, le résumé, la date et le contenu de l'article de presse.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Titre de l'article</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(event) => setData('title', event.target.value)}
                            />
                            {errors.title && <p className="text-xs text-red-600">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="excerpt">Résumé (max 500 caractères)</Label>
                            <Textarea
                                id="excerpt"
                                value={data.excerpt}
                                onChange={(event) => setData('excerpt', event.target.value)}
                                rows={3}
                                maxLength={500}
                            />
                            <p className="text-xs text-muted-foreground">
                                {data.excerpt.length}/500 caractères
                            </p>
                            {errors.excerpt && <p className="text-xs text-red-600">{errors.excerpt}</p>}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="publication_date">Date de publication</Label>
                                <Input
                                    id="publication_date"
                                    type="date"
                                    value={data.publication_date.split('T')[0]}
                                    onChange={(event) =>
                                        setData('publication_date', event.target.value)
                                    }
                                />
                                {errors.publication_date && (
                                    <p className="text-xs text-red-600">{errors.publication_date}</p>
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
                                Publier cet article
                            </label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Contenu de l'article</Label>
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
                            <Link href={admin.pressArticles.index()}>Annuler</Link>
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
