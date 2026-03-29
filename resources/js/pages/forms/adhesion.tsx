import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { useState } from 'react';
import forms from '@/routes/forms';

type AidantData = {
    genre: string;
    nom: string;
    prenom: string;
    age: string;
    email: string;
    phone: string;
    departement: string;
    commune: string;
    aidant_type: string;
    aidant_type_autre_precisions: string;
    situation_familiale: string;
    situation_familiale_autre_precisions: string;
};

type AideData = {
    aide_genre: string;
    aide_profile: string;
    scolarisation: string;
    scolarisation_autre_precisions: string;
    situation_adulte: string;
    situation_adulte_autre_precisions: string;
    lieu_habitation: string;
    lieu_habitation_autre_precisions: string;
};

type AdhesionFormData = {
    aidants: AidantData[];
    aides: AideData[];
    aide_tranche_age: string;
    aide_age: string;
    type_situation: string[];
    type_situation_autre_precisions: string;
    reconnaissance_administrative: string;
    aide_genre: string;
    scolarisation: string;
    scolarisation_autre_precisions: string;
    situation_adulte: string;
    situation_adulte_autre_precisions: string;
    lieu_habitation: string;
    lieu_habitation_autre_precisions: string;
    impacts: string[];
    impacts_autre_precisions: string;
    situation_professionnelle: string;
    expression_libre: string;
    soutient_sna: boolean;
    wants_info: boolean;
    declaration_honneur: boolean;
    consents_rgpd: boolean;
    don_amount: string;
};

const ADHESION_STEPS = [
    { label: 'Aidants', icon: '👤' },
    { label: 'Situation', icon: '🤝' },
    { label: 'Personne aidée', icon: '💛' },
    { label: 'Impacts', icon: '📊' },
    { label: 'Situation pro', icon: '💼' },
    { label: 'Soutien', icon: '💙' },
] as const;

const TYPE_SITUATION_OPTIONS = [
    'Handicap moteur',
    'Handicap intellectuel',
    'Handicap visuel',
    'Handicap auditif',
    'Handicap psychique',
    'Polyhandicap',
    'Troubles du neurodeveloppement (TSA, TDAH, DYS...)',
    'Maladie chronique',
    "Perte d'autonomie",
    'Autre',
];

const IMPACT_OPTIONS = [
    "Reduction ou arret d'activite professionnelle",
    "Refus d'embauche ou frein a l'emploi",
    'Difficultes financieres',
    'Dependance financiere',
    'Perte de droits sociaux ou a la retraite',
    'Difficultes avec un employeur',
    'Epuisement physique',
    'Epuisement psychique',
    'Renoncement aux soins personnels',
    'Demarches administratives lourdes',
    'Dettes ou reste a charge important',
    'Isolement social',
    'Autre',
];

const emptyAidant = (): AidantData => ({
    genre: '',
    nom: '',
    prenom: '',
    age: '',
    email: '',
    phone: '',
    departement: '',
    commune: '',
    aidant_type: '',
    aidant_type_autre_precisions: '',
    situation_familiale: '',
    situation_familiale_autre_precisions: '',
});

const emptyAide = (): AideData => ({
    aide_genre: '',
    aide_profile: '',
    scolarisation: '',
    scolarisation_autre_precisions: '',
    situation_adulte: '',
    situation_adulte_autre_precisions: '',
    lieu_habitation: '',
    lieu_habitation_autre_precisions: '',
});

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
                    {processing ? 'Envoi en cours...' : 'Adherer au SNA'}
                </button>
            ) : (
                <button
                    type="button"
                    onClick={onNext}
                    className="rounded-full bg-sna-teal px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-sna-teal/25 transition-all hover:-translate-y-0.5 hover:bg-sna-teal-dark"
                >
                    Suivant
                </button>
            )}
        </div>
    );
}

