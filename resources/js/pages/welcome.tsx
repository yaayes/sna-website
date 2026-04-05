import { Head, Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { dashboard } from '@/routes';

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
const MenuIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
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
            d="M4 6h16M4 12h16M4 18h16"
        />
    </svg>
);
const XIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
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
            d="M6 18L18 6M6 6l12 12"
        />
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
   Hero Illustration – inline SVG scene
   A stylised parent & child with a heart
───────────────────────────────────────────── */
const HeroIllustration = () => (
    <svg
        viewBox="0 0 520 480"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-auto w-full max-w-lg"
    >
        {/* Background circles */}
        <circle cx="260" cy="240" r="210" fill="#e8f8f8" />
        <circle cx="260" cy="240" r="165" fill="#d2f2f2" opacity="0.5" />

        {/* Ground */}
        <ellipse
            cx="260"
            cy="410"
            rx="160"
            ry="18"
            fill="#4abfbf"
            opacity="0.12"
        />

        {/* ── Parent figure (left) ── */}
        {/* Body */}
        <rect x="155" y="220" width="68" height="120" rx="20" fill="#4abfbf" />
        {/* Head */}
        <circle cx="189" cy="200" r="30" fill="#fcd9b6" />
        {/* Hair */}
        <path d="M162 192 Q169 168 189 170 Q209 168 216 192" fill="#5a3825" />
        {/* Arms */}
        <path
            d="M155 255 Q125 268 118 290"
            stroke="#fcd9b6"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
        />
        <path
            d="M223 255 Q248 260 258 275"
            stroke="#fcd9b6"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
        />
        {/* Legs */}
        <rect x="165" y="330" width="22" height="70" rx="11" fill="#2d7a8a" />
        <rect x="196" y="330" width="22" height="70" rx="11" fill="#2d7a8a" />
        {/* Feet */}
        <ellipse cx="176" cy="400" rx="14" ry="7" fill="#1a4a55" />
        <ellipse cx="207" cy="400" rx="14" ry="7" fill="#1a4a55" />

        {/* ── Child figure (right, smaller) ── */}
        {/* Body */}
        <rect x="272" y="268" width="52" height="90" rx="16" fill="#a8c84a" />
        {/* Head */}
        <circle cx="298" cy="250" r="24" fill="#fcd9b6" />
        {/* Hair */}
        <path d="M276 243 Q282 224 298 226 Q314 224 320 243" fill="#c97b3a" />
        {/* Arms stretched up toward parent */}
        <path
            d="M272 290 Q256 278 250 270"
            stroke="#fcd9b6"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
        />
        <path
            d="M324 290 Q338 280 344 272"
            stroke="#fcd9b6"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
        />
        {/* Legs */}
        <rect x="278" y="350" width="18" height="54" rx="9" fill="#6a8a20" />
        <rect x="302" y="350" width="18" height="54" rx="9" fill="#6a8a20" />
        {/* Feet */}
        <ellipse cx="287" cy="404" rx="12" ry="6" fill="#4a5a15" />
        <ellipse cx="311" cy="404" rx="12" ry="6" fill="#4a5a15" />

        {/* Wheelchair (accessibility icon) */}
        <circle
            cx="355"
            cy="385"
            r="22"
            stroke="#4abfbf"
            strokeWidth="4"
            fill="none"
        />
        <circle
            cx="340"
            cy="385"
            r="15"
            stroke="#a8c84a"
            strokeWidth="3"
            fill="none"
        />
        <path
            d="M340 368 L340 355 Q340 348 347 348 L362 348"
            stroke="#4abfbf"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
        />
        <circle cx="345" cy="344" r="6" fill="#4abfbf" />

        {/* Holding hands / connection line */}
        <path
            d="M258 275 Q265 282 272 290"
            stroke="#fcd9b6"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
        />

        {/* ── Floating heart ── */}
        <g transform="translate(310, 185)">
            <path
                d="M0,-12 C0,-22 -18,-22 -18,-8 C-18,2 0,16 0,16 C0,16 18,2 18,-8 C18,-22 0,-22 0,-12 Z"
                fill="#f97066"
                opacity="0.9"
            />
        </g>

        {/* ── Floating sparkles / stars ── */}
        <g fill="#a8c84a" opacity="0.8">
            <polygon
                points="390,130 393,140 404,140 395,147 398,157 390,151 382,157 385,147 376,140 387,140"
                transform="scale(0.7) translate(170,10)"
            />
        </g>
        <g fill="#4abfbf" opacity="0.7">
            <polygon
                points="390,130 393,140 404,140 395,147 398,157 390,151 382,157 385,147 376,140 387,140"
                transform="scale(0.5) translate(-280,230)"
            />
        </g>
        <circle cx="420" cy="160" r="5" fill="#a8c84a" opacity="0.6" />
        <circle cx="108" cy="300" r="4" fill="#4abfbf" opacity="0.5" />
        <circle cx="148" cy="148" r="6" fill="#4abfbf" opacity="0.4" />
        <circle cx="390" cy="310" r="4" fill="#a8c84a" opacity="0.5" />

        {/* ── Sun / warmth ── */}
        <circle cx="415" cy="95" r="28" fill="#fbbf24" opacity="0.3" />
        <circle cx="415" cy="95" r="18" fill="#fbbf24" opacity="0.5" />

        {/* Rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
                key={i}
                x1={415 + Math.cos((angle * Math.PI) / 180) * 22}
                y1={95 + Math.sin((angle * Math.PI) / 180) * 22}
                x2={415 + Math.cos((angle * Math.PI) / 180) * 32}
                y2={95 + Math.sin((angle * Math.PI) / 180) * 32}
                stroke="#fbbf24"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.6"
            />
        ))}
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
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <Head title="SNA – Familles d'enfants en situation de handicap">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
                <meta
                    name="description"
                    content="Le Syndicat National des Aidants défend les droits des familles qui accompagnent un enfant en situation de handicap. Rejoignez le mouvement."
                />
            </Head>

            <div className="min-h-screen bg-white font-sans text-gray-800">
                {/* ══════════════════════════════
                    HEADER
                ══════════════════════════════ */}
                <header className="sticky top-0 z-50 border-b border-white/60 bg-white/90 shadow-[0_2px_20px_rgba(74,191,191,0.08)] backdrop-blur-md">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <img
                                src="/images/logo.png"
                                alt="Syndicat National des Aidants"
                                className="h-12 w-auto"
                            />
                        </Link>

                        {/* Nav links – desktop only */}
                        <nav className="hidden items-center gap-1 lg:flex">
                            {[
                                { href: '#apropos', label: 'Qui sommes nous' },
                                {
                                    href: '#comprendre',
                                    label: "Comprendre l'aidance",
                                },
                                {
                                    href: '/nos-actions',
                                    label: 'Nos actions',
                                },
                                {
                                    href: '#representants',
                                    label: 'Nos représentants',
                                },
                                {
                                    href: '#actions',
                                    label: 'Rejoindre le SNA',
                                },
                                { href: '#presse', label: 'Revue de presse' },
                            ].map(({ href, label }) => (
                                <a
                                    key={href}
                                    href={href}
                                    className="group relative px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-sna-teal"
                                >
                                    {label}
                                    <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-sna-teal transition-all duration-300 group-hover:w-4/5" />
                                </a>
                            ))}
                        </nav>

                        {/* Right side */}
                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-full bg-sna-teal px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-sna-teal-dark hover:shadow-lg hover:shadow-sna-teal/30"
                                >
                                    Mon espace
                                </Link>
                            ) : (
                                /* ── Fancy "Adhérer au SNA" button ── */
                                <Link
                                    href="/formulaire/adhesion"
                                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                                    style={{
                                        background:
                                            'linear-gradient(135deg, #4abfbf, #37a3a3, #a8c84a, #4abfbf)',
                                        backgroundSize: '300% 300%',
                                        boxShadow:
                                            '0 4px 20px rgba(74,191,191,0.45), 0 1px 3px rgba(0,0,0,0.1)',
                                        animation:
                                            'donate-gradient 4s ease infinite',
                                    }}
                                >
                                    {/* dual pulse rings */}
                                    <span
                                        className="pointer-events-none absolute inset-0 rounded-full"
                                        style={{
                                            boxShadow: '0 0 0 2px #4abfbf',
                                            animation:
                                                'donate-ring-1 2s ease-out infinite',
                                        }}
                                        aria-hidden="true"
                                    />
                                    <span
                                        className="pointer-events-none absolute inset-0 rounded-full"
                                        style={{
                                            boxShadow: '0 0 0 2px #a8c84a',
                                            animation:
                                                'donate-ring-2 2s ease-out infinite 0.5s',
                                        }}
                                        aria-hidden="true"
                                    />
                                    {/* shimmer loop */}
                                    <span
                                        className="pointer-events-none absolute inset-0 w-1/3 skew-x-[-20deg] bg-white/25 blur-sm"
                                        style={{
                                            animation:
                                                'donate-shimmer 3s ease-in-out infinite 1s',
                                        }}
                                        aria-hidden="true"
                                    />
                                    <span
                                        className="relative"
                                        style={{
                                            animation:
                                                'donate-heartbeat 2s ease-in-out infinite',
                                        }}
                                    >
                                        <HeartIcon className="h-4 w-4" />
                                    </span>
                                    <span className="relative tracking-wide">
                                        Adhérer au SNA
                                    </span>
                                    <ArrowRightIcon className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            )}

                            {/* Hamburger – mobile only */}
                            <button
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="relative flex h-9 w-9 items-center justify-center rounded-xl text-gray-600 transition-all duration-200 hover:bg-sna-teal/10 hover:text-sna-teal lg:hidden"
                                aria-label={
                                    mobileMenuOpen
                                        ? 'Fermer le menu'
                                        : 'Ouvrir le menu'
                                }
                            >
                                <span
                                    className={`absolute transition-all duration-200 ${mobileMenuOpen ? 'rotate-90 opacity-100' : 'rotate-0 opacity-0'}`}
                                >
                                    <XIcon className="h-5 w-5" />
                                </span>
                                <span
                                    className={`absolute transition-all duration-200 ${mobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}
                                >
                                    <MenuIcon className="h-5 w-5" />
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile drawer */}
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${mobileMenuOpen ? 'max-h-128 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        <div className="border-t border-sna-teal/10 bg-linear-to-b from-white to-[#f8fefe] px-5 pt-3 pb-6">
                            {/* Nav links */}
                            <nav className="mb-4 flex flex-col">
                                {[
                                    {
                                        href: '#apropos',
                                        label: 'Qui sommes nous',
                                    },
                                    {
                                        href: '#comprendre',
                                        label: "Comprendre l'aidance",
                                    },
                                    {
                                        href: '/nos-actions',
                                        label: 'Nos actions',
                                    },
                                    {
                                        href: '#representants',
                                        label: 'Nos représentants',
                                    },
                                    {
                                        href: '#actions',
                                        label: 'Rejoindre le SNA',
                                    },
                                    {
                                        href: '#presse',
                                        label: 'Revue de presse',
                                    },
                                ].map(({ href, label }, i) => (
                                    <a
                                        key={href}
                                        href={href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 transition-all duration-150 hover:bg-sna-teal/10 hover:pl-5 hover:text-sna-teal"
                                        style={{
                                            transitionDelay: mobileMenuOpen
                                                ? `${i * 40}ms`
                                                : '0ms',
                                        }}
                                    >
                                        {label}
                                        <ArrowRightIcon className="h-3.5 w-3.5 text-sna-teal/50" />
                                    </a>
                                ))}
                            </nav>

                            {/* Divider */}
                            <div className="mb-4 h-px bg-linear-to-r from-transparent via-sna-teal/20 to-transparent" />

                            {/* Donate CTA */}
                            {!auth.user && (
                                <Link
                                    href="/formulaire/adhesion"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl py-3.5 text-sm font-bold text-white transition-all duration-300 active:scale-95"
                                    style={{
                                        background:
                                            'linear-gradient(135deg, #4abfbf 0%, #37a3a3 50%, #a8c84a 100%)',
                                        boxShadow:
                                            '0 6px 24px rgba(74,191,191,0.35)',
                                    }}
                                >
                                    <span
                                        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/20 transition-transform duration-700 group-active:translate-x-[200%]"
                                        aria-hidden="true"
                                    />
                                    <HeartIcon className="h-4 w-4" />
                                    <span className="tracking-wide">
                                        Adhérer au SNA
                                    </span>
                                </Link>
                            )}
                        </div>
                    </div>
                </header>

                {/* ══════════════════════════════
                    HERO
                ══════════════════════════════ */}
                <section className="relative overflow-hidden bg-linear-to-br from-[#e8f8f8] via-white to-[#f0f9e8] px-6 py-10">
                    {/* Decorative blobs */}
                    <div className="pointer-events-none absolute -top-32 -right-32 h-125 w-125 rounded-full bg-sna-teal/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-sna-green/10 blur-2xl" />

                    <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:gap-16">
                        {/* ── Left: text ── */}
                        <div className="flex flex-1 flex-col items-start gap-6">
                            <span className="inline-flex items-center gap-2 rounded-full bg-sna-teal/15 px-4 py-1.5 text-sm font-semibold tracking-wide text-sna-teal-dark uppercase">
                                <StarIcon className="h-4 w-4 shrink-0" />
                                Syndicat National des Aidants
                            </span>

                            <h1 className="text-4xl leading-tight font-bold text-gray-800 sm:text-5xl lg:text-6xl">
                                12 millions de Français aident un proche.{' '}
                                <span className="relative text-sna-teal">
                                    Mais qui porte leur voix{' '}?
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

                            <p className="max-w-xl text-lg leading-relaxed text-gray-500 sm:text-xl">
                                Le{' '}
                                <strong className="text-gray-700">
                                    Syndicat National des Aidants (SNA)
                                </strong>{' '}
                                est la première organisation syndicale 100{' '}%
                                dédiée aux aidants familiaux en France. Une
                                force militante nationale créée pour{' '}:
                            </p>

                            {/* Bullet point badges */}
                            <div className="flex flex-col items-start gap-3">
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
                                        className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
                                    >
                                        {icon}
                                        {label}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                                <Link
                                    href="/formulaire/adhesion"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-sna-teal px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-sna-teal/30 transition-all hover:-translate-y-0.5 hover:bg-sna-teal-dark"
                                >
                                    <HandshakeIcon className="h-5 w-5" />{' '}
                                    Adhérer au SNA <ArrowRightIcon />
                                </Link>

                            </div>

                            {/* Key figures */}
                            <div className="mt-2 grid w-full grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-gray-100 bg-white/90 shadow-md backdrop-blur sm:grid-cols-4">
                                {[
                                    {
                                        value: '12 M',
                                        label: 'Aidants en France',
                                    },
                                    {
                                        value: '1/5',
                                        label: '1 Français sur 5 est aidant',
                                    },
                                    {
                                        value: '1/2',
                                        label: 'Ne connaît pas ses droits',
                                    },
                                    {
                                        value: '40 %',
                                        label: 'Santé dégradée',
                                    },
                                ].map((stat, i) => (
                                    <div
                                        key={stat.label}
                                        className={[
                                            'flex cursor-default flex-col items-center gap-1 px-3 py-5 text-center transition-colors duration-200 hover:bg-sna-teal/5',
                                            i < 3
                                                ? 'border-r border-gray-100'
                                                : '',
                                        ].join(' ')}
                                    >
                                        <span className="text-xl leading-none font-extrabold text-sna-teal sm:text-2xl">
                                            {stat.value}
                                        </span>
                                        <span className="text-xs leading-tight text-gray-500">
                                            {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Right: illustration ── */}
                        <div className="relative flex w-full flex-1 items-center justify-center lg:max-w-md">
                            {/* Floating accent cards */}
                            <div className="absolute -top-4 -left-4 z-10 flex items-center gap-2 rounded-2xl border border-gray-50 bg-white px-4 py-3 shadow-lg lg:-left-8">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-400">
                                    <svg
                                        className="h-4 w-4"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-xs leading-none font-bold text-gray-800">
                                        12 M d'aidants
                                    </p>
                                    <p className="mt-0.5 text-xs text-gray-400">
                                        en France
                                    </p>
                                </div>
                            </div>
                            <div className="absolute right-2 -bottom-4 z-10 flex items-center gap-2 rounded-2xl border border-gray-50 bg-white px-4 py-3 shadow-lg lg:-right-4">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sna-teal/10 text-sna-teal">
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-xs leading-none font-bold text-gray-800">
                                        Vos droits
                                    </p>
                                    <p className="mt-0.5 text-xs text-gray-400">
                                        défendus
                                    </p>
                                </div>
                            </div>
                            <div className="absolute top-1/2 -right-2 z-10 flex -translate-y-1/2 items-center gap-2 rounded-2xl bg-sna-teal px-4 py-3 shadow-lg lg:-right-6">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-xs leading-none font-bold text-white">
                                        Solidarité
                                    </p>
                                    <p className="mt-0.5 text-xs text-white/70">
                                        active
                                    </p>
                                </div>
                            </div>

                            <HeroIllustration />
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
                                badge="Nos actions"
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
                    <div className="mx-auto max-w-4xl text-center space-y-8">
                        <SectionHeader
                            badge="Nous contacter"
                            title="Le Syndicat National des Aidants est à votre écoute."
                            subtitle="Vous avez une question ? Besoin d’une information ? Vous souhaitez nous faire remonter une problématique ou proposer une collaboration ? N’hésitez pas à nous écrire."
                        />
                        <div className="flex justify-center">
                            <div className="flex flex-col gap-6 rounded-3xl border border-sna-teal/30 bg-white p-8 shadow-lg max-w-md w-full">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sna-teal shadow-lg mx-auto">
                                    <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2v-4.5M16 7l-4 4-4-4" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-sna-teal-dark">Formulaire de contact</h3>
                                <p className="text-gray-600">Remplissez notre formulaire pour nous transmettre votre demande. Nous vous répondrons dans les meilleurs délais.</p>
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
