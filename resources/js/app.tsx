import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import { initializeTheme } from '@/hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

function trackPageView(url: string): void {
    const measurementId =
        (window as { __ga_measurement_id?: string }).__ga_measurement_id;
    if (!measurementId || typeof window.gtag !== 'function') {
        return;
    }
    window.gtag('event', 'page_view', {
        page_location: url,
        send_to: measurementId,
    });
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

router.on('navigate', (event) => {
    trackPageView(event.detail.page.url);
});

// This will set light / dark mode on load...
initializeTheme();
