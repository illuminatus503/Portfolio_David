// i18n Configuration
import { createI18n } from './i18n.js';

// Import all translation files
import en from './locales/en.js';
import es from './locales/es.js';

// Create i18n instance
const i18n = createI18n({
  defaultLocale: 'en',
  locales: {
    en,
    es
  }
});

export default i18n; 