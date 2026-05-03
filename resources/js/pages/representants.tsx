import { Head } from '@inertiajs/react';
import FranceDepartmentsMap from '@/components/france-departments-map';
import PublicSiteHeader from '@/components/public-site-header';

type Representant = {
    id: number;
    department_code: string;
    department_name: string;
    first_name: string;
    last_name: string;
    role: string;
    short_bio: string;
    photo_path: string | null;
};

function Avatar({ representant }: { representant: Representant }) {
    if (representant.photo_path) {
        return (
            <img
                src={representant.photo_path}
                alt={`Photo de ${representant.first_name} ${representant.last_name}`}
                className="h-full w-full object-cover"
            />
        );
    }

    return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sna-teal/20 to-sna-teal/5 text-3xl font-bold text-sna-teal">
            {representant.first_name[0]}
            {representant.last_name[0]}
        </div>
    );
}

export default function RepresentantsPage({ representants }: { representants: Representant[] }) {
    return (
        <>
            <Head title="Représentants départementaux — SNA" />

            <div className="min-h-screen bg-[#f8fbfb] text-gray-800">
                <PublicSiteHeader />

                <main>
                    {/* Hero */}
                    <section className="bg-white">
                        <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
                            <p className="text-sm font-semibold tracking-[0.2em] text-sna-teal uppercase">
                                LE SNA — RÉSEAU TERRITORIAL
                            </p>
                            <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
                                Nos représentants
                                <br />
                                <span className="text-sna-teal">départementaux</span>
                            </h1>
                            <p className="mt-6 max-w-2xl text-lg text-gray-600">
                                Un maillage territorial au service des aidants. Nos représentants incarnent la conviction
                                que les politiques publiques ne peuvent être justes que si elles partent du terrain.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                                {[
                                    {
                                        title: 'Engagement de terrain',
                                        body: 'Au contact direct des aidants, ancrés dans les territoires, porteurs des réalités locales.',
                                    },
                                    {
                                        title: 'Rôle stratégique',
                                        body: "Ils transforment l'expérience vécue en expertise collective et représentent les aidants auprès des acteurs locaux.",
                                    },
                                    {
                                        title: "Force d'influence",
                                        body: 'Leur présence territoriale construit le rapport de force et renforce la légitimité du syndicat.',
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.title}
                                        className="rounded-2xl border border-sna-teal/15 bg-[#f8fbfb] p-5"
                                    >
                                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                        <p className="mt-1 text-sm text-gray-600">{item.body}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Map hint + count */}
                    <section className="border-y border-sna-teal/10 bg-gradient-to-r from-sna-teal/5 via-white to-sna-teal/5">
                        <div className="mx-auto max-w-5xl px-6 py-6">
                            <p className="text-center text-sm font-medium text-gray-500">
                                <span className="text-2xl font-bold text-sna-teal">{representants.length}</span>{' '}
                                représentants actifs dans{' '}
                                <span className="font-semibold text-gray-700">
                                    {new Set(representants.map((r) => r.department_code)).size}
                                </span>{' '}
                                départements — de la métropole aux territoires d'outre-mer.
                            </p>
                        </div>
                    </section>

                    {/* Interactive map */}
                    <section className="mx-auto max-w-5xl px-6 py-12">
                        <FranceDepartmentsMap representants={representants} />
                    </section>

                    {/* Representatives grid */}
                    <section className="mx-auto max-w-5xl px-6 py-14">
                        <h2 className="sr-only">Liste des représentants par département</h2>

                        {representants.length === 0 ? (
                            <p className="text-center text-gray-500">
                                Aucun représentant n'est enregistré pour le moment.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {representants.map((representant) => (
                                    <article
                                        key={representant.id}
                                        className="group flex flex-col rounded-3xl border border-transparent bg-white shadow-sm transition-all duration-300 hover:border-sna-teal/20 hover:shadow-md"
                                    >
                                        {/* Photo */}
                                        <div className="relative h-56 w-full overflow-hidden rounded-t-3xl bg-gray-100">
                                            <Avatar representant={representant} />
                                            {/* Department badge */}
                                            <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-700 shadow-sm backdrop-blur-sm">
                                                <span className="font-mono text-sna-teal">
                                                    {representant.department_code}
                                                </span>
                                                <span className="text-gray-400">—</span>
                                                <span>{representant.department_name}</span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-1 flex-col p-6">
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {representant.first_name}{' '}
                                                <span className="text-gray-700">{representant.last_name}</span>
                                            </h3>
                                            <p className="mt-0.5 text-xs font-semibold tracking-wide text-sna-teal uppercase">
                                                {representant.role}
                                            </p>
                                            <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">
                                                {representant.short_bio}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* CTA — become a representative */}
                    <section className="bg-white">
                        <div className="mx-auto max-w-5xl px-6 py-14">
                            <div className="rounded-3xl border border-sna-teal/20 bg-gradient-to-br from-sna-teal/5 to-white p-10 text-center shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                                    Rejoindre le mouvement
                                </h2>
                                <p className="mx-auto mt-4 max-w-xl text-gray-600">
                                    Des millions d'aidants ne sont pas encore représentés. Vous êtes aidant ou ancien
                                    aidant, professionnel concerné ou citoyen mobilisé ?
                                </p>
                                <p className="mt-6 font-semibold text-gray-700">
                                    Candidatez en envoyant CV + lettre de motivation à{' '}
                                    <a
                                        href="mailto:syndicatnationaldesaidants@gmail.com"
                                        className="text-sna-teal underline underline-offset-2 hover:text-sna-teal-dark"
                                    >
                                        syndicatnationaldesaidants@gmail.com
                                    </a>
                                </p>
                                <p className="mt-2 text-sm text-gray-500">
                                    Sans ancrage territorial, il n'y a pas de transformation nationale.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
