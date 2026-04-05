import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import PublicSiteHeader from '@/components/public-site-header';
import forms from '@/routes/forms';

const profiles = [
    { label: 'Aidant(e)', value: 'aidant' },
    { label: 'Professionnel(le)', value: 'professionnel' },
    { label: 'Institution', value: 'institution' },
    { label: 'Étudiant(e) / chercheur(se)', value: 'etudiant' },
    { label: 'Journaliste', value: 'journaliste' },
    { label: 'Autre', value: 'autre' },
];
const contactPrefs = [
    { label: 'Oui par email', value: 'email' },
    { label: 'Oui par téléphone', value: 'phone' },
    { label: 'Non, message informatif uniquement', value: 'none' },
];

export default function ContactForm() {
    const { data, setData, submit, processing, errors, wasSuccessful, reset } =
        useForm({
            name: '',
            city: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            profile: '',
            contact_preference: '',
        });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        submit(forms.contact.store(), { onSuccess: () => reset() });
    };

    const inputCls =
        'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/30 focus:outline-none placeholder:text-gray-300';
    const labelCls = 'mb-1.5 block text-sm font-semibold text-gray-700';

    return (
        <>
            <Head title="Contact – Syndicat National des Aidants">
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
                            📬 Formulaire de contact
                        </span>
                        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl">
                            Nous contacter
                        </h1>
                        <div className="mt-5 space-y-3 text-left text-sm leading-relaxed text-gray-600 sm:text-base">
                            <p>Vous avez une question ?</p>
                            <p>Besoin d’une information ?</p>
                            <p>
                                Vous souhaitez nous faire remonter une
                                problématique&nbsp;?
                            </p>
                            <p>Vous souhaitez proposer une collaboration ?</p>
                            <p className="mt-2 font-semibold text-sna-teal-dark">
                                Le Syndicat National des Aidants est à votre
                                écoute.
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
                                Message envoyé !
                            </h2>
                            <p className="text-teal-700">
                                Votre message a bien été transmis. Merci pour
                                votre prise de contact.
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
                            <h2 className="text-sm font-bold tracking-wide text-sna-teal-dark uppercase">
                                Objet de votre demande
                            </h2>
                            <div>
                                <label className={labelCls}>Objet *</label>
                                <input
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) =>
                                        setData('subject', e.target.value)
                                    }
                                    className={inputCls}
                                    placeholder="Ex: Demande d'information, proposition, etc."
                                />
                                {errors.subject && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.subject}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className={labelCls}>
                                    Votre message *
                                </label>
                                <textarea
                                    rows={4}
                                    value={data.message}
                                    onChange={(e) =>
                                        setData('message', e.target.value)
                                    }
                                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition placeholder:text-gray-300 focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/30 focus:outline-none"
                                    placeholder="Décrivez votre demande, question ou proposition…"
                                />
                                {errors.message && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            <h2 className="text-sm font-bold tracking-wide text-sna-teal-dark uppercase">
                                Vos coordonnées
                            </h2>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className={labelCls}>
                                        Nom / Prénom *
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
                                    <label className={labelCls}>Ville *</label>
                                    <input
                                        type="text"
                                        value={data.city}
                                        onChange={(e) =>
                                            setData('city', e.target.value)
                                        }
                                        className={inputCls}
                                        placeholder="Paris"
                                    />
                                    {errors.city && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.city}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className={labelCls}>
                                        Adresse email *
                                    </label>
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
                                        Téléphone (facultatif)
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
                                    {errors.phone && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <h2 className="text-sm font-bold tracking-wide text-sna-teal-dark uppercase">
                                Vous êtes
                            </h2>
                            <div className="flex flex-wrap gap-4">
                                {profiles.map((option) => (
                                    <label
                                        key={option.value}
                                        className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                                    >
                                        <input
                                            type="radio"
                                            name="profile"
                                            checked={
                                                data.profile === option.value
                                            }
                                            onChange={() =>
                                                setData('profile', option.value)
                                            }
                                            className="accent-sna-teal"
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                            {errors.profile && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.profile}
                                </p>
                            )}

                            <h2 className="text-sm font-bold tracking-wide text-sna-teal-dark uppercase">
                                Souhaitez-vous être recontacté(e) ?
                            </h2>
                            <div className="flex flex-wrap gap-4">
                                {contactPrefs.map((option) => (
                                    <label
                                        key={option.value}
                                        className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                                    >
                                        <input
                                            type="radio"
                                            name="contact_preference"
                                            checked={
                                                data.contact_preference ===
                                                option.value
                                            }
                                            onChange={() =>
                                                setData(
                                                    'contact_preference',
                                                    option.value,
                                                )
                                            }
                                            className="accent-sna-teal"
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                            {errors.contact_preference && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.contact_preference}
                                </p>
                            )}

                            <div className="space-y-2 border-t border-gray-50 pt-4">
                                <h2 className="text-sm font-bold tracking-wide text-sna-teal-dark uppercase">
                                    Mention légale
                                </h2>
                                <div className="space-y-1 text-xs text-gray-600">
                                    <p>
                                        Les informations recueillies sont
                                        utilisées exclusivement dans le cadre
                                        des activités du Syndicat National des
                                        Aidants.
                                    </p>
                                    <p>Elles ne sont ni cédées ni vendues.</p>
                                    <p>
                                        Vous pouvez exercer votre droit d’accès,
                                        de rectification ou de suppression à
                                        tout moment.
                                    </p>
                                    <p>
                                        Nous ne pouvons pas toujours répondre
                                        immédiatement aux situations urgentes.
                                        <br />
                                        En cas d’urgence sociale ou médicale,
                                        contactez les services compétents.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-full bg-sna-teal py-3.5 text-sm font-bold text-white shadow-lg shadow-sna-teal/20 transition-all hover:-translate-y-0.5 hover:bg-sna-teal-dark disabled:opacity-60"
                            >
                                {processing
                                    ? 'Envoi en cours…'
                                    : 'Envoyer mon message'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}
