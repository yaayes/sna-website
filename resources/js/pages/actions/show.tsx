import { Head, Link } from '@inertiajs/react';
import MoiAussiForm from '@/components/moi-aussi-form';
import PublicSiteHeader from '@/components/public-site-header';

type ActionItem = {
    id: number;
    title: string;
    slug: string;
    category: string;
    content: string;
};

type RelatedAction = {
    id: number;
    title: string;
    slug: string;
};

export default function ActionShowPage({
    actionItem,
    relatedActions,
}: {
    actionItem: ActionItem;
    relatedActions: RelatedAction[];
}) {
    return (
        <>
            <Head title={`${actionItem.title} — Nos Actions SNA`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-[#f8fcfc] text-gray-800">
                <PublicSiteHeader />

                <main className="mx-auto max-w-3xl px-6 py-10">
                    <article className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                        <p className="text-xs font-semibold tracking-widest text-sna-teal-dark uppercase">
                            {actionItem.category}
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                            {actionItem.title}
                        </h1>

                        <div
                            className="prose prose-lg prose-headings:text-gray-900 prose-a:text-sna-teal mt-6 max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: actionItem.content,
                            }}
                        />

                        <div className="mt-10 border-t border-gray-100 pt-8">
                            <h2 className="text-xl font-bold text-gray-900">
                                Moi aussi, j'ai vécu ça
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Partagez votre témoignage lié à cette action pour nourrir notre plaidoyer.
                            </p>
                            <div className="mt-6">
                                <MoiAussiForm actionId={actionItem.id} />
                            </div>
                        </div>
                    </article>

                    {relatedActions.length > 0 && (
                        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
                            <h3 className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
                                Même catégorie
                            </h3>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {relatedActions.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/nos-actions/${item.slug}`}
                                        className="rounded-lg border border-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-sna-teal/30 hover:text-sna-teal"
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
