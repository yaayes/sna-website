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

        {{-- Open Graph / Social Media --}}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="{{ url()->current() }}" />
        <meta property="og:title" content="Syndicat National des Aidants" />
        <meta property="og:description" content="Le SNA défend les intérêts des aidants familiaux qui accompagnent un proche touché par la maladie, le handicap ou la perte d'autonomie." />
        <meta property="og:image" content="{{ asset('images/og-image.png') }}" />
        <meta property="og:site_name" content="Syndicat National des Aidants" />
        <meta property="og:locale" content="{{ str_replace('_', '-', app()->getLocale()) }}" />

        {{-- Twitter / X Card --}}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="{{ url()->current() }}" />
        <meta name="twitter:title" content="Syndicat National des Aidants" />
        <meta name="twitter:description" content="Le SNA défend les intérêts des aidants familiaux qui accompagnent un proche touché par la maladie, le handicap ou la perte d'autonomie." />
        <meta name="twitter:image" content="{{ asset('images/og-image.png') }}" />

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
