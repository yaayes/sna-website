import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import MoiAussiForm from '@/components/moi-aussi-form';
import PublicSiteHeader from '@/components/public-site-header';
import SeoHead from '@/components/seo-head';

type ActionItem = {
    id: number;
    title: string;
    slug: string;
    category: string;
    content: string;
    moi_aussi_count: number;
};

type RelatedAction = {
    id: number;
    title: string;
    slug: string;
};

const compactNumber = new Intl.NumberFormat('fr-FR', {
    notation: 'compact',
    maximumFractionDigits: 1,
});

export default function ActionShowPage({
    actionItem,
    relatedActions,
}: {
    actionItem: ActionItem;
    relatedActions: RelatedAction[];
}) {
    const formSectionRef = useRef<HTMLDivElement>(null);
    const [isFormReached, setIsFormReached] = useState(false);
    const titleBlockRef = useRef<HTMLDivElement>(null);
    const ctaButtonRef = useRef<HTMLButtonElement>(null);
    const [ctaOffset, setCtaOffset] = useState(0);

    useEffect(() => {
        const titleBlock = titleBlockRef.current;
        const ctaButton = ctaButtonRef.current;

        if (!titleBlock || !ctaButton) {
            return;
        }

        const observer = new ResizeObserver(() =>
            setCtaOffset(
                Math.max(
                    0,
                    (titleBlock.offsetHeight - ctaButton.offsetHeight) / 2,
                ),
            ),
        );

        observer.observe(titleBlock);
        observer.observe(ctaButton);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const formSection = formSectionRef.current;

        if (!formSection) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) =>
                setIsFormReached(
                    entry.isIntersecting || entry.boundingClientRect.top < 0,
                ),
            { rootMargin: '0px 0px -50% 0px' },
        );

        observer.observe(formSection);

        return () => observer.disconnect();
    }, []);

    const scrollToForm = () => {
        formSectionRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    const testimonyCount = actionItem.moi_aussi_count;

    return (
        <>
            <SeoHead title={`${actionItem.title} — Nos Actions SNA`} />

            <div className="min-h-screen bg-[#f8fcfc] text-gray-800">
                <PublicSiteHeader />

                <main className="mx-auto max-w-6xl px-6 pt-10 pb-24">
                    <article className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm sm:p-10">
                        <div
                            className="sticky top-24 z-30 mb-4 flex items-start justify-end sm:mt-(--cta-offset) sm:mb-[calc(var(--cta-offset)*-1)] sm:h-0"
                            style={
                                {
                                    '--cta-offset': `${ctaOffset}px`,
                                } as CSSProperties
                            }
                        >
                            <button
                                ref={ctaButtonRef}
                                type="button"
                                onClick={scrollToForm}
                                aria-hidden={isFormReached}
                                tabIndex={isFormReached ? -1 : 0}
                                className={`inline-flex items-center gap-2 rounded-full bg-sna-teal py-2.5 pr-5 pl-3 text-sm font-semibold text-white shadow-sm shadow-sna-teal/20 transition duration-300 hover:bg-sna-teal-dark ${isFormReached ? 'pointer-events-none -translate-y-2 opacity-0' : 'translate-y-0 opacity-100'}`}
                            >
                                {testimonyCount > 0 ? (
                                    <span
                                        className="flex h-7 min-w-7 items-center justify-center rounded-full bg-white/20 px-1.5 text-xs font-bold text-white"
                                        title={`${testimonyCount} témoignage${testimonyCount > 1 ? 's' : ''}`}
                                    >
                                        {compactNumber.format(testimonyCount)}
                                    </span>
                                ) : (
                                    <span
                                        aria-hidden
                                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white"
                                    >
                                        ↓
                                    </span>
                                )}
                                <span>
                                    Moi aussi, j'ai vécu ça
                                    {testimonyCount > 0 && (
                                        <span className="sr-only">
                                            {' '}
                                            — {testimonyCount} témoignage
                                            {testimonyCount > 1 ? 's' : ''}
                                        </span>
                                    )}
                                </span>
                            </button>
                        </div>

                        <div ref={titleBlockRef} className="sm:pr-80">
                            <p className="text-xs font-semibold tracking-widest text-sna-teal-dark uppercase">
                                {actionItem.category}
                            </p>
                            <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                                {actionItem.title}
                            </h1>
                        </div>

                        <div
                            className="prose prose-lg prose-headings:text-gray-900 prose-a:text-sna-teal mt-6 max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: actionItem.content,
                            }}
                        />

                        <div
                            id="moi-aussi"
                            ref={formSectionRef}
                            className="mt-10 scroll-mt-28 border-t border-gray-100 pt-8"
                        >
                            <h2 className="text-xl font-bold text-gray-900">
                                Moi aussi, j'ai vécu ça
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Partagez votre témoignage lié à cette action
                                pour nourrir notre plaidoyer.
                            </p>
                            {testimonyCount > 0 && (
                                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-sna-teal/10 px-4 py-2 text-sm font-semibold text-sna-teal-dark">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sna-teal text-xs font-bold text-white">
                                        {testimonyCount}
                                    </span>
                                    {testimonyCount === 1
                                        ? 'personne a déjà témoigné'
                                        : 'personnes ont déjà témoigné'}
                                </div>
                            )}
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
