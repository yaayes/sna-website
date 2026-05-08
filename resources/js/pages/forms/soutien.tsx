import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import PublicSiteHeader from '@/components/public-site-header';
import forms from '@/routes/forms';

type SoutienFormData = {
    name: string;
    address: string;
    email: string;
    phone: string;
    wants_events: boolean | null;
    wants_participation: boolean | null;
    message: string;
    consents_email: boolean | null;
    consents_rgpd: boolean;
    don_amount: string;
    pending_form_id: number | null;
};

type PageProps = {
    membershipFeeCents: number;
    prefillData?: Partial<SoutienFormData> & { pending_form_id?: number } | null;
};

export default function SoutienPage() {
    const { membershipFeeCents, prefillData } = usePage<PageProps>().props;

    const { data, setData, submit, processing, errors, wasSuccessful, reset } =
        useForm<SoutienFormData>({
            name: prefillData?.name ?? '',
            address: prefillData?.address ?? '',
            email: prefillData?.email ?? '',
            phone: prefillData?.phone ?? '',
            wants_events: prefillData?.wants_events ?? null,
            wants_participation: prefillData?.wants_participation ?? null,
            message: prefillData?.message ?? '',
            consents_email: prefillData?.consents_email ?? null,
            consents_rgpd: prefillData?.consents_rgpd ?? false,
            don_amount: prefillData?.don_amount ?? '',
            pending_form_id: prefillData?.pending_form_id ?? null,
        });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        submit(forms.soutien.store(), {
            onSuccess: () => {
                reset();
                setData('pending_form_id', null);
            },
            transform: (payload) => ({
                ...payload,
                don_amount: payload.don_amount.trim() === '' ? '' : payload.don_amount,
            }),
        });
    };

    const inputCls =
        'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/30 focus:outline-none placeholder:text-gray-300';
    const labelCls = 'mb-1.5 block text-sm font-semibold text-gray-700';

    const baseFeeEuros = membershipFeeCents / 100;
    const parsedDonation = Number.parseFloat(data.don_amount || '0');
    const donationEuros = Number.isFinite(parsedDonation) && parsedDonation > 0
        ? parsedDonation
        : 0;
    const totalEuros = baseFeeEuros + donationEuros;

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
                <PublicSiteHeader />

                {/* Hero */}
                <div className="relative overflow-hidden">
                    <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-sna-teal/10 blur-3xl" />
                    <div className="pointer-events-none absolute top-16 -left-16 h-56 w-56 rounded-full bg-sna-green/10 blur-2xl" />

                    <div className="relative mx-auto max-w-2xl px-6 pt-12 pb-10 text-center">
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-sna-teal/10 px-4 py-1.5 text-sm font-semibold text-sna-teal-dark">
                            🤝 Formulaire Membres Soutiens
                        </span>
                        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl">
                            Membre soutien du SNA
                        </h1>
                        <div className="mt-5 space-y-3 text-left text-sm leading-relaxed text-gray-600 sm:text-base">
                            <p>
                                Personne n&apos;est totalement à l&apos;abri de
                                devenir un jour aidant. Au cours d&apos;une vie,
                                nous pouvons être amenés à accompagner un
                                parent, un conjoint, un enfant ou un proche
                                confronté à la maladie, au handicap ou à la
                                perte d&apos;autonomie.
                            </p>
                            <p>
                                Certain·es d&apos;entre vous ont peut-être déjà
                                été témoins de cette réalité en accompagnant un
                                proche aidant, ou en voyant un membre de leur
                                famille assumer cette responsabilité.
                            </p>
                            <p>
                                En rejoignant le Syndicat National des Aidants,
                                vous choisissez de soutenir celles et ceux qui
                                accompagnent aujourd&apos;hui, tout en
                                contribuant à construire une société mieux
                                préparée à accompagner les aidants de demain.
                            </p>
                        </div>

                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            {[
                                { icon: '🫶', label: 'Soutien concret' },
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

                        <div className="relative mt-7 overflow-hidden rounded-2xl border border-sna-teal/20 bg-sna-teal-light p-5 text-center">
                            <svg
                                aria-hidden
                                viewBox="0 0 180 120"
                                className="pointer-events-none absolute -top-10 -right-8 h-28 w-40 text-sna-teal/20"
                                fill="none"
                            >
                                <path
                                    d="M10 70C30 30 80 20 120 38C148 50 162 76 170 102"
                                    stroke="currentColor"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                />
                                <circle
                                    cx="48"
                                    cy="84"
                                    r="10"
                                    fill="currentColor"
                                />
                            </svg>
                            <svg
                                aria-hidden
                                viewBox="0 0 120 120"
                                className="pointer-events-none absolute top-2 left-3 h-14 w-14 text-sna-teal/18"
                                fill="none"
                            >
                                <rect
                                    x="18"
                                    y="18"
                                    width="84"
                                    height="84"
                                    rx="18"
                                    stroke="currentColor"
                                    strokeWidth="5"
                                />
                            </svg>
                            <svg
                                aria-hidden
                                viewBox="0 0 120 120"
                                className="pointer-events-none absolute bottom-3 left-[77%] h-12 w-12 text-sna-teal/25"
                                fill="currentColor"
                            >
                                <path d="M60 102C57 102 54 101 52 99C32 85 18 72 18 54C18 42 27 33 39 33C47 33 55 37 60 44C65 37 73 33 81 33C93 33 102 42 102 54C102 72 88 85 68 99C66 101 63 102 60 102Z" />
                            </svg>
                            <svg
                                aria-hidden
                                viewBox="0 0 160 64"
                                className="pointer-events-none absolute -bottom-6 -left-6 h-16 w-40 text-sna-green/25"
                                fill="none"
                            >
                                <path
                                    d="M4 50C30 22 62 18 86 30C110 42 132 40 156 18"
                                    stroke="currentColor"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <svg
                                aria-hidden
                                viewBox="0 0 120 70"
                                className="pointer-events-none absolute right-10 bottom-2 h-8 w-24 text-sna-teal/15"
                                fill="none"
                            >
                                <circle
                                    cx="20"
                                    cy="35"
                                    r="6"
                                    fill="currentColor"
                                />
                                <circle
                                    cx="48"
                                    cy="35"
                                    r="6"
                                    fill="currentColor"
                                />
                                <circle
                                    cx="76"
                                    cy="35"
                                    r="6"
                                    fill="currentColor"
                                />
                            </svg>
                            <svg
                                aria-hidden
                                viewBox="0 0 320 90"
                                className="pointer-events-none absolute inset-x-6 top-1/2 h-10 -translate-y-1/2 text-sna-teal/10"
                                fill="none"
                            >
                                <path
                                    d="M8 46C44 24 92 24 126 44C156 60 188 62 222 46C250 34 278 34 312 48"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <p className="text-base font-semibold text-sna-teal-dark sm:text-lg">
                                Merci pour votre engagement et votre soutien.
                            </p>
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
                            <div className="space-y-3 rounded-2xl border border-teal-200 bg-white p-5 text-left shadow-sm">
                                <p className="text-sm leading-6 text-gray-700">
                                    Pour prolonger votre engagement et rendre visible la cause des aidants au quotidien,
                                    découvrez également notre boutique dédiée : chaque produit que vous portez ou partagez
                                    contribue à briser l’invisibilité des aidants et à faire reconnaître leur rôle
                                    essentiel.
                                </p>
                                <a
                                    href="https://boutique.syndicat-national-aidants.fr/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
                                >
                                    Découvrir la boutique
                                </a>
                            </div>
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
                            <h2 className="text-sm font-bold tracking-wide text-sna-teal-dark uppercase">
                                A. Informations du membre
                            </h2>

                            <div className="grid grid-cols-1 gap-6">
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
                                        Adresse *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.address}
                                        onChange={(e) =>
                                            setData('address', e.target.value)
                                        }
                                        className={inputCls}
                                        placeholder="12 rue des Aidants, 75000 Paris"
                                    />
                                    {errors.address && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.address}
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
                                    Souhaitez-vous être informés des événements
                                    ou projets du syndicat ?
                                </label>
                                <div className="flex gap-6">
                                    {[
                                        { label: 'Oui', value: true },
                                        { label: 'Non', value: false },
                                    ].map((option) => (
                                        <label
                                            key={option.label}
                                            className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                                        >
                                            <input
                                                type="radio"
                                                name="wants_events"
                                                checked={
                                                    data.wants_events ===
                                                    option.value
                                                }
                                                onChange={() =>
                                                    setData(
                                                        'wants_events',
                                                        option.value,
                                                    )
                                                }
                                                className="accent-sna-teal"
                                            />
                                            {option.label}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Souhaitez-vous participer aux événements ou
                                    projets du syndicat ?
                                </label>
                                <div className="flex gap-6">
                                    {[
                                        { label: 'Oui', value: true },
                                        { label: 'Non', value: false },
                                    ].map((option) => (
                                        <label
                                            key={option.label}
                                            className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                                        >
                                            <input
                                                type="radio"
                                                name="wants_participation"
                                                checked={
                                                    data.wants_participation ===
                                                    option.value
                                                }
                                                onChange={() =>
                                                    setData(
                                                        'wants_participation',
                                                        option.value,
                                                    )
                                                }
                                                className="accent-sna-teal"
                                            />
                                            {option.label}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <h2 className="text-sm font-bold tracking-wide text-sna-teal-dark uppercase">
                                C. Commentaire ou message libre
                            </h2>

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

                            <div className="space-y-4 border-t border-gray-100 pt-6">
                                <h2 className="text-sm font-bold tracking-wide text-sna-teal-dark uppercase">
                                    D. Cotisation et don
                                </h2>

                                <div className="rounded-2xl border border-sna-teal/20 bg-sna-teal/5 p-4">
                                    <p className="text-sm font-semibold text-gray-700">
                                        Cotisation minimale obligatoire: {baseFeeEuros.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-600">
                                        Vous pouvez ajouter un don libre si vous le souhaitez.
                                    </p>
                                </div>

                                <div>
                                    <label className={labelCls}>
                                        Don complementaire (facultatif)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        inputMode="decimal"
                                        value={data.don_amount}
                                        onChange={(e) =>
                                            setData('don_amount', e.target.value)
                                        }
                                        className={inputCls}
                                        placeholder="0.00"
                                    />
                                    {errors.don_amount && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.don_amount}
                                        </p>
                                    )}
                                </div>

                                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                                    <p className="text-xs text-gray-500">Total a payer</p>
                                    <p className="text-2xl font-bold text-sna-teal-dark">
                                        {totalEuros.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2 border-t border-gray-50 pt-4">
                                <h2 className="text-sm font-bold tracking-wide text-sna-teal-dark uppercase">
                                    E. Consentements
                                </h2>

                                <p className="text-xs text-gray-600">
                                    Autorisation de recevoir des informations
                                    par email :
                                </p>

                                <div className="flex gap-6">
                                    {[
                                        { label: 'Oui', value: true },
                                        { label: 'Non', value: false },
                                    ].map((option) => (
                                        <label
                                            key={option.label}
                                            className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                                        >
                                            <input
                                                type="radio"
                                                name="consents_email"
                                                checked={
                                                    data.consents_email ===
                                                    option.value
                                                }
                                                onChange={() =>
                                                    setData(
                                                        'consents_email',
                                                        option.value,
                                                    )
                                                }
                                                className="accent-sna-teal"
                                            />
                                            {option.label}
                                        </label>
                                    ))}
                                </div>

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
                                    personnelles selon le RGPD *
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
                                    ? 'Redirection vers le paiement...'
                                    : `Payer ${totalEuros.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} et envoyer ma demande`}
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
