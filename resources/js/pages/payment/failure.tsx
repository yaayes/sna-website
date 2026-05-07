import { Head, Link } from '@inertiajs/react';
import { XCircle } from 'lucide-react';
import PublicSiteHeader from '@/components/public-site-header';
import { Button } from '@/components/ui/button';

export default function PaymentFailurePage({ merchantReference }: { merchantReference: string }) {
    return (
        <>
            <Head title="Paiement non abouti – SNA" />
            <PublicSiteHeader />

            <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
                <XCircle className="mb-6 h-16 w-16 text-red-500" />

                <h1 className="mb-3 text-3xl font-bold text-gray-900">Paiement non abouti</h1>

                <p className="mb-8 max-w-md text-lg text-gray-600">
                    Votre paiement n'a pas pu être traité. Votre adhésion a néanmoins été
                    enregistrée — vous pouvez réessayer ou nous contacter directement.
                </p>

                <p className="mb-8 text-sm text-gray-400">Référence : {merchantReference}</p>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Button asChild>
                        <Link href="/formulaire/adhesion">Réessayer l'adhésion</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/formulaire/contact">Nous contacter</Link>
                    </Button>
                </div>
            </main>
        </>
    );
}
