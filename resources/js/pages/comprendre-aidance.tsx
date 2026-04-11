import { Head, Link } from '@inertiajs/react';
import PublicSiteHeader from '@/components/public-site-header';
import { CheckCircle2 } from 'lucide-react';

export default function ComprendreAidancePage() {
    return (
        <>
            <Head title="Comprendre l'aidance — SNA">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-white text-gray-800">
                <PublicSiteHeader />

                <main className="mx-auto max-w-4xl px-6 py-12">
                    {/* Hero Section */}
                    <section className="mb-16 border-b border-gray-200 pb-12">
                        <div className="rounded-2xl bg-gradient-to-br from-sna-teal/10 to-sna-green/10 p-8 md:p-12">
                            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
                                Comprendre l'aidance
                            </h1>
                            <div className="mt-6 space-y-3 text-lg text-gray-700">
                                <p className="font-medium">
                                    On ne devient pas toujours aidant par choix.
                                </p>
                                <p>Souvent, on le devient sans le savoir.</p>
                                <p>
                                    Chaque jour, des millions de personnes accompagnent un proche
                                    fragilisé par la maladie, le handicap ou la perte d'autonomie.
                                </p>
                                <p>Sans toujours se définir comme aidant·e.</p>
                                <p>Sans toujours connaître leurs droits.</p>
                                <p>
                                    Sans toujours mesurer l'impact sur leur propre vie.
                                </p>
                            </div>

                            <div className="mt-8 space-y-3 rounded-lg bg-white/60 p-6 backdrop-blur-sm">
                                <p className="font-semibold text-sna-teal-dark">
                                    Cette page vous permet de :
                                </p>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sna-teal" />
                                        <span>Comprendre ce qu'est réellement l'aidance</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sna-teal" />
                                        <span>Identifier votre situation</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sna-teal" />
                                        <span>Mesurer son impact</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sna-teal" />
                                        <span>Ne plus rester seul face à cette réalité</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: What is a caregiver? */}
                    <section className="mb-14">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Qu'est-ce qu'un aidant ?
                                </h2>
                                <div className="mt-1 h-1 w-16 bg-sna-teal" />
                            </div>

                            <div className="prose prose-lg max-w-none text-gray-700">
                                <p className="text-lg font-medium text-gray-900">
                                    Un·e aidant·e est une personne qui apporte une aide régulière
                                    à un proche en difficulté.
                                </p>

                                <p className="mt-4">
                                    Cette aide peut être :
                                </p>
                                <ul className="mt-2 space-y-2">
                                    <li>Accompagner au quotidien</li>
                                    <li>Organiser les soins</li>
                                    <li>Gérer les démarches administratives</li>
                                    <li>Soutenir moralement</li>
                                </ul>

                                <p className="mt-6 font-semibold text-gray-900">
                                    Être aidant, ce n'est pas un statut officiel.
                                    <br />
                                    C'est une réalité vécue.
                                </p>

                                <p className="mt-4">
                                    Et cette réalité transforme profondément la vie :
                                </p>
                                <ul className="mt-2 space-y-2">
                                    <li>Organisation du quotidien</li>
                                    <li>Vie professionnelle impactée</li>
                                    <li>Relations familiales modifiées</li>
                                    <li>Fatigue physique et mentale</li>
                                    <li>Isolement progressif</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Different forms of caregiving */}
                    <section className="mb-14 rounded-2xl border border-gray-200 bg-gray-50 p-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Les différentes formes d'aidance
                        </h2>
                        <div className="mt-1 h-1 w-16 bg-sna-green" />

                        <p className="mt-6 text-gray-700">
                            L'aidance ne correspond pas à un seul profil. Vous pouvez être
                            aidant·e si :
                        </p>

                        <div className="mt-6 grid gap-3 md:grid-cols-2">
                            {[
                                'Vous accompagnez un enfant en situation de handicap',
                                'Vous soutenez un parent vieillissant',
                                'Vous aidez un conjoint malade',
                                'Vous coordonnez des soins ou des démarches',
                                'Vous êtes la personne sur qui tout repose',
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-sna-green shrink-0" />
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 rounded-lg border-l-4 border-sna-teal bg-sna-teal/5 p-4">
                            <p className="font-semibold text-gray-900">
                                Point clé : Il n'y a pas de "petite aidance".
                            </p>
                            <p className="mt-1 text-gray-700">
                                Dès qu'il y a régularité et responsabilité, il y a aidance.
                            </p>
                        </div>
                    </section>

                    {/* Section 4: Test */}
                    <section className="mb-14">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Êtes-vous aidant sans le savoir ?
                        </h2>
                        <div className="mt-1 h-1 w-16 bg-sna-teal" />

                        <p className="mt-6 text-lg font-medium text-gray-900">
                            Faites le point en 1 minute
                        </p>
                        <p className="mt-2 text-gray-700">
                            Répondez simplement par oui ou non :
                        </p>

                        <div className="mt-8 space-y-3">
                            {[
                                'Vous aidez régulièrement un proche dans son quotidien',
                                'Vous organisez ou suivez des soins',
                                'Vous êtes souvent préoccupé par sa situation',
                                "Vous avez adapté votre travail ou votre emploi du temps",
                                'Vous gérez des démarches administratives',
                                'Vous êtes sollicité en cas d\'urgence',
                                'Vous ressentez de la fatigue liée à cette situation',
                                'Vous avez moins de temps pour vous',
                                'Vous vous sentez parfois seul face à cette responsabilité',
                                'Vous avez le sentiment que votre rôle n\'est pas reconnu',
                            ].map((item, idx) => (
                                <label key={idx} className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        className="h-5 w-5 rounded border-gray-300 text-sna-teal"
                                        aria-label={item}
                                    />
                                    <span className="text-gray-700">{item}</span>
                                </label>
                            ))}
                        </div>

                        <div className="mt-8 space-y-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 p-6">
                            <h3 className="font-semibold text-gray-900">Résultat</h3>
                            <div className="space-y-3">
                                <div className="flex gap-3">
                                    <div className="rounded-lg bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-900">
                                        2 à 4 oui
                                    </div>
                                    <p className="text-gray-700">
                                        → vous êtes probablement aidant
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="rounded-lg bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-900">
                                        5 ou plus
                                    </div>
                                    <p className="text-gray-700">
                                        → vous êtes clairement aidant
                                    </p>
                                </div>
                            </div>
                            <p className="mt-4 font-medium text-gray-900">
                                Et si vous vous reconnaissez, vous n'êtes pas seul·e.
                            </p>
                        </div>
                    </section>

                    {/* Section 5: What caregiving changes in life */}
                    <section className="mb-14">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Ce que l'aidance change dans une vie
                        </h2>
                        <div className="mt-1 h-1 w-16 bg-sna-green" />

                        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6">
                            <p className="text-gray-700">
                                Aider un proche est un engagement profondément humain.
                            </p>
                            <p className="mt-3 text-gray-700">
                                Mais lorsqu'il devient quotidien, il peut avoir des
                                conséquences importantes.
                            </p>

                            <p className="mt-6 font-semibold text-gray-900">
                                L'aidance peut entraîner :
                            </p>
                            <ul className="mt-3 space-y-2">
                                {[
                                    'Une fatigue chronique',
                                    'Une charge mentale permanente',
                                    'Un isolement social',
                                    'Un impact sur la vie professionnelle',
                                    'Une dégradation de la santé',
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="mt-1 h-2 w-2 rounded-full bg-red-500 shrink-0" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <p className="mt-6 rounded-lg bg-white p-3 font-medium text-sna-teal-dark">
                                ⚠️ L'aidance ne doit pas se faire au détriment de votre
                                équilibre.
                            </p>
                        </div>
                    </section>

                    {/* Section 6: Aidantometer */}
                    <section className="mb-14 rounded-2xl border border-gray-200 bg-gray-50 p-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Comprendre les niveaux d'aidance
                        </h2>
                        <div className="mt-1 h-1 w-16 bg-sna-teal" />

                        <p className="mt-6 text-gray-700">
                            L'aidance évolue par étapes. Elle ne devient pas difficile du jour
                            au lendemain. Elle progresse souvent ainsi :
                        </p>

                        <div className="mt-8">
                            <img
                                src="/images/Aidantométre.pdf"
                                alt="Aidantomètre - Les niveaux d'aidance"
                                className="w-full rounded-lg"
                            />
                        </div>

                        <p className="mt-6 text-center font-semibold text-gray-900">
                            Cet outil permet de vous situer rapidement.
                        </p>
                        <p className="mt-2 text-center text-gray-700">
                            Objectif : prise de conscience immédiate.
                        </p>
                    </section>

                    {/* Section 7: INVIA Scale */}
                    <section className="mb-14">
                        <h2 className="text-3xl font-bold text-gray-900">
                            INVIA — Rendre visible l'invisible
                        </h2>
                        <div className="mt-1 h-1 w-16 bg-sna-green" />

                        <p className="mt-6 font-semibold text-gray-900">
                            Mesurer la violence institutionnelle
                        </p>
                        <p className="mt-3 text-gray-700">
                            Le SNA a créé un outil inédit : l'Indice National de Violence
                            Institutionnelle subie par les Aidants.
                        </p>

                        <p className="mt-4 text-gray-700">
                            Cet indice permet d'identifier les situations où :
                        </p>
                        <ul className="mt-3 space-y-2">
                            {[
                                'Les démarches deviennent épuisantes',
                                'Les décisions sont imposées',
                                'Les familles ne sont plus écoutées',
                                'La relation avec les institutions se dégrade',
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-sna-teal shrink-0" />
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8">
                            <img
                                src="/images/ECHELLE%20INVIA%20H.png"
                                alt="INVIA - Indice National de Violence Institutionnelle subie par les Aidants"
                                className="w-full rounded-lg"
                            />
                        </div>
                    </section>

                    {/* Section 8: Understanding what really exhausts caregivers */}
                    <section className="mb-14 rounded-2xl border border-orange-200 bg-orange-50 p-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Comprendre ce qui fatigue vraiment les aidants
                        </h2>
                        <div className="mt-1 h-1 w-16 bg-sna-green" />

                        <p className="mt-6 text-gray-700">
                            Pendant longtemps, on a considéré que l'épuisement des aidants
                            venait uniquement de l'aide apportée.
                        </p>
                        <p className="mt-3 text-gray-700">
                            Mais la réalité est plus complexe.
                        </p>

                        <p className="mt-6 font-semibold text-gray-900">
                            Ce qui épuise aussi les aidants :
                        </p>
                        <ul className="mt-3 space-y-2">
                            {[
                                'La complexité administrative',
                                'Le manque d\'information',
                                'Les décisions incomprises',
                                'L\'absence de coordination',
                                'Le manque de solutions',
                                'Le déséquilibre avec les institutions',
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-orange-500 shrink-0" />
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 rounded-lg bg-white p-4 font-medium text-orange-900">
                            <p>
                                L'épuisement n'est pas seulement personnel.
                                <br />
                                Il est aussi systémique.
                            </p>
                        </div>
                    </section>

                    {/* Section 9: Being a caregiver without forgetting yourself */}
                    <section className="mb-14">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Être aidant sans s'oublier
                        </h2>
                        <div className="mt-1 h-1 w-16 bg-sna-teal" />

                        <div className="mt-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 p-6">
                            <p className="text-gray-700">
                                Être aidant ne signifie pas se sacrifier.
                            </p>
                            <p className="mt-3 text-gray-700">
                                Un équilibre est nécessaire entre :
                            </p>

                            <ul className="mt-4 space-y-2">
                                {[
                                    'Accompagner son proche',
                                    'Préserver sa santé',
                                    'Maintenir sa vie sociale',
                                    'Respecter ses limites',
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="mt-1 h-2 w-2 rounded-full bg-green-600 shrink-0" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <p className="mt-6 font-semibold text-sna-teal-dark">
                                Prendre soin de soi est une condition pour pouvoir continuer
                                à aider.
                            </p>
                        </div>
                    </section>

                    {/* Section 10: You're not alone */}
                    <section className="mb-16 rounded-2xl border border-sna-teal bg-gradient-to-br from-sna-teal/5 to-sna-teal/10 p-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Vous n'êtes pas seul
                        </h2>
                        <div className="mt-1 h-1 w-16 bg-sna-teal" />

                        <p className="mt-6 text-gray-700">
                            Des millions de personnes vivent la même situation. Mais trop
                            souvent :
                        </p>

                        <ul className="mt-4 space-y-2">
                            {[
                                'Elles ne se reconnaissent pas comme aidants',
                                'Elles ne connaissent pas leurs droits',
                                'Elles restent isolées',
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-sna-teal shrink-0" />
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Buttons */}
                        <div className="mt-10 space-y-3">
                            <h3 className="font-semibold text-gray-900">
                                Passez à l'action
                            </h3>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="/formulaire/adhesion"
                                    className="inline-flex items-center justify-center rounded-lg bg-sna-teal px-6 py-3 font-semibold text-white transition hover:bg-sna-teal-dark"
                                >
                                    Je rejoins le SNA
                                </Link>
                                <Link
                                    href="/formulaire/contact"
                                    className="inline-flex items-center justify-center rounded-lg border-2 border-sna-teal px-6 py-3 font-semibold text-sna-teal transition hover:bg-sna-teal/5"
                                >
                                    Je partage mon témoignage
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
