/**
 * Google Analytics 4 (GA4) Helper Utilities
 * Property: G-L9TVQDY9NX (Annapurna Base Camp Official)
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Generic GA4 Event Trigger
 */
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

/**
 * Track high-value WhatsApp conversion clicks
 */
export const trackWhatsAppClick = (placement: string) => {
  trackEvent('whatsapp_conversion', {
    event_category: 'Lead Generation',
    event_label: placement,
    contact_method: 'WhatsApp',
    value: 1
  });
};

/**
 * Track when a trekker interacts with or selects a package tier
 */
export const trackPackageSelect = (tierName: string) => {
  trackEvent('select_item', {
    item_list_name: 'Expedition Packages',
    items: [{ item_name: tierName }]
  });
};

/**
 * Track booking form initiation
 */
export const trackBookingInitiation = (tierName: string, estimatedPrice?: number) => {
  trackEvent('begin_checkout', {
    currency: 'USD',
    value: estimatedPrice || 0,
    items: [{ item_name: tierName }]
  });
};
