import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import forms from '@/routes/forms';

export default function PartenairePage() {
    const { data, setData, submit, processing, errors, wasSuccessful, reset } =
        useForm({
            organisation_name: '',
            legal_status: '',
            email: '',
            contact_name: '',
            partnership_moral: false,
            partnership_technical: false,
            partnership_financial: false,
            objectives: '',
            commitment_projects: false,
            commitment_communication: false,
            commitment_expertise: false,
            consents_email: false,
            consents_rgpd: false,
        });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        submit(forms.partenaire.store(), { onSuccess: () => reset() });
    };

    const inputCls =
        'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition focus:border-sna-green focus:ring-2 focus:ring-sna-green/30 focus:outline-none placeholder:text-gray-300';
    const labelCls = 'mb-1.5 block text-sm font-semibold text-gray-700';

    return (
        <>
            <Head title="Partenariat – Syndicat National des Aidants">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-linear-to-br from-[#f0f9e8] via-white to-[#e8f8f8] font-sans">
                {/* Header */}
                <header className="border-b border-sna-green/10 bg-white/80 backdrop-blur-md">
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
                            className="flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-sna-green"
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
                    <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-sna-green/10 blur-3xl" />
                    <div className="pointer-events-none absolute top-16 -left-16 h-56 w-56 rounded-full bg-sna-teal/10 blur-2xl" />

                    <div className="relative mx-auto max-w-2xl px-6 pt-12 pb-10 text-center">
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-sna-green/10 px-4 py-1.5 text-sm font-semibold text-sna-green">
                            🌿 Construire ensemble
                        </span>
                        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl">
                            Devenir partenaire du SNA
                        </h1>
                        <p className="mt-4 text-lg leading-relaxed text-gray-500">
                            Collectivités, associations, entreprises —
                            collaborez avec nous pour améliorer la
                            reconnaissance et le soutien aux aidants.
                        </p>

                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            {[
                                {
                                    icon: '🏛️',
                                    label: 'Institutions & collectivités',
                                },
                                { icon: '🤝', label: 'Soutien mutualisé' },
                                { icon: '📋', label: 'Partenariat formalisé' },
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
                        <div className="space-y-4 rounded-3xl border border-green-200 bg-green-50 p-12 text-center shadow-lg">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
                                ✅
                            </div>
                            <h2 className="text-2xl font-bold text-green-800">
                                Demande envoyée !
                            </h2>
                            <p className="text-green-700">
                                Votre demande de partenariat a bien été
                                enregistrée. Nous vous contacterons
                                prochainement.
                            </p>
                            <Link
                                href="/"
                                className="mt-2 inline-block rounded-full border border-green-300 px-6 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-600 hover:text-white"
                            >
                                ← Retour à l'accueil
                            </Link>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6 rounded-3xl border border-gray-100 bg-gray-50 p-8 shadow-sm"
                        >
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className={labelCls}>
                                        Nom de l'organisation *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.organisation_name}
                                        onChange={(e) =>
                                            setData(
                                                'organisation_name',
                                                e.target.value,
                                            )
                                        }
                                        className={inputCls}
                                        placeholder="Mairie de Paris"
                                    />
                                    {errors.organisation_name && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.organisation_name}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className={labelCls}>
                                        Statut juridique *
                                    </label>
                                    <select
                                        value={data.legal_status}
                                        onChange={(e) =>
                                            setData(
                                                'legal_status',
                                                e.target.value,
                                            )
                                        }
                                        className={inputCls}
                                    >
                                        <option value="">Sélectionner…</option>
                                        <option value="Collectivité territoriale">
                                            Collectivité territoriale
                                        </option>
                                        <option value="Association">
                                            Association
                                        </option>
                                        <option value="Entreprise">
                                            Entreprise
                                        </option>
                                        <option value="Service de l'État">
                                            Service de l'État
                                        </option>
                                        <option value="Autre organisme public">
                                            Autre organisme public
                                        </option>
                                    </select>
                                    {errors.legal_status && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.legal_status}
                                        </p>
                                    )}
                                </div>
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
                                        placeholder="contact@organisation.fr"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className={labelCls}>
                                        Nom et fonction du contact *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.contact_name}
                                        onChange={(e) =>
                                            setData(
                                                'contact_name',
                                                e.target.value,
                                            )
                                        }
                                        className={inputCls}
                                        placeholder="Jean Martin, Directeur"
                                    />
                                    {errors.contact_name && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.contact_name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Type de partenariat souhaité *
                                </label>
                                <div className="space-y-2">
                                    {[
                                        {
                                            key: 'partnership_moral' as const,
                                            label: 'Soutien moral ou promotionnel (visibilité, communication)',
                                        },
                                        {
                                            key: 'partnership_technical' as const,
                                            label: 'Soutien technique ou expertise (conseil, appui sur projets)',
                                        },
                                        {
                                            key: 'partnership_financial' as const,
                                            label: 'Soutien financier',
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
                                                className="h-4 w-4 rounded"
                                                style={{
                                                    accentColor:
                                                        'var(--color-sna-green)',
                                                }}
                                            />
                                            {item.label}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className={labelCls}>
                                    Objectifs et motivations du partenariat *
                                </label>
                                <textarea
                                    rows={4}
                                    value={data.objectives}
                                    onChange={(e) =>
                                        setData('objectives', e.target.value)
                                    }
                                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition placeholder:text-gray-300 focus:border-sna-green focus:ring-2 focus:ring-sna-green/30 focus:outline-none"
                                    placeholder="Précisez l'objet de votre partenariat et les objectifs que vous souhaitez atteindre avec le SNA…"
                                />
                                {errors.objectives && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.objectives}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Engagements envisagés
                                </label>
                                <div className="grid gap-3 sm:grid-cols-3">
                                    {[
                                        {
                                            key: 'commitment_projects' as const,
                                            label: 'Participation aux projets et événements',
                                        },
                                        {
                                            key: 'commitment_communication' as const,
                                            label: 'Communication et promotion des actions',
                                        },
                                        {
                                            key: 'commitment_expertise' as const,
                                            label: "Apport d'expertise ou de services",
                                        },
                                    ].map((item) => (
                                        <label
                                            key={item.key}
                                            className="flex cursor-pointer items-start gap-2 rounded-xl border border-gray-100 bg-white p-3 text-xs text-gray-600 transition hover:border-sna-green/50 hover:bg-sna-green/5"
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
                                                className="mt-0.5 h-4 w-4"
                                                style={{
                                                    accentColor:
                                                        'var(--color-sna-green)',
                                                }}
                                            />
                                            {item.label}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2 border-t border-gray-100 pt-4">
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
                                        className="mt-0.5 h-4 w-4 shrink-0 rounded"
                                        style={{
                                            accentColor:
                                                'var(--color-sna-green)',
                                        }}
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
                                        className="mt-0.5 h-4 w-4 shrink-0 rounded"
                                        style={{
                                            accentColor:
                                                'var(--color-sna-green)',
                                        }}
                                    />
                                    Je consens au traitement des données
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
                                className="w-full rounded-full bg-sna-green py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:opacity-90 disabled:opacity-60"
                                style={{
                                    boxShadow:
                                        '0 8px 20px rgba(168,200,74,0.25)',
                                }}
                            >
                                {processing
                                    ? 'Envoi en cours…'
                                    : 'Soumettre notre demande de partenariat'}
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
