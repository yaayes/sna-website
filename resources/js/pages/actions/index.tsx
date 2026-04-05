import { Head, Link } from '@inertiajs/react';
import PublicSiteHeader from '@/components/public-site-header';

type ActionItem = {
    id: number;
    title: string;
    slug: string;
    category: string;
    content: string;
    sort_order: number;
};

export default function ActionsIndexPage({
    categories,
}: {
    categories: Record<string, ActionItem[]>;
}) {
    const categoryEntries = Object.entries(categories);

    return (
        <>
            <Head title="Nos Actions — Syndicat National des Aidants">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-[#f7fbfb] text-gray-800">
                <PublicSiteHeader />

                <main>
                    <section className="relative overflow-hidden bg-linear-to-br from-[#e5f8f8] via-white to-[#edf6dc] px-6 py-16">
                        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-sna-teal/10 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-sna-green/10 blur-2xl" />

                        <div className="relative mx-auto max-w-6xl">
                            <p className="inline-flex rounded-full bg-sna-teal/10 px-4 py-1 text-xs font-bold tracking-widest text-sna-teal-dark uppercase">
                                Nos actions
                            </p>
                            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                Transformer le quotidien des aidants en actions
                                concretes
                            </h1>
                            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
                                Le SNA agit sur le terrain, dans les
                                institutions et dans le debat public. Cette page
                                rassemble toutes nos actions classees par
                                categorie.
                            </p>
                            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
                                Fratrie, parentalite et handicap,
                                reconnaissance et statut des aidants,
                                transformation des politiques publiques: chaque
                                action publiee ici documente un combat concret
                                porte par le SNA.
                            </p>
                        </div>
                    </section>

                    <section className="mx-auto max-w-6xl space-y-10 px-6 pb-20">
                        {categoryEntries.length === 0 && (
                            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
                                Aucune action publiee pour le moment.
                            </div>
                        )}

                        {categoryEntries.map(
                            ([category, actions], categoryIndex) => (
                                <div key={category} className="space-y-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {category}
                                        </h2>
                                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                            {actions.length} action
                                            {actions.length > 1 ? 's' : ''}
                                        </span>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {actions.map((action, actionIndex) => (
                                            <Link
                                                key={action.id}
                                                href={`/nos-actions/${action.slug}`}
                                                className="group relative rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sna-teal/40 hover:shadow-[0_12px_30px_rgba(74,191,191,0.18)]"
                                                style={{
                                                    animation:
                                                        'card-rise 450ms ease-out both',
                                                    animationDelay: `${categoryIndex * 80 + actionIndex * 70}ms`,
                                                }}
                                            >
                                                <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-sna-teal-dark">
                                                    {action.title}
                                                </h3>
                                                <p
                                                    className="mt-3 line-clamp-3 text-sm text-gray-600"
                                                    dangerouslySetInnerHTML={{
                                                        __html: action.content,
                                                    }}
                                                />
                                                <div className="mt-5 flex items-center text-sm font-medium text-sna-teal">
                                                    Voir le detail
                                                    <span className="ml-2 transition-transform group-hover:translate-x-1">
                                                        →
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ),
                        )}
                    </section>
                </main>
            </div>

            <style>{`
                @keyframes card-rise {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}
