import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { useState } from 'react';
import forms from '@/routes/forms';

/* ─────────────────────────────────────────────
   Step definitions
───────────────────────────────────────────── */
const ADHESION_STEPS = [
    { label: 'Identité', icon: '👤' },
    { label: 'Situation aidant(e)', icon: '🤝' },
    { label: 'Personne aidée', icon: '💛' },
    { label: 'Impacts', icon: '📊' },
    { label: 'Situation pro', icon: '💼' },
    { label: 'Expression & Soutien', icon: '💙' },
] as const;

/* ─────────────────────────────────────────────
   Navigation buttons (declared outside form)
───────────────────────────────────────────── */
function NavButtons({
    step,
    processing,
    isLastStep = false,
    onBack,
    onNext,
}: {
    step: number;
    processing: boolean;
    isLastStep?: boolean;
    onBack: () => void;
    onNext: () => void;
}) {
    return (
        <div className="mt-8 flex items-center justify-between gap-4">
            {step > 0 ? (
                <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 shadow-sm transition hover:border-sna-teal/50 hover:text-sna-teal"
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
                    Retour
                </button>
            ) : (
                <div />
            )}
            {isLastStep ? (
                <button
                    type="submit"
                    disabled={processing}
                    className="flex-1 rounded-full bg-sna-teal py-3 text-sm font-bold text-white shadow-xl shadow-sna-teal/30 transition-all hover:-translate-y-0.5 hover:bg-sna-teal-dark disabled:opacity-60 sm:flex-none sm:px-12"
                >
                    {processing ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Envoi en cours…
                        </span>
                    ) : (
                        '💙 Adhérer au SNA'
                    )}
                </button>
            ) : (
                <button
                    type="button"
                    onClick={onNext}
                    className="flex items-center gap-2 rounded-full bg-sna-teal px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-sna-teal/25 transition-all hover:-translate-y-0.5 hover:bg-sna-teal-dark"
                >
                    Suivant
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
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}

/* ─────────────────────────────────────────────
   Stepper
───────────────────────────────────────────── */
function AdhesionStepper({
    currentStep,
    totalSteps,
}: {
    currentStep: number;
    totalSteps: number;
}) {
    return (
        <div className="mb-8">
            {/* Mobile */}
            <div className="mb-3 flex items-center justify-between text-xs font-medium text-gray-500 sm:hidden">
                <span className="font-bold text-sna-teal">
                    Étape {currentStep + 1} sur {totalSteps}
                </span>
                <span>
                    {ADHESION_STEPS[currentStep].icon}{' '}
                    {ADHESION_STEPS[currentStep].label}
                </span>
            </div>
            <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-gray-100 sm:hidden">
                <div
                    className="h-full rounded-full bg-sna-teal transition-all duration-500"
                    style={{
                        width: `${((currentStep + 1) / totalSteps) * 100}%`,
                    }}
                />
            </div>

            {/* Desktop */}
            <div className="hidden sm:block">
                <div className="relative flex items-center">
                    <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-gray-200" />
                    <div
                        className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 bg-sna-teal transition-all duration-500"
                        style={{
                            width:
                                currentStep === 0
                                    ? '0%'
                                    : `${(currentStep / (ADHESION_STEPS.length - 1)) * 100}%`,
                        }}
                    />
                    {ADHESION_STEPS.map((_, idx) => {
                        const done = idx < currentStep;
                        const active = idx === currentStep;

                        return (
                            <div
                                key={idx}
                                className="relative z-10 flex flex-1 justify-center"
                            >
                                <div
                                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                                        done
                                            ? 'border-sna-teal bg-sna-teal text-white shadow-md shadow-sna-teal/30'
                                            : active
                                              ? 'border-sna-teal bg-white text-sna-teal shadow-lg ring-4 shadow-sna-teal/20 ring-sna-teal/15'
                                              : 'border-gray-200 bg-white text-gray-400'
                                    }`}
                                >
                                    {done ? '✓' : idx + 1}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-2 flex items-start">
                    {ADHESION_STEPS.map((s, idx) => (
                        <div
                            key={idx}
                            className={`flex-1 text-center text-[10px] font-medium transition-colors ${
                                idx === currentStep
                                    ? 'text-sna-teal'
                                    : idx < currentStep
                                      ? 'text-sna-teal/70'
                                      : 'text-gray-400'
                            }`}
                        >
                            <div className="mb-0.5">{s.icon}</div>
                            {s.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Main Form Component
───────────────────────────────────────────── */
function AdhesionForm() {
    const [step, setStep] = useState(0);
    const totalSteps = ADHESION_STEPS.length;

    const { data, setData, submit, processing, errors, wasSuccessful, reset } =
        useForm<{
            genre: string;
            nom: string;
            prenom: string;
            age: string;
            email: string;
            phone: string;
            departement: string;
            commune: string;
            aidant_type: string;
            situation_familiale: string;
            aide_tranche_age: string;
            aide_age: string;
            type_situation: string[];
            reconnaissance_administrative: string;
            aide_genre: string;
            scolarisation: string;
            situation_adulte: string;
            lieu_habitation: string;
            impacts: string[];
            situation_professionnelle: string;
            expression_libre: string;
            soutient_sna: boolean;
            wants_info: boolean;
            consents_rgpd: boolean;
        }>({
            genre: '',
            nom: '',
            prenom: '',
            age: '',
            email: '',
            phone: '',
            departement: '',
            commune: '',
            aidant_type: '',
            situation_familiale: '',
            aide_tranche_age: '',
            aide_age: '',
            type_situation: [],
            reconnaissance_administrative: '',
            aide_genre: '',
            scolarisation: '',
            situation_adulte: '',
            lieu_habitation: '',
            impacts: [],
            situation_professionnelle: '',
            expression_libre: '',
            soutient_sna: false,
            wants_info: false,
            consents_rgpd: false,
        });

    const toggle = (field: 'type_situation' | 'impacts', item: string) => {
        setData(
            field,
            data[field].includes(item)
                ? data[field].filter((v) => v !== item)
                : [...data[field], item],
        );
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        submit(forms.adhesion.store(), { onSuccess: () => reset() });
    };

    const goNext = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
    const goBack = () => setStep((s) => Math.max(s - 1, 0));

    const inputCls =
        'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/30 focus:outline-none placeholder:text-gray-300';
    const labelCls = 'mb-1.5 block text-sm font-semibold text-gray-700';
    const sectionTitleCls =
        'flex items-center gap-3 text-base font-bold text-sna-teal-dark border-b border-sna-teal/20 pb-3 mb-6';

    if (wasSuccessful) {
        return (
            <div className="space-y-4 rounded-3xl border border-sna-teal/30 bg-sna-teal-light p-12 text-center shadow-lg">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sna-teal/10 text-4xl">
                    💙
                </div>
                <h2 className="text-2xl font-bold text-sna-teal-dark">
                    Adhésion enregistrée !
                </h2>
                <p className="text-gray-500">
                    Merci de rejoindre le Syndicat National des Aidants. Votre
                    voix compte.
                </p>
                <Link
                    href="/"
                    className="mt-2 inline-block rounded-full border border-sna-teal/30 px-6 py-2.5 text-sm font-semibold text-sna-teal transition hover:bg-sna-teal hover:text-white"
                >
                    ← Retour à l'accueil
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <AdhesionStepper currentStep={step} totalSteps={totalSteps} />

            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                {/* ── Étape 1: Identité ── */}
                {step === 0 && (
                    <div className="space-y-6">
                        <h3 className={sectionTitleCls}>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sna-teal text-sm text-white">
                                1
                            </span>
                            Votre identité
                        </h3>

                        <div>
                            <label className={labelCls}>Genre</label>
                            <div className="flex flex-wrap gap-4">
                                {[
                                    { value: 'homme', label: 'Homme' },
                                    { value: 'femme', label: 'Femme' },
                                    {
                                        value: 'non_renseigne',
                                        label: 'Ne souhaite pas répondre',
                                    },
                                ].map((opt) => (
                                    <label
                                        key={opt.value}
                                        className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                                    >
                                        <input
                                            type="radio"
                                            name="genre"
                                            value={opt.value}
                                            checked={data.genre === opt.value}
                                            onChange={() =>
                                                setData('genre', opt.value)
                                            }
                                            className="accent-sna-teal"
                                        />
                                        {opt.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className={labelCls}>Nom *</label>
                                <input
                                    type="text"
                                    value={data.nom}
                                    onChange={(e) =>
                                        setData('nom', e.target.value)
                                    }
                                    className={inputCls}
                                    placeholder="Dupont"
                                />
                                {errors.nom && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.nom}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className={labelCls}>Prénom *</label>
                                <input
                                    type="text"
                                    value={data.prenom}
                                    onChange={(e) =>
                                        setData('prenom', e.target.value)
                                    }
                                    className={inputCls}
                                    placeholder="Marie"
                                />
                                {errors.prenom && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.prenom}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className={labelCls}>Âge</label>
                                <input
                                    type="text"
                                    value={data.age}
                                    onChange={(e) =>
                                        setData('age', e.target.value)
                                    }
                                    className={inputCls}
                                    placeholder="42"
                                />
                            </div>
                            <div>
                                <label className={labelCls}>
                                    Département *
                                </label>
                                <input
                                    type="text"
                                    value={data.departement}
                                    onChange={(e) =>
                                        setData('departement', e.target.value)
                                    }
                                    className={inputCls}
                                    placeholder="75 – Paris"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className={labelCls}>
                                    Adresse e-mail *
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
                                <label className={labelCls}>Téléphone</label>
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
                            <label className={labelCls}>
                                Commune (facultatif)
                            </label>
                            <input
                                type="text"
                                value={data.commune}
                                onChange={(e) =>
                                    setData('commune', e.target.value)
                                }
                                className={inputCls}
                                placeholder="Paris 15e"
                            />
                        </div>

                        <NavButtons
                            step={step}
                            processing={processing}
                            onBack={goBack}
                            onNext={goNext}
                        />
                    </div>
                )}

                {/* ── Étape 2: Situation d'aidant ── */}
                {step === 1 && (
                    <div className="space-y-6">
                        <h3 className={sectionTitleCls}>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sna-teal text-sm text-white">
                                2
                            </span>
                            Votre situation d'aidant(e)
                        </h3>

                        <div>
                            <label className={labelCls}>Vous êtes… *</label>
                            <div className="space-y-2">
                                {[
                                    {
                                        value: 'parent_handicap',
                                        label: "Parent d'un enfant en situation de handicap ou de maladie",
                                    },
                                    {
                                        value: 'conjoint',
                                        label: "Aidant(e) d'un conjoint / partenaire",
                                    },
                                    {
                                        value: 'parent_aine',
                                        label: "Aidant(e) d'un parent âgé",
                                    },
                                    {
                                        value: 'proche',
                                        label: "Aidant(e) d'un proche (frère, sœur, autre)",
                                    },
                                    { value: 'autre', label: 'Autre' },
                                ].map((opt) => (
                                    <label
                                        key={opt.value}
                                        className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
                                    >
                                        <input
                                            type="radio"
                                            name="aidant_type"
                                            value={opt.value}
                                            checked={
                                                data.aidant_type === opt.value
                                            }
                                            onChange={() =>
                                                setData(
                                                    'aidant_type',
                                                    opt.value,
                                                )
                                            }
                                            className="accent-sna-teal"
                                        />
                                        {opt.label}
                                    </label>
                                ))}
                            </div>
                            {errors.aidant_type && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.aidant_type}
                                </p>
                            )}
                        </div>

                        {data.aidant_type === 'parent_handicap' && (
                            <div>
                                <label className={labelCls}>
                                    Situation familiale avec l'autre parent
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        {
                                            value: 'en_couple',
                                            label: 'En couple',
                                        },
                                        { value: 'separe', label: 'Séparé(e)' },
                                        {
                                            value: 'divorce',
                                            label: 'Divorcé(e)',
                                        },
                                        { value: 'veuf', label: 'Veuf(ve)' },
                                        { value: 'autre', label: 'Autre' },
                                    ].map((opt) => (
                                        <label
                                            key={opt.value}
                                            className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                                        >
                                            <input
                                                type="radio"
                                                name="situation_familiale"
                                                value={opt.value}
                                                checked={
                                                    data.situation_familiale ===
                                                    opt.value
                                                }
                                                onChange={() =>
                                                    setData(
                                                        'situation_familiale',
                                                        opt.value,
                                                    )
                                                }
                                                className="accent-sna-teal"
                                            />
                                            {opt.label}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className={labelCls}>
                                    Tranche d'âge de la personne aidée
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        {
                                            value: 'moins_18',
                                            label: '< 18 ans',
                                        },
                                        {
                                            value: '18_65',
                                            label: '18 – 65 ans',
                                        },
                                        { value: 'plus_65', label: '> 65 ans' },
                                    ].map((opt) => (
                                        <label
                                            key={opt.value}
                                            className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                                        >
                                            <input
                                                type="radio"
                                                name="aide_tranche_age"
                                                value={opt.value}
                                                checked={
                                                    data.aide_tranche_age ===
                                                    opt.value
                                                }
                                                onChange={() =>
                                                    setData(
                                                        'aide_tranche_age',
                                                        opt.value,
                                                    )
                                                }
                                                className="accent-sna-teal"
                                            />
                                            {opt.label}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className={labelCls}>
                                    Âge exact de la personne aidée
                                </label>
                                <input
                                    type="text"
                                    value={data.aide_age}
                                    onChange={(e) =>
                                        setData('aide_age', e.target.value)
                                    }
                                    className={inputCls}
                                    placeholder="8"
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelCls}>
                                Type de situation
                            </label>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                {[
                                    'Handicap moteur',
                                    'Handicap intellectuel',
                                    'Handicap visuel',
                                    'Handicap auditif',
                                    'Handicap psychique',
                                    'Polyhandicap',
                                    'Troubles du neurodéveloppement (TSA, TDAH, DYS…)',
                                    'Maladie chronique',
                                    "Perte d'autonomie",
                                    'Autre',
                                ].map((item) => (
                                    <label
                                        key={item}
                                        className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs text-gray-600 transition hover:border-sna-teal/50 hover:bg-sna-teal/5"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={data.type_situation.includes(
                                                item,
                                            )}
                                            onChange={() =>
                                                toggle('type_situation', item)
                                            }
                                            className="h-4 w-4 rounded accent-sna-teal"
                                        />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className={labelCls}>
                                Reconnaissance administrative
                            </label>
                            <select
                                value={data.reconnaissance_administrative}
                                onChange={(e) =>
                                    setData(
                                        'reconnaissance_administrative',
                                        e.target.value,
                                    )
                                }
                                className={inputCls}
                            >
                                <option value="">Sélectionner…</option>
                                <option value="dossier_mdph_en_cours">
                                    Dossier MDPH en cours
                                </option>
                                <option value="droits_mdph_ouverts">
                                    Droits MDPH ouverts
                                </option>
                                <option value="refus_rupture_droits">
                                    Refus ou rupture de droits
                                </option>
                                <option value="absence_reconnaissance">
                                    Absence de reconnaissance
                                </option>
                                <option value="desaccord_mdph">
                                    Désaccord en cours avec la MDPH (recours,
                                    contestation…)
                                </option>
                            </select>
                        </div>

                        <NavButtons
                            step={step}
                            processing={processing}
                            onBack={goBack}
                            onNext={goNext}
                        />
                    </div>
                )}

                {/* ── Étape 3: Personne aidée ── */}
                {step === 2 && (
                    <div className="space-y-6">
                        <h3 className={sectionTitleCls}>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sna-teal text-sm text-white">
                                3
                            </span>
                            Informations sur la personne aidée principale
                        </h3>

                        <div>
                            <label className={labelCls}>Genre</label>
                            <div className="flex flex-wrap gap-4">
                                {[
                                    { value: 'homme', label: 'Homme' },
                                    { value: 'femme', label: 'Femme' },
                                    {
                                        value: 'non_renseigne',
                                        label: 'Ne souhaite pas répondre',
                                    },
                                ].map((opt) => (
                                    <label
                                        key={opt.value}
                                        className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                                    >
                                        <input
                                            type="radio"
                                            name="aide_genre"
                                            value={opt.value}
                                            checked={
                                                data.aide_genre === opt.value
                                            }
                                            onChange={() =>
                                                setData('aide_genre', opt.value)
                                            }
                                            className="accent-sna-teal"
                                        />
                                        {opt.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {data.aide_tranche_age === 'moins_18' && (
                            <div>
                                <label className={labelCls}>
                                    Scolarisation (si enfant)
                                </label>
                                <select
                                    value={data.scolarisation}
                                    onChange={(e) =>
                                        setData('scolarisation', e.target.value)
                                    }
                                    className={inputCls}
                                >
                                    <option value="">Sélectionner…</option>
                                    {[
                                        'Ordinaire',
                                        'ULIS',
                                        'IME',
                                        'ITEP',
                                        'Déscolarisé',
                                        'Autre',
                                    ].map((v) => (
                                        <option key={v} value={v.toLowerCase()}>
                                            {v}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {data.aide_tranche_age !== 'moins_18' &&
                            data.aide_tranche_age !== '' && (
                                <div>
                                    <label className={labelCls}>
                                        Situation (si adulte)
                                    </label>
                                    <select
                                        value={data.situation_adulte}
                                        onChange={(e) =>
                                            setData(
                                                'situation_adulte',
                                                e.target.value,
                                            )
                                        }
                                        className={inputCls}
                                    >
                                        <option value="">Sélectionner…</option>
                                        {[
                                            { v: 'esat', l: 'Travail en ESAT' },
                                            {
                                                v: 'milieu_ordinaire',
                                                l: 'Travail en milieu ordinaire',
                                            },
                                            { v: 'samsah', l: 'SAMSAH' },
                                            {
                                                v: 'foyer_vie',
                                                l: 'Foyer de vie',
                                            },
                                            {
                                                v: 'insertion',
                                                l: 'Parcours insertion',
                                            },
                                            {
                                                v: 'domicile_sans_structure',
                                                l: 'À domicile sans structure',
                                            },
                                            { v: 'autre', l: 'Autre' },
                                        ].map((o) => (
                                            <option key={o.v} value={o.v}>
                                                {o.l}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                        <div>
                            <label className={labelCls}>
                                Lieu d'habitation de la personne aidée
                            </label>
                            <select
                                value={data.lieu_habitation}
                                onChange={(e) =>
                                    setData('lieu_habitation', e.target.value)
                                }
                                className={inputCls}
                            >
                                <option value="">Sélectionner…</option>
                                {[
                                    {
                                        v: 'domicile_familial',
                                        l: 'Domicile familial',
                                    },
                                    { v: 'fas_mas_fam', l: 'FAS / MAS / FAM' },
                                    {
                                        v: 'foyer_hebergement',
                                        l: "Foyer d'hébergement",
                                    },
                                    {
                                        v: 'domicile_personnel',
                                        l: 'À son domicile personnel',
                                    },
                                    {
                                        v: 'residence_autonomie',
                                        l: 'Résidence autonomie',
                                    },
                                    { v: 'autre', l: 'Autre' },
                                ].map((o) => (
                                    <option key={o.v} value={o.v}>
                                        {o.l}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <NavButtons
                            step={step}
                            processing={processing}
                            onBack={goBack}
                            onNext={goNext}
                        />
                    </div>
                )}

                {/* ── Étape 4: Impacts ── */}
                {step === 3 && (
                    <div className="space-y-6">
                        <h3 className={sectionTitleCls}>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sna-teal text-sm text-white">
                                4
                            </span>
                            Impact de votre rôle d'aidant(e)
                        </h3>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                "Réduction ou arrêt d'activité professionnelle",
                                "Refus d'embauche ou frein à l'emploi",
                                'Difficultés financières',
                                'Dépendance financière',
                                'Perte de droits sociaux ou à la retraite',
                                'Difficultés avec un employeur',
                                'Épuisement physique',
                                'Épuisement psychique',
                                'Renoncement aux soins personnels',
                                'Démarches administratives lourdes',
                                'Dettes ou reste à charge important',
                                'Isolement social',
                                'Autre',
                            ].map((item) => (
                                <label
                                    key={item}
                                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs text-gray-600 transition hover:border-sna-teal/50 hover:bg-sna-teal/5"
                                >
                                    <input
                                        type="checkbox"
                                        checked={data.impacts.includes(item)}
                                        onChange={() => toggle('impacts', item)}
                                        className="h-4 w-4 rounded accent-sna-teal"
                                    />
                                    {item}
                                </label>
                            ))}
                        </div>

                        <NavButtons
                            step={step}
                            processing={processing}
                            onBack={goBack}
                            onNext={goNext}
                        />
                    </div>
                )}

                {/* ── Étape 5: Situation professionnelle ── */}
                {step === 4 && (
                    <div className="space-y-6">
                        <h3 className={sectionTitleCls}>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sna-teal text-sm text-white">
                                5
                            </span>
                            Votre situation professionnelle actuelle
                        </h3>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                { v: 'cdi_temps_plein', l: 'CDI temps plein' },
                                {
                                    v: 'cdi_temps_partiel',
                                    l: 'CDI temps partiel',
                                },
                                { v: 'cdd_interim', l: 'CDD / Intérim' },
                                {
                                    v: 'independant',
                                    l: 'Travailleur(se) indépendant(e)',
                                },
                                { v: 'sans_emploi', l: 'Sans emploi' },
                                {
                                    v: 'conge_proche_aidant',
                                    l: 'Congé proche aidant / AJPP',
                                },
                                {
                                    v: 'arret_maladie',
                                    l: 'Arrêt maladie longue durée',
                                },
                                {
                                    v: 'cessation_activite',
                                    l: "Cessation d'activité pour s'occuper de son proche",
                                },
                            ].map((opt) => (
                                <label
                                    key={opt.v}
                                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs text-gray-600 transition hover:border-sna-teal/50 hover:bg-sna-teal/5"
                                >
                                    <input
                                        type="radio"
                                        name="situation_professionnelle"
                                        value={opt.v}
                                        checked={
                                            data.situation_professionnelle ===
                                            opt.v
                                        }
                                        onChange={() =>
                                            setData(
                                                'situation_professionnelle',
                                                opt.v,
                                            )
                                        }
                                        className="accent-sna-teal"
                                    />
                                    {opt.l}
                                </label>
                            ))}
                        </div>

                        <NavButtons
                            step={step}
                            processing={processing}
                            onBack={goBack}
                            onNext={goNext}
                        />
                    </div>
                )}

                {/* ── Étape 6: Expression libre + Soutien SNA ── */}
                {step === 5 && (
                    <div className="space-y-6">
                        <h3 className={sectionTitleCls}>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sna-teal text-sm text-white">
                                6
                            </span>
                            Expression libre{' '}
                            <span className="ml-1 text-sm font-normal text-gray-400">
                                (facultatif)
                            </span>
                        </h3>
                        <p className="text-sm text-gray-500 italic">
                            En quelques mots, si vous le souhaitez :{' '}
                            <em>Être aidant(e), pour moi, c'est…</em>
                        </p>
                        <textarea
                            rows={4}
                            value={data.expression_libre}
                            onChange={(e) =>
                                setData('expression_libre', e.target.value)
                            }
                            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition placeholder:text-gray-300 focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/30 focus:outline-none"
                            placeholder="Partagez librement votre vécu…"
                        />

                        <div className="space-y-4 rounded-2xl border border-sna-teal/20 bg-sna-teal-light p-6">
                            <h4 className="flex items-center gap-2 border-b border-sna-teal/20 pb-2 text-sm font-bold text-sna-teal-dark">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sna-teal text-[10px] font-bold text-white">
                                    7
                                </span>
                                Votre soutien au Syndicat National des Aidants
                            </h4>

                            <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={data.soutient_sna}
                                    onChange={(e) =>
                                        setData(
                                            'soutient_sna',
                                            e.target.checked,
                                        )
                                    }
                                    className="mt-0.5 h-4 w-4 rounded accent-sna-teal"
                                />
                                Je soutiens la création du Syndicat National des
                                Aidants (SNA)
                            </label>
                            <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={data.wants_info}
                                    onChange={(e) =>
                                        setData('wants_info', e.target.checked)
                                    }
                                    className="mt-0.5 h-4 w-4 rounded accent-sna-teal"
                                />
                                J'accepte d'être informé(e) des actions
                                nationales
                            </label>

                            <p className="rounded-xl bg-white/60 p-3 text-xs leading-relaxed text-gray-500">
                                🔒 Les informations recueillies ne sont ni
                                revendues ni transmises. Elles sont utilisées
                                uniquement à des fins collectives et
                                statistiques, dans le respect du RGPD.
                            </p>

                            <label className="flex cursor-pointer items-start gap-3 text-xs text-gray-600">
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
                                <p className="text-xs text-red-600">
                                    {errors.consents_rgpd}
                                </p>
                            )}

                            <p className="text-center text-xs text-gray-400">
                                Code promo membres :{' '}
                                <span className="font-bold text-sna-teal">
                                    AIDANT2026
                                </span>{' '}
                                (réduction de 20 €)
                            </p>
                        </div>

                        <NavButtons
                            step={step}
                            processing={processing}
                            isLastStep
                            onBack={goBack}
                            onNext={goNext}
                        />
                    </div>
                )}
            </div>
        </form>
    );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function AdhesionPage() {
    return (
        <>
            <Head title="Adhésion – Syndicat National des Aidants">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-linear-to-br from-[#e8f8f8] via-white to-[#f0f9e8] font-sans">
                {/* Header */}
                <header className="border-b border-sna-teal/10 bg-white/80 backdrop-blur-md">
                    <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
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

                    <div className="relative mx-auto max-w-3xl px-6 pt-12 pb-10 text-center">
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-sna-teal/10 px-4 py-1.5 text-sm font-semibold text-sna-teal-dark">
                            💙 Rejoindre le mouvement
                        </span>
                        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl">
                            Formulaire d'adhésion
                        </h1>
                        <p className="mt-4 text-lg leading-relaxed text-gray-500">
                            Rejoignez le Syndicat National des Aidants et faites
                            entendre votre voix. Votre adhésion renforce notre
                            action collective.
                        </p>

                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            {[
                                { icon: '🔒', label: 'Données protégées' },
                                {
                                    icon: '✉️',
                                    label: 'Accès à vos soumissions',
                                },
                                { icon: '🤝', label: 'Communauté nationale' },
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
                <div className="mx-auto max-w-3xl px-6 pb-20">
                    <AdhesionForm />

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
