import { useCallback, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DEPARTMENT_NAMES, DEPARTMENT_PATHS, VIEWBOX_H, VIEWBOX_W } from '@/data/france-departments';

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

const DOM_CODES = ['971', '972', '973', '974', '976'] as const;

function RepresentantCarousel({
    representants,
    onClose,
}: {
    representants: Representant[];
    onClose: () => void;
}) {
    const [index, setIndex] = useState(0);
    const rep = representants[index];
    const total = representants.length;

    const prev = () => setIndex((i) => (i - 1 + total) % total);
    const next = () => setIndex((i) => (i + 1) % total);

    return (
        <div className="animate-in slide-in-from-bottom-4 fade-in duration-200 rounded-2xl border border-sna-teal/20 bg-white shadow-xl ring-1 ring-black/5">
            {/* Carousel nav (only when multiple reps) */}
            {total > 1 && (
                <div className="flex items-center justify-between border-b border-sna-teal/10 px-5 py-2.5">
                    <button
                        onClick={prev}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-sna-teal"
                        aria-label="Représentant précédent"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <p className="text-xs text-gray-500">
                        <span className="font-semibold text-sna-teal">{index + 1}</span>{' '}sur{' '}
                        <span className="font-semibold">{total}</span> représentants
                    </p>
                    <button
                        onClick={next}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-sna-teal"
                        aria-label="Représentant suivant"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            )}

            <div className="flex items-start gap-4 p-5">
                {/* Avatar */}
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-sna-teal/20 to-sna-teal/5">
                    {rep.photo_path ? (
                        <img
                            src={rep.photo_path}
                            alt={`Photo de ${rep.first_name} ${rep.last_name}`}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-xl font-bold text-sna-teal">
                            {rep.first_name[0]}
                            {rep.last_name[0]}
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <p className="font-bold text-gray-900">
                                {rep.first_name}{' '}
                                <span className="text-gray-700">{rep.last_name}</span>
                            </p>
                            <p className="text-xs font-semibold tracking-wide text-sna-teal uppercase">
                                {rep.role}
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500">
                                Dép. {rep.department_code} — {rep.department_name}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            aria-label="Fermer"
                            className="flex-shrink-0 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4l8 8M12 4l-8 8" />
                            </svg>
                        </button>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{rep.short_bio}</p>
                </div>
            </div>

            {/* Dot indicators */}
            {total > 1 && (
                <div className="flex justify-center gap-1.5 pb-4">
                    {representants.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={[
                                'h-1.5 rounded-full transition-all',
                                i === index ? 'w-4 bg-sna-teal' : 'w-1.5 bg-gray-300 hover:bg-gray-400',
                            ].join(' ')}
                            aria-label={`Représentant ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function FranceDepartmentsMap({ representants }: { representants: Representant[] }) {
    const [selectedCode, setSelectedCode] = useState<string | null>(null);
    const [tooltip, setTooltip] = useState<{ x: number; y: number; code: string } | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const repsByCode = useMemo(() => {
        const map: Record<string, Representant[]> = {};
        for (const r of representants) {
            if (!map[r.department_code]) map[r.department_code] = [];
            map[r.department_code].push(r);
        }
        return map;
    }, [representants]);

    const selectedReps = selectedCode ? (repsByCode[selectedCode] ?? []) : [];

    const handlePathClick = useCallback(
        (code: string) => {
            if (!(code in repsByCode)) return;
            setSelectedCode((prev) => (prev === code ? null : code));
        },
        [repsByCode],
    );

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<SVGPathElement>, code: string) => {
            if (!svgRef.current) return;
            const rect = svgRef.current.getBoundingClientRect();
            setTooltip({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                code,
            });
        },
        [],
    );

    const handleMouseLeave = useCallback(() => setTooltip(null), []);

    const domReps = DOM_CODES.filter((c) => c in repsByCode);

    return (
        <div className="flex flex-col gap-6">
            {/* SVG Map */}
            <div className="relative w-full max-w-2xl self-center">
                <svg
                    ref={svgRef}
                    viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
                    className="w-full drop-shadow-sm"
                    aria-label="Carte des représentants départementaux"
                    role="img"
                >
                    {Object.entries(DEPARTMENT_PATHS).map(([code, d]) => {
                        const reps = repsByCode[code];
                        const hasRep = !!reps;
                        const isSelected = selectedCode === code;

                        return (
                            <path
                                key={code}
                                d={d}
                                onClick={() => handlePathClick(code)}
                                onMouseMove={(e) => handleMouseMove(e, code)}
                                onMouseLeave={handleMouseLeave}
                                className={[
                                    'stroke-white transition-colors duration-150',
                                    hasRep
                                        ? isSelected
                                            ? 'fill-sna-teal cursor-pointer stroke-[0.8]'
                                            : 'fill-sna-teal/60 cursor-pointer stroke-[0.5] hover:fill-sna-teal/90'
                                        : 'fill-gray-200 stroke-[0.5]',
                                ].join(' ')}
                                aria-label={
                                    hasRep
                                        ? reps.length > 1
                                            ? `${code} ${DEPARTMENT_NAMES[code] ?? ''} — ${reps.length} représentants`
                                            : `${code} ${DEPARTMENT_NAMES[code] ?? ''} — ${reps[0].first_name} ${reps[0].last_name}`
                                        : `${code} ${DEPARTMENT_NAMES[code] ?? ''}`
                                }
                            />
                        );
                    })}
                </svg>

                {/* Tooltip — hidden when a card is shown */}
                {tooltip && !selectedCode && (
                    <div
                        className="pointer-events-none absolute z-10 rounded-lg border border-sna-teal/20 bg-white px-2.5 py-1.5 text-xs shadow-md"
                        style={{ left: tooltip.x + 12, top: tooltip.y - 32 }}
                    >
                        <span className="font-mono font-bold text-sna-teal">{tooltip.code}</span>
                        {' — '}
                        <span className="text-gray-700">{DEPARTMENT_NAMES[tooltip.code]}</span>
                        {tooltip.code in repsByCode && (
                            <>
                                <br />
                                {repsByCode[tooltip.code].length > 1 ? (
                                    <span className="font-semibold text-gray-900">
                                        {repsByCode[tooltip.code].length} représentants
                                    </span>
                                ) : (
                                    <span className="font-semibold text-gray-900">
                                        {repsByCode[tooltip.code][0].first_name}{' '}
                                        {repsByCode[tooltip.code][0].last_name}
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                )}

                {/* Floating representative carousel */}
                {selectedReps.length > 0 && (
                    <div className="absolute bottom-4 left-1/2 z-20 w-[min(440px,92%)] -translate-x-1/2">
                        <RepresentantCarousel
                            key={selectedCode}
                            representants={selectedReps}
                            onClose={() => setSelectedCode(null)}
                        />
                    </div>
                )}
            </div>

            {/* DOM row */}
            {domReps.length > 0 && (
                <div className="flex flex-wrap gap-3">
                    <span className="self-center text-xs font-medium text-gray-400">Outre-mer :</span>
                    {domReps.map((code) => {
                        const reps = repsByCode[code];
                        const isSelected = selectedCode === code;
                        return (
                            <button
                                key={code}
                                onClick={() => setSelectedCode((prev) => (prev === code ? null : code))}
                                className={[
                                    'flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all',
                                    isSelected
                                        ? 'border-sna-teal bg-sna-teal text-white shadow-sm'
                                        : 'border-sna-teal/30 bg-sna-teal/10 text-sna-teal hover:bg-sna-teal/20',
                                ].join(' ')}
                            >
                                <span className="font-mono font-bold">{code}</span>
                                <span>{DEPARTMENT_NAMES[code]}</span>
                                {reps && reps.length === 1 && (
                                    <span className="opacity-75">— {reps[0].first_name} {reps[0].last_name}</span>
                                )}
                                {reps && reps.length > 1 && (
                                    <span className="opacity-75">— {reps.length} représentants</span>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

        </div>
    );
}
