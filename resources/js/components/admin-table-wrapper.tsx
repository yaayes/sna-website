import { Link, router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedMeta = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
};

type AdminTableWrapperProps = {
    title: string;
    description?: string;
    search: string;
    searchPlaceholder?: string;
    searchUrl: (options?: { query?: Record<string, string> }) => {
        url: string;
        method: string;
    };
    pagination: PaginatedMeta & {
        prev_page_url: string | null;
        next_page_url: string | null;
    };
    children: React.ReactNode;
};

export default function AdminTableWrapper({
    title,
    description,
    search,
    searchPlaceholder = 'Rechercher par email, ref…',
    searchUrl,
    pagination,
    children,
}: AdminTableWrapperProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            const val = inputRef.current?.value ?? '';
            router.get(
                searchUrl().url,
                { search: val },
                { preserveState: true, replace: true },
            );
        },
        [searchUrl],
    );

    return (
        <div className="flex h-full flex-1 flex-col gap-4 p-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                {description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

            <form onSubmit={handleSearch} className="flex max-w-sm gap-2">
                <Input
                    ref={inputRef}
                    type="search"
                    placeholder={searchPlaceholder}
                    defaultValue={search}
                    className="h-9"
                />
                <Button type="submit" size="sm" variant="secondary">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Rechercher</span>
                </Button>
            </form>

            <div className="rounded-lg border">{children}</div>

            {pagination.last_page > 1 && (
                <div className="flex items-center justify-between text-sm">
                    <p className="text-muted-foreground">
                        {pagination.total} résultat
                        {pagination.total !== 1 ? 's' : ''}
                    </p>
                    <div className="flex items-center gap-1">
                        {pagination.links.map((link, i) => (
                            <Button
                                key={i}
                                variant={link.active ? 'default' : 'ghost'}
                                size="sm"
                                disabled={!link.url}
                                asChild={!!link.url}
                            >
                                {link.url ? (
                                    <Link
                                        href={link.url}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                        preserveState
                                    />
                                ) : (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                )}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
