import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import forms from '@/routes/forms';

export default function MoiAussiPage() {
    const { data, setData, submit, processing, errors, wasSuccessful, reset } =
        useForm<{
            situation: string;
            testimony: string;
            consequences: string[];
            contacted_institution: string;
            institution_name: string;
            usage_anonymised: boolean;
            usage_collective: boolean;
            usage_legislation: boolean;
            usage_confidential: boolean;
            name: string;
            email: string;
            phone: string;
        }>({
            situation: '',
            testimony: '',
            consequences: [],
            contacted_institution: '',
            institution_name: '',
            usage_anonymised: false,
            usage_collective: false,
            usage_legislation: false,
            usage_confidential: false,
            name: '',
            email: '',
            phone: '',
        });

    const toggleConsequence = (item: string) => {
        setData(
            'consequences',
            data.consequences.includes(item)
                ? data.consequences.filter((c) => c !== item)
                : [...data.consequences, item],
        );
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        submit(forms.moiAussi.store(), { onSuccess: () => reset() });
    };

    const inputCls =
        'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/30 focus:outline-none placeholder:text-gray-300';
    const labelCls = 'mb-1.5 block text-sm font-semibold text-gray-700';

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
                    {wasSuccessful ? (
                        <div className="space-y-4 rounded-3xl border border-teal-200 bg-teal-50 p-12 text-center shadow-lg">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100 text-4xl">
                                💙
                            </div>
                            <h2 className="text-2xl font-bold text-teal-800">
                                Témoignage envoyé !
                            </h2>
                            <p className="text-teal-700">
                                Merci de votre confiance. Votre témoignage
                                contribue à notre action collective.
                            </p>
                            <Link
                                href="/"
                                className="mt-2 inline-block rounded-full border border-teal-300 px-6 py-2.5 text-sm font-semibold text-teal-700 transition hover:bg-sna-teal hover:text-white"
                            >
                                ← Retour à l'accueil
                            </Link>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
                        >
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Avez-vous été confronté(e) à cette
                                    problématique ? *
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { value: 'oui', label: 'Oui' },
                                        {
                                            value: 'en_cours',
                                            label: 'En cours',
                                        },
                                        {
                                            value: 'resolu',
                                            label: 'Résolu mais difficile',
                                        },
                                    ].map((opt) => (
                                        <label
                                            key={opt.value}
                                            className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-600 transition hover:border-sna-teal"
                                        >
                                            <input
                                                type="radio"
                                                name="situation"
                                                value={opt.value}
                                                checked={
                                                    data.situation === opt.value
                                                }
                                                onChange={() =>
                                                    setData(
                                                        'situation',
                                                        opt.value,
                                                    )
                                                }
                                                className="accent-sna-teal"
                                            />
                                            {opt.label}
                                        </label>
                                    ))}
                                </div>
                                {errors.situation && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.situation}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className={labelCls}>
                                    Racontez-nous ce que vous avez vécu *
                                </label>
                                <textarea
                                    rows={5}
                                    value={data.testimony}
                                    onChange={(e) =>
                                        setData('testimony', e.target.value)
                                    }
                                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition placeholder:text-gray-300 focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/30 focus:outline-none"
                                    placeholder="Décrivez librement votre expérience. Chaque détail compte pour renforcer notre action collective…"
                                />
                                {errors.testimony && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.testimony}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Quelles ont été les conséquences pour vous ?
                                </label>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                    {[
                                        'Perte financière',
                                        'Impact professionnel',
                                        'Impact sur la santé / sécurité',
                                        'Démarches administratives lourdes',
                                        'Isolement',
                                        'Autre',
                                    ].map((item) => (
                                        <label
                                            key={item}
                                            className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs text-gray-600 transition hover:border-sna-teal/50 hover:bg-sna-teal/5"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={data.consequences.includes(
                                                    item,
                                                )}
                                                onChange={() =>
                                                    toggleConsequence(item)
                                                }
                                                className="h-4 w-4 rounded accent-sna-teal"
                                            />
                                            {item}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Avez-vous saisi une institution ?
                                </label>
                                <div className="mb-3 flex gap-4">
                                    {[
                                        { value: 'oui', label: 'Oui' },
                                        { value: 'non', label: 'Non' },
                                    ].map((opt) => (
                                        <label
                                            key={opt.value}
                                            className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                                        >
                                            <input
                                                type="radio"
                                                name="institution"
                                                value={opt.value}
                                                checked={
                                                    data.contacted_institution ===
                                                    opt.value
                                                }
                                                onChange={() =>
                                                    setData(
                                                        'contacted_institution',
                                                        opt.value,
                                                    )
                                                }
                                                className="accent-sna-teal"
                                            />
                                            {opt.label}
                                        </label>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    value={data.institution_name}
                                    onChange={(e) =>
                                        setData(
                                            'institution_name',
                                            e.target.value,
                                        )
                                    }
                                    className={inputCls}
                                    placeholder="Si oui, laquelle ? (CAF, MDPH, employeur, assurance…)"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Acceptez-vous que votre témoignage soit
                                    utilisé *
                                </label>
                                <div className="space-y-2">
                                    {[
                                        {
                                            key: 'usage_anonymised' as const,
                                            label: 'De manière anonymisée',
                                        },
                                        {
                                            key: 'usage_collective' as const,
                                            label: 'Dans une action collective',
                                        },
                                        {
                                            key: 'usage_legislation' as const,
                                            label: 'Pour appuyer une proposition de loi',
                                        },
                                        {
                                            key: 'usage_confidential' as const,
                                            label: 'Je souhaite rester totalement confidentiel(le)',
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

                            <div className="grid grid-cols-1 gap-4 border-t border-gray-50 pt-4 sm:grid-cols-3">
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                                        Nom (facultatif)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className={inputCls}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        className={inputCls}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                                        Téléphone
                                    </label>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData('phone', e.target.value)
                                        }
                                        className={inputCls}
                                    />
                                </div>
                            </div>

                            <p className="rounded-xl bg-gray-50 p-4 text-xs leading-relaxed text-gray-400">
                                🔒 Les informations recueillies sont strictement
                                confidentielles et utilisées uniquement dans le
                                cadre des actions collectives du SNA. Aucun
                                témoignage ne sera publié sans votre accord
                                explicite.
                            </p>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-full bg-sna-teal py-3.5 text-sm font-bold text-white shadow-lg shadow-sna-teal/20 transition-all hover:-translate-y-0.5 hover:bg-sna-teal-dark disabled:opacity-60"
                            >
                                {processing
                                    ? 'Envoi en cours…'
                                    : 'Envoyer mon témoignage'}
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
