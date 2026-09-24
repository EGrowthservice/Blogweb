/**
 * PULSE Entertainment - Analytics & Conversion Tracking Service
 * Only tracks real user interactions (No bot/auto-clicking, compliant with Google policies).
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export interface EventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}

/**
 * Send custom event to Google Analytics (gtag.js)
 */
export function trackEvent(eventName: string, params: EventParams = {}) {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  } else {
    // If gtag not ready yet, push to dataLayer safely
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }
}

/**
 * Track real user clicks on CTAs, buttons, navigation menus, and links
 */
export function trackClick(label: string, category = 'engagement', extra: Record<string, any> = {}) {
  trackEvent('cta_click', {
    event_category: category,
    event_label: label,
    ...extra,
  });
}

/**
 * Track route / page changes
 */
export function trackPageView(url: string, title?: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', 'page_view', {
    page_path: url,
    page_title: title || (typeof document !== 'undefined' ? document.title : ''),
  });
}

/**
 * Track Google Ads Conversion
 */
export function trackGoogleAdsConversion(
  conversionId: string,
  conversionLabel: string,
  value?: number,
  currency = 'USD'
) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  if (!conversionId || !conversionLabel) return;

  const sendTo = conversionId.startsWith('AW-')
    ? `${conversionId}/${conversionLabel}`
    : `AW-${conversionId}/${conversionLabel}`;

  const payload: Record<string, any> = {
    send_to: sendTo,
  };

  if (value !== undefined) {
    payload.value = value;
    payload.currency = currency;
  }

  window.gtag('event', 'conversion', payload);
}
