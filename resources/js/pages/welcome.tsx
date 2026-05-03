import { Head, Link } from '@inertiajs/react';
import React from 'react';
import PublicSiteHeader from '@/components/public-site-header';

/* ─────────────────────────────────────────────
   Inline SVG icons (no extra dep needed)
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
        {/* Heroicons 24/outline — hand-raised (solidarity / joining hands) */}
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m0 0a4.49 4.49 0 0 1 1.18-2.316l.342-.342a4.49 4.49 0 0 1 3.58-1.28"
        />
    </svg>
);
const UsersIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
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
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
    </svg>
);
const CheckIcon = ({
    className = 'h-4 w-4 text-sna-teal shrink-0',
}: {
    className?: string;
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);
const StarIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

const ShieldIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
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
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
    </svg>
);
const HandRaisedIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
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
            d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687"
        />
    </svg>
);


/* ─────────────────────────────────────────────
   Reusable Section Header
───────────────────────────────────────────── */
function SectionHeader({
    badge,
    title,
    subtitle,
}: {
    badge?: string;
    title: string;
    subtitle?: string;
}) {
    return (
        <div className="mx-auto max-w-2xl space-y-3 text-center">
            {badge && (
                <span className="inline-block rounded-full bg-sna-teal/15 px-4 py-1 text-xs font-bold tracking-widest text-sna-teal-dark uppercase">
                    {badge}
                </span>
            )}
            <h2 className="text-3xl leading-tight font-bold text-gray-800 sm:text-4xl">
                {title}
            </h2>
            {subtitle && (
                <p className="leading-relaxed text-gray-500">{subtitle}</p>
            )}
        </div>
    );
}

