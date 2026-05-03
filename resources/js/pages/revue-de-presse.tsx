import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Building2,
    ChevronLeft,
    ChevronRight,
    Handshake,
    Megaphone,
    Newspaper,
    Radio,
} from 'lucide-react';
import PublicSiteHeader from '@/components/public-site-header';
import { Button } from '@/components/ui/button';

type PressArticleItem = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    publication_date: string;
};

type PaginationData = {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    path: string;
    next_page_url: string | null;
    prev_page_url: string | null;
};

export default function RevueDePressePage({
    articles,
    pagination,
}: {
    articles: PressArticleItem[];
    pagination: PaginationData;
}) {
    const mediaPillars = [
        'Presse nationale',
        'Presse specialisee (sante, medico-social, handicap)',
        'Medias locaux et territoriaux',
        'Plateaux TV / radio / podcasts',
    ];

    const partnershipFields = [
        'Handicap',
        'Sante',
        'Perte d autonomie',
        'Protection sociale',
        'Monde economique et entreprise',
    ];

    return (
        <>
            <Head title="Revue de presse — Syndicat National des Aidants">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-[#f7fbfb] text-gray-800">
                <PublicSiteHeader />

                <main>
                    <section className="relative overflow-hidden border-b border-sna-teal/10 bg-linear-to-br from-[#dff5f5] via-white to-[#f2f8e8] px-6 py-16 sm:py-20">
                        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-sna-teal/15 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-sna-green/15 blur-2xl" />

                        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                            <div>
                                <p className="inline-flex rounded-full border border-sna-teal/20 bg-sna-teal/10 px-4 py-1 text-xs font-bold tracking-[0.2em] text-sna-teal-dark uppercase">
                                    ILS PARLENT DE NOUS. ILS AGISSENT AVEC NOUS.
                                </p>
                                <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                                    Une visibilite en construction, une influence en mouvement.
                                </h1>
                                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-700">
                                    Le Syndicat National des Aidants s impose progressivement comme une voix
                                    structuree, legitime et incontournable dans le debat public.
                                </p>
                                <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-600">
                                    Medias, institutions, acteurs de terrain et partenaires s interessent a notre
                                    demarche, a nos propositions et a l expertise que nous portons : celle du vecu des
                                    aidant.es.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_18px_45px_rgba(74,191,191,0.16)] backdrop-blur-sm">
                                <p className="text-xs font-bold tracking-[0.2em] text-sna-teal-dark uppercase">
                                    Cette page rassemble
                                </p>
                                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <Newspaper className="mt-0.5 h-4 w-4 text-sna-teal" />
                                        Les prises de parole dans les medias
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Radio className="mt-0.5 h-4 w-4 text-sna-teal" />
                                        Les articles et interviews
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Handshake className="mt-0.5 h-4 w-4 text-sna-teal" />
                                        Les collaborations et partenariats engages
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Building2 className="mt-0.5 h-4 w-4 text-sna-teal" />
                                        Les acteurs qui font avancer la cause des aidants
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="px-6 pt-10 pb-4">
                        <div className="mx-auto max-w-6xl rounded-3xl border border-sna-teal/15 bg-white p-6 sm:p-8">
                            <p className="text-xs font-bold tracking-[0.2em] text-sna-teal-dark uppercase">
                                A propos de nous
                            </p>
                            <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                                Une parole qui emerge dans l espace public
                            </h2>
                            <p className="mt-3 text-base leading-relaxed text-gray-700">
                                Parce que les aidant.es ont longtemps ete invisibles, chaque prise de parole compte.
                                Cette reconnaissance mediatique est un levier essentiel pour faire evoluer les
                                politiques publiques, sensibiliser l opinion et accelerer la mobilisation nationale.
                            </p>
                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-2xl bg-[#f4fbfa] p-4 text-sm text-gray-700">
                                    Le SNA porte des propositions concretes et interpelle les decideurs publics.
                                </div>
                                <div className="rounded-2xl bg-[#f7f8ef] p-4 text-sm text-gray-700">
                                    Le SNA structure un discours politique sur l aidance issu du terrain.
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="px-6 py-12 sm:py-16">
                        <div className="mx-auto max-w-6xl">
                            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                                <div>
                                    <p className="text-xs font-bold tracking-[0.2em] text-sna-teal-dark uppercase">
                                        On parle de nous
                                    </p>
                                    <h2 className="mt-2 text-3xl font-bold text-gray-900">Revue de presse</h2>
                                    <p className="mt-2 max-w-2xl text-sm text-gray-600">
                                        Retrouvez l ensemble des articles, interviews et interventions consacres au
                                        Syndicat National des Aidants.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 rounded-full bg-sna-teal/10 px-4 py-2 text-xs font-semibold text-sna-teal-dark">
                                    <Megaphone className="h-4 w-4" />
                                    Chaque publication rend visible une realite encore trop ignoree.
                                </div>
                            </div>

                            <div className="mb-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                                {mediaPillars.map((pillar) => (
                                    <div
                                        key={pillar}
                                        className="rounded-xl border border-sna-teal/15 bg-white px-3 py-2 text-xs font-medium text-gray-700"
                                    >
                                        {pillar}
                                    </div>
                                ))}
                            </div>

                            {articles.length === 0 ? (
                                <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-8 py-12 text-center">
                                    <p className="text-gray-600">Aucun article de presse pour le moment.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-6">
                                        {articles.map((article) => (
                                            <Link
                                                key={article.id}
                                                href={`/revue-de-presse/${article.slug}`}
                                                className="group block rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-sna-teal hover:shadow-[0_16px_40px_rgba(74,191,191,0.2)] sm:p-8"
                                            >
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-xs font-semibold tracking-widest text-sna-teal uppercase">
                                                                {article.publication_date}
                                                            </p>
                                                            <h2 className="mt-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-sna-teal sm:text-2xl">
                                                                {article.title}
                                                            </h2>
                                                            <p className="mt-3 line-clamp-2 text-base leading-relaxed text-gray-600">
                                                                {article.excerpt}
                                                            </p>
                                                        </div>
                                                        <div className="shrink-0 text-sna-teal/40 transition-colors group-hover:text-sna-teal">
                                                            <ChevronRight className="h-6 w-6" />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-sna-teal-dark uppercase">
                                                        Lire l article <ArrowRight className="h-3.5 w-3.5" />
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {pagination.last_page > 1 && (
                                        <div className="mt-12 flex items-center justify-between gap-4 sm:items-center">
                                            <div className="text-sm text-gray-600">
                                                Affichage {pagination.from} à{' '}
                                                {pagination.to} sur {pagination.total} articles
                                            </div>

                                            <div className="flex gap-2">
                                                {pagination.prev_page_url && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link href={pagination.prev_page_url}>
                                                            <ChevronLeft className="h-4 w-4" />
                                                            Précédent
                                                        </Link>
                                                    </Button>
                                                )}
                                                {pagination.next_page_url && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link href={pagination.next_page_url}>
                                                            Suivant
                                                            <ChevronRight className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            <div className="mt-14 grid gap-6 lg:grid-cols-2">
                                <div className="rounded-3xl border border-sna-teal/20 bg-linear-to-br from-[#f1fbfa] to-white p-6 sm:p-7">
                                    <h3 className="text-xl font-bold text-gray-900">Nos partenariats</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-gray-700">
                                        Le SNA developpe des partenariats strategiques pour faire converger les
                                        expertises et produire des solutions concretes.
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {partnershipFields.map((field) => (
                                            <span
                                                key={field}
                                                className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-sna-teal-dark"
                                            >
                                                {field}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-sna-green/25 bg-linear-to-br from-[#f4f9ea] to-white p-6 sm:p-7">
                                    <h3 className="text-xl font-bold text-gray-900">Vous etes un media ou un partenaire ?</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-gray-700">
                                        Journaliste, institution, entreprise, association ou organisme de recherche :
                                        relayer nos actions, travailler avec nous et soutenir nos propositions.
                                    </p>
                                    <div className="mt-5">
                                        <Button asChild>
                                            <Link href="/formulaire/contact">
                                                Nous contacter
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 rounded-3xl border border-sna-teal/20 bg-sna-teal/5 p-6 text-center sm:p-8">
                                <p className="text-xs font-bold tracking-[0.2em] text-sna-teal-dark uppercase">
                                    Appel a mobilisation
                                </p>
                                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                                    La visibilite des aidants depend aussi de vous
                                </h3>
                                <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-gray-700">
                                    Partagez nos prises de parole, faites connaitre le syndicat et rejoignez le
                                    mouvement. Plus nous sommes visibles, plus nous sommes entendus.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
