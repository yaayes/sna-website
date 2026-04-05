import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import PublicSiteHeader from '@/components/public-site-header';
import forms from '@/routes/forms';

type ActionItem = {
    id: number;
    title: string;
    slug: string;
    category: string;
    content: string;
};

type RelatedAction = {
    id: number;
    title: string;
    slug: string;
};

export default function ActionShowPage({
    actionItem,
    relatedActions,
}: {
    actionItem: ActionItem;
    relatedActions: RelatedAction[];
}) {
    const { data, setData, submit, processing, errors, wasSuccessful, reset } =
        useForm({
            action_id: actionItem.id,
            situation: '',
            testimony: '',
            name: '',
            email: '',
            usage_anonymised: true,
            usage_collective: true,
            usage_legislation: false,
            usage_confidential: false,
            contacted_institution: false,
            institution_name: '',
            consequences: [] as string[],
            phone: '',
        });

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        submit(forms.moiAussi.store(), {
            preserveScroll: true,
            onSuccess: () =>
                reset(
                    'situation',
                    'testimony',
                    'name',
                    'email',
                    'usage_legislation',
                    'usage_confidential',
                    'contacted_institution',
                    'institution_name',
                    'phone',
                ),
        });
    };

    return (
        <>
            <Head title={`${actionItem.title} — Nos Actions SNA`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-[#f8fcfc] text-gray-800">
                <PublicSiteHeader />

                <main className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1fr_360px]">
                    <article className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                        <p className="text-xs font-semibold tracking-widest text-sna-teal-dark uppercase">
                            {actionItem.category}
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                            {actionItem.title}
                        </h1>

                        <div
                            className="prose prose-lg prose-headings:text-gray-900 prose-a:text-sna-teal mt-6 max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: actionItem.content,
                            }}
                        />
                            <div
                                className="prose mt-6 max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: actionItem.content,
                                }}
                            />
                    </article>

                    <aside className="space-y-6">
                        <div className="rounded-2xl border border-sna-teal/20 bg-white p-5 shadow-[0_8px_24px_rgba(74,191,191,0.12)]">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Moi aussi, j'ai vecu ca
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Partagez votre temoignage relie a cette action
                                pour nourrir notre plaidoyer.
                            </p>

                            {wasSuccessful && (
                                <div className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                                    Merci, votre temoignage a bien ete envoye.
                                </div>
                            )}

                            <form
                                onSubmit={onSubmit}
                                className="mt-4 space-y-3"
                            >
                                <input type="hidden" value={data.action_id} />

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Situation *
                                    </label>
                                    <select
                                        value={data.situation}
                                        onChange={(event) =>
                                            setData(
                                                'situation',
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/20 focus:outline-none"
                                    >
                                        <option value="">Choisir</option>
                                        <option value="oui">Oui</option>
                                        <option value="en_cours">
                                            En cours
                                        </option>
                                        <option value="resolu">Resolu</option>
                                    </select>
                                    {errors.situation && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.situation}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Votre temoignage *
                                    </label>
                                    <textarea
                                        rows={5}
                                        value={data.testimony}
                                        onChange={(event) =>
                                            setData(
                                                'testimony',
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/20 focus:outline-none"
                                        placeholder="Racontez ce que vous vivez..."
                                    />
                                    {errors.testimony && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.testimony}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(event) =>
                                            setData('name', event.target.value)
                                        }
                                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/20 focus:outline-none"
                                        placeholder="Nom (optionnel)"
                                    />
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(event) =>
                                            setData('email', event.target.value)
                                        }
                                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/20 focus:outline-none"
                                        placeholder="Email (optionnel)"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-lg bg-sna-teal px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sna-teal-dark disabled:opacity-50"
                                >
                                    Envoyer mon temoignage
                                </button>
                            </form>
                        </div>

                        {relatedActions.length > 0 && (
                            <div className="rounded-2xl border border-gray-200 bg-white p-5">
                                <h3 className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
                                    Meme categorie
                                </h3>
                                <div className="mt-3 space-y-2">
                                    {relatedActions.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/nos-actions/${item.slug}`}
                                            className="block rounded-lg border border-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-sna-teal/30 hover:text-sna-teal"
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                </main>
            </div>
        </>
    );
}
