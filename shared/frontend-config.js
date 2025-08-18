// Frontend Configuration - Extends shared config
// This file contains frontend-specific configuration

import sharedConfig from './config.js';

const frontendConfig = {
  ...sharedConfig,
  
  // Frontend-specific overrides
  api: {
    ...sharedConfig.api,
    // Frontend-specific API config
    timeout: 10000, // 10 seconds
    retries: 3
  },

  // UI Configuration
  ui: {
    animations: {
      duration: 300,
      easing: 'ease-in-out'
    },
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    },
    colors: {
      primary: '#6366f1',
      accent: '#8b5cf6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    }
  },

  // Component Configuration
  components: {
    hero: {
      autoTypeSpeed: 100,
      deleteSpeed: 50,
      pauseTime: 2000
    },
    blog: {
      excerptLength: 160,
      readTimeWordsPerMinute: 200
    },
    projects: {
      itemsPerPage: 6,
      featuredCount: 3
    }
  },

  // Localization
  i18n: {
    defaultLanguage: 'es',
    fallbackLanguage: 'en',
    supportedLanguages: ['es', 'en'],
    namespaces: ['common', 'nav', 'hero', 'about', 'skills', 'projects', 'blog', 'contact']
  },

  // Theme Configuration
  themes: {
    dark: {
      primary: '#0d0d0d',
      secondary: '#1a1a1a',
      accent: '#6366f1',
      text: '#ffffff',
      textMuted: '#a3a3a3'
    },
    light: {
      primary: '#ffffff',
      secondary: '#f3f4f6',
      accent: '#6366f1',
      text: '#1f2937',
      textMuted: '#6b7280'
    }
  }
};

// Helper functions for frontend
frontendConfig.getThemeColors = (theme) => {
  return frontendConfig.themes[theme] || frontendConfig.themes.dark;
};

frontendConfig.getBreakpoint = (width) => {
  const breakpoints = Object.entries(frontendConfig.ui.breakpoints);
  for (let i = breakpoints.length - 1; i >= 0; i--) {
    if (width >= breakpoints[i][1]) {
      return breakpoints[i][0];
    }
  }
  return 'sm';
};

frontendConfig.isMobile = () => {
  return window.innerWidth < frontendConfig.ui.breakpoints.md;
};

frontendConfig.isTablet = () => {
  const width = window.innerWidth;
  return width >= frontendConfig.ui.breakpoints.md && width < frontendConfig.ui.breakpoints.lg;
};

frontendConfig.isDesktop = () => {
  return window.innerWidth >= frontendConfig.ui.breakpoints.lg;
};

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
  // Node.js/CommonJS
  module.exports = frontendConfig;
} else if (typeof window !== 'undefined') {
  // Browser
  window.frontendConfig = frontendConfig;
}

export default frontendConfig;
