import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { useState } from 'react';
import PublicSiteHeader from '@/components/public-site-header';
import forms from '@/routes/forms';

export default function PartenairePage() {
    const [fileNames, setFileNames] = useState<string[]>([]);

    const { data, setData, submit, processing, errors, wasSuccessful, reset } =
        useForm({
            organisation_name: '',
            legal_status: '',
            address: '',
            phone: '',
            email: '',
            contact_name: '',
            partnership_moral: false,
            partnership_moral_details: '',
            partnership_technical: false,
            partnership_technical_details: '',
            partnership_financial: false,
            objectives: '',
            comment_libre: '',
            commitment_projects: false,
            commitment_communication: false,
            commitment_expertise: false,
            attachments: [] as File[],
            consents_email: false,
            consents_rgpd: false,
        });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        submit(forms.partenaire.store(), {
            onSuccess: () => {
                reset();
                setFileNames([]);
            },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files || []);
        if (newFiles.length === 0) {
            return;
        }

        const mergedFiles = [...data.attachments, ...newFiles];
        setData('attachments', mergedFiles);
        setFileNames(mergedFiles.map((file) => file.name));

        // Reset input so selecting the same file again still triggers onChange.
        e.target.value = '';
    };

    const removeAttachment = (index: number) => {
        const newAttachments = data.attachments.filter((_, i) => i !== index);
        setData('attachments', newAttachments);
        setFileNames(fileNames.filter((_, i) => i !== index));
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
                <PublicSiteHeader />

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
                            <div className="space-y-3 rounded-2xl border border-green-200 bg-white p-5 text-left shadow-sm">
                                <p className="text-sm leading-6 text-gray-700">
                                    Pour prolonger votre engagement et rendre visible la cause des aidants au quotidien,
                                    découvrez également notre boutique dédiée : chaque produit que vous portez ou partagez
                                    contribue à briser l'invisibilité des aidants et à faire reconnaître leur rôle
                                    essentiel.
                                </p>
                                <a
                                    href="https://boutique.syndicat-national-aidants.fr/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                                >
                                    Découvrir la boutique
                                </a>
                            </div>
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
                            {/* Section A: Organization Info */}
                            <div className="space-y-4">
                                <h3 className="text-base font-bold text-gray-800">
                                    A. Informations de l'organisation
                                </h3>
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
                                            <option value="">
                                                Sélectionner…
                                            </option>
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
                                        placeholder="123 Rue de la Paix, 75000 Paris"
                                    />
                                    {errors.address && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className={labelCls}>
                                            Email *
                                        </label>
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
                                            Téléphone
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData('phone', e.target.value)
                                            }
                                            className={inputCls}
                                            placeholder="01 23 45 67 89"
                                        />
                                        {errors.phone && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className={labelCls}>
                                        Nom et fonction du contact référent *
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

                            {/* Section B: Partnership Type */}
                            <div className="space-y-4 border-t border-gray-200 pt-6">
                                <h3 className="text-base font-bold text-gray-800">
                                    B. Type de partenariat / accompagnement
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                                            <input
                                                type="checkbox"
                                                checked={data.partnership_moral}
                                                onChange={(e) =>
                                                    setData(
                                                        'partnership_moral',
                                                        e.target.checked,
                                                    )
                                                }
                                                className="h-4 w-4 rounded"
                                                style={{
                                                    accentColor:
                                                        'var(--color-sna-green)',
                                                }}
                                            />
                                            Soutien moral ou promotionnel (ex.
                                            visibilité, communication)
                                        </label>
                                        {data.partnership_moral && (
                                            <div className="mt-2 ml-7">
                                                <textarea
                                                    rows={2}
                                                    value={
                                                        data.partnership_moral_details
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            'partnership_moral_details',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition placeholder:text-gray-300 focus:border-sna-green focus:ring-2 focus:ring-sna-green/30 focus:outline-none"
                                                    placeholder="Précisez le type de soutien..."
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    data.partnership_technical
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        'partnership_technical',
                                                        e.target.checked,
                                                    )
                                                }
                                                className="h-4 w-4 rounded"
                                                style={{
                                                    accentColor:
                                                        'var(--color-sna-green)',
                                                }}
                                            />
                                            Soutien technique ou expertise (ex.
                                            appui sur projets, conseil
                                            stratégique)
                                        </label>
                                        {data.partnership_technical && (
                                            <div className="mt-2 ml-7">
                                                <textarea
                                                    rows={2}
                                                    value={
                                                        data.partnership_technical_details
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            'partnership_technical_details',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition placeholder:text-gray-300 focus:border-sna-green focus:ring-2 focus:ring-sna-green/30 focus:outline-none"
                                                    placeholder="Précisez le type d'expertise..."
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    data.partnership_financial
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        'partnership_financial',
                                                        e.target.checked,
                                                    )
                                                }
                                                className="h-4 w-4 rounded"
                                                style={{
                                                    accentColor:
                                                        'var(--color-sna-green)',
                                                }}
                                            />
                                            Soutien financier
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Section C: Objectives */}
                            <div className="space-y-4 border-t border-gray-200 pt-6">
                                <h3 className="text-base font-bold text-gray-800">
                                    C. Objectifs et motivations
                                </h3>
                                <div>
                                    <label className={labelCls}>
                                        Veuillez préciser l'objet de votre
                                        partenariat et les objectifs que vous
                                        souhaitez atteindre avec le syndicat *
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={data.objectives}
                                        onChange={(e) =>
                                            setData(
                                                'objectives',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition placeholder:text-gray-300 focus:border-sna-green focus:ring-2 focus:ring-sna-green/30 focus:outline-none"
                                        placeholder="Décrivez vos objectifs..."
                                    />
                                    {errors.objectives && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.objectives}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Section D: Commitments */}
                            <div className="space-y-4 border-t border-gray-200 pt-6">
                                <h3 className="text-base font-bold text-gray-800">
                                    D. Engagements possibles
                                </h3>
                                <div className="space-y-2">
                                    {[
                                        {
                                            key: 'commitment_projects' as const,
                                            label: 'Participation aux projets et événements du syndicat',
                                        },
                                        {
                                            key: 'commitment_communication' as const,
                                            label: 'Communication et promotion des actions du syndicat',
                                        },
                                        {
                                            key: 'commitment_expertise' as const,
                                            label: "Apport d'expertise ou de services",
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

                            {/* Section E: Attachments */}
                            <div className="space-y-4 border-t border-gray-200 pt-6">
                                <h3 className="text-base font-bold text-gray-800">
                                    E. Pièces jointes (optionnel)
                                </h3>
                                <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                                    <input
                                        type="file"
                                        multiple
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="cursor-pointer"
                                    >
                                        <div className="mb-2 text-3xl">📄</div>
                                        <p className="text-sm font-semibold text-gray-700">
                                            Cliquez pour ajouter des fichiers
                                            PDF
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500">
                                            Statuts, documents officiels,
                                            présentation...
                                        </p>
                                    </label>
                                </div>

                                {fileNames.length > 0 && (
                                    <div className="space-y-2">
                                        <p className="text-sm font-semibold text-gray-700">
                                            Fichiers sélectionnés :
                                        </p>
                                        <ul className="space-y-2">
                                            {fileNames.map((name, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-2 text-sm"
                                                >
                                                    <span className="flex items-center gap-2 text-gray-700">
                                                        📄 {name}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeAttachment(
                                                                index,
                                                            )
                                                        }
                                                        className="text-xs font-semibold text-red-600 hover:text-red-700"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {errors.attachments && (
                                    <p className="text-xs text-red-500">
                                        {errors.attachments as string}
                                    </p>
                                )}
                            </div>

                            {/* Section F: Free Comments */}
                            <div className="space-y-4 border-t border-gray-200 pt-6">
                                <h3 className="text-base font-bold text-gray-800">
                                    F. Commentaire libre (optionnel)
                                </h3>
                                <textarea
                                    rows={3}
                                    value={data.comment_libre}
                                    onChange={(e) =>
                                        setData('comment_libre', e.target.value)
                                    }
                                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition placeholder:text-gray-300 focus:border-sna-green focus:ring-2 focus:ring-sna-green/30 focus:outline-none"
                                    placeholder="Ajoutez tout commentaire supplémentaire..."
                                />
                            </div>

                            {/* Section G: Consents */}
                            <div className="space-y-3 border-t border-gray-200 pt-6">
                                <h3 className="text-base font-bold text-gray-800">
                                    G. Consentements
                                </h3>
                                <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-600">
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
                                    Autorisation de recevoir des informations
                                    par email
                                </label>
                                <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-600">
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
                                    Consentement au traitement des données
                                    personnelles selon la RGPD *
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
