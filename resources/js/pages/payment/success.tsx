import { Head, Link } from '@inertiajs/react';
import PublicSiteHeader from '@/components/public-site-header';

export default function PaymentSuccessPage({
    amountEuros,
    merchantReference,
}: {
    amountEuros: string;
    merchantReference: string;
}) {
    return (
        <>
            <Head title="Paiement confirmé – SNA" />
            <PublicSiteHeader />

            <main className="min-h-screen bg-linear-to-br from-[#e8f8f8] via-white to-[#f0f9e8] px-4 py-20">
                <div className="mx-auto max-w-lg">
                    <div className="space-y-6 rounded-3xl border border-sna-teal/30 bg-white p-10 text-center shadow-lg">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sna-teal/10 text-4xl">
                            💙
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-sna-teal-dark">
                                Paiement confirmé !
                            </h1>
                            <p className="mt-2 text-gray-500">
                                Votre adhésion et votre paiement de{' '}
                                <strong className="text-sna-teal-dark">
                                    {amountEuros}&nbsp;€
                                </strong>{' '}
                                ont bien été reçus.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-left text-sm text-gray-600">
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Référence
                            </p>
                            <p className="font-mono text-xs text-gray-700">{merchantReference}</p>
                        </div>

                        <div className="space-y-3 rounded-2xl border border-sna-teal/20 bg-sna-teal-light p-5 text-left">
                            <p className="text-sm font-semibold text-sna-teal-dark">
                                Votre engagement compte
                            </p>
                            <p className="text-sm leading-6 text-gray-700">
                                Vous recevrez bientôt un e-mail de confirmation avec les
                                informations relatives à votre adhésion. Pour prolonger votre
                                engagement, découvrez notre boutique — chaque produit contribue
                                à rendre visible la cause des aidants.
                            </p>
                            <a
                                href="https://boutique.syndicat-national-aidants.fr/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-full bg-sna-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sna-teal-dark"
                            >
                                Découvrir la boutique
                            </a>
                        </div>

                        <Link
                            href="/"
                            className="inline-block rounded-full border border-sna-teal/30 px-6 py-2.5 text-sm font-semibold text-sna-teal transition hover:bg-sna-teal hover:text-white"
                        >
                            Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
