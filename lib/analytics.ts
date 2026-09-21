declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const ANALYTICS_EVENTS = {
  // User events
  SIGN_UP: 'sign_up',
  LOGIN: 'login',
  LOGOUT: 'logout',

  // Content events
  PAGE_VIEW: 'page_view',
  SEARCH: 'search',
  VIEW_ITEM: 'view_item',

  // Action events
  CLICK: 'click',
  CTA_CLICK: 'cta_click',
  FORM_SUBMIT: 'form_submit',
  BUTTON_CLICK: 'button_click',

  // Feature events
  FEATURE_USED: 'feature_used',
  SETTINGS_UPDATED: 'settings_updated',
  EXPORT_DATA: 'export_data',

  // Error events
  ERROR: 'error',
  API_ERROR: 'api_error',
} as const;

export function pageview(url: string): void {
  if (!GA_ID || typeof window === 'undefined') return;

  if (typeof window.gtag !== 'function') {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
  }

  window.gtag('config', GA_ID, {
    page_path: url,
  });
}

export function event(
  action: (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS] | string,
  params?: Record<string, unknown>
): void {
  if (!GA_ID || typeof window === 'undefined') return;

  if (typeof window.gtag !== 'function') {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
  }

  window.gtag('event', action, params);
}
