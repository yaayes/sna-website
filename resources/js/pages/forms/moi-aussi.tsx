import { Head, Link } from '@inertiajs/react';
import MoiAussiForm from '@/components/moi-aussi-form';
import PublicSiteHeader from '@/components/public-site-header';

export default function MoiAussiPage() {
    return (
        <>
            <Head title="Moi Aussi – Syndicat National des Aidants">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-linear-to-br from-[#e8f8f8] to-[#f0f9e8] font-sans">
                <PublicSiteHeader />

                {/* Hero */}
                <div className="relative overflow-hidden">
                    <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-sna-teal/10 blur-3xl" />
                    <div className="pointer-events-none absolute top-16 -left-16 h-56 w-56 rounded-full bg-sna-green/10 blur-2xl" />

                    <div className="relative mx-auto max-w-2xl px-6 pt-12 pb-10 text-center">
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-sna-teal/10 px-4 py-1.5 text-sm font-semibold text-sna-teal-dark">
                            📣 Votre témoignage compte
                        </span>
                        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl">
                            Moi aussi, j'ai vécu ça
                        </h1>
                        <p className="mt-4 text-lg leading-relaxed text-gray-500">
                            Partagez votre expérience pour renforcer notre
                            action collective. Chaque témoignage fait avancer
                            les droits des aidants.
                        </p>

                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            {[
                                {
                                    icon: '🔒',
                                    label: 'Témoignage confidentiel',
                                },
                                { icon: '💪', label: 'Force collective' },
                                { icon: '📜', label: 'Impact législatif' },
                            ].map((b) => (
                                <span
                                    key={b.label}
                                    className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm ring-1 ring-gray-100"
                                >
                                    {b.icon} {b.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="mx-auto max-w-2xl px-6 pb-20">
                    <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                        <MoiAussiForm />
                    </div>

                    <p className="mt-8 text-center text-xs text-gray-400">
                        Déjà soumis un formulaire ?{' '}
                        <Link
                            href="/mes-formulaires"
                            className="font-medium text-sna-teal underline-offset-2 hover:underline"
                        >
                            Accéder à mes soumissions
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
