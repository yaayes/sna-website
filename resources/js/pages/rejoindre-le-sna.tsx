import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import PublicSiteHeader from '@/components/public-site-header';

const movementBullets = [
    'transformation du rapport au travail',
    'transformation de la solidarité',
    'transformation de la notion de dépendance',
    'transformation du lien familial et social',
];

const neededSkillsBullets = [
    'Développement informatique',
    'Création et gestion de site web',
    'Communication stratégique',
    'Graphisme',
    'Organisation d’événements',
    'Structuration juridique',
    'Recherche de financements',
    'Gestion administrative',
    'Plaidoyer institutionnel',
    'Analyse de données',
    'Rédaction',
    'Réseaux sociaux',
    'Traduction',
    'Comptabilité',
    'Coordination territoriale',
];

const circlesBullets = [
    'Faire évoluer la pensée autour de l’aidance',
    'Interroger les modèles économiques actuels',
    'Redéfinir la place des aidants dans la société',
    'Produire des contributions intellectuelles et stratégiques',
    'Nourrir les propositions de loi et actions collectives',
];

const whyBullets = [
    'L’aidance n’est pas une fragilité, c’est une expertise.',
    'Les transformations sociales ont besoin de pensée structurée.',
    'Les grandes avancées naissent d’engagements collectifs.',
];

const involvementOptions = [
    { label: 'Devenir bénévole', value: 'benevole' },
    {
        label: 'Participer à un cercle de réflexion',
        value: 'cercle_reflexion',
    },
    {
        label: 'Apporter une expertise ponctuelle',
        value: 'expertise_ponctuelle',
    },
    {
        label: 'Contribuer à un projet spécifique',
        value: 'projet_specifique',
    },
];

const skillOptions = [
    { label: 'Développement informatique', value: 'dev_info' },
    { label: 'Web / UX / SEO', value: 'web_ux_seo' },
    {
        label: 'Communication / relations presse',
        value: 'communication_presse',
    },
    { label: 'Juridique', value: 'juridique' },
    { label: 'Rédaction / recherche', value: 'redaction_recherche' },
    { label: 'Philosophie / sociologie', value: 'philosophie_sociologie' },
    { label: 'Analyse économique', value: 'analyse_economique' },
    {
        label: 'Organisation d’événements',
        value: 'organisation_evenements',
    },
    { label: 'Comptabilité / gestion', value: 'comptabilite_gestion' },
    {
        label: 'Recherche de financements',
        value: 'recherche_financements',
    },
    { label: 'Plaidoyer politique', value: 'plaidoyer_politique' },
    {
        label: 'Coordination territoriale',
        value: 'coordination_territoriale',
    },
    { label: 'Autre', value: 'autre' },
];

const availabilityOptions = [
    { label: 'Une seule fois', value: 'une_fois' },
    {
        label: 'Quelques heures ponctuellement',
        value: 'ponctuel',
    },
    { label: '1 à 2 heures par mois', value: '1_2_mois' },
    { label: '1 à 2 heures par semaine', value: '1_2_semaine' },
    {
        label: 'Engagement plus structuré',
        value: 'structure',
    },
];

