// Professional i18n system for script tags - Fixed version
const { useContext } = React;

// Available locales
const locales = {
  en: 'en',
  es: 'es'
};

// Default locale
const defaultLocale = 'en';

// Global language state - independent of React Context
let currentLanguage = localStorage.getItem('lang') || defaultLocale;

// Translation function - completely independent of React Context
function t(key, params = {}) {
  const translations = window[currentLanguage];
  
  if (!translations) {
    console.warn(`Locale ${currentLanguage} not found, falling back to ${defaultLocale}`);
    return window[defaultLocale] ? getNestedValue(window[defaultLocale], key, params) : key;
  }
  
  return getNestedValue(translations, key, params);
}

// Helper function to get nested values
function getNestedValue(obj, key, params = {}) {
  const keys = key.split('.');
  let value = obj;
  
  // Navigate through nested keys
  for (const k of keys) {
    if (value && value[k] !== undefined) {
      value = value[k];
    } else {
      // Fallback to default locale
      const fallbackValue = window[defaultLocale];
      if (fallbackValue && fallbackValue !== obj) {
        value = getNestedValue(fallbackValue, key, params);
        break;
      } else {
        return key; // Return key if translation not found
      }
    }
  }

  // Replace parameters
  if (typeof value === 'string') {
    return value.replace(/\{(\w+)\}/g, (match, param) => {
      return params[param] !== undefined ? params[param] : match;
    });
  }

  return value || key;
}

// Function to change language - independent of React Context
function setLanguage(newLanguage) {
  if (locales[newLanguage]) {
    currentLanguage = newLanguage;
    localStorage.setItem('lang', newLanguage);
    // Update window.currentLanguage for compatibility
    window.currentLanguage = newLanguage;
    return true;
  }
  return false;
}

// Function to get current language
function getLanguage() {
  return currentLanguage;
}

// useTranslation hook - minimal React integration
function useTranslation() {
  // Only use React Context to get the language, but don't depend on it for translations
  const { language } = useAppContext();
  
  // Sync with React Context when it changes
  React.useEffect(() => {
    if (language && language !== currentLanguage) {
      setLanguage(language);
    }
  }, [language]);

  return { t, setLanguage, getLanguage };
}

// Make everything available globally
window.useTranslation = useTranslation;
window.t = t; // Expose t function globally
window.setLanguage = setLanguage; // Expose setLanguage globally
window.getLanguage = getLanguage; // Expose getLanguage globally
window.currentLanguage = currentLanguage; // Initialize for compatibility 