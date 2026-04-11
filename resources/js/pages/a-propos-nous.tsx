import { Head } from '@inertiajs/react';
import PublicSiteHeader from '@/components/public-site-header';

const historiqueContexte = [
    'Le Syndicat National des Aidants (SNA) est né d’un constat simple mais profondément injuste : des millions d’aidants en France soutiennent chaque jour un proche en situation de handicap, de maladie ou de perte d’autonomie, sans reconnaissance juridique pleine, sans protection professionnelle adaptée et souvent sans véritable représentation structurée.',
    'À l’origine du SNA, il y a une réalité vécue. Celle de parents, de conjoints, d’enfants, qui assument une charge physique, mentale et organisationnelle considérable, tout en restant invisibles dans les politiques publiques et fragilisés dans leur parcours professionnel.',
    'Si des avancées ont été portées ces dernières années, notamment à travers la stratégie nationale de mobilisation et de soutien aux aidants, ces dispositifs demeurent partiels et insuffisamment protecteurs face aux réalités du terrain.',
    'Il s’agit avant tout d’une question d’ajustement, de cohérence et de lisibilité.',
];

const historiqueConstats = [
    'Des droits existants mais difficilement accessibles',
    'Des aides conditionnées à des cadres inadaptés',
    'Une méconnaissance du vécu quotidien des aidants, de leur charge mentale, de leur épuisement, de l’isolement et du sur-handicap qu’ils subissent parfois',
];

const historiqueObjectifs = [
    'Structurer une représentation nationale des aidants',
    'Porter une réflexion juridique ambitieuse',
    'Défendre les droits des aidants face aux discriminations indirectes',
    'Engager des actions stratégiques, y compris contentieuses',
    'Construire un dialogue exigeant mais constructif avec les institutions',
];

const historiqueRepresentation = [
    'Leur âge',
    'Leur situation sociale ou professionnelle',
    'Leur lien avec la personne aidée (parent, conjoint, enfant, fratrie, proche)',
    'La nature du handicap, de la maladie ou de la perte d’autonomie',
];

const historiqueActions = [
    'Agir pour que les politiques publiques soient non seulement bien intentionnées, mais réellement opérantes',
    'Agir pour que les dispositifs soient pensés avec les aidants, et non uniquement pour eux',
    'Agir pour que la reconnaissance du rôle des aidants se traduise par des réponses concrètes, adaptées et durables',
];

const roleLegitimite = [
    'Reconnu par la loi (aidant familial, proche aidant)',
    'Nommé dans le Code de l’action sociale',
    'Ciblé par des politiques publiques spécifiques',
];

const rolePrejudices = [
    'Perdent des revenus',
    'Perdent des droits à retraite',
    'Subissent des discriminations à l’emploi',
    'Supportent des coûts directs (transport, soins, adaptation)',
    'Sont exposés à une dépendance économique',
];

const roleMissions = [
    'Être la voix de la réalité : faire remonter une parole collective issue de l’expérience réelle des aidants. Nous portons la parole de ceux qui vivent l’aide au quotidien pour corriger et affiner les dispositifs existants',
    'Expertise de vécu : nous sommes les seuls à pouvoir identifier les "angles morts" des politiques publiques, objectiver les difficultés rencontrées dans l’application des dispositifs',
    'Contribuer à leur réajustement et à leur amélioration continue',
    'Participer à la co-construction de politiques publiques plus efficaces, plus justes et plus adaptées',
    'Faire émerger un véritable statut protecteur de l’aidant, garantir sa sécurité professionnelle et reconnaître la valeur sociale, humaine et organisationnelle que développe toute personne engagée dans l’aide à un proche',
    'Défense des intérêts sociaux et économiques : retraite, protection sociale, formation, reconnaissance statutaire',
    'Représentation collective auprès des pouvoirs publics et institutions',
    'Participation aux concertations relatives à la perte d’autonomie et à la santé',
    'Contribution à l’élaboration de politiques publiques favorables aux aidants',
];

const valeurs = ['Indépendance', 'Éthique', 'Solidarité', 'Transparence', 'Défense collective'];

