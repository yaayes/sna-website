import type { Auth } from '@/types/auth';

declare global {
    interface Window {
        gtag: (...args: unknown[]) => void;
        dataLayer: unknown[];
        __ga_measurement_id?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            analytics: {
                ga_measurement_id: string | null;
            };
            [key: string]: unknown;
        };
    }
}
