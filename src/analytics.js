// Analytics configuration for Vercel
// This file can be used to configure analytics services

// Google Analytics configuration
export const initGoogleAnalytics = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Track page views
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track custom events
export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formName) => {
  trackEvent('form_submit', 'engagement', formName);
};

// Track external link clicks
export const trackExternalLink = (url) => {
  trackEvent('click', 'external_link', url);
};

// Track theme changes
export const trackThemeChange = (theme) => {
  trackEvent('theme_change', 'preferences', theme);
};

// Track language changes
export const trackLanguageChange = (language) => {
  trackEvent('language_change', 'preferences', language);
}; 