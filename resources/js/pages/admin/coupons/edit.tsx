import { Head, Link, useForm } from '@inertiajs/react';
import { CalendarDays } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

interface Coupon {
    id: number;
    code: string;
    description: string | null;
    discount_euros: string;
    max_uses: number | null;
    uses_count: number;
    expires_at: string | null;
    is_active: boolean;
}

interface Props {
    coupon: Coupon;
}

const toDisplayDate = (value: string | null): string => {
    if (!value) {
        return '';
    }

    const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

    if (!isoMatch) {
        return value;
    }

    const [, year, month, day] = isoMatch;

    return `${day}/${month}/${year}`;
};

const toIsoDate = (value: string): string => {
    const trimmed = value.trim();

    if (trimmed === '') {
        return '';
    }

    const match = trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

    if (!match) {
        return trimmed;
    }

    const [, day, month, year] = match;

    return `${year}-${month}-${day}`;
};

export default function CouponEditPage({ coupon }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Admin', href: admin.dashboard() },
        { title: 'Coupons', href: admin.coupons.index() },
        { title: coupon.code, href: admin.coupons.edit(coupon.id) },
    ];

    const { data, setData, submit, processing, errors, transform } = useForm({
        code: coupon.code,
        description: coupon.description ?? '',
        discount_euros: coupon.discount_euros,
        max_uses: coupon.max_uses !== null ? String(coupon.max_uses) : '',
        expires_at: toDisplayDate(coupon.expires_at),
        is_active: coupon.is_active,
    });
    const [isDatePopoverOpen, setDatePopoverOpen] = useState(false);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        transform((formData) => ({
            ...formData,
            expires_at: toIsoDate(formData.expires_at),
        }));

        submit(admin.coupons.update(coupon.id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin — Modifier ${coupon.code}`} />
            <div className="mx-auto w-full max-w-2xl p-6">
                <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border bg-white p-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Modifier le coupon</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Utilisations : <strong>{coupon.uses_count}</strong>
                            {coupon.max_uses !== null ? ` / ${coupon.max_uses}` : ' (illimité)'}
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="code">Code coupon *</Label>
                            <Input
                                id="code"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                placeholder="Ex: AIDANT2026"
                                className="uppercase"
                                maxLength={50}
                            />
                            {errors.code && <p className="text-xs text-red-600">{errors.code}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description (optionnel)</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Ex: Coupon adhésion 2026 – cotisation offerte"
                                rows={2}
                            />
                            {errors.description && <p className="text-xs text-red-600">{errors.description}</p>}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="discount_euros">Réduction (€) *</Label>
                                <Input
                                    id="discount_euros"
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    value={data.discount_euros}
                                    onChange={(e) => setData('discount_euros', e.target.value)}
                                />
                                {errors.discount_euros && <p className="text-xs text-red-600">{errors.discount_euros}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="max_uses">Nb max d'utilisations (vide = illimité)</Label>
                                <Input
                                    id="max_uses"
                                    type="number"
                                    min="1"
                                    value={data.max_uses}
                                    onChange={(e) => setData('max_uses', e.target.value)}
                                    placeholder="Illimité"
                                />
                                {errors.max_uses && <p className="text-xs text-red-600">{errors.max_uses}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="expires_at">Date d'expiration (optionnel)</Label>
                            <div className="relative">
                                <Input
                                    id="expires_at"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="dd/mm/yyyy"
                                    value={data.expires_at}
                                    onChange={(e) => setData('expires_at', e.target.value)}
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    aria-label="Ouvrir le calendrier"
                                    onClick={() => setDatePopoverOpen((open) => !open)}
                                    className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    <CalendarDays className="h-4 w-4" />
                                </button>

                                {isDatePopoverOpen && (
                                    <div className="absolute top-full right-0 z-20 mt-2 w-64 rounded-md border bg-white p-3 shadow-lg">
                                        <Input
                                            type="date"
                                            value={toIsoDate(data.expires_at)}
                                            onChange={(e) => {
                                                setData('expires_at', toDisplayDate(e.target.value));
                                                setDatePopoverOpen(false);
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            {errors.expires_at && <p className="text-xs text-red-600">{errors.expires_at}</p>}
                        </div>

                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="h-4 w-4 rounded"
                            />
                            Coupon actif
                        </label>
                    </div>

                    <div className="flex gap-3">
                        <Button type="submit" disabled={processing}>
                            Enregistrer
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={admin.coupons.index()}>Annuler</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
