import { Head, Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import PublicSiteHeader from '@/components/public-site-header';
import { Button } from '@/components/ui/button';

type PressArticleItem = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    publication_date: string;
    created_at: string;
};

export default function RevueDePresseShowPage({ article }: { article: PressArticleItem }) {
    return (
        <>
            <Head title={`${article.title} — Revue de presse SNA`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-[#f8fcfc] text-gray-800">
                <PublicSiteHeader />

                <main className="mx-auto max-w-3xl px-6 py-10">
                    {/* Back Link */}
                    <div className="mb-6">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/revue-de-presse">
                                <ChevronLeft className="h-4 w-4" />
                                Retour à la revue de presse
                            </Link>
                        </Button>
                    </div>

                    {/* Article */}
                    <article className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                            <time dateTime={article.publication_date}>{article.publication_date}</time>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            {article.title}
                        </h1>

                        {article.excerpt && (
                            <p className="mt-4 text-lg leading-relaxed text-gray-600 italic">
                                {article.excerpt}
                            </p>
                        )}

                        <div
                            className="prose prose-lg prose-headings:text-gray-900 prose-headings:mt-6 prose-headings:mb-3 prose-p:my-4 prose-li:my-1 prose-a:text-sna-teal prose-a:hover:text-sna-teal/80 prose-strong:text-gray-900 mt-8 max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: article.content,
                            }}
                        />

                        <div className="mt-10 border-t border-gray-100 pt-6">
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/revue-de-presse">
                                    <ChevronLeft className="h-4 w-4" />
                                    Retour à la revue de presse
                                </Link>
                            </Button>
                        </div>
                    </article>
                </main>
            </div>
        </>
    );
}
