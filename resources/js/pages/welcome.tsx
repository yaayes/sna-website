import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { dashboard, login } from '@/routes';
import forms from '@/routes/forms';

/* ─────────────────────────────────────────────
   Inline SVG icons (no extra dep needed)
───────────────────────────────────────────── */
const HeartIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
    </svg>
);
const ShieldIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
    </svg>
);
const UsersIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
    </svg>
);
const MegaphoneIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
        />
    </svg>
);
const ArrowRightIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
    </svg>
);
const CheckIcon = ({
    className = 'h-4 w-4 text-sna-teal shrink-0',
}: {
    className?: string;
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);
const ChevronDownIcon = ({ className = 'h-5 w-5' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);
const MenuIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
        />
    </svg>
);
const XIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);
const HandIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
        />
    </svg>
);
const StarIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);
const ScaleIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
    </svg>
);
const SunIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m8.66-9H21M3 12H2m15.07-6.93l-.71.71M7.64 17.36l-.71.71M18.36 17.36l-.71-.71M6.34 6.34l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
    </svg>
);

/* ─────────────────────────────────────────────
   Hero Illustration – inline SVG scene
   A stylised parent & child with a heart
───────────────────────────────────────────── */
const HeroIllustration = () => (
    <svg
        viewBox="0 0 520 480"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-auto w-full max-w-lg"
    >
        {/* Background circles */}
        <circle cx="260" cy="240" r="210" fill="#e8f8f8" />
        <circle cx="260" cy="240" r="165" fill="#d2f2f2" opacity="0.5" />

        {/* Ground */}
        <ellipse
            cx="260"
            cy="410"
            rx="160"
            ry="18"
            fill="#4abfbf"
            opacity="0.12"
        />

        {/* ── Parent figure (left) ── */}
        {/* Body */}
        <rect x="155" y="220" width="68" height="120" rx="20" fill="#4abfbf" />
        {/* Head */}
        <circle cx="189" cy="200" r="30" fill="#fcd9b6" />
        {/* Hair */}
        <path d="M162 192 Q169 168 189 170 Q209 168 216 192" fill="#5a3825" />
        {/* Arms */}
        <path
            d="M155 255 Q125 268 118 290"
            stroke="#fcd9b6"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
        />
        <path
            d="M223 255 Q248 260 258 275"
            stroke="#fcd9b6"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
        />
        {/* Legs */}
        <rect x="165" y="330" width="22" height="70" rx="11" fill="#2d7a8a" />
        <rect x="196" y="330" width="22" height="70" rx="11" fill="#2d7a8a" />
        {/* Feet */}
        <ellipse cx="176" cy="400" rx="14" ry="7" fill="#1a4a55" />
        <ellipse cx="207" cy="400" rx="14" ry="7" fill="#1a4a55" />

        {/* ── Child figure (right, smaller) ── */}
        {/* Body */}
        <rect x="272" y="268" width="52" height="90" rx="16" fill="#a8c84a" />
        {/* Head */}
        <circle cx="298" cy="250" r="24" fill="#fcd9b6" />
        {/* Hair */}
        <path d="M276 243 Q282 224 298 226 Q314 224 320 243" fill="#c97b3a" />
        {/* Arms stretched up toward parent */}
        <path
            d="M272 290 Q256 278 250 270"
            stroke="#fcd9b6"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
        />
        <path
            d="M324 290 Q338 280 344 272"
            stroke="#fcd9b6"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
        />
        {/* Legs */}
        <rect x="278" y="350" width="18" height="54" rx="9" fill="#6a8a20" />
        <rect x="302" y="350" width="18" height="54" rx="9" fill="#6a8a20" />
        {/* Feet */}
        <ellipse cx="287" cy="404" rx="12" ry="6" fill="#4a5a15" />
        <ellipse cx="311" cy="404" rx="12" ry="6" fill="#4a5a15" />

        {/* Wheelchair (accessibility icon) */}
        <circle
            cx="355"
            cy="385"
            r="22"
            stroke="#4abfbf"
            strokeWidth="4"
            fill="none"
        />
        <circle
            cx="340"
            cy="385"
            r="15"
            stroke="#a8c84a"
            strokeWidth="3"
            fill="none"
        />
        <path
            d="M340 368 L340 355 Q340 348 347 348 L362 348"
            stroke="#4abfbf"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
        />
        <circle cx="345" cy="344" r="6" fill="#4abfbf" />

        {/* Holding hands / connection line */}
        <path
            d="M258 275 Q265 282 272 290"
            stroke="#fcd9b6"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
        />

        {/* ── Floating heart ── */}
        <g transform="translate(310, 185)">
            <path
                d="M0,-12 C0,-22 -18,-22 -18,-8 C-18,2 0,16 0,16 C0,16 18,2 18,-8 C18,-22 0,-22 0,-12 Z"
                fill="#f97066"
                opacity="0.9"
            />
        </g>

        {/* ── Floating sparkles / stars ── */}
        <g fill="#a8c84a" opacity="0.8">
            <polygon
                points="390,130 393,140 404,140 395,147 398,157 390,151 382,157 385,147 376,140 387,140"
                transform="scale(0.7) translate(170,10)"
            />
        </g>
        <g fill="#4abfbf" opacity="0.7">
            <polygon
                points="390,130 393,140 404,140 395,147 398,157 390,151 382,157 385,147 376,140 387,140"
                transform="scale(0.5) translate(-280,230)"
            />
        </g>
        <circle cx="420" cy="160" r="5" fill="#a8c84a" opacity="0.6" />
        <circle cx="108" cy="300" r="4" fill="#4abfbf" opacity="0.5" />
        <circle cx="148" cy="148" r="6" fill="#4abfbf" opacity="0.4" />
        <circle cx="390" cy="310" r="4" fill="#a8c84a" opacity="0.5" />

        {/* ── Sun / warmth ── */}
        <circle cx="415" cy="95" r="28" fill="#fbbf24" opacity="0.3" />
        <circle cx="415" cy="95" r="18" fill="#fbbf24" opacity="0.5" />

        {/* Rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
                key={i}
                x1={415 + Math.cos((angle * Math.PI) / 180) * 22}
                y1={95 + Math.sin((angle * Math.PI) / 180) * 22}
                x2={415 + Math.cos((angle * Math.PI) / 180) * 32}
                y2={95 + Math.sin((angle * Math.PI) / 180) * 32}
                stroke="#fbbf24"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.6"
            />
        ))}
    </svg>
);

/* ─────────────────────────────────────────────
   Reusable Section Header
───────────────────────────────────────────── */
function SectionHeader({
    badge,
    title,
    subtitle,
}: {
    badge?: string;
    title: string;
    subtitle?: string;
}) {
    return (
        <div className="mx-auto max-w-2xl space-y-3 text-center">
            {badge && (
                <span className="inline-block rounded-full bg-sna-teal/15 px-4 py-1 text-xs font-bold tracking-widest text-sna-teal-dark uppercase">
                    {badge}
                </span>
            )}
            <h2 className="text-3xl leading-tight font-bold text-gray-800 sm:text-4xl">
                {title}
            </h2>
            {subtitle && (
                <p className="leading-relaxed text-gray-500">{subtitle}</p>
            )}
        </div>
    );
}

/* ─────────────────────────────────────────────
   FAQ Accordion Item
───────────────────────────────────────────── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-gray-50"
            >
                <span className="text-sm font-semibold text-gray-800 sm:text-base">
                    {question}
                </span>
                <span
                    className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                >
                    <ChevronDownIcon />
                </span>
            </button>
            {open && (
                <div className="border-t border-gray-50 px-6 pb-5 text-sm leading-relaxed text-gray-500">
                    <p className="pt-4">{answer}</p>
                </div>
            )}
        </div>
    );
}

/* ─────────────────────────────────────────────
   FORMULAIRE SOUTIEN
───────────────────────────────────────────── */
function SoutienForm() {
    const { data, setData, submit, processing, errors, wasSuccessful, reset } =
        useForm({
            name: '',
            organisation: '',
            statut: 'physique',
            email: '',
            phone: '',
            wants_partnership: false,
            wants_events: false,
            wants_participation: false,
            message: '',
            consents_email: false,
            consents_rgpd: false,
        });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        submit(forms.soutien.store(), { onSuccess: () => reset() });
    };

    if (wasSuccessful) {
        return (
            <div className="space-y-3 rounded-3xl border border-teal-100 bg-teal-50 p-10 text-center shadow-sm">
                <span className="text-4xl">✅</span>
                <p className="font-bold text-teal-800">Demande envoyée !</p>
                <p className="text-sm text-teal-700">
                    Votre demande de soutien a bien été enregistrée. Merci pour
                    votre engagement.
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
        >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                        Nom et prénom *
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/50 focus:outline-none"
                        placeholder="Marie Dupont"
                    />
                    {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.name}
                        </p>
                    )}
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                        Nom de l'organisation (si personne morale)
                    </label>
                    <input
                        type="text"
                        value={data.organisation}
                        onChange={(e) =>
                            setData('organisation', e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/50 focus:outline-none"
                        placeholder="Association XYZ"
                    />
                </div>
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Statut *
                </label>
                <div className="flex gap-6">
                    {[
                        { value: 'physique', label: 'Personne physique' },
                        { value: 'morale', label: 'Personne morale' },
                    ].map((opt) => (
                        <label
                            key={opt.value}
                            className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                        >
                            <input
                                type="radio"
                                name="statut"
                                value={opt.value}
                                checked={data.statut === opt.value}
                                onChange={() => setData('statut', opt.value)}
                                className="accent-sna-teal"
                            />
                            {opt.label}
                        </label>
                    ))}
                </div>
                {errors.statut && (
                    <p className="mt-1 text-xs text-red-500">{errors.statut}</p>
                )}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                        Email *
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/50 focus:outline-none"
                        placeholder="marie@exemple.fr"
                    />
                    {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.email}
                        </p>
                    )}
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                        Téléphone
                    </label>
                    <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/50 focus:outline-none"
                        placeholder="+33 6 00 00 00 00"
                    />
                </div>
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Engagements souhaités
                </label>
                <div className="space-y-2">
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            checked={data.wants_partnership}
                            onChange={(e) =>
                                setData('wants_partnership', e.target.checked)
                            }
                            className="h-4 w-4 rounded accent-sna-teal"
                        />
                        Souhaitez-vous être partenaire ?
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            checked={data.wants_events}
                            onChange={(e) =>
                                setData('wants_events', e.target.checked)
                            }
                            className="h-4 w-4 rounded accent-sna-teal"
                        />
                        Souhaitez-vous être informé(e) des événements ou projets
                        ?
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            checked={data.wants_participation}
                            onChange={(e) =>
                                setData('wants_participation', e.target.checked)
                            }
                            className="h-4 w-4 rounded accent-sna-teal"
                        />
                        Souhaitez-vous participer aux événements ou projets ?
                    </label>
                </div>
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Message libre (facultatif)
                </label>
                <textarea
                    rows={3}
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/50 focus:outline-none"
                    placeholder="Partagez vos motivations ou questions…"
                />
            </div>

            <div className="space-y-2 border-t border-gray-50 pt-2">
                <label className="flex cursor-pointer items-start gap-3 text-xs text-gray-500">
                    <input
                        type="checkbox"
                        checked={data.consents_email}
                        onChange={(e) =>
                            setData('consents_email', e.target.checked)
                        }
                        className="mt-0.5 h-4 w-4 shrink-0 rounded accent-sna-teal"
                    />
                    J'autorise la réception d'informations par email
                </label>
                <label className="flex cursor-pointer items-start gap-3 text-xs text-gray-500">
                    <input
                        type="checkbox"
                        checked={data.consents_rgpd}
                        onChange={(e) =>
                            setData('consents_rgpd', e.target.checked)
                        }
                        className="mt-0.5 h-4 w-4 shrink-0 rounded accent-sna-teal"
                    />
                    Je consens au traitement de mes données personnelles
                    conformément au RGPD *
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
                className="w-full rounded-full bg-sna-teal py-3.5 text-sm font-bold text-white shadow-lg shadow-sna-teal/20 transition-all hover:-translate-y-0.5 hover:bg-sna-teal-dark disabled:opacity-60"
            >
                {processing
                    ? 'Envoi en cours…'
                    : 'Envoyer ma demande de soutien'}
            </button>
        </form>
    );
}

