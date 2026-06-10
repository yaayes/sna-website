import { Head } from '@inertiajs/react';

type SeoHeadProps = {
    title: string;
    description?: string;
    canonical?: string;
    robots?: string;
};

/**
 * Thin wrapper around Inertia's <Head> that emits per-page SEO meta tags.
 * OG / Twitter tags are handled server-side in app.blade.php via the `seo`
 * Inertia prop so they are visible to social crawlers (no JS required).
 */
export default function SeoHead({ title, description, canonical, robots }: SeoHeadProps) {
    return (
        <Head title={title}>
            {description && <meta name="description" content={description} />}
            {canonical && <link rel="canonical" href={canonical} />}
            {robots && <meta name="robots" content={robots} />}
        </Head>
    );
}