const integrationOptions = [
    { label: 'Un cercle de réflexion', value: 'cercle' },
    {
        label: 'Une équipe opérationnelle',
        value: 'equipe_operationnelle',
    },
    { label: 'Un groupe local', value: 'groupe_local' },
    {
        label: 'Un projet national spécifique',
        value: 'projet_national',
    },
];

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-2">
            {items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                    <span
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sna-teal"
                        aria-hidden="true"
                    />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

export default function RejoindreLeSnaPage() {
    const { data, setData, post, processing, errors, wasSuccessful, reset } =
        useForm({
            involvement_types: [] as string[],
            main_skills: [] as string[],
            other_skill: '',
            experience: '',
            availability: '',
            integration_preferences: [] as string[],
            name: '',
            city: '',
            email: '',
            phone: '',
        });

    const toggleValue = (
        field: 'involvement_types' | 'main_skills' | 'integration_preferences',
        value: string,
    ) => {
        const current = data[field];

        if (current.includes(value)) {
            setData(
                field,
                current.filter((item) => item !== value),
            );

            return;
        }

        setData(field, [...current, value]);
    };

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        post('/rejoindre-le-sna', {
            onSuccess: () => reset(),
        });
    };

    const inputClassName =
        'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition placeholder:text-gray-300 focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/30 focus:outline-none';

    return (
        <>
            <Head title="Rejoindre le SNA — SNA" />

            <div className="min-h-screen bg-[#f8fbfb] text-gray-800">
                <PublicSiteHeader />

                <main className="mx-auto max-w-5xl px-6 py-12">
                    <section className="mb-10 rounded-3xl border border-sna-teal/20 bg-white p-8 shadow-sm md:p-12">
                        <p className="text-sm font-semibold tracking-[0.2em] text-sna-teal uppercase">
                            ENGAGEMENT COLLECTIF
                        </p>
                        <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
                            Rejoindre le Syndicat National des Aidants
                        </h1>
                        <p className="mt-6 text-lg font-medium text-sna-teal-dark">
                            S’engager. Penser. Construire.
                        </p>
                        <div className="mt-6 space-y-4 text-gray-700">
                            <p>Le SNA n’est pas une structure figée. C’est un mouvement en construction.</p>
                            <p>Chaque compétence peut en devenir une pierre fondatrice.</p>
                            <p>
                                Le Syndicat National des Aidants (SNA) n’est pas seulement un espace de revendication.
                                C’est un lieu de structuration, d’innovation sociale et de réflexion collective.
                            </p>
                            <p>
                                Les aidants portent, souvent seuls, une transformation silencieuse de la société.
                            </p>
                        </div>
                        <div className="mt-5">
                            <BulletList items={movementBullets} />
                        </div>
                        <div className="mt-6 space-y-4 text-gray-700">
                            <p>Nous voulons donner une forme, une voix et une pensée à cette transformation.</p>
                            <p>Et pour cela, nous avons besoin de vous.</p>
                        </div>
                    </section>

                    <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                            Le SNA se structure et a besoin de compétences variées
                        </h2>
                        <div className="mt-6">
                            <BulletList items={neededSkillsBullets} />
                        </div>
                    </section>

                    <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                            Participer aux cercles de réflexion
                        </h2>
                        <p className="mt-5 text-gray-700">
                            Nous créons des cercles de réflexion philosophiques, sociologiques et juridiques pour :
                        </p>
                        <div className="mt-4">
                            <BulletList items={circlesBullets} />
                        </div>

                        <p className="mt-6 text-gray-700">Parce que :</p>
                        <div className="mt-4">
                            <BulletList items={whyBullets} />
                        </div>

                        <div className="mt-6 space-y-4 text-gray-700">
                            <p>
                                Le SNA se construit avec celles et ceux qui veulent dépasser le constat pour bâtir.
                            </p>
                            <p>
                                L’aidance n’est pas seulement une réalité sociale : elle est un révélateur des mutations profondes
                                de notre société, du travail à la solidarité, de la vulnérabilité à la citoyenneté.
                            </p>
                            <p>
                                Nous appelons chercheurs, enseignants, philosophes, sociologues, juristes, étudiants,
                                praticiens à s’en saisir comme d’un champ de pensée à part entière.
                            </p>
                            <p className="font-semibold text-gray-900">Votre regard est précieux.</p>
                            <p>
                                Chaque problématique rencontrée par les aidants interroge nos modèles économiques,
                                juridiques et culturels.
                            </p>
                            <p>
                                Rejoignez-nous pour transformer l’expérience vécue en matière intellectuelle et faire émerger
                                de nouveaux cadres de compréhension et d’action.
                            </p>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-sna-teal/20 bg-white p-8 shadow-sm md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                            Je souhaite m’impliquer
                        </h2>

                        {wasSuccessful ? (
                            <div className="mt-8 space-y-4 rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center">
                                <h3 className="text-xl font-bold text-teal-800">Merci pour votre engagement</h3>
                                <p className="text-teal-700">
                                    Votre demande a été envoyée. L’équipe du SNA vous recontactera prochainement.
                                </p>
                                <Link
                                    href="/"
                                    className="inline-block rounded-full border border-teal-300 px-5 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-600 hover:text-white"
                                >
                                    Retour à l’accueil
                                </Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="mt-8 space-y-7">
                                <div>
                                    <h3 className="text-sm font-bold tracking-wide text-sna-teal-dark uppercase">
                                        Vous souhaitez
                                    </h3>
                                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                        {involvementOptions.map((option) => (
                                            <label
                                                key={option.value}
                                                className="flex items-center gap-2 rounded-xl border border-gray-100 px-4 py-3 text-sm text-gray-700"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={data.involvement_types.includes(option.value)}
                                                    onChange={() =>
                                                        toggleValue('involvement_types', option.value)
                                                    }
                                                    className="h-4 w-4 rounded border-gray-300 accent-sna-teal"
                                                />
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                    {errors.involvement_types && (
                                        <p className="mt-2 text-xs text-red-500">{errors.involvement_types}</p>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold tracking-wide text-sna-teal-dark uppercase">
                                        Vos compétences principales
                                    </h3>
                                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                        {skillOptions.map((option) => (
                                            <label
                                                key={option.value}
                                                className="flex items-center gap-2 rounded-xl border border-gray-100 px-4 py-3 text-sm text-gray-700"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={data.main_skills.includes(option.value)}
                                                    onChange={() =>
                                                        toggleValue('main_skills', option.value)
                                                    }
                                                    className="h-4 w-4 rounded border-gray-300 accent-sna-teal"
                                                />
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                    {errors.main_skills && (
                                        <p className="mt-2 text-xs text-red-500">{errors.main_skills}</p>
                                    )}

                                    {data.main_skills.includes('autre') && (
                                        <div className="mt-4">
                                            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                                                Précisez votre compétence
                                            </label>
                                            <input
                                                type="text"
                                                value={data.other_skill}
                                                onChange={(event) =>
                                                    setData('other_skill', event.target.value)
                                                }
                                                className={inputClassName}
                                                placeholder="Votre compétence"
                                            />
                                            {errors.other_skill && (
                                                <p className="mt-2 text-xs text-red-500">{errors.other_skill}</p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                                        Votre expérience ou parcours (facultatif mais recommandé)
                                    </label>
                                    <textarea
                                        rows={5}
                                        value={data.experience}
                                        onChange={(event) =>
                                            setData('experience', event.target.value)
                                        }
                                        className={`${inputClassName} resize-none`}
                                        placeholder="Partagez votre parcours, votre expertise ou votre contexte"
                                    />
                                    {errors.experience && (
                                        <p className="mt-2 text-xs text-red-500">{errors.experience}</p>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold tracking-wide text-sna-teal-dark uppercase">
                                        Disponibilité approximative
                                    </h3>
                                    <div className="mt-4 grid gap-3">
                                        {availabilityOptions.map((option) => (
                                            <label
                                                key={option.value}
                                                className="flex items-center gap-2 rounded-xl border border-gray-100 px-4 py-3 text-sm text-gray-700"
                                            >
                                                <input
                                                    type="radio"
                                                    name="availability"
                                                    checked={data.availability === option.value}
                                                    onChange={() =>
                                                        setData('availability', option.value)
                                                    }
                                                    className="h-4 w-4 accent-sna-teal"
                                                />
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                    {errors.availability && (
                                        <p className="mt-2 text-xs text-red-500">{errors.availability}</p>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold tracking-wide text-sna-teal-dark uppercase">
                                        Souhaitez-vous intégrer
                                    </h3>
                                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                        {integrationOptions.map((option) => (
                                            <label
                                                key={option.value}
                                                className="flex items-center gap-2 rounded-xl border border-gray-100 px-4 py-3 text-sm text-gray-700"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={data.integration_preferences.includes(option.value)}
                                                    onChange={() =>
                                                        toggleValue('integration_preferences', option.value)
                                                    }
                                                    className="h-4 w-4 rounded border-gray-300 accent-sna-teal"
                                                />
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                    {errors.integration_preferences && (
                                        <p className="mt-2 text-xs text-red-500">
                                            {errors.integration_preferences}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold tracking-wide text-sna-teal-dark uppercase">
                                        Coordonnées
                                    </h3>
                                    <div className="mt-4 grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                                                Nom *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(event) =>
                                                    setData('name', event.target.value)
                                                }
                                                className={inputClassName}
                                            />
                                            {errors.name && (
                                                <p className="mt-2 text-xs text-red-500">{errors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                                                Ville *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.city}
                                                onChange={(event) =>
                                                    setData('city', event.target.value)
                                                }
                                                className={inputClassName}
                                            />
                                            {errors.city && (
                                                <p className="mt-2 text-xs text-red-500">{errors.city}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(event) =>
                                                    setData('email', event.target.value)
                                                }
                                                className={inputClassName}
                                            />
                                            {errors.email && (
                                                <p className="mt-2 text-xs text-red-500">{errors.email}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                                                Téléphone
                                            </label>
                                            <input
                                                type="tel"
                                                value={data.phone}
                                                onChange={(event) =>
                                                    setData('phone', event.target.value)
                                                }
                                                className={inputClassName}
                                            />
                                            {errors.phone && (
                                                <p className="mt-2 text-xs text-red-500">{errors.phone}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-xs text-gray-600">
                                    <p className="font-semibold text-gray-800">Mention</p>
                                    <p className="mt-2">
                                        Les informations recueillies sont utilisées exclusivement dans le cadre des
                                        activités du SNA.
                                    </p>
                                    <p>
                                        Vous pouvez demander la suppression de vos données à tout moment.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex rounded-full bg-sna-teal px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sna-teal-dark disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing ? 'Envoi en cours...' : 'Envoyer ma demande'}
                                </button>
                            </form>
                        )}
                    </section>
                </main>
            </div>
        </>
    );
}
