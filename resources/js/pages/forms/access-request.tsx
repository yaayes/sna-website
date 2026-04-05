import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import PublicSiteHeader from '@/components/public-site-header';
import forms from '@/routes/forms';

export default function AccessRequest() {
    const { data, setData, submit, processing, errors, wasSuccessful } =
        useForm({
            email: '',
        });

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        submit(forms.access.send());
    }

    return (
        <>
            <Head title="Accéder à mes formulaires – SNA" />

            <div className="min-h-screen bg-linear-to-br from-[#e8f8f8] via-white to-[#f0f9e8]">
                <PublicSiteHeader />

                <div className="flex items-center justify-center px-4 py-16">
                    <div className="w-full max-w-md">
                        {/* Logo / brand */}
                        <div className="mb-8 text-center">
                            <h1 className="mt-4 text-2xl font-bold text-gray-800">
                                Accéder à mes formulaires
                            </h1>
                            <p className="mt-2 text-sm text-gray-500">
                                Entrez votre adresse email pour recevoir un lien
                                d'accès unique à vos soumissions.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                            {wasSuccessful ? (
                                <div className="space-y-2 rounded-2xl border border-teal-200 bg-teal-50 p-6 text-center">
                                    <span className="text-3xl">📧</span>
                                    <p className="font-semibold text-teal-800">
                                        Email envoyé !
                                    </p>
                                    <p className="text-sm text-teal-700">
                                        Si des formulaires sont associés à cet
                                        email, un lien d'accès valable 1 heure
                                        vous a été envoyé.
                                    </p>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    <div>
                                        <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                                            Adresse email *
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 focus:outline-none"
                                            placeholder="votre@email.fr"
                                            required
                                            autoFocus
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full rounded-full bg-teal-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-500/20 transition-all hover:-translate-y-0.5 hover:bg-teal-600 disabled:opacity-60"
                                    >
                                        {processing
                                            ? 'Envoi en cours…'
                                            : "Recevoir mon lien d'accès"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
