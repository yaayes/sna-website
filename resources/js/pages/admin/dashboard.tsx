import { Head, Link } from '@inertiajs/react';
import { FileText, Handshake, Users } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard() },
];

type Stats = {
    moi_aussi: number;
    soutien: number;
    partenaire: number;
};

const statCards = [
    {
        title: 'Formulaires Moi Aussi',
        key: 'moi_aussi' as const,
        icon: Users,
        href: admin.moiAussi.index(),
        color: 'text-rose-500',
        bg: 'bg-rose-50 dark:bg-rose-950/30',
    },
    {
        title: 'Formulaires Soutien',
        key: 'soutien' as const,
        icon: FileText,
        href: admin.soutien.index(),
        color: 'text-blue-500',
        bg: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
        title: 'Formulaires Partenaire',
        key: 'partenaire' as const,
        icon: Handshake,
        href: admin.partenaire.index(),
        color: 'text-emerald-500',
        bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    },
];

export default function AdminDashboard({ stats }: { stats: Stats }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin — Tableau de bord" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Tableau de bord
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Vue d'ensemble des soumissions de formulaires.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    {statCards.map(
                        ({ title, key, icon: Icon, href, color, bg }) => (
                            <Link
                                key={key}
                                href={href}
                                className="rounded-xl border p-6 transition-shadow hover:shadow-md"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {title}
                                    </p>
                                    <span className={`rounded-lg p-2 ${bg}`}>
                                        <Icon className={`h-5 w-5 ${color}`} />
                                    </span>
                                </div>
                                <p className="mt-4 text-4xl font-bold">
                                    {stats[key]}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    entrées enregistrées
                                </p>
                            </Link>
                        ),
                    )}
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    {statCards.map(({ title, key, href, color }) => (
                        <Link
                            key={key}
                            href={href}
                            className={`rounded-xl border px-5 py-4 text-sm font-medium transition-colors hover:underline ${color}`}
                        >
                            Voir les {title.toLowerCase()} →
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
