import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import forms from '@/routes/forms';

export default function SoutienPage() {
    const { data, setData, submit, processing, errors, wasSuccessful, reset } =
        useForm({
            name: '',
            organisation: '',
            statut: 'physique',
            email: '',
            phone: '',
            wants_partnership: false,
            wants_events: false,
            wants_participation: false,
            message: '',
            consents_email: false,
            consents_rgpd: false,
        });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        submit(forms.soutien.store(), { onSuccess: () => reset() });
    };

    const inputCls =
        'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/30 focus:outline-none placeholder:text-gray-300';
    const labelCls = 'mb-1.5 block text-sm font-semibold text-gray-700';

    return (
        <>
            <Head title="Soutien – Syndicat National des Aidants">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-linear-to-br from-[#e8f8f8] via-white to-[#f0f9e8] font-sans">
                {/* Header */}
                <header className="border-b border-sna-teal/10 bg-white/80 backdrop-blur-md">
                    <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
                        <Link href="/">
                            <img
                                src="/images/logo.png"
                                alt="SNA"
                                className="h-11 w-auto"
                            />
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-sna-teal"
                        >
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
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Retour à l'accueil
                        </Link>
                    </div>
                </header>

                {/* Hero */}
                <div className="relative overflow-hidden">
                    <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-sna-teal/10 blur-3xl" />
                    <div className="pointer-events-none absolute top-16 -left-16 h-56 w-56 rounded-full bg-sna-green/10 blur-2xl" />

                    <div className="relative mx-auto max-w-2xl px-6 pt-12 pb-10 text-center">
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-sna-teal/10 px-4 py-1.5 text-sm font-semibold text-sna-teal-dark">
                            🤝 Rejoindre notre réseau
                        </span>
                        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl">
                            Devenir soutien du SNA
                        </h1>
                        <p className="mt-4 text-lg leading-relaxed text-gray-500">
                            Particuliers, associations, professionnels — votre
                            soutien renforce la voix des aidants à l'échelle
                            nationale.
                        </p>

                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            {[
                                { icon: '💬', label: 'Engagement simple' },
                                { icon: '📣', label: 'Impact collectif' },
                                { icon: '🔒', label: 'Données protégées' },
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
                    {wasSuccessful ? (
                        <div className="space-y-4 rounded-3xl border border-teal-200 bg-teal-50 p-12 text-center shadow-lg">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100 text-4xl">
                                ✅
                            </div>
                            <h2 className="text-2xl font-bold text-teal-800">
                                Demande envoyée !
                            </h2>
                            <p className="text-teal-700">
                                Votre demande de soutien a bien été enregistrée.
                                Merci pour votre engagement.
                            </p>
                            <Link
                                href="/"
                                className="mt-2 inline-block rounded-full border border-teal-300 px-6 py-2.5 text-sm font-semibold text-teal-700 transition hover:bg-teal-600 hover:text-white"
                            >
                                ← Retour à l'accueil
                            </Link>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
                        >
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className={labelCls}>
                                        Nom et prénom *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className={inputCls}
                                        placeholder="Marie Dupont"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className={labelCls}>
                                        Nom de l'organisation (si personne
                                        morale)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.organisation}
                                        onChange={(e) =>
                                            setData(
                                                'organisation',
                                                e.target.value,
                                            )
                                        }
                                        className={inputCls}
                                        placeholder="Association XYZ"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Statut *
                                </label>
                                <div className="flex gap-6">
                                    {[
                                        {
                                            value: 'physique',
                                            label: 'Personne physique',
                                        },
                                        {
                                            value: 'morale',
                                            label: 'Personne morale',
                                        },
                                    ].map((opt) => (
                                        <label
                                            key={opt.value}
                                            className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                                        >
                                            <input
                                                type="radio"
                                                name="statut"
                                                value={opt.value}
                                                checked={
                                                    data.statut === opt.value
                                                }
                                                onChange={() =>
                                                    setData('statut', opt.value)
                                                }
                                                className="accent-sna-teal"
                                            />
                                            {opt.label}
                                        </label>
                                    ))}
                                </div>
                                {errors.statut && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.statut}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className={labelCls}>Email *</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        className={inputCls}
                                        placeholder="marie@exemple.fr"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className={labelCls}>
                                        Téléphone
                                    </label>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData('phone', e.target.value)
                                        }
                                        className={inputCls}
                                        placeholder="+33 6 00 00 00 00"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Engagements souhaités
                                </label>
                                <div className="space-y-2">
                                    {[
                                        {
                                            key: 'wants_partnership' as const,
                                            label: 'Souhaitez-vous être partenaire ?',
                                        },
                                        {
                                            key: 'wants_events' as const,
                                            label: 'Souhaitez-vous être informé(e) des événements ou projets ?',
                                        },
                                        {
                                            key: 'wants_participation' as const,
                                            label: 'Souhaitez-vous participer aux événements ou projets ?',
                                        },
                                    ].map((item) => (
                                        <label
                                            key={item.key}
                                            className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={data[item.key]}
                                                onChange={(e) =>
                                                    setData(
                                                        item.key,
                                                        e.target.checked,
                                                    )
                                                }
                                                className="h-4 w-4 rounded accent-sna-teal"
                                            />
                                            {item.label}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className={labelCls}>
                                    Message libre (facultatif)
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.message}
                                    onChange={(e) =>
                                        setData('message', e.target.value)
                                    }
                                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition placeholder:text-gray-300 focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/30 focus:outline-none"
                                    placeholder="Partagez vos motivations ou questions…"
                                />
                            </div>

                            <div className="space-y-2 border-t border-gray-50 pt-4">
                                <label className="flex cursor-pointer items-start gap-3 text-xs text-gray-500">
                                    <input
                                        type="checkbox"
                                        checked={data.consents_email}
                                        onChange={(e) =>
                                            setData(
                                                'consents_email',
                                                e.target.checked,
                                            )
                                        }
                                        className="mt-0.5 h-4 w-4 shrink-0 rounded accent-sna-teal"
                                    />
                                    J'autorise la réception d'informations par
                                    email
                                </label>
                                <label className="flex cursor-pointer items-start gap-3 text-xs text-gray-500">
                                    <input
                                        type="checkbox"
                                        checked={data.consents_rgpd}
                                        onChange={(e) =>
                                            setData(
                                                'consents_rgpd',
                                                e.target.checked,
                                            )
                                        }
                                        className="mt-0.5 h-4 w-4 shrink-0 rounded accent-sna-teal"
                                    />
                                    Je consens au traitement de mes données
                                    personnelles conformément au RGPD *
                                </label>
                                {errors.consents_rgpd && (
                                    <p className="text-xs text-red-500">
                                        {errors.consents_rgpd}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-full bg-sna-teal py-3.5 text-sm font-bold text-white shadow-lg shadow-sna-teal/20 transition-all hover:-translate-y-0.5 hover:bg-sna-teal-dark disabled:opacity-60"
                            >
                                {processing
                                    ? 'Envoi en cours…'
                                    : 'Envoyer ma demande de soutien'}
                            </button>
                        </form>
                    )}

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
