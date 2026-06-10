/**
 * Safely push a custom event to the GTM dataLayer.
 * No-ops when GTM is not configured or not loaded.
 */
export function trackEvent(
    eventName: string,
    params?: Record<string, unknown>,
): void {
    if (!Array.isArray(window.dataLayer)) {
        return;
    }
    window.dataLayer.push({ event: eventName, ...params });
}
