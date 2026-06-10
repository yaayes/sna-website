import type { Auth } from '@/types/auth';

declare global {
    interface Window {
        dataLayer: Record<string, unknown>[];
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            analytics: {
                gtm_container_id: string | null;
            };
            [key: string]: unknown;
        };
    }
}
