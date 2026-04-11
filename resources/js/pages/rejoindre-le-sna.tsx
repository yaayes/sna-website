import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import PublicSiteHeader from '@/components/public-site-header';

const movementBullets = [
    'transformation du rapport au travail',
    'transformation de la solidarite',
    'transformation de la notion de dependance',
    'transformation du lien familial et social',
];

const neededSkillsBullets = [
    'Developpement informatique',
    'Creation et gestion de site web',
    'Communication strategique',
    'Graphisme',
    'Organisation d evenements',
    'Structuration juridique',
    'Recherche de financements',
    'Gestion administrative',
    'Plaidoyer institutionnel',
    'Analyse de donnees',
    'Redaction',
    'Reseaux sociaux',
    'Traduction',
    'Comptabilite',
    'Coordination territoriale',
];

const circlesBullets = [
    'Faire evoluer la pensee autour de l aidance',
    'Interroger les modeles economiques actuels',
    'Redefinir la place des aidants dans la societe',
    'Produire des contributions intellectuelles et strategiques',
    'Nourrir les propositions de loi et actions collectives',
];

const whyBullets = [
    'L aidance n est pas une fragilite, c est une expertise.',
    'Les transformations sociales ont besoin de pensee structuree.',
    'Les grandes avancees naissent d engagements collectifs.',
];

const involvementOptions = [
    { label: 'Devenir benevole', value: 'benevole' },
    {
        label: 'Participer a un cercle de reflexion',
        value: 'cercle_reflexion',
    },
    {
        label: 'Apporter une expertise ponctuelle',
        value: 'expertise_ponctuelle',
    },
    {
        label: 'Contribuer a un projet specifique',
        value: 'projet_specifique',
    },
];

const skillOptions = [
    { label: 'Developpement informatique', value: 'dev_info' },
    { label: 'Web / UX / SEO', value: 'web_ux_seo' },
    {
        label: 'Communication / relations presse',
        value: 'communication_presse',
    },
    { label: 'Juridique', value: 'juridique' },
    { label: 'Redaction / recherche', value: 'redaction_recherche' },
    { label: 'Philosophie / sociologie', value: 'philosophie_sociologie' },
    { label: 'Analyse economique', value: 'analyse_economique' },
    {
        label: 'Organisation d evenements',
        value: 'organisation_evenements',
    },
    { label: 'Comptabilite / gestion', value: 'comptabilite_gestion' },
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
    { label: '1 a 2 heures par mois', value: '1_2_mois' },
    { label: '1 a 2 heures par semaine', value: '1_2_semaine' },
    {
        label: 'Engagement plus structure',
        value: 'structure',
    },
];

const integrationOptions = [
    { label: 'Un cercle de reflexion', value: 'cercle' },
    {
        label: 'Une equipe operationnelle',
        value: 'equipe_operationnelle',
    },
    { label: 'Un groupe local', value: 'groupe_local' },
    {
        label: 'Un projet national specifique',
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
                            S engager. Penser. Construire.
                        </p>
                        <div className="mt-6 space-y-4 text-gray-700">
                            <p>Le SNA n est pas une structure figee. C est un mouvement en construction.</p>
                            <p>Chaque competence peut en devenir une pierre fondatrice.</p>
                            <p>
                                Le Syndicat National des Aidants (SNA) n est pas seulement un espace de revendication.
                                C est un lieu de structuration, d innovation sociale et de reflexion collective.
                            </p>
                            <p>
                                Les aidants portent, souvent seuls, une transformation silencieuse de la societe.
                            </p>
                        </div>
                        <div className="mt-5">
                            <BulletList items={movementBullets} />
                        </div>
                        <div className="mt-6 space-y-4 text-gray-700">
                            <p>Nous voulons donner une forme, une voix et une pensee a cette transformation.</p>
                            <p>Et pour cela, nous avons besoin de vous.</p>
                        </div>
                    </section>

                    <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                            Le SNA se structure et a besoin de competences variees
                        </h2>
                        <div className="mt-6">
                            <BulletList items={neededSkillsBullets} />
                        </div>
                    </section>

                    <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                            Participer aux cercles de reflexion
                        </h2>
                        <p className="mt-5 text-gray-700">
                            Nous creons des cercles de reflexion philosophiques, sociologiques et juridiques pour :
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
                                Le SNA se construit avec celles et ceux qui veulent depasser le constat pour batir.
                            </p>
                            <p>
                                L aidance n est pas seulement une realite sociale : elle est un revelateur des mutations profondes
                                de notre societe, du travail a la solidarite, de la vulnerabilite a la citoyennete.
                            </p>
                            <p>
                                Nous appelons chercheurs, enseignants, philosophes, sociologues, juristes, etudiants,
                                praticiens a s en saisir comme d un champ de pensee a part entiere.
                            </p>
                            <p className="font-semibold text-gray-900">Votre regard est precieux.</p>
                            <p>
                                Chaque problematique rencontree par les aidants interroge nos modeles economiques,
                                juridiques et culturels.
                            </p>
                            <p>
                                Rejoignez-nous pour transformer l experience vecue en matiere intellectuelle et faire emerger
                                de nouveaux cadres de comprehension et d action.
                            </p>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-sna-teal/20 bg-white p-8 shadow-sm md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                            Je souhaite m impliquer
                        </h2>

                        {wasSuccessful ? (
                            <div className="mt-8 space-y-4 rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center">
                                <h3 className="text-xl font-bold text-teal-800">Merci pour votre engagement</h3>
                                <p className="text-teal-700">
                                    Votre demande a ete envoyee. L equipe du SNA vous recontactera prochainement.
                                </p>
                                <Link
                                    href="/"
                                    className="inline-block rounded-full border border-teal-300 px-5 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-600 hover:text-white"
                                >
                                    Retour a l accueil
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
                                        Vos competences principales
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
                                                Precisez votre competence
                                            </label>
                                            <input
                                                type="text"
                                                value={data.other_skill}
                                                onChange={(event) =>
                                                    setData('other_skill', event.target.value)
                                                }
                                                className={inputClassName}
                                                placeholder="Votre competence"
                                            />
                                            {errors.other_skill && (
                                                <p className="mt-2 text-xs text-red-500">{errors.other_skill}</p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                                        Votre experience ou parcours (facultatif mais recommande)
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
                                        Disponibilite approximative
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
                                        Souhaitez-vous integrer
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
                                        Coordonnees
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
                                                Telephone
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
                                        Les informations recueillies sont utilisees exclusivement dans le cadre des
                                        activites du SNA.
                                    </p>
                                    <p>
                                        Vous pouvez demander la suppression de vos donnees a tout moment.
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
