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
                                Nos dossiers & actions
                            </p>
                            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                Défendre les droits des aidants, concrètement
                            </h1>
                            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
                                Le Syndicat National des Aidants porte un
                                programme structuré autour d&apos;une conviction:
                                les aidants doivent être reconnus, protégés
                                et représentés. Mais pour être justes,
                                efficaces et légitimes, nos actions doivent
                                s&apos;appuyer sur une réalité essentielle:
                                l&apos;expertise des aidants eux-mêmes.
                            </p>
                            <div className="mt-8 grid max-w-5xl gap-6 text-sm leading-relaxed text-gray-600 sm:text-base lg:grid-cols-2">
                                <div className="space-y-3 rounded-2xl border border-white/80 bg-white/80 p-5 shadow-xs">
                                    <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                                        Une démarche collective
                                    </h2>
                                    <p>
                                        Nos dossiers ne sont pas figés. Ils
                                        évoluent grâce aux retours du terrain,
                                        aux expériences vécues et aux
                                        difficultés concrètes rencontrées.
                                    </p>
                                    <p>
                                        C&apos;est pourquoi nous vous invitons à
                                        découvrir les différents dossiers portés
                                        par le SNA, vous y reconnaître et
                                        contribuer à les enrichir. Votre
                                        expérience est une expertise: elle doit
                                        nourrir les décisions publiques.
                                    </p>
                                </div>

                                <div className="space-y-3 rounded-2xl border border-white/80 bg-white/80 p-5 shadow-xs">
                                    <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                                        Une réalité, plusieurs droits
                                    </h2>
                                    <p>
                                        Être aidant impacte tous les aspects de
                                        la vie:
                                    </p>
                                    <ul className="list-disc space-y-1 pl-5">
                                        <li>emploi</li>
                                        <li>santé</li>
                                        <li>finances</li>
                                        <li>vie familiale</li>
                                        <li>relations avec les institutions</li>
                                    </ul>
                                    <p>
                                        Nos actions couvrent l&apos;ensemble de ces
                                        enjeux.
                                    </p>
                                </div>
                            </div>

                            <div className="relative mt-6 max-w-5xl overflow-hidden rounded-3xl border border-sna-teal/20 bg-linear-to-br from-[#e8f8f6] via-white to-[#f4faef] p-6 shadow-[0_20px_55px_rgba(74,191,191,0.15)] sm:p-7">
                                <svg
                                    aria-hidden
                                    viewBox="0 0 220 110"
                                    className="pointer-events-none absolute -top-8 -right-10 h-28 w-56 text-sna-teal/20"
                                    fill="none"
                                >
                                    <path
                                        d="M8 78C40 40 76 24 112 30C144 36 176 66 212 54"
                                        stroke="currentColor"
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <svg
                                    aria-hidden
                                    viewBox="0 0 240 120"
                                    className="pointer-events-none absolute -bottom-12 -left-12 h-28 w-60 text-sna-green/20"
                                    fill="none"
                                >
                                    <path
                                        d="M10 54C40 20 74 16 106 38C134 58 166 62 196 40C214 28 226 30 236 42"
                                        stroke="currentColor"
                                        strokeWidth="5"
                                        strokeLinecap="round"
                                    />
                                </svg>

                                <div className="relative">
                                    <p className="inline-flex rounded-full bg-sna-teal/15 px-3 py-1 text-xs font-bold tracking-[0.18em] text-sna-teal-dark uppercase">
                                        Engagement citoyen
                                    </p>
                                    <h2 className="mt-3 text-xl font-semibold text-sna-teal-dark sm:text-2xl">
                                        Votre contribution est essentielle
                                    </h2>
                                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-700 sm:text-base">
                                        Chaque dossier évolue grâce à vous. En
                                        bas de chaque dossier, vous pouvez:
                                    </p>
                                    <ul className="mt-4 grid gap-2 text-sm text-gray-700 sm:grid-cols-2 sm:text-base">
                                        <li className="rounded-xl border border-white/80 bg-white/70 px-3 py-2">
                                            Partager votre expérience
                                        </li>
                                        <li className="rounded-xl border border-white/80 bg-white/70 px-3 py-2">
                                            Signaler une difficulté
                                        </li>
                                        <li className="rounded-xl border border-white/80 bg-white/70 px-3 py-2">
                                            Proposer une amélioration
                                        </li>
                                        <li className="rounded-xl border border-white/80 bg-white/70 px-3 py-2">
                                            Témoigner de votre réalité
                                        </li>
                                    </ul>
                                </div>
                            </div>
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
