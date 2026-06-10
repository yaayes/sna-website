/**
 * Safely fire a Google Analytics event.
 * No-ops when GA is not configured or not loaded.
 */
export function trackEvent(
    eventName: string,
    params?: Record<string, unknown>,
): void {
    if (typeof window.gtag !== 'function' || !window.__ga_measurement_id) {
        return;
    }
    window.gtag('event', eventName, {
        send_to: window.__ga_measurement_id,
        ...params,
    });
}