export default function Welcome() {
    return (
        <>
            <Head title="SNA – Familles d'enfants en situation de handicap">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
                <link
                    rel="preload"
                    as="image"
                    href="/images/hero/page-accueil-hero.webp"
                    type="image/webp"
                />
                <meta
                    name="description"
                    content="Le Syndicat National des Aidants défend les droits des familles qui accompagnent un enfant en situation de handicap. Rejoignez le mouvement."
                />
            </Head>

            <div className="min-h-screen bg-white font-sans text-gray-800">
                <PublicSiteHeader />

                {/* ══════════════════════════════
                    HERO
                ══════════════════════════════ */}
                <section className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden">
                    {/* Full-bleed background image */}
                    <img
                        src="/images/hero/page-accueil-hero.webp"
                        alt=""
                        aria-hidden="true"
                        width={1200}
                        height={800}
                        loading="eager"
                        fetchPriority="high"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    {/* Gradient overlay – heavier at the bottom for text legibility */}
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-gray-900/50 to-gray-900/10" />

                    <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-40">
                        <div className="flex max-w-3xl flex-col items-start gap-6">
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold tracking-wide text-white uppercase ring-1 ring-white/20 backdrop-blur-sm">
                                <StarIcon className="h-4 w-4 shrink-0" />
                                Syndicat National des Aidants
                            </span>

                            <h1 className="text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
                                12 millions de Français aident un proche.{' '}
                                <span className="relative text-sna-teal">
                                    Mais qui porte leur voix{' '}?
                                    {/* underline squiggle */}
                                    <svg
                                        className="absolute -bottom-2 left-0 w-full"
                                        height="8"
                                        viewBox="0 0 300 8"
                                        preserveAspectRatio="none"
                                        fill="none"
                                    >
                                        <path
                                            d="M0 6 Q37.5 1 75 6 Q112.5 11 150 6 Q187.5 1 225 6 Q262.5 11 300 6"
                                            stroke="#4abfbf"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                            </h1>

                            <p className="max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
                                Le{' '}
                                <strong className="text-white">
                                    Syndicat National des Aidants (SNA)
                                </strong>{' '}
                                est la première organisation syndicale 100{' '}%
                                dédiée aux aidants familiaux en France. Une
                                force militante nationale créée pour{' '}:
                            </p>

                            {/* Bullet point badges */}
                            <div className="flex flex-wrap items-start gap-3">
                                {(
                                    [
                                        {
                                            icon: (
                                                <ShieldIcon className="h-4 w-4 shrink-0 text-sna-teal" />
                                            ),
                                            label: 'Défendre les droits et les intérêts des aidants',
                                        },
                                        {
                                            icon: (
                                                <UsersIcon className="h-4 w-4 shrink-0 text-sna-teal" />
                                            ),
                                            label: 'Porter leur représentation collective',
                                        },
                                        {
                                            icon: (
                                                <HeartIcon className="h-4 w-4 shrink-0 text-sna-teal" />
                                            ),
                                            label: "Valoriser l'expertise du vécu",
                                        },
                                        {
                                            icon: (
                                                <HandRaisedIcon className="h-4 w-4 shrink-0 text-sna-teal" />
                                            ),
                                            label: 'Faire évoluer les politiques publiques',
                                        },
                                    ] as {
                                        icon: React.ReactNode;
                                        label: string;
                                    }[]
                                ).map(({ icon, label }) => (
                                    <span
                                        key={label}
                                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
                                    >
                                        {icon}
                                        {label}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                                <Link
                                    href="/rejoindre"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-sna-teal px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-sna-teal/30 transition-all hover:-translate-y-0.5 hover:bg-sna-teal-dark"
                                >
                                    <HandshakeIcon className="h-5 w-5" />{' '}
                                    Adhérer au SNA <ArrowRightIcon />
                                </Link>
                            </div>
                        </div>

                        {/* Key figures – frosted glass bar */}
                        <div className="mt-10 grid grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-xl backdrop-blur-md sm:grid-cols-4">
                            {[
                                { value: '12 M', label: 'Aidants en France' },
                                { value: '1/5', label: '1 Français sur 5 est aidant' },
                                { value: '1/2', label: 'Ne connaît pas ses droits' },
                                { value: '40 %', label: 'Santé dégradée' },
                            ].map((stat, i) => (
                                <div
                                    key={stat.label}
                                    className={[
                                        'flex cursor-default flex-col items-center gap-1 px-3 py-5 text-center transition-colors duration-200 hover:bg-white/10',
                                        i < 3 ? 'border-r border-white/10' : '',
                                    ].join(' ')}
                                >
                                    <span className="text-xl leading-none font-extrabold text-sna-teal sm:text-2xl">
                                        {stat.value}
                                    </span>
                                    <span className="text-xs leading-tight text-white/70">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                                {/* ══════════════════════════════
                    QUI SOMMES-NOUS
                ══════════════════════════════ */}
                <section id="apropos" className="bg-white px-6 py-20">
                    <div className="mx-auto max-w-6xl space-y-14">
                        <div className="mx-auto max-w-3xl space-y-6">
                            <span className="inline-block rounded-full bg-sna-green/15 px-4 py-1 text-xs font-bold tracking-widest text-[#6a8a20] uppercase">
                                Qui sommes nous
                            </span>
                            <h2 className="text-3xl leading-tight font-bold text-gray-800 sm:text-4xl">
                                Les combats du Syndicat National des Aidants
                            </h2>
                            <p className="leading-relaxed text-gray-500">
                                Les aidants soutiennent chaque jour des millions
                                de personnes en France. Pourtant, leurs droits
                                restent insuffisamment reconnus. Le{' '}
                                <strong className="text-gray-700">
                                    Syndicat National des Aidants
                                </strong>{' '}
                                agit pour faire évoluer les politiques publiques
                                et améliorer concrètement la vie des aidants.
                            </p>
                            <p className="leading-relaxed text-gray-500">
                                L'aide apportée par les aidants ne relève pas
                                uniquement de la sphère privée. Elle constitue
                                un travail social d'intérêt général, exercé sans
                                statut, sans droits opposables et sans
                                protection équivalente à l'utilité collective
                                produite. C'est dans ce contexte que le SNA
                                s'est constitué pour franchir une étape
                                supplémentaire :
                            </p>
                            <ul className="space-y-2">
                                {[
                                    'Structurer une représentation nationale des aidants',
                                    'Porter une réflexion juridique ambitieuse',
                                    'Défendre les droits des aidants face aux discriminations indirectes',
                                    'Engager des actions stratégiques, y compris contentieuses',
                                    'Construire un dialogue exigeant mais constructif avec les institutions',
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2 text-sm text-gray-600"
                                    >
                                        <span className="mt-0.5 shrink-0 text-sna-teal">
                                            <CheckIcon />
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Action cards */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    number: '1',
                                    bg: 'bg-sna-teal-light',
                                    accent: 'text-sna-teal-dark',
                                    title: 'Représenter les aidants',
                                    desc: 'Donner aux aidants une représentation nationale.',
                                },
                                {
                                    number: '2',
                                    bg: 'bg-sna-green/10',
                                    accent: 'text-[#6a8a20]',
                                    title: 'Défendre et faire évoluer les droits',
                                    desc: 'Faire entrer les aidants dans le droit.',
                                },
                                {
                                    number: '3',
                                    bg: 'bg-sna-teal-light',
                                    accent: 'text-sna-teal-dark',
                                    title: 'Améliorer concrètement la vie des familles',
                                    desc: 'Transformer les difficultés quotidiennes en solutions publiques.',
                                },
                                {
                                    number: '4',
                                    bg: 'bg-sna-green/10',
                                    accent: 'text-[#6a8a20]',
                                    title: 'Produire des données pour orienter les politiques publiques',
                                    desc: "Transformer l'expérience des aidants en force d'influence.",
                                },
                            ].map((item) => (
                                <div
                                    key={item.number}
                                    className="group flex flex-col gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-shadow hover:shadow-md"
                                >
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.bg} text-xl font-extrabold ${item.accent} transition-transform group-hover:scale-110`}
                                    >
                                        {item.number}
                                    </div>
                                    <h3 className="font-bold text-gray-800">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-500">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════
                    6 AXES D'ACTION
                ══════════════════════════════ */}
                <section id="comprendre" className="bg-gray-50 px-6 py-20">
                    <div className="mx-auto max-w-6xl space-y-14">
                        <div className="mx-auto max-w-3xl space-y-5">
                            <SectionHeader
                                badge="Nos axes d'action"
                                title="Les 6 axes d'action du Syndicat National des Aidants"
                            />
                            <p className="leading-relaxed text-gray-500">
                                Le Syndicat National des Aidants a pour vocation
                                de transformer des difficultés individuelles en
                                leviers d'action collective. Chaque situation
                                remontée du terrain n'est pas considérée comme
                                un cas isolé, mais comme le symptôme possible
                                d'un dysfonctionnement plus large appelant une
                                réponse structurée.
                            </p>
                            <p className="leading-relaxed text-gray-500">
                                Notre méthode consiste à partir du vécu, à en
                                analyser les mécanismes, puis à formuler des
                                solutions concrètes, juridiquement et
                                socialement soutenables.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {[
                                {
                                    number: '1',
                                    accent: 'border-sna-teal',
                                    title: 'Représentation nationale des aidants',
                                    desc: 'Le SNA porte la voix des aidants dans le débat public et auprès des institutions afin que leur expérience soit reconnue et intégrée dans les décisions publiques.',
                                    objectif:
                                        'Donner aux aidants une représentation collective et structurée dans les politiques publiques.',
                                },
                                {
                                    number: '2',
                                    accent: 'border-sna-green',
                                    title: 'Droits fondamentaux et protection des aidants',
                                    desc: "Le SNA agit pour garantir les droits fondamentaux des aidants et des personnes accompagnées, et prévenir les situations d'injustice ou de vulnérabilité juridique.",
                                    objectif: null,
                                },
                                {
                                    number: '3',
                                    accent: 'border-sna-teal',
                                    title: 'Justice sociale et équité du quotidien',
                                    desc: 'Le syndicat défend des mesures concrètes pour corriger les inégalités vécues par les familles confrontées au handicap, à la dépendance ou à la maladie.',
                                    objectif: null,
                                },
                                {
                                    number: '4',
                                    accent: 'border-sna-green',
                                    title: 'Statut et reconnaissance professionnelle des aidants',
                                    desc: "L'aidance a des conséquences majeures sur la vie professionnelle. Le SNA agit pour sécuriser les parcours d'emploi et valoriser les compétences développées dans l'aidance.",
                                    objectif: null,
                                },
                                {
                                    number: '5',
                                    accent: 'border-sna-teal',
                                    title: 'Régulation et amélioration des décisions publiques',
                                    desc: "Le SNA agit pour renforcer la qualité, la transparence et l'équité des décisions administratives qui structurent la vie des personnes handicapées et de leurs familles.",
                                    objectif: null,
                                },
                                {
                                    number: '6',
                                    accent: 'border-sna-green',
                                    title: 'Connaissance, données et transformation des politiques publiques',
                                    desc: "Pour améliorer durablement les politiques publiques, le SNA développe des outils d'analyse et d'observation permettant d'objectiver la réalité de l'aidance.",
                                    objectif: null,
                                },
                            ].map((axe) => (
                                <div
                                    key={axe.number}
                                    className={`flex flex-col gap-4 rounded-2xl border border-l-4 border-gray-100 bg-white p-6 shadow-sm ${axe.accent}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sna-teal/10 text-sm font-extrabold text-sna-teal">
                                            {axe.number}
                                        </span>
                                        <h3 className="font-bold text-gray-800">
                                            {axe.title}
                                        </h3>
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-500">
                                        {axe.desc}
                                    </p>
                                    {axe.objectif && (
                                        <p className="text-sm font-medium text-gray-600">
                                            <span className="font-bold">
                                                Objectif :{' '}
                                            </span>
                                            {axe.objectif}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════
                    NOS ACTIONS (3 forms)
                ══════════════════════════════ */}
                <section id="actions" className="bg-white px-6 py-20">
                    <div className="mx-auto max-w-6xl space-y-12">
                        <div className="mx-auto max-w-3xl space-y-6 text-center">
                            <SectionHeader
                                badge="Adhérer"
                                title="Ce projet ne deviendra réalité qu'avec vous."
                                subtitle="Si les propositions du Syndicat National des Aidants vous parlent, c'est que vous connaissez la réalité de l'aidance. Mais aucune avancée ne sera possible sans une mobilisation massive."
                            />
                            <p className="text-gray-500">
                                Nous devons rendre visibles les millions
                                d'aidants qui soutiennent chaque jour leurs
                                proches, et rassembler tous ceux qui refusent
                                que cette réalité reste ignorée.{' '}
                                <strong className="text-gray-700">
                                    Plus nous serons nombreux, plus notre voix
                                    comptera.
                                </strong>
                            </p>
                        </div>

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
                                    <h3 className="text-xl leading-snug font-bold text-white">
                                        J'adhère au Syndicat National des
                                        Aidants
                                    </h3>
                                </div>
                                <p className="flex-1 text-sm leading-relaxed text-white/80">
                                    Pour faire reconnaître la réalité de
                                    l'aidance.
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
                                    <h3 className="text-xl leading-snug font-bold text-gray-800">
                                        Je soutiens la cause des aidants
                                    </h3>
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
                                    <h3 className="text-xl leading-snug font-bold text-gray-800">
                                        Devenir partenaire, mécène ou relais du
                                        SNA
                                    </h3>
                                </div>
                                <p className="flex-1 text-sm leading-relaxed text-gray-500">
                                    Pour contribuer concrètement aux avancées à
                                    venir.
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

                {/* ══════════════════════════════
                    CONTACT SECTION
                ══════════════════════════════ */}
                <section id="contact" className="bg-sna-teal-light px-6 py-20">
                    <div className="mx-auto max-w-4xl space-y-8 text-center">
                        <SectionHeader
                            badge="Nous contacter"
                            title="Le Syndicat National des Aidants est à votre écoute."
                            subtitle="Vous avez une question ? Besoin d’une information ? Vous souhaitez nous faire remonter une problématique ou proposer une collaboration ? N’hésitez pas à nous écrire."
                        />
                        <div className="flex justify-center">
                            <div className="flex w-full max-w-md flex-col gap-6 rounded-3xl border border-sna-teal/30 bg-white p-8 shadow-lg">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sna-teal shadow-lg">
                                    <svg
                                        className="h-7 w-7 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 10.5V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2v-4.5M16 7l-4 4-4-4"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-sna-teal-dark">
                                    Formulaire de contact
                                </h3>
                                <p className="text-gray-600">
                                    Remplissez notre formulaire pour nous
                                    transmettre votre demande. Nous vous
                                    répondrons dans les meilleurs délais.
                                </p>
                                <Link
                                    href="/formulaire/contact"
                                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-sna-teal px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-sna-teal-dark"
                                >
                                    Accéder au formulaire <ArrowRightIcon />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════
                    FOOTER
                ══════════════════════════════ */}
                <footer className="bg-gray-900 px-6 py-14 text-gray-300">
                    <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 md:flex-row">
                        <div className="flex max-w-xs flex-col gap-4">
                            <img
                                src="/images/logo.png"
                                alt="Syndicat National des Aidants"
                                className="h-12 w-auto brightness-0 invert"
                            />
                            <p className="text-sm leading-relaxed text-gray-400">
                                Le SNA défend les droits et améliore la vie des
                                familles qui accompagnent un enfant en situation
                                de handicap en France.
                            </p>
                        </div>

                        <div className="flex flex-col gap-12 sm:flex-row">
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold tracking-widest text-white uppercase">
                                    Navigation
                                </h4>
                                {[
                                    {
                                        label: 'Qui sommes nous',
                                        href: '#apropos',
                                    },
                                    {
                                        label: "Nos axes d'action",
                                        href: '#comprendre',
                                    },
                                    {
                                        label: 'Adhérer au SNA',
                                        href: '/formulaire/adhesion',
                                    },
                                    {
                                        label: 'Devenir soutien',
                                        href: '/formulaire/soutien',
                                    },
                                    {
                                        label: 'Partenariats',
                                        href: '/formulaire/partenaire',
                                    },
                                    {
                                        label: 'Nos actions',
                                        href: '/nos-actions',
                                    },
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
                                    href="#contact"
                                    className="inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-sna-teal"
                                >
                                    Formulaire de contact
                                    <ArrowRightIcon className="h-3 w-3" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-gray-800 pt-6 text-xs text-gray-500 sm:flex-row">
                        <span>
                            © {new Date().getFullYear()} Syndicat National des
                            Aidants. Tous droits réservés.
                        </span>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="transition-colors hover:text-gray-300"
                            >
                                Mentions légales
                            </a>
                            <a
                                href="#"
                                className="transition-colors hover:text-gray-300"
                            >
                                Politique de confidentialité
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