/* ─────────────────────────────────────────────
   FORMULAIRE PARTENAIRE
───────────────────────────────────────────── */
function PartenaireForm() {
    const { data, setData, submit, processing, errors, wasSuccessful, reset } =
        useForm({
            organisation_name: '',
            legal_status: '',
            email: '',
            contact_name: '',
            partnership_moral: false,
            partnership_technical: false,
            partnership_financial: false,
            objectives: '',
            commitment_projects: false,
            commitment_communication: false,
            commitment_expertise: false,
            consents_email: false,
            consents_rgpd: false,
        });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        submit(forms.partenaire.store(), { onSuccess: () => reset() });
    };

    if (wasSuccessful) {
        return (
            <div className="space-y-3 rounded-3xl border border-green-100 bg-green-50 p-10 text-center shadow-sm">
                <span className="text-4xl">✅</span>
                <p className="font-bold text-green-800">Demande envoyée !</p>
                <p className="text-sm text-green-700">
                    Votre demande de partenariat a bien été enregistrée. Nous
                    vous contacterons prochainement.
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-gray-100 bg-gray-50 p-8 shadow-sm"
        >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                        Nom de l'organisation *
                    </label>
                    <input
                        type="text"
                        value={data.organisation_name}
                        onChange={(e) =>
                            setData('organisation_name', e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition focus:border-sna-green focus:ring-2 focus:ring-sna-green/50 focus:outline-none"
                        placeholder="Mairie de Paris"
                    />
                    {errors.organisation_name && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.organisation_name}
                        </p>
                    )}
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                        Statut juridique *
                    </label>
                    <select
                        value={data.legal_status}
                        onChange={(e) =>
                            setData('legal_status', e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition focus:border-sna-green focus:ring-2 focus:ring-sna-green/50 focus:outline-none"
                    >
                        <option value="">Sélectionner…</option>
                        <option value="Collectivité territoriale">
                            Collectivité territoriale
                        </option>
                        <option value="Association">Association</option>
                        <option value="Entreprise">Entreprise</option>
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

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                        Email *
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition focus:border-sna-green focus:ring-2 focus:ring-sna-green/50 focus:outline-none"
                        placeholder="contact@organisation.fr"
                    />
                    {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.email}
                        </p>
                    )}
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                        Nom et fonction du contact *
                    </label>
                    <input
                        type="text"
                        value={data.contact_name}
                        onChange={(e) =>
                            setData('contact_name', e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition focus:border-sna-green focus:ring-2 focus:ring-sna-green/50 focus:outline-none"
                        placeholder="Jean Martin, Directeur"
                    />
                    {errors.contact_name && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.contact_name}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Type de partenariat souhaité *
                </label>
                <div className="space-y-2">
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            checked={data.partnership_moral}
                            onChange={(e) =>
                                setData('partnership_moral', e.target.checked)
                            }
                            className="h-4 w-4 rounded"
                            style={{ accentColor: 'var(--color-sna-green)' }}
                        />
                        Soutien moral ou promotionnel (visibilité,
                        communication)
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            checked={data.partnership_technical}
                            onChange={(e) =>
                                setData(
                                    'partnership_technical',
                                    e.target.checked,
                                )
                            }
                            className="h-4 w-4 rounded"
                            style={{ accentColor: 'var(--color-sna-green)' }}
                        />
                        Soutien technique ou expertise (conseil, appui sur
                        projets)
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            checked={data.partnership_financial}
                            onChange={(e) =>
                                setData(
                                    'partnership_financial',
                                    e.target.checked,
                                )
                            }
                            className="h-4 w-4 rounded"
                            style={{ accentColor: 'var(--color-sna-green)' }}
                        />
                        Soutien financier
                    </label>
                </div>
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Objectifs et motivations du partenariat *
                </label>
                <textarea
                    rows={4}
                    value={data.objectives}
                    onChange={(e) => setData('objectives', e.target.value)}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition focus:border-sna-green focus:ring-2 focus:ring-sna-green/50 focus:outline-none"
                    placeholder="Précisez l'objet de votre partenariat et les objectifs que vous souhaitez atteindre avec le SNA…"
                />
                {errors.objectives && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.objectives}
                    </p>
                )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Engagements envisagés
                </label>
                <div className="grid gap-3 sm:grid-cols-3">
                    {[
                        {
                            key: 'commitment_projects' as const,
                            label: 'Participation aux projets et événements',
                        },
                        {
                            key: 'commitment_communication' as const,
                            label: 'Communication et promotion des actions',
                        },
                        {
                            key: 'commitment_expertise' as const,
                            label: "Apport d'expertise ou de services",
                        },
                    ].map((item) => (
                        <label
                            key={item.key}
                            className="flex cursor-pointer items-start gap-2 rounded-xl border border-gray-100 bg-white p-3 text-xs text-gray-600 transition hover:border-sna-green/50"
                        >
                            <input
                                type="checkbox"
                                checked={data[item.key]}
                                onChange={(e) =>
                                    setData(item.key, e.target.checked)
                                }
                                className="mt-0.5 h-4 w-4"
                                style={{
                                    accentColor: 'var(--color-sna-green)',
                                }}
                            />
                            {item.label}
                        </label>
                    ))}
                </div>
            </div>

            <div className="space-y-2 border-t border-gray-100 pt-2">
                <label className="flex cursor-pointer items-start gap-3 text-xs text-gray-500">
                    <input
                        type="checkbox"
                        checked={data.consents_email}
                        onChange={(e) =>
                            setData('consents_email', e.target.checked)
                        }
                        className="mt-0.5 h-4 w-4 shrink-0 rounded"
                        style={{ accentColor: 'var(--color-sna-green)' }}
                    />
                    J'autorise la réception d'informations par email
                </label>
                <label className="flex cursor-pointer items-start gap-3 text-xs text-gray-500">
                    <input
                        type="checkbox"
                        checked={data.consents_rgpd}
                        onChange={(e) =>
                            setData('consents_rgpd', e.target.checked)
                        }
                        className="mt-0.5 h-4 w-4 shrink-0 rounded"
                        style={{ accentColor: 'var(--color-sna-green)' }}
                    />
                    Je consens au traitement des données personnelles
                    conformément au RGPD *
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
                className="w-full rounded-full py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:opacity-90 disabled:opacity-60"
                style={{
                    background: '#a8c84a',
                    boxShadow: '0 8px 20px rgba(168,200,74,0.25)',
                }}
            >
                {processing
                    ? 'Envoi en cours…'
                    : 'Soumettre notre demande de partenariat'}
            </button>
        </form>
    );
}

/* ─────────────────────────────────────────────
   FORMULAIRE MOI AUSSI
───────────────────────────────────────────── */
function MoiAussiForm() {
    const { data, setData, submit, processing, errors, wasSuccessful, reset } =
        useForm<{
            situation: string;
            testimony: string;
            consequences: string[];
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
            situation: '',
            testimony: '',
            consequences: [],
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
        setData(
            'consequences',
            data.consequences.includes(item)
                ? data.consequences.filter((c) => c !== item)
                : [...data.consequences, item],
        );
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        submit(forms.moiAussi.store(), { onSuccess: () => reset() });
    };

    if (wasSuccessful) {
        return (
            <div className="space-y-3 rounded-3xl border border-teal-100 bg-teal-50 p-10 text-center shadow-sm">
                <span className="text-4xl">💙</span>
                <p className="font-bold text-teal-800">Témoignage envoyé !</p>
                <p className="text-sm text-teal-700">
                    Merci de votre confiance. Votre témoignage contribue à notre
                    action collective.
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
        >
            <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Avez-vous été confronté(e) à cette problématique ? *
                </label>
                <div className="flex flex-wrap gap-3">
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
                                onChange={() => setData('situation', opt.value)}
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
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Racontez-nous ce que vous avez vécu *
                </label>
                <textarea
                    rows={5}
                    value={data.testimony}
                    onChange={(e) => setData('testimony', e.target.value)}
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/50 focus:outline-none"
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
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {[
                        'Perte financière',
                        'Impact professionnel',
                        'Impact sur la santé / sécurité',
                        'Démarches administratives lourdes',
                        'Isolement',
                        'Autre',
                    ].map((item) => (
                        <label
                            key={item}
                            className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs text-gray-600 transition hover:border-sna-teal/50"
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
                                    setData('contacted_institution', opt.value)
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
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/50 focus:outline-none"
                    placeholder="Si oui, laquelle ? (CAF, MDPH, employeur, assurance…)"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Acceptez-vous que votre témoignage soit utilisé *
                </label>
                <div className="space-y-2">
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            checked={data.usage_anonymised}
                            onChange={(e) =>
                                setData('usage_anonymised', e.target.checked)
                            }
                            className="h-4 w-4 rounded accent-sna-teal"
                        />
                        De manière anonymisée
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            checked={data.usage_collective}
                            onChange={(e) =>
                                setData('usage_collective', e.target.checked)
                            }
                            className="h-4 w-4 rounded accent-sna-teal"
                        />
                        Dans une action collective
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            checked={data.usage_legislation}
                            onChange={(e) =>
                                setData('usage_legislation', e.target.checked)
                            }
                            className="h-4 w-4 rounded accent-sna-teal"
                        />
                        Pour appuyer une proposition de loi
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            checked={data.usage_confidential}
                            onChange={(e) =>
                                setData('usage_confidential', e.target.checked)
                            }
                            className="h-4 w-4 rounded accent-sna-teal"
                        />
                        Je souhaite rester totalement confidentiel(le)
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-gray-50 pt-2 sm:grid-cols-3">
                <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                        Nom (facultatif)
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm transition focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/50 focus:outline-none"
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
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm transition focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/50 focus:outline-none"
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
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm transition focus:border-sna-teal focus:ring-2 focus:ring-sna-teal/50 focus:outline-none"
                    />
                </div>
            </div>

            <p className="rounded-xl bg-gray-50 p-4 text-xs leading-relaxed text-gray-400">
                🔒 Les informations recueillies sont strictement confidentielles
                et utilisées uniquement dans le cadre des actions collectives du
                SNA. Aucun témoignage ne sera publié sans votre accord
                explicite.
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

export default function Welcome() {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <Head title="SNA – Familles d'enfants en situation de handicap">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
                <meta
                    name="description"
                    content="Le Syndicat National des Aidants défend les droits des familles qui accompagnent un enfant en situation de handicap. Rejoignez le mouvement."
                />
            </Head>

            <div className="min-h-screen bg-white font-sans text-gray-800">
                {/* ══════════════════════════════
                    HEADER
                ══════════════════════════════ */}
                <header className="sticky top-0 z-50 border-b border-white/60 bg-white/90 shadow-[0_2px_20px_rgba(74,191,191,0.08)] backdrop-blur-md">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <img
                                src="/images/logo.png"
                                alt="Syndicat National des Aidants"
                                className="h-12 w-auto"
                            />
                        </Link>

                        {/* Nav links – desktop only */}
                        <nav className="hidden items-center gap-1 md:flex">
                            {[
                                { href: '#apropos', label: 'À propos' },
                                { href: '#actions', label: 'Nos actions' },
                                { href: '#contact', label: 'Contact' },
                            ].map(({ href, label }) => (
                                <a
                                    key={href}
                                    href={href}
                                    className="group relative px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-sna-teal"
                                >
                                    {label}
                                    <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-sna-teal transition-all duration-300 group-hover:w-4/5" />
                                </a>
                            ))}
                        </nav>

                        {/* Right side */}
                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-full bg-sna-teal px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-sna-teal-dark hover:shadow-lg hover:shadow-sna-teal/30"
                                >
                                    Mon espace
                                </Link>
                            ) : (
                                /* ── Fancy "Faire un don" button ── */
                                <a
                                    href="#contact"
                                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                                    style={{
                                        background:
                                            'linear-gradient(135deg, #4abfbf, #37a3a3, #a8c84a, #4abfbf)',
                                        backgroundSize: '300% 300%',
                                        boxShadow:
                                            '0 4px 20px rgba(74,191,191,0.45), 0 1px 3px rgba(0,0,0,0.1)',
                                        animation:
                                            'donate-gradient 4s ease infinite',
                                    }}
                                >
                                    {/* dual pulse rings */}
                                    <span
                                        className="pointer-events-none absolute inset-0 rounded-full"
                                        style={{
                                            boxShadow: '0 0 0 2px #4abfbf',
                                            animation:
                                                'donate-ring-1 2s ease-out infinite',
                                        }}
                                        aria-hidden="true"
                                    />
                                    <span
                                        className="pointer-events-none absolute inset-0 rounded-full"
                                        style={{
                                            boxShadow: '0 0 0 2px #a8c84a',
                                            animation:
                                                'donate-ring-2 2s ease-out infinite 0.5s',
                                        }}
                                        aria-hidden="true"
                                    />
                                    {/* shimmer loop */}
                                    <span
                                        className="pointer-events-none absolute inset-0 w-1/3 skew-x-[-20deg] bg-white/25 blur-sm"
                                        style={{
                                            animation:
                                                'donate-shimmer 3s ease-in-out infinite 1s',
                                        }}
                                        aria-hidden="true"
                                    />
                                    <span
                                        className="relative"
                                        style={{
                                            animation:
                                                'donate-heartbeat 2s ease-in-out infinite',
                                        }}
                                    >
                                        <HeartIcon className="h-4 w-4" />
                                    </span>
                                    <span className="relative tracking-wide">
                                        Faire un don
                                    </span>
                                    <ArrowRightIcon className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                </a>
                            )}

                            {/* Hamburger – mobile only */}
                            <button
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="relative flex h-9 w-9 items-center justify-center rounded-xl text-gray-600 transition-all duration-200 hover:bg-sna-teal/10 hover:text-sna-teal md:hidden"
                                aria-label={
                                    mobileMenuOpen
                                        ? 'Fermer le menu'
                                        : 'Ouvrir le menu'
                                }
                            >
                                <span
                                    className={`absolute transition-all duration-200 ${mobileMenuOpen ? 'rotate-90 opacity-100' : 'rotate-0 opacity-0'}`}
                                >
                                    <XIcon className="h-5 w-5" />
                                </span>
                                <span
                                    className={`absolute transition-all duration-200 ${mobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}
                                >
                                    <MenuIcon className="h-5 w-5" />
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile drawer */}
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        <div className="border-t border-sna-teal/10 bg-linear-to-b from-white to-[#f8fefe] px-5 pt-3 pb-6">
                            {/* Nav links */}
                            <nav className="mb-4 flex flex-col">
                                {[
                                    { href: '#apropos', label: 'À propos' },
                                    { href: '#actions', label: 'Nos actions' },
                                    { href: '#contact', label: 'Contact' },
                                ].map(({ href, label }, i) => (
                                    <a
                                        key={href}
                                        href={href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 transition-all duration-150 hover:bg-sna-teal/10 hover:pl-5 hover:text-sna-teal"
                                        style={{
                                            transitionDelay: mobileMenuOpen
                                                ? `${i * 40}ms`
                                                : '0ms',
                                        }}
                                    >
                                        {label}
                                        <ArrowRightIcon className="h-3.5 w-3.5 text-sna-teal/50" />
                                    </a>
                                ))}
                            </nav>

                            {/* Divider */}
                            <div className="mb-4 h-px bg-linear-to-r from-transparent via-sna-teal/20 to-transparent" />

                            {/* Donate CTA */}
                            {!auth.user && (
                                <a
                                    href="#contact"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl py-3.5 text-sm font-bold text-white transition-all duration-300 active:scale-95"
                                    style={{
                                        background:
                                            'linear-gradient(135deg, #4abfbf 0%, #37a3a3 50%, #a8c84a 100%)',
                                        boxShadow:
                                            '0 6px 24px rgba(74,191,191,0.35)',
                                    }}
                                >
                                    <span
                                        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/20 transition-transform duration-700 group-active:translate-x-[200%]"
                                        aria-hidden="true"
                                    />
                                    <HeartIcon className="h-4 w-4" />
                                    <span className="tracking-wide">
                                        Faire un don
                                    </span>
                                </a>
                            )}
                        </div>
                    </div>
                </header>

                {/* ══════════════════════════════
                    HERO
                ══════════════════════════════ */}
                <section className="relative overflow-hidden bg-linear-to-br from-[#e8f8f8] via-white to-[#f0f9e8] px-6 py-16 lg:py-24">
                    {/* Decorative blobs */}
                    <div className="pointer-events-none absolute -top-32 -right-32 h-125 w-125 rounded-full bg-sna-teal/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-sna-green/10 blur-2xl" />

                    <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:gap-16">
                        {/* ── Left: text ── */}
                        <div className="flex flex-1 flex-col items-start gap-6">
                            <span className="inline-flex items-center gap-2 rounded-full bg-sna-teal/15 px-4 py-1.5 text-sm font-semibold tracking-wide text-sna-teal-dark uppercase">
                                <StarIcon className="h-4 w-4 shrink-0" />
                                Syndicat National des Aidants
                            </span>

                            <h1 className="text-4xl leading-tight font-bold text-gray-800 sm:text-5xl lg:text-6xl">
                                Aux côtés des familles qui{' '}
                                <span className="relative text-sna-teal">
                                    accompagnent un enfant
                                    {/* underline squiggle */}
                                    <svg
                                        className="absolute -bottom-2 left-0 w-full"
                                        height="8"
                                        viewBox="0 0 300 8"
                                        preserveAspectRatio="none"
                                        fill="none"
                                    >
                                        <path
                                            d="M0 6 Q37.5 1 75 6 Q112.5 11 150 6 Q187.5 1 225 6 Q262.5 11 300 6"
                                            stroke="#4abfbf"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>{' '}
                                en situation de handicap
                            </h1>

                            <p className="max-w-xl text-lg leading-relaxed text-gray-500 sm:text-xl">
                                Parce que l'amour que vous portez à votre enfant
                                mérite reconnaissance, protection et soutien, le
                                SNA agit chaque jour pour transformer votre
                                quotidien.
                            </p>

                            {/* Trust badges */}
                            <div className="flex flex-wrap gap-3">
                                {[
                                    {
                                        icon: <ShieldIcon />,
                                        label: 'Droits défendus',
                                    },
                                    {
                                        icon: <UsersIcon />,
                                        label: 'Familles réunies',
                                    },
                                    {
                                        icon: <HandIcon />,
                                        label: 'Soutien concret',
                                    },
                                ].map((b) => (
                                    <span
                                        key={b.label}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm"
                                    >
                                        <span className="shrink-0 text-sna-teal">
                                            {b.icon}
                                        </span>
                                        {b.label}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                                <a
                                    href="#actions"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-sna-teal px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-sna-teal/30 transition-all hover:-translate-y-0.5 hover:bg-sna-teal-dark"
                                >
                                    Nos actions <ArrowRightIcon />
                                </a>
                                <a
                                    href="#moi-aussi"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-sna-teal px-8 py-3.5 text-base font-semibold text-sna-teal transition-colors hover:bg-sna-teal-light"
                                >
                                    « Moi aussi, j'ai vécu ça »
                                </a>
                            </div>

                            {/* Key figures */}
                            <div className="mt-2 grid w-full grid-cols-2 gap-5 rounded-2xl border border-gray-100 bg-white/90 px-6 py-5 shadow-md backdrop-blur sm:grid-cols-4">
                                {[
                                    {
                                        value: '11 M',
                                        label: 'Aidants en France',
                                        icon: (
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.8}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        ),
                                    },
                                    {
                                        value: '700 K',
                                        label: 'Enfants handicapés',
                                        icon: (
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.8}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                                />
                                            </svg>
                                        ),
                                    },
                                    {
                                        value: '1/5',
                                        label: 'Aidants épuisés',
                                        icon: (
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.8}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                                />
                                            </svg>
                                        ),
                                    },
                                    {
                                        value: '80%',
                                        label: 'Femmes aidantes',
                                        icon: (
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.8}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                />
                                            </svg>
                                        ),
                                    },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="flex flex-col items-center gap-1.5 text-center"
                                    >
                                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sna-teal/10 text-sna-teal">
                                            {stat.icon}
                                        </span>
                                        <span className="text-xl leading-none font-extrabold text-sna-teal sm:text-2xl">
                                            {stat.value}
                                        </span>
                                        <span className="text-xs leading-tight text-gray-500">
                                            {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Right: illustration ── */}
                        <div className="relative flex w-full flex-1 items-center justify-center lg:max-w-md">
                            {/* Floating accent cards */}
                            <div className="absolute -top-4 -left-4 z-10 flex items-center gap-2 rounded-2xl border border-gray-50 bg-white px-4 py-3 shadow-lg lg:-left-8">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-400">
                                    <svg
                                        className="h-4 w-4"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-xs leading-none font-bold text-gray-800">
                                        11 M d'aidants
                                    </p>
                                    <p className="mt-0.5 text-xs text-gray-400">
                                        en France
                                    </p>
                                </div>
                            </div>
                            <div className="absolute right-2 -bottom-4 z-10 flex items-center gap-2 rounded-2xl border border-gray-50 bg-white px-4 py-3 shadow-lg lg:-right-4">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sna-teal/10 text-sna-teal">
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
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-xs leading-none font-bold text-gray-800">
                                        Vos droits
                                    </p>
                                    <p className="mt-0.5 text-xs text-gray-400">
                                        défendus
                                    </p>
                                </div>
                            </div>
                            <div className="absolute top-1/2 -right-2 z-10 flex -translate-y-1/2 items-center gap-2 rounded-2xl bg-sna-teal px-4 py-3 shadow-lg lg:-right-6">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
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
                                            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-xs leading-none font-bold text-white">
                                        Solidarité
                                    </p>
                                    <p className="mt-0.5 text-xs text-white/70">
                                        active
                                    </p>
                                </div>
                            </div>

                            <HeroIllustration />
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════
                    ALERT BANNER – Empathy
                ══════════════════════════════ */}
                <div className="bg-sna-teal px-6 py-4">
                    <p className="mx-auto max-w-4xl text-center text-sm font-medium text-white sm:text-base">
                        <span className="font-bold">
                            Vous le vivez chaque jour :
                        </span>{' '}
                        la lourdeur administrative, l'épuisement, le sentiment
                        d'être seul(e) face aux institutions.{' '}
                        <a
                            href="#moi-aussi"
                            className="font-semibold underline underline-offset-2 hover:text-white/80"
                        >
                            Votre témoignage peut tout changer →
                        </a>
                    </p>
                </div>

                {/* ══════════════════════════════
                    À PROPOS
                ══════════════════════════════ */}
                <section id="apropos" className="bg-white px-6 py-20">
                    <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 lg:flex-row">
                        {/* Text */}
                        <div className="flex-1 space-y-6">
                            <span className="inline-block rounded-full bg-sna-green/15 px-4 py-1 text-xs font-bold tracking-widest text-[#6a8a20] uppercase">
                                Qui sommes-nous
                            </span>
                            <h2 className="text-3xl leading-tight font-bold text-gray-800 sm:text-4xl">
                                Une voix collective pour les familles invisibles
                            </h2>
                            <p className="leading-relaxed text-gray-500">
                                Le{' '}
                                <strong className="text-gray-700">
                                    Syndicat National des Aidants (SNA)
                                </strong>{' '}
                                est né d'un constat simple : les familles qui
                                accompagnent un enfant en situation de handicap
                                portent une charge extraordinaire —
                                émotionnelle, administrative, financière — dans
                                un quasi-isolement.
                            </p>
                            <p className="leading-relaxed text-gray-500">
                                Face à la complexité des démarches (MDPH, CAF,
                                établissements spécialisés), au manque de
                                places, aux politiques publiques déconnectées du
                                terrain, le SNA fédère ces familles et porte
                                leur voix auprès des décideurs, des médias et
                                des partenaires institutionnels.
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "Reconnaissance officielle du statut d'aidant familial",
                                    'Simplification des démarches MDPH / CAF',
                                    'Sécurité financière et protection juridique',
                                    'Droit au répit réel et accompagnement',
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-2 text-sm text-gray-600"
                                    >
                                        <CheckIcon />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="#actions"
                                className="inline-flex items-center gap-2 font-semibold text-sna-teal transition-colors hover:text-sna-teal-dark"
                            >
                                Nos engagements <ArrowRightIcon />
                            </a>
                        </div>

                        {/* Value cards */}
                        <div className="grid flex-1 grid-cols-2 gap-4">
                            {[
                                {
                                    emoji: '🤝',
                                    bg: 'bg-sna-teal-light',
                                    title: 'Solidarité',
                                    desc: "Rompre l'isolement des aidants en créant une communauté soudée.",
                                },
                                {
                                    emoji: '🛡️',
                                    bg: 'bg-sna-green/10',
                                    title: 'Protection',
                                    desc: 'Défendre vos droits face aux administrations et aux institutions.',
                                },
                                {
                                    emoji: '💬',
                                    bg: 'bg-sna-teal-light',
                                    title: 'Écoute',
                                    desc: "Un espace d'expression sécurisé pour chaque famille.",
                                },
                                {
                                    emoji: '📣',
                                    bg: 'bg-sna-green/10',
                                    title: 'Représentation',
                                    desc: 'Porter la parole des familles au niveau national et législatif.',
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="group flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-5 transition-shadow hover:shadow-md"
                                >
                                    <div
                                        className={`h-12 w-12 rounded-2xl ${item.bg} flex items-center justify-center text-2xl transition-transform group-hover:scale-110`}
                                    >
                                        {item.emoji}
                                    </div>
                                    <h3 className="font-bold text-gray-800">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-500">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════
                    CE QUE VOUS VIVEZ
                    (Empathy section)
                ══════════════════════════════ */}
                <section className="bg-gray-50 px-6 py-20">
                    <div className="mx-auto max-w-6xl space-y-12">
                        <SectionHeader
                            badge="Ce que vous vivez"
                            title="Vous n'êtes pas seul(e)"
                            subtitle="Des milliers de familles partagent les mêmes difficultés au quotidien. Le SNA transforme ces épreuves individuelles en force collective."
                        />

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    emoji: '🏛️',
                                    quote: '"Il n\'y a pas de budget."',
                                    context:
                                        'Ce que vous entendez dans les institutions',
                                    pain: 'Lourdeur administrative (MDPH, CAF)',
                                    color: 'border-l-sna-teal',
                                },
                                {
                                    emoji: '⏳',
                                    quote: '"Il faut patienter."',
                                    context: "Ce que l'on vous répond",
                                    pain: 'Manque de places en structure spécialisée',
                                    color: 'border-l-sna-green',
                                },
                                {
                                    emoji: '😔',
                                    quote: '"Vous avez déjà de la chance."',
                                    context:
                                        'Ce que vous ressentez face à ce message',
                                    pain: "Épuisement moral et sentiment d'injustice",
                                    color: 'border-l-sna-teal',
                                },
                                {
                                    emoji: '😰',
                                    quote: '"Après moi, qui s\'en occupera ?"',
                                    context:
                                        "La peur de l'avenir qui ne vous quitte pas",
                                    pain: 'Absence de perspective à long terme',
                                    color: 'border-l-sna-green',
                                },
                                {
                                    emoji: '💔',
                                    quote: '"Je n\'ai plus le droit de m\'épuiser."',
                                    context:
                                        'La culpabilité de ne pas en faire assez',
                                    pain: 'Charge mentale permanente et isolement',
                                    color: 'border-l-sna-teal',
                                },
                                {
                                    emoji: '✊',
                                    quote: '"Je me bats seul(e) contre tout."',
                                    context:
                                        'Face aux refus et aux dossiers incomplets',
                                    pain: 'Précarisation professionnelle et sociale',
                                    color: 'border-l-sna-green',
                                },
                            ].map((item) => (
                                <div
                                    key={item.quote}
                                    className={`rounded-2xl border border-l-4 border-gray-100 bg-white ${item.color} flex flex-col gap-3 p-6 shadow-sm transition-shadow hover:shadow-md`}
                                >
                                    <span className="text-3xl">
                                        {item.emoji}
                                    </span>
                                    <p className="text-base font-semibold text-gray-700 italic">
                                        {item.quote}
                                    </p>
                                    <p className="text-xs tracking-wide text-gray-400 uppercase">
                                        {item.context}
                                    </p>
                                    <div className="mt-auto border-t border-gray-50 pt-3">
                                        <p className="text-xs font-medium text-sna-teal">
                                            ⚠️ {item.pain}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <a
                                href="#moi-aussi"
                                className="inline-flex items-center gap-2 rounded-full bg-sna-teal px-8 py-3.5 font-semibold text-white shadow-lg shadow-sna-teal/20 transition-all hover:-translate-y-0.5 hover:bg-sna-teal-dark"
                            >
                                Partagez votre témoignage <ArrowRightIcon />
                            </a>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════
                    NOS ACTIONS (3 forms)
                ══════════════════════════════ */}
                <section id="actions" className="bg-white px-6 py-20">
                    <div className="mx-auto max-w-6xl space-y-12">
                        <SectionHeader
                            badge="Nos actions"
                            title="Comment agir avec nous ?"
                            subtitle="Trois façons concrètes de rejoindre le mouvement et de faire entendre la voix des familles."
                        />

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {/* ── Card 1: Soutien / Donateur ── */}
                            <div className="flex flex-col gap-6 rounded-3xl border border-sna-teal/30 bg-linear-to-b from-[#f0fafa] to-white p-8 shadow-sm transition-shadow hover:shadow-lg">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sna-teal shadow-lg shadow-sna-teal/30">
                                    <HeartIcon className="h-7 w-7 text-white" />
                                </div>
                                <div>
                                    <span className="mb-2 inline-block text-xs font-bold tracking-widest text-sna-teal-dark uppercase">
                                        Soutien
                                    </span>
                                    <h3 className="text-xl leading-snug font-bold text-gray-800">
                                        Devenez membre soutien
                                    </h3>
                                </div>
                                <p className="flex-1 text-sm leading-relaxed text-gray-500">
                                    Que votre soutien soit moral, technique ou
                                    financier, votre engagement est essentiel.
                                    Personnes physiques ou morales, rejoignez le
                                    SNA et contribuez à nos projets en faveur
                                    des aidants familiaux.
                                </p>
                                <ul className="space-y-1.5">
                                    {[
                                        'Restez informé(e) de nos événements',
                                        'Participez aux projets du syndicat',
                                        'Recevez nos publications',
                                    ].map((b) => (
                                        <li
                                            key={b}
                                            className="flex items-center gap-2 text-xs text-gray-600"
                                        >
                                            <CheckIcon /> {b}
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href="#formulaire-soutien"
                                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-sna-teal px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-sna-teal-dark"
                                >
                                    Je soutiens le SNA <ArrowRightIcon />
                                </a>
                            </div>

                            {/* ── Card 2: Partenaires institutionnels ── */}
                            <div className="flex flex-col gap-6 rounded-3xl border border-sna-green/30 bg-linear-to-b from-[#f5faea] to-white p-8 shadow-sm transition-shadow hover:shadow-lg">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sna-green shadow-lg shadow-sna-green/30">
                                    <UsersIcon className="h-7 w-7 text-white" />
                                </div>
                                <div>
                                    <span className="mb-2 inline-block text-xs font-bold tracking-widest text-[#6a8a20] uppercase">
                                        Partenariat
                                    </span>
                                    <h3 className="text-xl leading-snug font-bold text-gray-800">
                                        Partenaires institutionnels
                                    </h3>
                                </div>
                                <p className="flex-1 text-sm leading-relaxed text-gray-500">
                                    Collectivités, associations, entreprises,
                                    services de l'État — associez-vous au SNA
                                    pour construire ensemble des solutions
                                    durables en faveur des familles d'enfants
                                    handicapés.
                                </p>
                                <ul className="space-y-1.5">
                                    {[
                                        'Soutien moral ou promotionnel',
                                        "Apport d'expertise ou de services",
                                        'Participation aux projets et événements',
                                    ].map((b) => (
                                        <li
                                            key={b}
                                            className="flex items-center gap-2 text-xs text-gray-600"
                                        >
                                            <span className="shrink-0 text-sna-green">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2.5}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </span>
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href="#formulaire-partenaire"
                                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-sna-green px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-sna-green-dark"
                                >
                                    Devenir partenaire <ArrowRightIcon />
                                </a>
                            </div>

                            {/* ── Card 3: Moi aussi ── */}
                            <div className="flex flex-col gap-6 rounded-3xl border border-sna-teal/30 bg-linear-to-b from-[#f0fafa] to-white p-8 shadow-sm transition-shadow hover:shadow-lg">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sna-teal shadow-lg shadow-sna-teal/30">
                                    <MegaphoneIcon className="h-7 w-7 text-white" />
                                </div>
                                <div>
                                    <span className="mb-2 inline-block text-xs font-bold tracking-widest text-sna-teal-dark uppercase">
                                        Campagne
                                    </span>
                                    <h3 className="text-xl leading-snug font-bold text-gray-800">
                                        « Moi aussi, j'ai vécu ça »
                                    </h3>
                                </div>
                                <p className="flex-1 text-sm leading-relaxed text-gray-500">
                                    Votre difficulté n'est pas isolée. Chaque
                                    témoignage renforce l'action collective.
                                    Ensemble, nous transformons des épreuves
                                    individuelles en avancées pour toutes les
                                    familles.
                                </p>
                                <blockquote className="border-l-2 border-sna-teal pl-3 text-xs text-gray-400 italic">
                                    "Chaque témoignage compte. C'est ainsi que
                                    nous transformons des difficultés
                                    individuelles en avancées collectives."
                                </blockquote>
                                <a
                                    href="#moi-aussi"
                                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-sna-teal px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-sna-teal-dark"
                                >
                                    Je témoigne <ArrowRightIcon />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════
                    FORMULAIRE SOUTIEN
                ══════════════════════════════ */}
                <section
                    id="formulaire-soutien"
                    className="bg-gray-50 px-6 py-20"
                >
                    <div className="mx-auto max-w-3xl space-y-8">
                        <SectionHeader
                            badge="Formulaire"
                            title="Devenir membre soutien"
                            subtitle="Merci de votre engagement en faveur des aidants. Formalisez votre soutien moral, technique ou financier."
                        />

                        <SoutienForm />
                    </div>
                </section>

                {/* ══════════════════════════════
                    FORMULAIRE PARTENAIRE
                ══════════════════════════════ */}
                <section
                    id="formulaire-partenaire"
                    className="bg-white px-6 py-20"
                >
                    <div className="mx-auto max-w-3xl space-y-8">
                        <SectionHeader
                            badge="Partenariat institutionnel"
                            title="Établissons un partenariat"
                            subtitle="Le SNA souhaite développer des partenariats avec des entités publiques et privées pour soutenir ses projets."
                        />

                        <PartenaireForm />
                    </div>
                </section>

                {/* ══════════════════════════════
                    FORMULAIRE MOI AUSSI
                ══════════════════════════════ */}
                <section
                    id="moi-aussi"
                    className="bg-linear-to-br from-[#e8f8f8] to-[#f0f9e8] px-6 py-20"
                >
                    <div className="mx-auto max-w-3xl space-y-8">
                        <SectionHeader
                            badge="Témoignage"
                            title="« Moi aussi, j'ai vécu ça »"
                            subtitle="Cette difficulté ne concerne pas qu'une seule famille. Votre témoignage renforce l'action collective et peut changer les choses."
                        />

                        <div className="rounded-3xl border border-sna-teal/20 bg-white/80 p-3 backdrop-blur">
                            <blockquote className="px-6 py-3 text-center text-sm text-gray-500 italic">
                                "Chaque témoignage compte. C'est ainsi que nous
                                transformons des difficultés individuelles en
                                avancées collectives."
                            </blockquote>
                        </div>

                        <MoiAussiForm />
                    </div>
                </section>

                {/* ══════════════════════════════
                    FAQ
                ══════════════════════════════ */}
                <section className="bg-white px-6 py-20">
                    <div className="mx-auto max-w-3xl space-y-8">
                        <SectionHeader
                            badge="FAQ"
                            title="Questions fréquentes"
                        />
                        <div className="space-y-3">
                            {[
                                {
                                    question: "À qui s'adresse le SNA ?",
                                    answer: "Le SNA s'adresse à toutes les familles qui accompagnent au quotidien un enfant en situation de handicap : parents, fratries, proches aidants. Nous accueillons également les associations, collectivités et entreprises souhaitant agir à nos côtés.",
                                },
                                {
                                    question:
                                        'Mes informations personnelles sont-elles protégées ?',
                                    answer: "Oui. Le SNA s'engage à traiter toutes les données personnelles dans le strict respect du RGPD. Vos témoignages sont confidentiels et ne seront jamais publiés ou utilisés sans votre accord explicite.",
                                },
                                {
                                    question:
                                        'Comment le SNA utilise-t-il les témoignages ?',
                                    answer: 'Les témoignages (avec votre accord) servent à constituer des dossiers de plaidoyer, à appuyer des propositions de loi, à interpeller les médias et les décideurs politiques. Ils peuvent être anonymisés ou utilisés de manière collective selon vos préférences.',
                                },
                                {
                                    question:
                                        "Qu'est-ce qu'un partenariat institutionnel ?",
                                    answer: "Un partenariat institutionnel permet à une organisation (collectivité, association, entreprise, service de l'État) de s'associer au SNA par un soutien moral, technique ou financier pour co-construire des solutions en faveur des familles d'enfants handicapés.",
                                },
                                {
                                    question:
                                        'Comment puis-je être tenu(e) informé(e) des actions du SNA ?',
                                    answer: 'En remplissant le formulaire de soutien, vous pouvez choisir de recevoir nos actualités, événements et publications par email. Vous pouvez également vous inscrire à notre newsletter.',
                                },
                            ].map((item) => (
                                <FaqItem
                                    key={item.question}
                                    question={item.question}
                                    answer={item.answer}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════
                    CTA BANNER
                ══════════════════════════════ */}
                <section className="relative overflow-hidden bg-linear-to-r from-sna-teal to-sna-teal-dark px-6 py-20">
                    <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
                    <div className="relative mx-auto max-w-3xl space-y-6 text-center">
                        <h2 className="text-3xl leading-tight font-bold text-white sm:text-4xl">
                            Prêt(e) à rejoindre le mouvement ?
                        </h2>
                        <p className="mx-auto max-w-xl text-lg text-white/80">
                            Ensemble, construisons un avenir où chaque famille
                            accompagnant un enfant handicapé est reconnue,
                            soutenue et protégée.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <a
                                href="#formulaire-soutien"
                                className="rounded-full border-2 border-white px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
                            >
                                Je soutiens le SNA
                            </a>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════
                    CONTACT
                ══════════════════════════════ */}
                <section id="contact" className="bg-gray-50 px-6 py-20">
                    <div className="mx-auto max-w-4xl space-y-10">
                        <SectionHeader
                            badge="Contact"
                            title="Nous contacter"
                            subtitle="Une question, une demande d'information ? Notre équipe est à votre écoute."
                        />
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                            {[
                                {
                                    icon: '📧',
                                    label: 'E-mail',
                                    value: 'contact@sna-aidants.fr',
                                    href: 'mailto:contact@sna-aidants.fr',
                                },
                                {
                                    icon: '📞',
                                    label: 'Téléphone',
                                    value: '+33 (0)1 00 00 00 00',
                                    href: 'tel:+33100000000',
                                },
                                {
                                    icon: '📍',
                                    label: 'Adresse',
                                    value: 'Paris, France',
                                    href: '#',
                                },
                            ].map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    <span className="text-3xl">
                                        {item.icon}
                                    </span>
                                    <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                                        {item.label}
                                    </span>
                                    <span className="text-center text-sm font-semibold text-gray-700">
                                        {item.value}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════
                    FOOTER
                ══════════════════════════════ */}
                <footer className="bg-gray-900 px-6 py-14 text-gray-300">
                    <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 md:flex-row">
                        <div className="flex max-w-xs flex-col gap-4">
                            <img
                                src="/images/logo.png"
                                alt="Syndicat National des Aidants"
                                className="h-12 w-auto brightness-0 invert"
                            />
                            <p className="text-sm leading-relaxed text-gray-400">
                                Le SNA défend les droits et améliore la vie des
                                familles qui accompagnent un enfant en situation
                                de handicap en France.
                            </p>
                        </div>

                        <div className="flex flex-col gap-12 sm:flex-row">
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold tracking-widest text-white uppercase">
                                    Navigation
                                </h4>
                                {[
                                    { label: 'À propos', href: '#apropos' },
                                    { label: 'Nos actions', href: '#actions' },
                                    {
                                        label: 'Devenir soutien',
                                        href: '#formulaire-soutien',
                                    },
                                    {
                                        label: 'Partenariats',
                                        href: '#formulaire-partenaire',
                                    },
                                    { label: 'Témoigner', href: '#moi-aussi' },
                                    { label: 'Contact', href: '#contact' },
                                ].map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="block text-sm text-gray-400 transition-colors hover:text-sna-teal"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold tracking-widest text-white uppercase">
                                    Espace membre
                                </h4>
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="block text-sm text-gray-400 transition-colors hover:text-sna-teal"
                                    >
                                        Mon espace
                                    </Link>
                                ) : (
                                    <Link
                                        href={login()}
                                        className="block text-sm text-gray-400 transition-colors hover:text-sna-teal"
                                    >
                                        Se connecter
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-gray-800 pt-6 text-xs text-gray-500 sm:flex-row">
                        <span>
                            © {new Date().getFullYear()} Syndicat National des
                            Aidants. Tous droits réservés.
                        </span>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="transition-colors hover:text-gray-300"
                            >
                                Mentions légales
                            </a>
                            <a
                                href="#"
                                className="transition-colors hover:text-gray-300"
                            >
                                Politique de confidentialité
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