function AdhesionStepper({
    currentStep,
    totalSteps,
}: {
    currentStep: number;
    totalSteps: number;
}) {
    return (
        <div className="mb-8">
            <div className="mb-3 flex items-center justify-between text-xs font-medium text-gray-500 sm:hidden">
                <span className="font-bold text-sna-teal">
                    Etape {currentStep + 1} sur {totalSteps}
                </span>
                <span>
                    {ADHESION_STEPS[currentStep].icon} {ADHESION_STEPS[currentStep].label}
                </span>
            </div>
            <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-gray-100 sm:hidden">
                <div
                    className="h-full rounded-full bg-sna-teal transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                />
            </div>

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
                            <div key={idx} className="relative z-10 flex flex-1 justify-center">
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

function AdhesionForm() {
    const [step, setStep] = useState(0);
    const totalSteps = ADHESION_STEPS.length;

    const { data, setData, submit, processing, errors, wasSuccessful, reset } =
        useForm<AdhesionFormData>({
            aidants: [emptyAidant()],
            aides: [emptyAide()],
            aide_tranche_age: '',
            aide_age: '',
            type_situation: [],
            type_situation_autre_precisions: '',
            reconnaissance_administrative: '',
            aide_genre: '',
            scolarisation: '',
            scolarisation_autre_precisions: '',
            situation_adulte: '',
            situation_adulte_autre_precisions: '',
            lieu_habitation: '',
            lieu_habitation_autre_precisions: '',
            impacts: [],
            impacts_autre_precisions: '',
            situation_professionnelle: '',
            expression_libre: '',
            soutient_sna: false,
            wants_info: false,
            declaration_honneur: false,
            consents_rgpd: false,
            don_amount: '',
        });

    const getError = (path: string): string | undefined => {
        return (errors as Record<string, string>)[path];
    };

    const setAidantField = <K extends keyof AidantData>(
        index: number,
        field: K,
        value: AidantData[K],
    ) => {
        const nextAidants = [...data.aidants];
        nextAidants[index] = {
            ...nextAidants[index],
            [field]: value,
        };
        setData('aidants', nextAidants);
    };

    const addAidant = () => {
        setData('aidants', [...data.aidants, emptyAidant()]);
    };

    const removeAidant = (index: number) => {
        if (data.aidants.length === 1) {
            return;
        }

        setData(
            'aidants',
            data.aidants.filter((_, aidantIndex) => aidantIndex !== index),
        );
    };

    const setAideField = <K extends keyof AideData>(
        index: number,
        field: K,
        value: AideData[K],
    ) => {
        const nextAides = [...data.aides];
        nextAides[index] = {
            ...nextAides[index],
            [field]: value,
        };
        setData('aides', nextAides);
    };

    const addAide = () => {
        setData('aides', [...data.aides, emptyAide()]);
    };

    const removeAide = (index: number) => {
        if (data.aides.length === 1) {
            return;
        }

        setData(
            'aides',
            data.aides.filter((_, aideIndex) => aideIndex !== index),
        );
    };

    const toggleTopLevelArray = (field: 'type_situation' | 'impacts', value: string) => {
        const current = data[field];

        setData(
            field,
            current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value],
        );
    };

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        submit(forms.adhesion.store(), {
            onSuccess: () => {
                reset();
                setStep(0);
            },
        });
    };

    const goNext = () => setStep((currentStep) => Math.min(currentStep + 1, totalSteps - 1));
    const goBack = () => setStep((currentStep) => Math.max(currentStep - 1, 0));

    const inputCls =
        'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/30 focus:outline-none placeholder:text-gray-300';
    const labelCls = 'mb-1.5 block text-sm font-semibold text-gray-700';
    const sectionTitleCls =
        'mb-6 flex items-center gap-3 border-b border-sna-teal/20 pb-3 text-base font-bold text-sna-teal-dark';

    if (wasSuccessful) {
        return (
            <div className="space-y-4 rounded-3xl border border-sna-teal/30 bg-sna-teal-light p-12 text-center shadow-lg">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sna-teal/10 text-4xl">
                    💙
                </div>
                <h2 className="text-2xl font-bold text-sna-teal-dark">Adhesion enregistree !</h2>
                <p className="text-gray-500">
                    Merci de rejoindre le Syndicat National des Aidants. Votre voix compte.
                </p>
                <Link
                    href="/"
                    className="mt-2 inline-block rounded-full border border-sna-teal/30 px-6 py-2.5 text-sm font-semibold text-sna-teal transition hover:bg-sna-teal hover:text-white"
                >
                    Retour a l'accueil
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <AdhesionStepper currentStep={step} totalSteps={totalSteps} />

            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                {step === 0 && (
                    <div className="space-y-6">
                        <h3 className={sectionTitleCls}>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sna-teal text-sm text-white">
                                1
                            </span>
                            Declaration et identite des aidants
                        </h3>

                        <div className="space-y-3 rounded-2xl border border-sna-teal/25 bg-sna-teal-light p-5">
                            <p className="text-sm text-gray-700">
                                Les informations recueillies ne sont ni revendues ni transmises. Elles servent
                                uniquement a des fins collectives et statistiques.
                            </p>
                            <label className="flex items-start gap-3 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={data.declaration_honneur}
                                    onChange={(event) =>
                                        setData('declaration_honneur', event.target.checked)
                                    }
                                    className="mt-0.5 h-4 w-4 rounded accent-sna-teal"
                                />
                                Je declare sur l'honneur etre aidant(e), accompagner regulierement une
                                personne de mon entourage et fournir des informations sinceres et exactes.
                            </label>
                            {errors.declaration_honneur && (
                                <p className="text-xs text-red-600">{errors.declaration_honneur}</p>
                            )}
                        </div>

                        {data.aidants.map((aidant, index) => (
                            <div
                                key={index}
                                className="space-y-5 rounded-2xl border border-gray-200 bg-gray-50 p-5"
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-sna-teal-dark">
                                        Aidant {index + 1}
                                    </h4>
                                    {data.aidants.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeAidant(index)}
                                            className="text-xs font-semibold text-red-600 hover:text-red-700"
                                        >
                                            Supprimer
                                        </button>
                                    )}
                                </div>

                                <div>
                                    <label className={labelCls}>Genre</label>
                                    <div className="flex flex-wrap gap-4">
                                        {[
                                            { value: 'homme', label: 'Homme' },
                                            { value: 'femme', label: 'Femme' },
                                            {
                                                value: 'non_renseigne',
                                                label: 'Ne souhaite pas repondre',
                                            },
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className="flex items-center gap-2 text-sm text-gray-600"
                                            >
                                                <input
                                                    type="radio"
                                                    name={`aidant-genre-${index}`}
                                                    checked={aidant.genre === option.value}
                                                    onChange={() =>
                                                        setAidantField(index, 'genre', option.value)
                                                    }
                                                    className="accent-sna-teal"
                                                />
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className={labelCls}>Nom *</label>
                                        <input
                                            type="text"
                                            value={aidant.nom}
                                            onChange={(event) =>
                                                setAidantField(index, 'nom', event.target.value)
                                            }
                                            className={inputCls}
                                        />
                                        {getError(`aidants.${index}.nom`) && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {getError(`aidants.${index}.nom`)}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className={labelCls}>Prenom *</label>
                                        <input
                                            type="text"
                                            value={aidant.prenom}
                                            onChange={(event) =>
                                                setAidantField(index, 'prenom', event.target.value)
                                            }
                                            className={inputCls}
                                        />
                                        {getError(`aidants.${index}.prenom`) && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {getError(`aidants.${index}.prenom`)}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className={labelCls}>Age</label>
                                        <input
                                            type="text"
                                            value={aidant.age}
                                            onChange={(event) =>
                                                setAidantField(index, 'age', event.target.value)
                                            }
                                            className={inputCls}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelCls}>Adresse e-mail *</label>
                                        <input
                                            type="email"
                                            value={aidant.email}
                                            onChange={(event) =>
                                                setAidantField(index, 'email', event.target.value)
                                            }
                                            className={inputCls}
                                        />
                                        {getError(`aidants.${index}.email`) && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {getError(`aidants.${index}.email`)}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className={labelCls}>Telephone</label>
                                        <input
                                            type="tel"
                                            value={aidant.phone}
                                            onChange={(event) =>
                                                setAidantField(index, 'phone', event.target.value)
                                            }
                                            className={inputCls}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelCls}>Departement</label>
                                        <input
                                            type="text"
                                            value={aidant.departement}
                                            onChange={(event) =>
                                                setAidantField(index, 'departement', event.target.value)
                                            }
                                            className={inputCls}
                                            placeholder="75"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelCls}>Commune (facultatif)</label>
                                    <input
                                        type="text"
                                        value={aidant.commune}
                                        onChange={(event) =>
                                            setAidantField(index, 'commune', event.target.value)
                                        }
                                        className={inputCls}
                                    />
                                </div>

                                <div>
                                    <label className={labelCls}>Vous etes... *</label>
                                    <div className="space-y-2">
                                        {[
                                            {
                                                value: 'parent_handicap',
                                                label:
                                                    "Parent d'un enfant en situation de handicap ou de maladie",
                                            },
                                            {
                                                value: 'conjoint',
                                                label: "Aidant(e) d'un conjoint / partenaire",
                                            },
                                            { value: 'parent_aine', label: "Aidant(e) d'un parent" },
                                            {
                                                value: 'proche',
                                                label: "Aidant(e) d'un proche (frere, soeur, autre)",
                                            },
                                            { value: 'autre', label: 'Autre' },
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className="flex items-center gap-3 text-sm text-gray-600"
                                            >
                                                <input
                                                    type="radio"
                                                    name={`aidant-type-${index}`}
                                                    checked={aidant.aidant_type === option.value}
                                                    onChange={() =>
                                                        setAidantField(index, 'aidant_type', option.value)
                                                    }
                                                    className="accent-sna-teal"
                                                />
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                    {getError(`aidants.${index}.aidant_type`) && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {getError(`aidants.${index}.aidant_type`)}
                                        </p>
                                    )}
                                </div>

                                {aidant.aidant_type === 'autre' && (
                                    <div>
                                        <label className={labelCls}>Autre: a preciser</label>
                                        <input
                                            type="text"
                                            value={aidant.aidant_type_autre_precisions}
                                            onChange={(event) =>
                                                setAidantField(
                                                    index,
                                                    'aidant_type_autre_precisions',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputCls}
                                        />
                                    </div>
                                )}

                                {aidant.aidant_type === 'parent_handicap' && (
                                    <div>
                                        <label className={labelCls}>
                                            Situation familiale avec l'autre parent
                                        </label>
                                        <div className="flex flex-wrap gap-3">
                                            {[
                                                { value: 'en_couple', label: 'En couple' },
                                                { value: 'separe', label: 'Separe(e)' },
                                                { value: 'divorce', label: 'Divorce(e)' },
                                                { value: 'veuf', label: 'Veuf(ve)' },
                                                { value: 'autre', label: 'Autre' },
                                            ].map((option) => (
                                                <label
                                                    key={option.value}
                                                    className="flex items-center gap-2 text-sm text-gray-600"
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`aidant-family-${index}`}
                                                        checked={aidant.situation_familiale === option.value}
                                                        onChange={() =>
                                                            setAidantField(
                                                                index,
                                                                'situation_familiale',
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
                                )}

                                {aidant.situation_familiale === 'autre' && (
                                    <div>
                                        <label className={labelCls}>Autre situation familiale: a preciser</label>
                                        <input
                                            type="text"
                                            value={aidant.situation_familiale_autre_precisions}
                                            onChange={(event) =>
                                                setAidantField(
                                                    index,
                                                    'situation_familiale_autre_precisions',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputCls}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addAidant}
                            className="rounded-full border border-sna-teal/30 px-5 py-2 text-sm font-semibold text-sna-teal transition hover:bg-sna-teal/10"
                        >
                            Ajouter un aidant
                        </button>

                        <NavButtons
                            step={step}
                            processing={processing}
                            onBack={goBack}
                            onNext={goNext}
                        />
                    </div>
                )}

                {step === 1 && (
                    <div className="space-y-6">
                        <h3 className={sectionTitleCls}>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sna-teal text-sm text-white">
                                2
                            </span>
                            Situation d'aidance
                        </h3>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className={labelCls}>Tranche d'age de la personne aidée</label>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { value: 'moins_18', label: 'Moins de 18 ans' },
                                        { value: '18_65', label: 'Entre 18 et 65 ans' },
                                        { value: 'plus_65', label: 'Plus de 65 ans' },
                                    ].map((option) => (
                                        <label
                                            key={option.value}
                                            className="flex items-center gap-2 text-sm text-gray-600"
                                        >
                                            <input
                                                type="radio"
                                                name="aide-tranche-age"
                                                checked={data.aide_tranche_age === option.value}
                                                onChange={() =>
                                                    setData('aide_tranche_age', option.value)
                                                }
                                                className="accent-sna-teal"
                                            />
                                            {option.label}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className={labelCls}>Age de la personne aidée</label>
                                <input
                                    type="text"
                                    value={data.aide_age}
                                    onChange={(event) => setData('aide_age', event.target.value)}
                                    className={inputCls}
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelCls}>Type de situation</label>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                {TYPE_SITUATION_OPTIONS.map((option) => (
                                    <label
                                        key={option}
                                        className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs text-gray-600 transition hover:border-sna-teal/50 hover:bg-sna-teal/5"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={data.type_situation.includes(option)}
                                            onChange={() =>
                                                toggleTopLevelArray('type_situation', option)
                                            }
                                            className="h-4 w-4 rounded accent-sna-teal"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {data.type_situation.includes('Autre') && (
                            <div>
                                <label className={labelCls}>Autre type de situation: a preciser</label>
                                <input
                                    type="text"
                                    value={data.type_situation_autre_precisions}
                                    onChange={(event) =>
                                        setData('type_situation_autre_precisions', event.target.value)
                                    }
                                    className={inputCls}
                                />
                            </div>
                        )}

                        <div>
                            <label className={labelCls}>Reconnaissance administrative</label>
                            <select
                                value={data.reconnaissance_administrative}
                                onChange={(event) =>
                                    setData('reconnaissance_administrative', event.target.value)
                                }
                                className={inputCls}
                            >
                                <option value="">Selectionner...</option>
                                <option value="dossier_mdph_en_cours">Dossier MDPH en cours</option>
                                <option value="droits_mdph_ouverts">Droits MDPH ouverts</option>
                                <option value="refus_rupture_droits">Refus ou rupture de droits</option>
                                <option value="absence_reconnaissance">Absence de reconnaissance</option>
                                <option value="desaccord_mdph">
                                    Desaccord en cours avec la MDPH (recours, contestation...)
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

                {step === 2 && (
                    <div className="space-y-6">
                        <h3 className={sectionTitleCls}>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sna-teal text-sm text-white">
                                3
                            </span>
                            Informations sur les personnes aidées
                        </h3>

                        <div className="space-y-4 rounded-2xl border border-sna-teal/20 bg-sna-teal-light p-5">
                            <h4 className="text-sm font-bold text-sna-teal-dark">
                                Personnes ayant besoin d'aide
                            </h4>

                            {data.aides.map((aide, aideIndex) => (
                                <div
                                    key={aideIndex}
                                    className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <h5 className="text-xs font-semibold text-sna-teal-dark">
                                            {aideIndex === 0
                                                ? 'Personne aidée principale'
                                                : `Personne aidée ${aideIndex + 1}`}
                                        </h5>
                                        {data.aides.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeAide(aideIndex)}
                                                className="text-xs font-semibold text-red-600 hover:text-red-700"
                                            >
                                                Supprimer
                                            </button>
                                        )}
                                    </div>

                                    <div>
                                        <label className={labelCls}>Genre</label>
                                        <div className="flex flex-wrap gap-4">
                                            {[
                                                { value: 'homme', label: 'Homme' },
                                                { value: 'femme', label: 'Femme' },
                                                {
                                                    value: 'non_renseigne',
                                                    label: 'Ne souhaite pas repondre',
                                                },
                                            ].map((option) => (
                                                <label
                                                    key={option.value}
                                                    className="flex items-center gap-2 text-sm text-gray-600"
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`aide-genre-extra-${aideIndex}`}
                                                        checked={aide.aide_genre === option.value}
                                                        onChange={() =>
                                                            setAideField(
                                                                aideIndex,
                                                                'aide_genre',
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
                                        <label className={labelCls}>S'il s'agit d'un enfant ou d'un adulte</label>
                                        <div className="flex flex-wrap gap-4">
                                            {[
                                                { value: 'enfant', label: 'Enfant' },
                                                { value: 'adulte', label: 'Adulte' },
                                            ].map((option) => (
                                                <label
                                                    key={option.value}
                                                    className="flex items-center gap-2 text-sm text-gray-600"
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`aide-profile-${aideIndex}`}
                                                        checked={aide.aide_profile === option.value}
                                                        onChange={() =>
                                                            setAideField(
                                                                aideIndex,
                                                                'aide_profile',
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

                                    {aide.aide_profile === 'enfant' && (
                                        <div>
                                            <label className={labelCls}>Scolarisation (si enfant)</label>
                                            <select
                                                value={aide.scolarisation}
                                                onChange={(event) =>
                                                    setAideField(
                                                        aideIndex,
                                                        'scolarisation',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputCls}
                                            >
                                                <option value="">Selectionner...</option>
                                                <option value="ordinaire">Ordinaire</option>
                                                <option value="ulis">ULIS</option>
                                                <option value="ime">IME</option>
                                                <option value="itep">ITEP</option>
                                                <option value="descolarise">Descolarise</option>
                                                <option value="autre">Autre</option>
                                            </select>
                                        </div>
                                    )}

                                    {aide.scolarisation === 'autre' && (
                                        <div>
                                            <label className={labelCls}>Autre scolarisation: a preciser</label>
                                            <input
                                                type="text"
                                                value={aide.scolarisation_autre_precisions}
                                                onChange={(event) =>
                                                    setAideField(
                                                        aideIndex,
                                                        'scolarisation_autre_precisions',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputCls}
                                            />
                                        </div>
                                    )}

                                    {aide.aide_profile === 'adulte' && (
                                            <div>
                                                <label className={labelCls}>Situation (si adulte)</label>
                                                <select
                                                    value={aide.situation_adulte}
                                                    onChange={(event) =>
                                                        setAideField(
                                                            aideIndex,
                                                            'situation_adulte',
                                                            event.target.value,
                                                        )
                                                    }
                                                    className={inputCls}
                                                >
                                                    <option value="">Selectionner...</option>
                                                    <option value="esat">Travail en ESAT</option>
                                                    <option value="milieu_ordinaire">
                                                        Travail en milieu ordinaire
                                                    </option>
                                                    <option value="samsah">SAMSAH</option>
                                                    <option value="foyer_vie">Foyer de vie</option>
                                                    <option value="insertion">
                                                        Stage ou parcours d'insertion professionnelle
                                                    </option>
                                                    <option value="domicile_sans_structure">
                                                        A domicile sans structure
                                                    </option>
                                                    <option value="autre">Autre</option>
                                                </select>
                                            </div>
                                        )}

                                    {aide.situation_adulte === 'autre' && (
                                        <div>
                                            <label className={labelCls}>Autre situation adulte: a preciser</label>
                                            <input
                                                type="text"
                                                value={aide.situation_adulte_autre_precisions}
                                                onChange={(event) =>
                                                    setAideField(
                                                        aideIndex,
                                                        'situation_adulte_autre_precisions',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputCls}
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label className={labelCls}>Lieu d'habitation de la personne aidée</label>
                                        <select
                                            value={aide.lieu_habitation}
                                            onChange={(event) =>
                                                setAideField(
                                                    aideIndex,
                                                    'lieu_habitation',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputCls}
                                        >
                                            <option value="">Selectionner...</option>
                                            <option value="domicile_familial">Domicile familial</option>
                                            <option value="fas_mas_fam">FAS / MAS / FAM</option>
                                            <option value="foyer_hebergement">Foyer d'hebergement</option>
                                            <option value="domicile_personnel">A son domicile personnel</option>
                                            <option value="residence_autonomie">Residence autonomie</option>
                                            <option value="autre">Autre</option>
                                        </select>
                                    </div>

                                    {aide.lieu_habitation === 'autre' && (
                                        <div>
                                            <label className={labelCls}>Autre lieu d'habitation: a preciser</label>
                                            <input
                                                type="text"
                                                value={aide.lieu_habitation_autre_precisions}
                                                onChange={(event) =>
                                                    setAideField(
                                                        aideIndex,
                                                        'lieu_habitation_autre_precisions',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputCls}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addAide}
                                className="rounded-full border border-sna-teal/30 px-5 py-2 text-sm font-semibold text-sna-teal transition hover:bg-sna-teal/10"
                            >
                                Ajouter un aidé
                            </button>
                        </div>

                        <NavButtons
                            step={step}
                            processing={processing}
                            onBack={goBack}
                            onNext={goNext}
                        />
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6">
                        <h3 className={sectionTitleCls}>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sna-teal text-sm text-white">
                                4
                            </span>
                            Impact de votre role d'aidant(e)
                        </h3>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {IMPACT_OPTIONS.map((option) => (
                                <label
                                    key={option}
                                    className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs text-gray-600 transition hover:border-sna-teal/50 hover:bg-sna-teal/5"
                                >
                                    <input
                                        type="checkbox"
                                        checked={data.impacts.includes(option)}
                                        onChange={() => toggleTopLevelArray('impacts', option)}
                                        className="h-4 w-4 rounded accent-sna-teal"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>

                        {data.impacts.includes('Autre') && (
                            <div>
                                <label className={labelCls}>Autre impact: a preciser</label>
                                <input
                                    type="text"
                                    value={data.impacts_autre_precisions}
                                    onChange={(event) =>
                                        setData('impacts_autre_precisions', event.target.value)
                                    }
                                    className={inputCls}
                                />
                            </div>
                        )}

                        <NavButtons
                            step={step}
                            processing={processing}
                            onBack={goBack}
                            onNext={goNext}
                        />
                    </div>
                )}

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
                                { value: 'cdi_temps_plein', label: 'CDI temps plein' },
                                { value: 'cdi_temps_partiel', label: 'CDI temps partiel' },
                                { value: 'cdd_interim', label: 'CDD / Interim' },
                                {
                                    value: 'independant',
                                    label: 'Travailleur(se) independant(e)',
                                },
                                { value: 'sans_emploi', label: 'Sans emploi' },
                                {
                                    value: 'conge_proche_aidant',
                                    label: 'Conge proche aidant / AJPP',
                                },
                                {
                                    value: 'arret_maladie',
                                    label: 'Arret maladie longue duree',
                                },
                                {
                                    value: 'cessation_activite',
                                    label: "Cessation d'activite pour vous occuper de votre proche",
                                },
                            ].map((option) => (
                                <label
                                    key={option.value}
                                    className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs text-gray-600 transition hover:border-sna-teal/50 hover:bg-sna-teal/5"
                                >
                                    <input
                                        type="radio"
                                        name="situation-professionnelle"
                                        checked={data.situation_professionnelle === option.value}
                                        onChange={() =>
                                            setData('situation_professionnelle', option.value)
                                        }
                                        className="accent-sna-teal"
                                    />
                                    {option.label}
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

                {step === 5 && (
                    <div className="space-y-6">
                        <h3 className={sectionTitleCls}>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sna-teal text-sm text-white">
                                6
                            </span>
                            Expression libre et soutien
                        </h3>

                        <div>
                            <label className={labelCls}>En quelques mots, si vous le souhaitez</label>
                            <textarea
                                rows={4}
                                value={data.expression_libre}
                                onChange={(event) =>
                                    setData('expression_libre', event.target.value)
                                }
                                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition placeholder:text-gray-300 focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/30 focus:outline-none"
                                placeholder="Etre aidant(e), pour moi, c'est..."
                            />
                        </div>

                        <label className="flex items-start gap-3 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                checked={data.soutient_sna}
                                onChange={(event) => setData('soutient_sna', event.target.checked)}
                                className="mt-0.5 h-4 w-4 rounded accent-sna-teal"
                            />
                            Je soutiens la creation du Syndicat National des Aidants (SNA)
                        </label>

                        <label className="flex items-start gap-3 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                checked={data.wants_info}
                                onChange={(event) => setData('wants_info', event.target.checked)}
                                className="mt-0.5 h-4 w-4 rounded accent-sna-teal"
                            />
                            J'accepte d'etre informe(e) des actions nationales
                        </label>

                        <div>
                            <label className={labelCls}>Don complementaire (EUR, facultatif)</label>
                            <input
                                type="number"
                                min="1"
                                step="0.01"
                                value={data.don_amount}
                                onChange={(event) => setData('don_amount', event.target.value)}
                                className={inputCls}
                                placeholder="20"
                            />
                        </div>

                        <p className="rounded-xl bg-gray-50 p-3 text-xs leading-relaxed text-gray-500">
                            Code promo adhesion: <span className="font-semibold text-sna-teal">AIDANT2026</span>{' '}
                            (reduction de 20 euros)
                        </p>

                        <label className="flex items-start gap-3 text-xs text-gray-600">
                            <input
                                type="checkbox"
                                checked={data.consents_rgpd}
                                onChange={(event) =>
                                    setData('consents_rgpd', event.target.checked)
                                }
                                className="mt-0.5 h-4 w-4 shrink-0 rounded accent-sna-teal"
                            />
                            Je consens au traitement de mes donnees personnelles conformement au RGPD.
                        </label>
                        {errors.consents_rgpd && (
                            <p className="text-xs text-red-600">{errors.consents_rgpd}</p>
                        )}

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

export default function AdhesionPage() {
    return (
        <>
            <Head title="Adhesion - Syndicat National des Aidants">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-linear-to-br from-[#e8f8f8] via-white to-[#f0f9e8] font-sans">
                <header className="border-b border-sna-teal/10 bg-white/80 backdrop-blur-md">
                    <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
                        <Link href="/">
                            <img src="/images/logo.png" alt="SNA" className="h-11 w-auto" />
                        </Link>
                        <Link
                            href="/"
                            className="text-sm font-medium text-gray-500 transition hover:text-sna-teal"
                        >
                            Retour a l'accueil
                        </Link>
                    </div>
                </header>

                <div className="relative overflow-hidden">
                    <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-sna-teal/10 blur-3xl" />
                    <div className="pointer-events-none absolute top-16 -left-16 h-56 w-56 rounded-full bg-sna-green/10 blur-2xl" />

                    <div className="relative mx-auto max-w-4xl px-6 pt-12 pb-10 text-center">
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-sna-teal/10 px-4 py-1.5 text-sm font-semibold text-sna-teal-dark">
                            💙 Formulaire d'adhesion des aidants
                        </span>
                        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl">
                            Rejoignez la voix collective des aidants
                        </h1>
                        <p className="mt-4 text-lg leading-relaxed text-gray-500">
                            Ce formulaire permet de quantifier les aidants, qualifier leurs realites
                            et renforcer la representation nationale du SNA.
                        </p>
                    </div>
                </div>

                <div className="mx-auto max-w-4xl px-6 pb-20">
                    <AdhesionForm />

                    <p className="mt-8 text-center text-xs text-gray-400">
                        Deja soumis un formulaire ?{' '}
                        <Link
                            href="/mes-formulaires"
                            className="font-medium text-sna-teal underline-offset-2 hover:underline"
                        >
                            Acceder a mes soumissions
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
