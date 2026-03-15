import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { dashboard, login } from '@/routes';

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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
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
const MegaphoneIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
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
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
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
const ChevronDownIcon = ({ className = 'h-5 w-5' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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
const HandIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
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
            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
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

/* ─────────────────────────────────────────────
   FAQ Accordion Item
───────────────────────────────────────────── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-gray-50"
            >
                <span className="text-sm font-semibold text-gray-800 sm:text-base">
                    {question}
                </span>
                <span
                    className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                >
                    <ChevronDownIcon />
                </span>
            </button>
            {open && (
                <div className="border-t border-gray-50 px-6 pb-5 text-sm leading-relaxed text-gray-500">
                    <p className="pt-4">{answer}</p>
                </div>
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
                        <nav className="hidden items-center gap-1 md:flex">
                            {[
                                { href: '#apropos', label: 'À propos' },
                                { href: '#actions', label: 'Nos actions' },
                                { href: '#contact', label: 'Contact' },
                            ].map(({ href, label }) => (
                                <a
                                    key={href}
                                    href={href}
                                    className="group relative px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-sna-teal"
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
                                /* ── Fancy "Faire un don" button ── */
                                <a
                                    href="#contact"
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
                                        Faire un don
                                    </span>
                                    <ArrowRightIcon className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                </a>
                            )}

                            {/* Hamburger – mobile only */}
                            <button
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="relative flex h-9 w-9 items-center justify-center rounded-xl text-gray-600 transition-all duration-200 hover:bg-sna-teal/10 hover:text-sna-teal md:hidden"
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
                        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        <div className="border-t border-sna-teal/10 bg-linear-to-b from-white to-[#f8fefe] px-5 pt-3 pb-6">
                            {/* Nav links */}
                            <nav className="mb-4 flex flex-col">
                                {[
                                    { href: '#apropos', label: 'À propos' },
                                    { href: '#actions', label: 'Nos actions' },
                                    { href: '#contact', label: 'Contact' },
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
                                <a
                                    href="#contact"
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
                                        Faire un don
                                    </span>
                                </a>
                            )}
                        </div>
                    </div>
                </header>

                {/* ══════════════════════════════
                    HERO
                ══════════════════════════════ */}
                <section className="relative overflow-hidden bg-linear-to-br from-[#e8f8f8] via-white to-[#f0f9e8] px-6 py-16 lg:py-24">
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
                                Aux côtés des familles qui{' '}
                                <span className="relative text-sna-teal">
                                    accompagnent un enfant
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
                                </span>{' '}
                                en situation de handicap
                            </h1>

                            <p className="max-w-xl text-lg leading-relaxed text-gray-500 sm:text-xl">
                                Parce que l'amour que vous portez à votre enfant
                                mérite reconnaissance, protection et soutien, le
                                SNA agit chaque jour pour transformer votre
                                quotidien.
                            </p>

                            {/* Trust badges */}
                            <div className="flex flex-wrap gap-3">
                                {[
                                    {
                                        icon: <ShieldIcon />,
                                        label: 'Droits défendus',
                                    },
                                    {
                                        icon: <UsersIcon />,
                                        label: 'Familles réunies',
                                    },
                                    {
                                        icon: <HandIcon />,
                                        label: 'Soutien concret',
                                    },
                                ].map((b) => (
                                    <span
                                        key={b.label}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm"
                                    >
                                        <span className="shrink-0 text-sna-teal">
                                            {b.icon}
                                        </span>
                                        {b.label}
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
                                <Link
                                    href="/formulaire/moi-aussi"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-sna-teal px-8 py-3.5 text-base font-semibold text-sna-teal transition-colors hover:bg-sna-teal-light"
                                >
                                    « Moi aussi, j'ai vécu ça »
                                </Link>
                            </div>

                            {/* Key figures */}
                            <div className="mt-2 grid w-full grid-cols-2 gap-5 rounded-2xl border border-gray-100 bg-white/90 px-6 py-5 shadow-md backdrop-blur sm:grid-cols-4">
                                {[
                                    {
                                        value: '11 M',
                                        label: 'Aidants en France',
                                        icon: (
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.8}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        ),
                                    },
                                    {
                                        value: '700 K',
                                        label: 'Enfants handicapés',
                                        icon: (
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.8}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                                />
                                            </svg>
                                        ),
                                    },
                                    {
                                        value: '1/5',
                                        label: 'Aidants épuisés',
                                        icon: (
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.8}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                                />
                                            </svg>
                                        ),
                                    },
                                    {
                                        value: '80%',
                                        label: 'Femmes aidantes',
                                        icon: (
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.8}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                />
                                            </svg>
                                        ),
                                    },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="flex flex-col items-center gap-1.5 text-center"
                                    >
                                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sna-teal/10 text-sna-teal">
                                            {stat.icon}
                                        </span>
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
                                        11 M d'aidants
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
                    ALERT BANNER – Empathy
                ══════════════════════════════ */}
                <div className="bg-sna-teal px-6 py-4">
                    <p className="mx-auto max-w-4xl text-center text-sm font-medium text-white sm:text-base">
                        <span className="font-bold">
                            Vous le vivez chaque jour :
                        </span>{' '}
                        la lourdeur administrative, l'épuisement, le sentiment
                        d'être seul(e) face aux institutions.{' '}
                        <Link
                            href="/formulaire/adhesion"
                            className="font-semibold underline underline-offset-2 hover:text-white/80"
                        >
                            Rejoignez le SNA maintenant →
                        </Link>
                    </p>
                </div>

                {/* ══════════════════════════════
                    À PROPOS
                ══════════════════════════════ */}
                <section id="apropos" className="bg-white px-6 py-20">
                    <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 lg:flex-row">
                        {/* Text */}
                        <div className="flex-1 space-y-6">
                            <span className="inline-block rounded-full bg-sna-green/15 px-4 py-1 text-xs font-bold tracking-widest text-[#6a8a20] uppercase">
                                Qui sommes-nous
                            </span>
                            <h2 className="text-3xl leading-tight font-bold text-gray-800 sm:text-4xl">
                                Une voix collective pour les familles invisibles
                            </h2>
                            <p className="leading-relaxed text-gray-500">
                                Le{' '}
                                <strong className="text-gray-700">
                                    Syndicat National des Aidants (SNA)
                                </strong>{' '}
                                est né d'un constat simple : les familles qui
                                accompagnent un enfant en situation de handicap
                                portent une charge extraordinaire —
                                émotionnelle, administrative, financière — dans
                                un quasi-isolement.
                            </p>
                            <p className="leading-relaxed text-gray-500">
                                Face à la complexité des démarches (MDPH, CAF,
                                établissements spécialisés), au manque de
                                places, aux politiques publiques déconnectées du
                                terrain, le SNA fédère ces familles et porte
                                leur voix auprès des décideurs, des médias et
                                des partenaires institutionnels.
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "Reconnaissance officielle du statut d'aidant familial",
                                    'Simplification des démarches MDPH / CAF',
                                    'Sécurité financière et protection juridique',
                                    'Droit au répit réel et accompagnement',
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-2 text-sm text-gray-600"
                                    >
                                        <CheckIcon />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="#actions"
                                className="inline-flex items-center gap-2 font-semibold text-sna-teal transition-colors hover:text-sna-teal-dark"
                            >
                                Nos engagements <ArrowRightIcon />
                            </a>
                        </div>

                        {/* Value cards */}
                        <div className="grid flex-1 grid-cols-2 gap-4">
                            {[
                                {
                                    emoji: '🤝',
                                    bg: 'bg-sna-teal-light',
                                    title: 'Solidarité',
                                    desc: "Rompre l'isolement des aidants en créant une communauté soudée.",
                                },
                                {
                                    emoji: '🛡️',
                                    bg: 'bg-sna-green/10',
                                    title: 'Protection',
                                    desc: 'Défendre vos droits face aux administrations et aux institutions.',
                                },
                                {
                                    emoji: '💬',
                                    bg: 'bg-sna-teal-light',
                                    title: 'Écoute',
                                    desc: "Un espace d'expression sécurisé pour chaque famille.",
                                },
                                {
                                    emoji: '📣',
                                    bg: 'bg-sna-green/10',
                                    title: 'Représentation',
                                    desc: 'Porter la parole des familles au niveau national et législatif.',
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="group flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-5 transition-shadow hover:shadow-md"
                                >
                                    <div
                                        className={`h-12 w-12 rounded-2xl ${item.bg} flex items-center justify-center text-2xl transition-transform group-hover:scale-110`}
                                    >
                                        {item.emoji}
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
                    CE QUE VOUS VIVEZ
                    (Empathy section)
                ══════════════════════════════ */}
                <section className="bg-gray-50 px-6 py-20">
                    <div className="mx-auto max-w-6xl space-y-12">
                        <SectionHeader
                            badge="Ce que vous vivez"
                            title="Vous n'êtes pas seul(e)"
                            subtitle="Des milliers de familles partagent les mêmes difficultés au quotidien. Le SNA transforme ces épreuves individuelles en force collective."
                        />

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    emoji: '🏛️',
                                    quote: '"Il n\'y a pas de budget."',
                                    context:
                                        'Ce que vous entendez dans les institutions',
                                    pain: 'Lourdeur administrative (MDPH, CAF)',
                                    color: 'border-l-sna-teal',
                                },
                                {
                                    emoji: '⏳',
                                    quote: '"Il faut patienter."',
                                    context: "Ce que l'on vous répond",
                                    pain: 'Manque de places en structure spécialisée',
                                    color: 'border-l-sna-green',
                                },
                                {
                                    emoji: '😔',
                                    quote: '"Vous avez déjà de la chance."',
                                    context:
                                        'Ce que vous ressentez face à ce message',
                                    pain: "Épuisement moral et sentiment d'injustice",
                                    color: 'border-l-sna-teal',
                                },
                                {
                                    emoji: '😰',
                                    quote: '"Après moi, qui s\'en occupera ?"',
                                    context:
                                        "La peur de l'avenir qui ne vous quitte pas",
                                    pain: 'Absence de perspective à long terme',
                                    color: 'border-l-sna-green',
                                },
                                {
                                    emoji: '💔',
                                    quote: '"Je n\'ai plus le droit de m\'épuiser."',
                                    context:
                                        'La culpabilité de ne pas en faire assez',
                                    pain: 'Charge mentale permanente et isolement',
                                    color: 'border-l-sna-teal',
                                },
                                {
                                    emoji: '✊',
                                    quote: '"Je me bats seul(e) contre tout."',
                                    context:
                                        'Face aux refus et aux dossiers incomplets',
                                    pain: 'Précarisation professionnelle et sociale',
                                    color: 'border-l-sna-green',
                                },
                            ].map((item) => (
                                <div
                                    key={item.quote}
                                    className={`rounded-2xl border border-l-4 border-gray-100 bg-white ${item.color} flex flex-col gap-3 p-6 shadow-sm transition-shadow hover:shadow-md`}
                                >
                                    <span className="text-3xl">
                                        {item.emoji}
                                    </span>
                                    <p className="text-base font-semibold text-gray-700 italic">
                                        {item.quote}
                                    </p>
                                    <p className="text-xs tracking-wide text-gray-400 uppercase">
                                        {item.context}
                                    </p>
                                    <div className="mt-auto border-t border-gray-50 pt-3">
                                        <p className="text-xs font-medium text-sna-teal">
                                            ⚠️ {item.pain}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <Link
                                href="/formulaire/moi-aussi"
                                className="inline-flex items-center gap-2 rounded-full bg-sna-teal px-8 py-3.5 font-semibold text-white shadow-lg shadow-sna-teal/20 transition-all hover:-translate-y-0.5 hover:bg-sna-teal-dark"
                            >
                                Partagez votre témoignage <ArrowRightIcon />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════
                    NOS ACTIONS (3 forms)
                ══════════════════════════════ */}
                <section id="actions" className="bg-white px-6 py-20">
                    <div className="mx-auto max-w-6xl space-y-12">
                        <SectionHeader
                            badge="Nos actions"
                            title="Comment agir avec nous ?"
                            subtitle="Adhérez en tant qu'aidant, soutenez le mouvement ou témoignez — chaque geste compte."
                        />

                        {/* ── Featured adhesion banner ── */}
                        <Link
                            href="/formulaire/adhesion"
                            className="group flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl bg-linear-to-r from-sna-teal to-sna-teal-dark p-8 shadow-xl shadow-sna-teal/25 transition-transform hover:-translate-y-1 sm:flex-row"
                        >
                            <div className="flex items-center gap-5">
                                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20">
                                    <HandshakeIcon className="h-9 w-9 text-white" />
                                </span>
                                <div className="text-left">
                                    <p className="text-xs font-bold tracking-widest text-white/70 uppercase">
                                        Formulaire principal — Aidants
                                    </p>
                                    <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                                        Formulaire d'adhésion des aidants
                                    </h3>
                                    <p className="mt-1 text-sm text-white/80">
                                        Quantifiez et qualifiez votre réalité
                                        d'aidant(e) pour construire une force
                                        collective face aux institutions.
                                    </p>
                                </div>
                            </div>
                            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-sna-teal shadow-lg transition-transform group-hover:translate-x-1">
                                Adhérer <ArrowRightIcon />
                            </span>
                        </Link>

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {/* ── Card 1: Soutien / Donateur ── */}
                            <div className="flex flex-col gap-6 rounded-3xl border border-sna-teal/30 bg-linear-to-b from-[#f0fafa] to-white p-8 shadow-sm transition-shadow hover:shadow-lg">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sna-teal shadow-lg shadow-sna-teal/30">
                                    <HeartIcon className="h-7 w-7 text-white" />
                                </div>
                                <div>
                                    <span className="mb-2 inline-block text-xs font-bold tracking-widest text-sna-teal-dark uppercase">
                                        Soutien
                                    </span>
                                    <h3 className="text-xl leading-snug font-bold text-gray-800">
                                        Devenez membre soutien
                                    </h3>
                                </div>
                                <p className="flex-1 text-sm leading-relaxed text-gray-500">
                                    Que votre soutien soit moral, technique ou
                                    financier, votre engagement est essentiel.
                                    Personnes physiques ou morales, rejoignez le
                                    SNA et contribuez à nos projets en faveur
                                    des aidants familiaux.
                                </p>
                                <ul className="space-y-1.5">
                                    {[
                                        'Restez informé(e) de nos événements',
                                        'Participez aux projets du syndicat',
                                        'Recevez nos publications',
                                    ].map((b) => (
                                        <li
                                            key={b}
                                            className="flex items-center gap-2 text-xs text-gray-600"
                                        >
                                            <CheckIcon /> {b}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/formulaire/soutien"
                                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-sna-teal px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-sna-teal-dark"
                                >
                                    Je soutiens le SNA <ArrowRightIcon />
                                </Link>
                            </div>

                            {/* ── Card 2: Partenaires institutionnels ── */}
                            <div className="flex flex-col gap-6 rounded-3xl border border-sna-green/30 bg-linear-to-b from-[#f5faea] to-white p-8 shadow-sm transition-shadow hover:shadow-lg">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sna-green shadow-lg shadow-sna-green/30">
                                    <UsersIcon className="h-7 w-7 text-white" />
                                </div>
                                <div>
                                    <span className="mb-2 inline-block text-xs font-bold tracking-widest text-[#6a8a20] uppercase">
                                        Partenariat
                                    </span>
                                    <h3 className="text-xl leading-snug font-bold text-gray-800">
                                        Partenaires institutionnels
                                    </h3>
                                </div>
                                <p className="flex-1 text-sm leading-relaxed text-gray-500">
                                    Collectivités, associations, entreprises,
                                    services de l'État — associez-vous au SNA
                                    pour construire ensemble des solutions
                                    durables en faveur des familles d'enfants
                                    handicapés.
                                </p>
                                <ul className="space-y-1.5">
                                    {[
                                        'Soutien moral ou promotionnel',
                                        "Apport d'expertise ou de services",
                                        'Participation aux projets et événements',
                                    ].map((b) => (
                                        <li
                                            key={b}
                                            className="flex items-center gap-2 text-xs text-gray-600"
                                        >
                                            <span className="shrink-0 text-sna-green">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2.5}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </span>
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/formulaire/partenaire"
                                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-sna-green px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-sna-green-dark"
                                >
                                    Devenir partenaire <ArrowRightIcon />
                                </Link>
                            </div>

                            {/* ── Card 3: Moi aussi ── */}
                            <div className="flex flex-col gap-6 rounded-3xl border border-sna-teal/30 bg-linear-to-b from-[#f0fafa] to-white p-8 shadow-sm transition-shadow hover:shadow-lg">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sna-teal shadow-lg shadow-sna-teal/30">
                                    <MegaphoneIcon className="h-7 w-7 text-white" />
                                </div>
                                <div>
                                    <span className="mb-2 inline-block text-xs font-bold tracking-widest text-sna-teal-dark uppercase">
                                        Campagne
                                    </span>
                                    <h3 className="text-xl leading-snug font-bold text-gray-800">
                                        « Moi aussi, j'ai vécu ça »
                                    </h3>
                                </div>
                                <p className="flex-1 text-sm leading-relaxed text-gray-500">
                                    Votre difficulté n'est pas isolée. Chaque
                                    témoignage renforce l'action collective.
                                    Ensemble, nous transformons des épreuves
                                    individuelles en avancées pour toutes les
                                    familles.
                                </p>
                                <blockquote className="border-l-2 border-sna-teal pl-3 text-xs text-gray-400 italic">
                                    "Chaque témoignage compte. C'est ainsi que
                                    nous transformons des difficultés
                                    individuelles en avancées collectives."
                                </blockquote>
                                <Link
                                    href="/formulaire/moi-aussi"
                                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-sna-teal px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-sna-teal-dark"
                                >
                                    Je témoigne <ArrowRightIcon />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════
                    FORMULAIRE ADHÉSION — CTA
                ══════════════════════════════ */}
                <section
                    id="formulaire-adhesion"
                    className="relative overflow-hidden bg-linear-to-br from-[#e8f8f8] via-white to-[#f0f9e8] px-6 py-20"
                >
                    <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-sna-teal/10 blur-3xl" />
                    <div className="mx-auto max-w-3xl space-y-8">
                        <div className="text-center">
                            <span className="inline-block rounded-full bg-sna-teal/15 px-4 py-1 text-xs font-bold tracking-widest text-sna-teal-dark uppercase">
                                Formulaire principal
                            </span>
                            <h2 className="mt-4 text-3xl leading-tight font-bold text-gray-800 sm:text-4xl">
                                Formulaire d'adhésion des aidants
                            </h2>
                            <p className="mt-3 leading-relaxed text-gray-500">
                                Les aidants sont nombreux, mais dispersés et
                                invisibilisés. Ce formulaire permet de{' '}
                                <strong className="text-gray-700">
                                    quantifier et qualifier
                                </strong>{' '}
                                votre réalité pour objectiver les impacts
                                sociaux, économiques et humains, et transformer
                                des vécus isolés en force collective lisible
                                pour les institutions et les médias.
                            </p>
                        </div>

                        <Link
                            href="/formulaire/adhesion"
                            className="group flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl bg-linear-to-r from-sna-teal to-sna-teal-dark p-10 shadow-xl shadow-sna-teal/25 transition-transform hover:-translate-y-1 sm:flex-row"
                        >
                            <div className="flex items-center gap-5">
                                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20">
                                    <HandshakeIcon className="h-9 w-9 text-white" />
                                </span>
                                <div className="text-left">
                                    <p className="text-xs font-bold tracking-widest text-white/70 uppercase">
                                        6 étapes — Environ 5 minutes
                                    </p>
                                    <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                                        Remplir le formulaire d'adhésion
                                    </h3>
                                    <p className="mt-1 text-sm text-white/80">
                                        Un parcours guidé pour qualifier votre
                                        situation et rejoindre le SNA.
                                    </p>
                                </div>
                            </div>
                            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-sna-teal shadow-lg transition-transform group-hover:translate-x-1">
                                Commencer <ArrowRightIcon />
                            </span>
                        </Link>
                    </div>
                </section>

                {/* ══════════════════════════════
                    FORMULAIRE SOUTIEN — CTA
                ══════════════════════════════ */}
                <section
                    id="formulaire-soutien"
                    className="bg-gray-50 px-6 py-20"
                >
                    <div className="mx-auto max-w-3xl space-y-8">
                        <SectionHeader
                            badge="Formulaire"
                            title="Devenir membre soutien"
                            subtitle="Merci de votre engagement en faveur des aidants. Formalisez votre soutien moral, technique ou financier."
                        />

                        <Link
                            href="/formulaire/soutien"
                            className="group flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl border border-sna-teal/30 bg-white p-10 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg sm:flex-row"
                        >
                            <div className="flex items-center gap-5">
                                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sna-teal/10 text-3xl">
                                    🤝
                                </span>
                                <div className="text-left">
                                    <p className="text-xs font-bold tracking-widest text-sna-teal-dark uppercase">
                                        Personnes physiques &amp; morales
                                    </p>
                                    <h3 className="mt-1 text-xl font-bold text-gray-800 sm:text-2xl">
                                        Rejoindre en tant que soutien
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Soutien moral, technique ou financier —
                                        chaque engagement compte.
                                    </p>
                                </div>
                            </div>
                            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-sna-teal px-7 py-3 text-sm font-bold text-white shadow-lg transition-transform group-hover:translate-x-1">
                                Accéder au formulaire <ArrowRightIcon />
                            </span>
                        </Link>
                    </div>
                </section>

                {/* ══════════════════════════════
                    FORMULAIRE PARTENAIRE — CTA
                ══════════════════════════════ */}
                <section
                    id="formulaire-partenaire"
                    className="bg-white px-6 py-20"
                >
                    <div className="mx-auto max-w-3xl space-y-8">
                        <SectionHeader
                            badge="Partenariat institutionnel"
                            title="Établissons un partenariat"
                            subtitle="Le SNA souhaite développer des partenariats avec des entités publiques et privées pour soutenir ses projets."
                        />

                        <Link
                            href="/formulaire/partenaire"
                            className="group flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl border border-sna-green/30 bg-linear-to-b from-[#f5faea] to-white p-10 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg sm:flex-row"
                        >
                            <div className="flex items-center gap-5">
                                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sna-green/10 text-3xl">
                                    🏛️
                                </span>
                                <div className="text-left">
                                    <p className="text-xs font-bold tracking-widest text-[#6a8a20] uppercase">
                                        Collectivités, associations, entreprises
                                    </p>
                                    <h3 className="mt-1 text-xl font-bold text-gray-800 sm:text-2xl">
                                        Proposer un partenariat
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Construisons ensemble des solutions
                                        durables pour les familles.
                                    </p>
                                </div>
                            </div>
                            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-sna-green px-7 py-3 text-sm font-bold text-white shadow-lg transition-transform group-hover:translate-x-1">
                                Accéder au formulaire <ArrowRightIcon />
                            </span>
                        </Link>
                    </div>
                </section>

                {/* ══════════════════════════════
                    FORMULAIRE MOI AUSSI — CTA
                ══════════════════════════════ */}
                <section
                    id="moi-aussi"
                    className="bg-linear-to-br from-[#e8f8f8] to-[#f0f9e8] px-6 py-20"
                >
                    <div className="mx-auto max-w-3xl space-y-8">
                        <SectionHeader
                            badge="Témoignage"
                            title="« Moi aussi, j'ai vécu ça »"
                            subtitle="Cette difficulté ne concerne pas qu'une seule famille. Votre témoignage renforce l'action collective et peut changer les choses."
                        />

                        <div className="rounded-3xl border border-sna-teal/20 bg-white/80 p-3 backdrop-blur">
                            <blockquote className="px-6 py-3 text-center text-sm text-gray-500 italic">
                                "Chaque témoignage compte. C'est ainsi que nous
                                transformons des difficultés individuelles en
                                avancées collectives."
                            </blockquote>
                        </div>

                        <Link
                            href="/formulaire/moi-aussi"
                            className="group flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl bg-linear-to-r from-sna-teal to-sna-teal-dark p-10 shadow-xl shadow-sna-teal/25 transition-transform hover:-translate-y-1 sm:flex-row"
                        >
                            <div className="flex items-center gap-5">
                                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-3xl">
                                    📣
                                </span>
                                <div className="text-left">
                                    <p className="text-xs font-bold tracking-widest text-white/70 uppercase">
                                        Campagne nationale
                                    </p>
                                    <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                                        Partager mon témoignage
                                    </h3>
                                    <p className="mt-1 text-sm text-white/80">
                                        Votre voix compte. Aidez-nous à faire
                                        changer les choses.
                                    </p>
                                </div>
                            </div>
                            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-sna-teal shadow-lg transition-transform group-hover:translate-x-1">
                                Témoigner <ArrowRightIcon />
                            </span>
                        </Link>
                    </div>
                </section>

                {/* ══════════════════════════════
                    FAQ
                ══════════════════════════════ */}
                <section className="bg-white px-6 py-20">
                    <div className="mx-auto max-w-3xl space-y-8">
                        <SectionHeader
                            badge="FAQ"
                            title="Questions fréquentes"
                        />
                        <div className="space-y-3">
                            {[
                                {
                                    question: "À qui s'adresse le SNA ?",
                                    answer: "Le SNA s'adresse à toutes les familles qui accompagnent au quotidien un enfant en situation de handicap : parents, fratries, proches aidants. Nous accueillons également les associations, collectivités et entreprises souhaitant agir à nos côtés.",
                                },
                                {
                                    question:
                                        'Mes informations personnelles sont-elles protégées ?',
                                    answer: "Oui. Le SNA s'engage à traiter toutes les données personnelles dans le strict respect du RGPD. Vos témoignages sont confidentiels et ne seront jamais publiés ou utilisés sans votre accord explicite.",
                                },
                                {
                                    question:
                                        'Comment le SNA utilise-t-il les témoignages ?',
                                    answer: 'Les témoignages (avec votre accord) servent à constituer des dossiers de plaidoyer, à appuyer des propositions de loi, à interpeller les médias et les décideurs politiques. Ils peuvent être anonymisés ou utilisés de manière collective selon vos préférences.',
                                },
                                {
                                    question:
                                        "Qu'est-ce qu'un partenariat institutionnel ?",
                                    answer: "Un partenariat institutionnel permet à une organisation (collectivité, association, entreprise, service de l'État) de s'associer au SNA par un soutien moral, technique ou financier pour co-construire des solutions en faveur des familles d'enfants handicapés.",
                                },
                                {
                                    question:
                                        'Comment puis-je être tenu(e) informé(e) des actions du SNA ?',
                                    answer: 'En remplissant le formulaire de soutien, vous pouvez choisir de recevoir nos actualités, événements et publications par email. Vous pouvez également vous inscrire à notre newsletter.',
                                },
                            ].map((item) => (
                                <FaqItem
                                    key={item.question}
                                    question={item.question}
                                    answer={item.answer}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════
                    CTA BANNER
                ══════════════════════════════ */}
                <section className="relative overflow-hidden bg-linear-to-r from-sna-teal to-sna-teal-dark px-6 py-20">
                    <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
                    <div className="relative mx-auto max-w-3xl space-y-6 text-center">
                        <h2 className="text-3xl leading-tight font-bold text-white sm:text-4xl">
                            Prêt(e) à rejoindre le mouvement ?
                        </h2>
                        <p className="mx-auto max-w-xl text-lg text-white/80">
                            Ensemble, construisons un avenir où chaque famille
                            accompagnant un enfant handicapé est reconnue,
                            soutenue et protégée.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Link
                                href="/formulaire/adhesion"
                                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-sna-teal shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                            >
                                <HandshakeIcon className="h-5 w-5" /> Adhérer au
                                SNA
                            </Link>
                            <Link
                                href="/formulaire/soutien"
                                className="rounded-full border-2 border-white px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
                            >
                                Je soutiens le SNA
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════
                    CONTACT
                ══════════════════════════════ */}
                <section id="contact" className="bg-gray-50 px-6 py-20">
                    <div className="mx-auto max-w-4xl space-y-10">
                        <SectionHeader
                            badge="Contact"
                            title="Nous contacter"
                            subtitle="Une question, une demande d'information ? Notre équipe est à votre écoute."
                        />
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                            {[
                                {
                                    icon: '📧',
                                    label: 'E-mail',
                                    value: 'contact@sna-aidants.fr',
                                    href: 'mailto:contact@sna-aidants.fr',
                                },
                                {
                                    icon: '📞',
                                    label: 'Téléphone',
                                    value: '+33 (0)1 00 00 00 00',
                                    href: 'tel:+33100000000',
                                },
                                {
                                    icon: '📍',
                                    label: 'Adresse',
                                    value: 'Paris, France',
                                    href: '#',
                                },
                            ].map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    <span className="text-3xl">
                                        {item.icon}
                                    </span>
                                    <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                                        {item.label}
                                    </span>
                                    <span className="text-center text-sm font-semibold text-gray-700">
                                        {item.value}
                                    </span>
                                </a>
                            ))}
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
                                    { label: 'À propos', href: '#apropos' },
                                    { label: 'Nos actions', href: '#actions' },
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
                                        label: 'Témoigner',
                                        href: '/formulaire/moi-aussi',
                                    },
                                    { label: 'Contact', href: '#contact' },
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
                                    Espace membre
                                </h4>
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="block text-sm text-gray-400 transition-colors hover:text-sna-teal"
                                    >
                                        Mon espace
                                    </Link>
                                ) : (
                                    <Link
                                        href={login()}
                                        className="block text-sm text-gray-400 transition-colors hover:text-sna-teal"
                                    >
                                        Se connecter
                                    </Link>
                                )}
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