const gouvernance = ['Présidence', 'Secrétaire Générale', 'Trésorière', 'Un conseil stratégique est en cours de création'];

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-2">
            {items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sna-teal" aria-hidden="true" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

export default function AProposNousPage() {
    return (
        <>
            <Head title="A propos nous — SNA" />

            <div className="min-h-screen bg-[#f8fbfb] text-gray-800">
                <PublicSiteHeader />

                <main className="mx-auto max-w-5xl px-6 py-12">
                    <section className="mb-10 rounded-3xl border border-sna-teal/20 bg-white p-8 shadow-sm md:p-12">
                        <p className="text-sm font-semibold tracking-[0.2em] text-sna-teal uppercase">
                            LE SNA — PRÉSENTATION & IDENTITÉ
                        </p>
                        <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
                            A propos nous
                        </h1>
                        <p className="mt-6 text-lg text-gray-700">
                            Notre mission : devenir le maillon manquant entre le terrain et les instances décisionnaires.
                        </p>
                    </section>

                    <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm md:p-10">
                        <h2 className="text-3xl font-bold text-gray-900">Historique</h2>
                        <div className="mt-6 space-y-4 text-gray-700">
                            {historiqueContexte.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-900">Constats clés</h3>
                            <div className="mt-4">
                                <BulletList items={historiqueConstats} />
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-900">Pourquoi le SNA s’est constitué</h3>
                            <div className="mt-4">
                                <BulletList items={historiqueObjectifs} />
                            </div>
                        </div>

                        <div className="mt-8 space-y-4 text-gray-700">
                            <p>
                                La création du Syndicat national des aidants répond à une nécessité sociale, démocratique et opérationnelle. Il n’a pas vocation à se placer en opposition aux institutions existantes.
                            </p>
                            <p>
                                Au contraire, il se positionne comme un partenaire constructif de l’ensemble des acteurs qui œuvrent déjà autour du handicap et de la perte d’autonomie : institutions publiques, organismes sociaux, agences, établissements, associations, professionnels et décideurs.
                            </p>
                            <p>
                                Il ne s’agit pas de remettre en cause les acteurs en place, mais de compléter et renforcer l’existant, en apportant ce qui manque le plus aujourd’hui : la voix structurée et représentative des aidants eux-mêmes.
                            </p>
                            <p>
                                Le Syndicat national des aidants se veut transversal, inclusif et représentatif. Il rassemble et représente tous les aidants, quels que soient :
                            </p>
                        </div>

                        <div className="mt-4">
                            <BulletList items={historiqueRepresentation} />
                        </div>

                        <div className="mt-6 space-y-4 text-gray-700">
                            <p>
                                Parce que l’aide traverse toutes les sphères de la société, aucun aidant ne doit être laissé en marge des réflexions et des décisions.
                            </p>
                            <p>
                                Le Syndicat national des aidants s’inscrit dans une démarche de coopération exigeante et responsable. Il vise à transformer l’expérience du terrain en un outil d’analyse, de proposition et d’action.
                            </p>
                        </div>

                        <div className="mt-4">
                            <BulletList items={historiqueActions} />
                        </div>

                        <div className="mt-6 space-y-4 text-gray-700">
                            <p>
                                Les aidants ne demandent ni privilèges ni oppositions stériles. Ils demandent des réponses cohérentes, ajustées à la réalité et construites collectivement.
                            </p>
                            <p>
                                Dans cet esprit, la création du Syndicat national des aidants est non seulement légitime, il doit être un levier indispensable de dialogue, d’amélioration et de progrès partagé.
                            </p>
                            <p>
                                Parce que la solidarité ne suffit plus, il faut une représentation légitime. Le syndicat est l’outil juridique et politique indispensable pour s’asseoir à la table des négociations.
                            </p>
                            <p>
                                Nous ne sommes pas là pour contester par principe, mais pour co-construire une société où l’aidant n’est plus un oublié du système, mais un partenaire respecté et soutenu.
                            </p>
                            <p>
                                Ensemble, faisons de l’expérience de terrain le moteur de la décision publique.
                            </p>
                            <p>
                                Le Syndicat National des Aidants naît d’une ambition claire : combler le fossé entre les instances décisionnaires et le terrain.
                            </p>
                            <p className="text-lg font-semibold text-sna-teal-dark">
                                Notre mission : Devenir le maillon manquant.
                            </p>
                            <p className="font-medium">
                                Parce que l’aidance n’est pas une faiblesse. C’est une responsabilité essentielle pour la société tout entière.
                            </p>
                        </div>
                    </section>

                    <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm md:p-10">
                        <h2 className="text-3xl font-bold text-gray-900">Rôle syndical</h2>
                        <div className="mt-6 space-y-4 text-gray-700">
                            <p className="font-semibold text-gray-900">Un syndicat des aidants est légitime car :</p>
                            <p>Les aidants constituent un groupe :</p>
                        </div>

                        <div className="mt-4">
                            <BulletList items={roleLegitimite} />
                        </div>

                        <div className="mt-6 space-y-4 text-gray-700">
                            <p>
                                La défense et la représentation des aidants est nécessaire car il existe un préjudice économique commun.
                            </p>
                            <p>Les aidants :</p>
                        </div>

                        <div className="mt-4">
                            <BulletList items={rolePrejudices} />
                        </div>

                        <div className="mt-6 space-y-4 text-gray-700">
                            <p>
                                Le Syndicat national des aidants se situe à l’interface entre le terrain et les instances. Il a pour rôle :
                            </p>
                        </div>

                        <div className="mt-4">
                            <BulletList items={roleMissions} />
                        </div>
                    </section>

                    <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm md:p-10">
                        <h2 className="text-3xl font-bold text-gray-900">Nos valeurs</h2>
                        <div className="mt-4">
                            <BulletList items={valeurs} />
                        </div>

                        <div className="mt-6 space-y-4 text-gray-700">
                            <p>
                                Le syndicat exerce ses activités en toute indépendance.
                            </p>
                            <p>
                                Il ne reçoit ni instruction, ni financement conditionné d’aucun parti politique, organisation confessionnelle, entreprise ou groupe d’intérêt.
                            </p>
                            <p>
                                Tout partenariat ou financement portant atteinte à cette indépendance est refusé.
                            </p>
                        </div>
                    </section>

                    <section className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
                        <h2 className="text-3xl font-bold text-gray-900">Gouvernance</h2>
                        <p className="mt-6 text-gray-700">Le SNA est constitué d’un Bureau avec :</p>
                        <div className="mt-4">
                            <BulletList items={gouvernance} />
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
