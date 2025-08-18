// Constants for Portfolio Application
// This file contains all constant values used across the application

const constants = {
  // HTTP Status Codes
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
  },

  // HTTP Methods
  HTTP_METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    OPTIONS: 'OPTIONS'
  },

  // Content Types
  CONTENT_TYPES: {
    JSON: 'application/json',
    HTML: 'text/html',
    TEXT: 'text/plain',
    FORM_DATA: 'multipart/form-data'
  },

  // Database Constraints
  DATABASE: {
    MAX_TITLE_LENGTH: 200,
    MAX_DESCRIPTION_LENGTH: 1000,
    MAX_CONTENT_LENGTH: 10000,
    MAX_TAG_LENGTH: 50,
    MAX_TAGS_PER_ITEM: 10,
    MAX_NAME_LENGTH: 100,
    MAX_EMAIL_LENGTH: 255,
    MAX_MESSAGE_LENGTH: 1000
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
    MIN_LIMIT: 1
  },

  // File Upload
  FILE_UPLOAD: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    MAX_FILES: 5
  },

  // Authentication
  AUTH: {
    TOKEN_EXPIRY: '24h',
    REFRESH_TOKEN_EXPIRY: '7d',
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MAX_LENGTH: 128
  },

  // Rate Limiting
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100,
    SKIP_SUCCESSFUL: false,
    SKIP_FAILED: false
  },

  // Cache
  CACHE: {
    TTL: {
      PROJECTS: 3600, // 1 hour
      BLOG_POSTS: 1800, // 30 minutes
      GITHUB_REPOS: 7200, // 2 hours
      USER_PROFILE: 1800, // 30 minutes
      STATISTICS: 3600 // 1 hour
    },
    PREFIXES: {
      PROJECTS: 'projects:',
      BLOG: 'blog:',
      GITHUB: 'github:',
      USER: 'user:',
      STATS: 'stats:'
    }
  },

  // GitHub API
  GITHUB: {
    API_BASE: 'https://api.github.com',
    REPOS_PER_PAGE: 100,
    MAX_REPOS: 1000,
    RATE_LIMIT: 5000, // requests per hour for authenticated users
    USER_AGENT: 'Portfolio-App/1.0.0'
  },

  // Email
  EMAIL: {
    FROM_NAME: 'David Fernández-Cuenca Portfolio',
    SUBJECT_PREFIX: '[Portfolio] ',
    MAX_RECIPIENTS: 10,
    TEMPLATE_ENGINE: 'handlebars'
  },

  // Validation
  VALIDATION: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    EMAIL_MAX_LENGTH: 255,
    MESSAGE_MIN_LENGTH: 10,
    MESSAGE_MAX_LENGTH: 1000,
    TITLE_MIN_LENGTH: 3,
    TITLE_MAX_LENGTH: 200,
    DESCRIPTION_MIN_LENGTH: 10,
    DESCRIPTION_MAX_LENGTH: 1000,
    CONTENT_MIN_LENGTH: 50,
    CONTENT_MAX_LENGTH: 10000
  },

  // UI/UX
  UI: {
    ANIMATION_DURATION: 300,
    ANIMATION_EASING: 'ease-in-out',
    DEBOUNCE_DELAY: 300,
    THROTTLE_DELAY: 100,
    INFINITE_SCROLL_THRESHOLD: 100,
    MODAL_ANIMATION_DURATION: 200
  },

  // Localization
  I18N: {
    DEFAULT_LOCALE: 'es',
    FALLBACK_LOCALE: 'en',
    SUPPORTED_LOCALES: ['es', 'en'],
    DATE_FORMATS: {
      es: 'DD/MM/YYYY',
      en: 'MM/DD/YYYY'
    },
    TIME_FORMATS: {
      es: 'HH:mm',
      en: 'hh:mm A'
    }
  },

  // SEO
  SEO: {
    DEFAULT_TITLE: 'David Fernández-Cuenca - Software Engineer & AI Specialist',
    DEFAULT_DESCRIPTION: 'Portfolio profesional de David Fernández-Cuenca, desarrollador especializado en software crítico, inteligencia artificial y sistemas distribuidos.',
    DEFAULT_KEYWORDS: 'desarrollador software, inteligencia artificial, React, Node.js, Python, sistemas críticos, portfolio, Dusseldorf, Alemania',
    DEFAULT_IMAGE: '/assets/og-image.jpg',
    MAX_TITLE_LENGTH: 60,
    MAX_DESCRIPTION_LENGTH: 160,
    MAX_KEYWORDS_LENGTH: 200
  },

  // Analytics
  ANALYTICS: {
    TRACKING_ID: process.env.GOOGLE_ANALYTICS_ID || '',
    VERCELL_ID: process.env.VERCEL_ANALYTICS_ID || '',
    ENABLE_DEBUG: process.env.NODE_ENV === 'development',
    SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
    PAGE_VIEW_TIMEOUT: 1000 // 1 second
  }
};

// Helper functions
constants.isValidHttpStatus = (status) => {
  return Object.values(constants.HTTP_STATUS).includes(status);
};

constants.isValidHttpMethod = (method) => {
  return Object.values(constants.HTTP_METHODS).includes(method.toUpperCase());
};

constants.isValidContentType = (contentType) => {
  return Object.values(constants.CONTENT_TYPES).includes(contentType);
};

constants.getCacheKey = (prefix, identifier) => {
  return `${prefix}${identifier}`;
};

constants.formatDate = (date, locale = 'es') => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

constants.formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
  // Node.js/CommonJS
  module.exports = constants;
} else if (typeof window !== 'undefined') {
  // Browser
  window.constants = constants;
}

export default constants;
