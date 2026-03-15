import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center bg-gray-50 px-6 py-12">
            {/* Decorative teal blobs matching the home page hero */}
            <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-sna-teal/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-sna-green/10 blur-3xl" />

            <div className="relative w-full max-w-sm">
                {/* Logo */}
                <div className="mb-8 flex flex-col items-center gap-3">
                    <Link href={home()}>
                        <img
                            src="/images/logo.png"
                            alt="Syndicat National des Aidants"
                            className="h-14 w-auto"
                        />
                    </Link>
                </div>

                {/* Card */}
                <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                    <div className="mb-6 space-y-1 text-center">
                        <h1 className="text-xl font-bold text-gray-800">
                            {title}
                        </h1>
                        <p className="text-sm text-gray-500">{description}</p>
                    </div>

                    {children}
                </div>

                {/* Footer link back to home */}
                <p className="mt-6 text-center text-xs text-gray-400">
                    <Link
                        href={home()}
                        className="transition-colors hover:text-sna-teal"
                    >
                        ← Retour au site
                    </Link>
                </p>
            </div>
        </div>
    );
}
