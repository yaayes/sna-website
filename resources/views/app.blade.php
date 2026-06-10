<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>Syndicat National des Aidants</title>

        {{-- Favicon --}}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />

        @php
            $sna_name    = 'Syndicat National des Aidants';
            $sna_desc    = 'Le SNA défend les intérêts des aidants familiaux qui accompagnent un proche touché par la maladie, le handicap ou la perte d\'autonomie.';
            $sna_image   = asset('images/hero/page-accueil-hero.webp');
            $sna_url     = url()->current();
            $sna_locale  = str_replace('_', '-', app()->getLocale());

            $seo         = $page['props']['seo'] ?? [];
            $seo_title   = $seo['title']       ?? $sna_name;
            $seo_desc    = $seo['description'] ?? $sna_desc;
            $seo_image   = isset($seo['image']) ? asset($seo['image']) : $sna_image;
            $seo_type    = $seo['type']        ?? 'website';
            $seo_robots  = $seo['robots']      ?? 'index, follow';
            $seo_canon   = $seo['canonical']   ?? $sna_url;
            $seo_pub     = $seo['published_time'] ?? null;
            $seo_jsonld  = $seo['jsonld']      ?? null;
        @endphp

        {{-- SEO fundamentals --}}
        <meta name="description" content="{{ $seo_desc }}" />
        <meta name="robots" content="{{ $seo_robots }}" />
        <link rel="canonical" href="{{ $seo_canon }}" />

        {{-- Open Graph / Social Media --}}
        <meta property="og:type" content="{{ $seo_type }}" />
        <meta property="og:url" content="{{ $seo_canon }}" />
        <meta property="og:title" content="{{ $seo_title }}" />
        <meta property="og:description" content="{{ $seo_desc }}" />
        <meta property="og:image" content="{{ $seo_image }}" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="{{ $sna_name }}" />
        <meta property="og:locale" content="{{ $sna_locale }}" />
        @if($seo_type === 'article' && $seo_pub)
            <meta property="article:published_time" content="{{ $seo_pub }}" />
        @endif

        {{-- Twitter / X Card --}}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="{{ $seo_canon }}" />
        <meta name="twitter:title" content="{{ $seo_title }}" />
        <meta name="twitter:description" content="{{ $seo_desc }}" />
        <meta name="twitter:image" content="{{ $seo_image }}" />

        {{-- JSON-LD Structured Data --}}
        @if($seo_jsonld)
            <script type="application/ld+json">{!! json_encode($seo_jsonld, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) !!}</script>
        @endif

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead

        @php
            $gtmContainerId = \App\Models\AppSetting::get('gtm_container_id');
        @endphp

        @if($gtmContainerId)
            {{-- Google Tag Manager --}}
            <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','{{ $gtmContainerId }}');</script>
            {{-- End Google Tag Manager --}}
        @endif
    </head>
    <body class="font-sans antialiased">
        @if($gtmContainerId ?? false)
            {{-- Google Tag Manager (noscript) --}}
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{ $gtmContainerId }}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
            {{-- End Google Tag Manager (noscript) --}}
        @endif
        @inertia
    </body>
</html>
