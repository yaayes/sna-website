import { useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import forms from '@/routes/forms';

const inputCls =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/30 focus:outline-none placeholder:text-gray-300';
const labelCls = 'mb-1.5 block text-sm font-semibold text-gray-700';
const OTHER_CONSEQUENCE = 'Autre';

export default function MoiAussiForm({ actionId }: { actionId?: number }) {
    const {
        data,
        setData,
        submit,
        processing,
        errors,
        wasSuccessful,
        reset,
        transform,
    } = useForm<{
            action_id: number | null;
            situation: string;
            testimony: string;
            consequences: string[];
            other_consequence: string;
            contacted_institution: string;
            institution_name: string;
            usage_anonymised: boolean;
            usage_collective: boolean;
            usage_legislation: boolean;
            usage_confidential: boolean;
            name: string;
            email: string;
            phone: string;
        }>({
            action_id: actionId ?? null,
            situation: '',
            testimony: '',
            consequences: [],
            other_consequence: '',
            contacted_institution: '',
            institution_name: '',
            usage_anonymised: false,
            usage_collective: false,
            usage_legislation: false,
            usage_confidential: false,
            name: '',
            email: '',
            phone: '',
        });

    const toggleConsequence = (item: string) => {
        const isRemoving = data.consequences.includes(item);

        if (item === OTHER_CONSEQUENCE && isRemoving) {
            setData('other_consequence', '');
        }

        setData(
            'consequences',
            isRemoving
                ? data.consequences.filter((c) => c !== item)
                : [...data.consequences, item],
        );
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        transform(({ other_consequence, ...formData }) => ({
            ...formData,
            consequences: formData.consequences.map((item) => {
                if (
                    item !== OTHER_CONSEQUENCE ||
                    other_consequence.trim() === ''
                ) {
                    return item;
                }

                return `Autre : ${other_consequence.trim()}`;
            }),
        }));

        submit(forms.moiAussi.store(), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const otherConsequenceSelected = data.consequences.includes(
        OTHER_CONSEQUENCE,
    );

    if (wasSuccessful) {
        return (
            <div className="space-y-4 rounded-3xl border border-teal-200 bg-teal-50 p-12 text-center shadow-lg">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100 text-4xl">
                    💙
                </div>
                <h2 className="text-2xl font-bold text-teal-800">
                    Témoignage envoyé !
                </h2>
                <p className="text-teal-700">
                    Merci de votre confiance. Votre témoignage contribue à
                    notre action collective.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Avez-vous été confronté(e) à cette problématique ? *
                </label>
                <div className="flex flex-col gap-2">
                    {[
                        { value: 'oui', label: 'Oui' },
                        { value: 'en_cours', label: 'En cours' },
                        { value: 'resolu', label: 'Résolu mais difficile' },
                    ].map((opt) => (
                        <label
                            key={opt.value}
                            className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-600 transition hover:border-sna-teal"
                        >
                            <input
                                type="radio"
                                name="situation"
                                value={opt.value}
                                checked={data.situation === opt.value}
                                onChange={() =>
                                    setData('situation', opt.value)
                                }
                                className="accent-sna-teal"
                            />
                            {opt.label}
                        </label>
                    ))}
                </div>
                {errors.situation && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.situation}
                    </p>
                )}
            </div>

            <div>
                <label className={labelCls}>
                    Racontez-nous ce que vous avez vécu *
                </label>
                <textarea
                    rows={5}
                    value={data.testimony}
                    onChange={(e) => setData('testimony', e.target.value)}
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition placeholder:text-gray-300 focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/30 focus:outline-none"
                    placeholder="Décrivez librement votre expérience. Chaque détail compte pour renforcer notre action collective…"
                />
                {errors.testimony && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.testimony}
                    </p>
                )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Quelles ont été les conséquences pour vous ?
                </label>
                <div className="flex flex-col gap-2">
                    {[
                        'Perte financière',
                        'Impact professionnel',
                        'Impact sur la santé / sécurité',
                        'Démarches administratives lourdes',
                        'Isolement',
                        OTHER_CONSEQUENCE,
                    ].map((item) => (
                        <label
                            key={item}
                            className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs text-gray-600 transition hover:border-sna-teal/50 hover:bg-sna-teal/5"
                        >
                            <input
                                type="checkbox"
                                checked={data.consequences.includes(item)}
                                onChange={() => toggleConsequence(item)}
                                className="h-4 w-4 rounded accent-sna-teal"
                            />
                            {item}
                        </label>
                    ))}
                </div>
                {otherConsequenceSelected && (
                    <div className="mt-3">
                        <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                            Précisez l'autre conséquence
                        </label>
                        <input
                            type="text"
                            value={data.other_consequence}
                            onChange={(e) =>
                                setData('other_consequence', e.target.value)
                            }
                            className={inputCls}
                            placeholder="Décrivez l'autre conséquence rencontrée"
                            maxLength={90}
                        />
                    </div>
                )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Avez-vous saisi une institution ?
                </label>
                <div className="mb-3 flex gap-4">
                    {[
                        { value: 'oui', label: 'Oui' },
                        { value: 'non', label: 'Non' },
                    ].map((opt) => (
                        <label
                            key={opt.value}
                            className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                        >
                            <input
                                type="radio"
                                name="institution"
                                value={opt.value}
                                checked={
                                    data.contacted_institution === opt.value
                                }
                                onChange={() =>
                                    setData(
                                        'contacted_institution',
                                        opt.value,
                                    )
                                }
                                className="accent-sna-teal"
                            />
                            {opt.label}
                        </label>
                    ))}
                </div>
                <input
                    type="text"
                    value={data.institution_name}
                    onChange={(e) =>
                        setData('institution_name', e.target.value)
                    }
                    className={inputCls}
                    placeholder="Si oui, laquelle ? (CAF, MDPH, employeur, assurance…)"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Acceptez-vous que votre témoignage soit utilisé *
                </label>
                <div className="space-y-2">
                    {[
                        {
                            key: 'usage_anonymised' as const,
                            label: 'De manière anonymisée',
                        },
                        {
                            key: 'usage_collective' as const,
                            label: 'Dans une action collective',
                        },
                        {
                            key: 'usage_legislation' as const,
                            label: 'Pour appuyer une proposition de loi',
                        },
                        {
                            key: 'usage_confidential' as const,
                            label: 'Je souhaite rester totalement confidentiel(le)',
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
                                    setData(item.key, e.target.checked)
                                }
                                className="h-4 w-4 rounded accent-sna-teal"
                            />
                            {item.label}
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-gray-50 pt-4">
                <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                        Nom (facultatif)
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={inputCls}
                    />
                </div>
                <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className={inputCls}
                    />
                    {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.email}
                        </p>
                    )}
                </div>
                <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                        Téléphone
                    </label>
                    <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className={inputCls}
                    />
                </div>
            </div>

            <p className="rounded-xl bg-gray-50 p-4 text-xs leading-relaxed text-gray-400">
                🔒 Les informations recueillies sont strictement
                confidentielles et utilisées uniquement dans le cadre des
                actions collectives du SNA. Aucun témoignage ne sera publié
                sans votre accord explicite.
            </p>

            <button
                type="submit"
                disabled={processing}
                className="w-full rounded-full bg-sna-teal py-3.5 text-sm font-bold text-white shadow-lg shadow-sna-teal/20 transition-all hover:-translate-y-0.5 hover:bg-sna-teal-dark disabled:opacity-60"
            >
                {processing ? 'Envoi en cours…' : 'Envoyer mon témoignage'}
            </button>
        </form>
    );
}
