// i18n Core System
class I18n {
  constructor(config) {
    this.defaultLocale = config.defaultLocale;
    this.locales = config.locales;
    this.currentLocale = this.defaultLocale;
    this.browserLocale = this.getBrowserLocale();
  }

  // Get browser locale
  getBrowserLocale() {
    const browserLang = navigator.language || navigator.userLanguage;
    const shortLang = browserLang.split('-')[0];
    
    // Check if we support this language
    if (this.locales[shortLang]) {
      return shortLang;
    }
    
    // Fallback to default
    return this.defaultLocale;
  }

  // Set current locale
  setLocale(locale) {
    if (this.locales[locale]) {
      this.currentLocale = locale;
      localStorage.setItem('lang', locale);
    }
  }

  // Get current locale
  getLocale() {
    return this.currentLocale;
  }

  // Get translation
  t(key, params = {}) {
    const keys = key.split('.');
    let translation = this.locales[this.currentLocale];

    // Navigate through nested keys
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        // Fallback to browser locale first, then default
        const fallbackLocale = this.browserLocale !== this.currentLocale ? this.browserLocale : this.defaultLocale;
        translation = this.locales[fallbackLocale];
        for (const fallbackKey of keys) {
          if (translation && translation[fallbackKey]) {
            translation = translation[fallbackKey];
          } else {
            // Final fallback to default locale
            translation = this.locales[this.defaultLocale];
            for (const finalKey of keys) {
              if (translation && translation[finalKey]) {
                translation = translation[finalKey];
              } else {
                return key; // Return key if translation not found
              }
            }
          }
        }
      }
    }

    // Replace parameters
    if (typeof translation === 'string') {
      return translation.replace(/\{(\w+)\}/g, (match, param) => {
        return params[param] || match;
      });
    }

    return translation;
  }

  // Get all translations for a namespace
  getNamespace(namespace) {
    return this.locales[this.currentLocale][namespace] || 
           this.locales[this.browserLocale][namespace] || 
           this.locales[this.defaultLocale][namespace] || {};
  }

  // Check if translation exists
  has(key) {
    const keys = key.split('.');
    
    // Check current locale
    let translation = this.locales[this.currentLocale];
    let found = true;
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        found = false;
        break;
      }
    }
    if (found) return true;

    // Check browser locale
    translation = this.locales[this.browserLocale];
    found = true;
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        found = false;
        break;
      }
    }
    if (found) return true;

    // Check default locale
    translation = this.locales[this.defaultLocale];
    found = true;
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        found = false;
        break;
      }
    }
    return found;
  }
}

// Factory function
export function createI18n(config) {
  return new I18n(config);
} 