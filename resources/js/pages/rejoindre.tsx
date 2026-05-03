import { Head, Link } from '@inertiajs/react';
import PublicSiteHeader from '@/components/public-site-header';

/* ─────────────────────────────────────────────
   Inline SVG icons
───────────────────────────────────────────── */
const HeartIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
    </svg>
);
const HandshakeIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m0 0a4.49 4.49 0 0 1 1.18-2.316l.342-.342a4.49 4.49 0 0 1 3.58-1.28"
        />
    </svg>
);
const UsersIcon = ({ className = 'h-7 w-7' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
    </svg>
);
const ArrowRightIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

export default function RejoindreePage() {
    return (
        <>
            <Head title="Adhérer au SNA — Syndicat National des Aidants">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-white text-gray-800">
                <PublicSiteHeader />

                <main>
                    {/* ── Hero banner ── */}
                    <section className="bg-linear-to-b from-sna-teal/10 to-white px-6 py-20">
                        <div className="mx-auto max-w-4xl space-y-6 text-center">
                            <span className="inline-block rounded-full bg-sna-teal/15 px-4 py-1 text-xs font-bold tracking-widest text-sna-teal-dark uppercase">
                                Adhérer
                            </span>
                            <h1 className="text-4xl leading-tight font-bold text-gray-800 sm:text-5xl">
                                Ce projet ne deviendra réalité qu'avec vous.
                            </h1>
                            <p className="mx-auto max-w-2xl leading-relaxed text-gray-500">
                                Si les propositions du Syndicat National des Aidants vous parlent, c'est que vous connaissez la réalité de l'aidance.
                                Mais aucune avancée ne sera possible sans une mobilisation massive.
                            </p>
                            <p className="mx-auto max-w-2xl text-gray-500">
                                Nous devons rendre visibles les millions d'aidants qui soutiennent chaque jour leurs proches, et
                                rassembler tous ceux qui refusent que cette réalité reste ignorée.{' '}
                                <strong className="text-gray-700">
                                    Plus nous serons nombreux, plus notre voix comptera.
                                </strong>
                            </p>
                        </div>
                    </section>

                    {/* ── Cards ── */}
                    <section className="bg-white px-6 pb-24">
                        <div className="mx-auto max-w-5xl">
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                {/* ── Je suis aidant : Adhésion ── */}
                                <div className="flex flex-col gap-6 rounded-3xl bg-linear-to-b from-sna-teal to-sna-teal-dark p-8 shadow-xl shadow-sna-teal/25 transition-transform hover:-translate-y-1">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                                        <HandshakeIcon className="h-7 w-7 text-white" />
                                    </div>
                                    <div>
                                        <span className="mb-2 inline-block text-xs font-bold tracking-widest text-white/70 uppercase">
                                            Je suis aidant
                                        </span>
                                        <h2 className="text-xl leading-snug font-bold text-white">
                                            J'adhère au Syndicat National des Aidants
                                        </h2>
                                    </div>
                                    <p className="flex-1 text-sm leading-relaxed text-white/80">
                                        Pour faire reconnaître la réalité de l'aidance.
                                    </p>
                                    <Link
                                        href="/formulaire/adhesion"
                                        className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-sna-teal shadow-lg transition-transform hover:translate-x-0.5"
                                    >
                                        Adhérer au SNA <ArrowRightIcon />
                                    </Link>
                                </div>

                                {/* ── Je ne suis pas aidant : Soutien ── */}
                                <div className="flex flex-col gap-6 rounded-3xl border border-sna-teal/30 bg-linear-to-b from-[#f0fafa] to-white p-8 shadow-sm transition-shadow hover:shadow-lg">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sna-teal shadow-lg shadow-sna-teal/30">
                                        <HeartIcon className="h-7 w-7 text-white" />
                                    </div>
                                    <div>
                                        <span className="mb-2 inline-block text-xs font-bold tracking-widest text-sna-teal-dark uppercase">
                                            Je ne suis pas (encore ou plus) aidant
                                        </span>
                                        <h2 className="text-xl leading-snug font-bold text-gray-800">
                                            Je soutiens la cause des aidants
                                        </h2>
                                    </div>
                                    <p className="flex-1 text-sm leading-relaxed text-gray-500">
                                        Parce que chacun peut être concerné un jour.
                                    </p>
                                    <Link
                                        href="/formulaire/soutien"
                                        className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-sna-teal px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-sna-teal-dark"
                                    >
                                        Devenir membre soutien <ArrowRightIcon />
                                    </Link>
                                </div>

                                {/* ── Partenaire institutionnel ── */}
                                <div className="flex flex-col gap-6 rounded-3xl border border-sna-green/30 bg-linear-to-b from-[#f5faea] to-white p-8 shadow-sm transition-shadow hover:shadow-lg">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sna-green shadow-lg shadow-sna-green/30">
                                        <UsersIcon className="h-7 w-7 text-white" />
                                    </div>
                                    <div>
                                        <span className="mb-2 inline-block text-xs font-bold tracking-widest text-[#6a8a20] uppercase">
                                            Partenaire / mécène / relais
                                        </span>
                                        <h2 className="text-xl leading-snug font-bold text-gray-800">
                                            Devenir partenaire, mécène ou relais du SNA
                                        </h2>
                                    </div>
                                    <p className="flex-1 text-sm leading-relaxed text-gray-500">
                                        Pour contribuer concrètement aux avancées à venir.
                                    </p>
                                    <Link
                                        href="/formulaire/partenaire"
                                        className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-sna-green px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-sna-green-dark"
                                    >
                                        Proposer un partenariat <ArrowRightIcon />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="bg-gray-900 px-6 py-14 text-gray-300">
                    <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 md:flex-row">
                        <div className="flex max-w-xs flex-col gap-4">
                            <img
                                src="/images/logo.png"
                                alt="Syndicat National des Aidants"
                                className="h-12 w-auto brightness-0 invert"
                            />
                            <p className="text-sm leading-relaxed text-gray-400">
                                Le SNA défend les droits et améliore la vie des familles qui accompagnent un enfant en situation de handicap en France.
                            </p>
                        </div>

                        <div className="flex flex-col gap-12 sm:flex-row">
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold tracking-widest text-white uppercase">
                                    Navigation
                                </h4>
                                {[
                                    { label: 'Qui sommes nous', href: '/a-propos-nous' },
                                    { label: "Nos axes d'action", href: '/nos-actions' },
                                    { label: 'Adhérer au SNA', href: '/formulaire/adhesion' },
                                    { label: 'Devenir soutien', href: '/formulaire/soutien' },
                                    { label: 'Partenariats', href: '/formulaire/partenaire' },
                                    { label: 'Nos actions', href: '/nos-actions' },
                                ].map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="block text-sm text-gray-400 transition-colors hover:text-sna-teal"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold tracking-widest text-white uppercase">
                                    Contact
                                </h4>
                                <a
                                    href="mailto:contact@syndicat-national-aidants.fr"
                                    className="block text-sm text-gray-400 transition-colors hover:text-sna-teal"
                                >
                                    contact@syndicat-national-aidants.fr
                                </a>
                                <a
                                    href="/#contact"
                                    className="inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-sna-teal"
                                >
                                    Formulaire de contact
                                    <ArrowRightIcon className="h-3 w-3" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-gray-800 pt-6 text-xs text-gray-500 sm:flex-row">
                        <span>© {new Date().getFullYear()} Syndicat National des Aidants. Tous droits réservés.</span>
                        <div className="flex gap-4">
                            <a href="#" className="transition-colors hover:text-gray-300">
                                Mentions légales
                            </a>
                            <a href="#" className="transition-colors hover:text-gray-300">
                                Politique de confidentialité
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
