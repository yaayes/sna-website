import { Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Heart,
    Menu,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { dashboard } from '@/routes';

type PublicSiteHeaderProps = {
    className?: string;
};

const navLinks = [
    { href: 'apropos', label: 'Qui sommes nous' },
    { href: 'comprendre', label: "Comprendre l'aidance" },
    { href: '/nos-actions', label: 'Nos actions', isRoute: true },
    { href: 'representants', label: 'Nos représentants' },
    { href: 'actions', label: 'Rejoindre le SNA' },
    { href: 'presse', label: 'Revue de presse' },
];

export default function PublicSiteHeader({
    className = '',
}: PublicSiteHeaderProps) {
    const page = usePage();
    const auth = (page.props as { auth?: { user?: unknown } }).auth;
    const currentPath = page.url.split('?')[0];
    const isHome = currentPath === '/';
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const linkHref = (item: (typeof navLinks)[number]) =>
        item.isRoute ? item.href : isHome ? `#${item.href}` : `/#${item.href}`;

    return (
        <header
            className={`sticky top-0 z-50 border-b border-white/60 bg-white/90 shadow-[0_2px_20px_rgba(74,191,191,0.08)] backdrop-blur-md ${className}`}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
                <Link href="/" className="flex items-center gap-3">
                    <img
                        src="/images/logo.png"
                        alt="Syndicat National des Aidants"
                        className="h-12 w-auto"
                    />
                </Link>

                <nav className="hidden items-center gap-1 lg:flex">
                    {navLinks.map((item) => (
                        <a
                            key={item.href}
                            href={linkHref(item)}
                            className="group relative px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-sna-teal"
                        >
                            {item.label}
                            <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-sna-teal transition-all duration-300 group-hover:w-4/5" />
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    {auth?.user ? (
                        <Link
                            href={dashboard()}
                            className="rounded-full bg-sna-teal px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-sna-teal-dark hover:shadow-lg hover:shadow-sna-teal/30"
                        >
                            Mon espace
                        </Link>
                    ) : (
                        <Link
                            href="/formulaire/adhesion"
                            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                            style={{
                                background:
                                    'linear-gradient(135deg, #4abfbf, #37a3a3, #a8c84a, #4abfbf)',
                                backgroundSize: '300% 300%',
                                boxShadow:
                                    '0 4px 20px rgba(74,191,191,0.45), 0 1px 3px rgba(0,0,0,0.1)',
                                animation: 'donate-gradient 4s ease infinite',
                            }}
                        >
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
                                <Heart className="h-4 w-4" />
                            </span>
                            <span className="relative tracking-wide">
                                Adherer au SNA
                            </span>
                            <ArrowRight className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    )}

                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen((open) => !open)}
                        className="relative flex h-9 w-9 items-center justify-center rounded-xl text-gray-600 transition-all duration-200 hover:bg-sna-teal/10 hover:text-sna-teal lg:hidden"
                        aria-label={
                            mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'
                        }
                    >
                        <span
                            className={`absolute transition-all duration-200 ${mobileMenuOpen ? 'rotate-90 opacity-100' : 'rotate-0 opacity-0'}`}
                        >
                            <X className="h-5 w-5" />
                        </span>
                        <span
                            className={`absolute transition-all duration-200 ${mobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}
                        >
                            <Menu className="h-5 w-5" />
                        </span>
                    </button>
                </div>
            </div>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${mobileMenuOpen ? 'max-h-128 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="border-t border-sna-teal/10 bg-linear-to-b from-white to-[#f8fefe] px-5 pt-3 pb-6">
                    <nav className="mb-4 flex flex-col">
                        {navLinks.map((item, index) => (
                            <a
                                key={item.href}
                                href={linkHref(item)}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 transition-all duration-150 hover:bg-sna-teal/10 hover:pl-5 hover:text-sna-teal"
                                style={{
                                    transitionDelay: mobileMenuOpen
                                        ? `${index * 40}ms`
                                        : '0ms',
                                }}
                            >
                                {item.label}
                                <ArrowRight className="h-3.5 w-3.5 text-sna-teal/50" />
                            </a>
                        ))}
                    </nav>

                    <div className="mb-4 h-px bg-linear-to-r from-transparent via-sna-teal/20 to-transparent" />

                    {!auth?.user && (
                        <Link
                            href="/formulaire/adhesion"
                            onClick={() => setMobileMenuOpen(false)}
                            className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl py-3.5 text-sm font-bold text-white transition-all duration-300 active:scale-95"
                            style={{
                                background:
                                    'linear-gradient(135deg, #4abfbf 0%, #37a3a3 50%, #a8c84a 100%)',
                                boxShadow: '0 6px 24px rgba(74,191,191,0.35)',
                            }}
                        >
                            <span
                                className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/20 transition-transform duration-700 group-active:translate-x-[200%]"
                                aria-hidden="true"
                            />
                            <Heart className="h-4 w-4" />
                            <span className="tracking-wide">
                                Adherer au SNA
                            </span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
