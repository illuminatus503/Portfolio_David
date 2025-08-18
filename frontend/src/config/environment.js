// Environment Configuration for Frontend
// Browser-compatible configuration without ES6 imports

// Safe way to access process.env in browser
const getEnvVar = (name, defaultValue = '') => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[name] || defaultValue;
  }
  return defaultValue;
};

const environment = {
  // Personal Information
  personal: {
    name: 'David Fernández-Cuenca Marcos',
    email: 'david.fdezcuenca@gmail.com',
    location: 'Düsseldorf, Germany',
    title: 'Software Engineer at Indra',
    description: 'Software Engineer with 10+ years of experience in backend development, AI, and critical systems'
  },
  
  // Professional Information
  professional: {
    company: 'Indra',
    position: 'Software Engineer',
    specialization: 'Critical systems and air traffic control',
    experience: '10+ years'
  },
  
  // Site Information
  site: {
    title: 'David Fernández-Cuenca Portfolio',
    description: 'Portfolio profesional de David Fernández-Cuenca, desarrollador especializado en software crítico',
    url: 'https://www.davidfdezcuenca.com',
    portfolio: 'https://www.davidfdezcuenca.com'
  },
  
  // Social Links
  social: {
    github: 'https://github.com/illuminatus503',
    linkedin: 'https://linkedin.com/in/david-cuenca-marcos-03b7121b5',
    twitter: 'https://x.com/illuminatus_503'
  },
  
  // Analytics Configuration
  analytics: {
    googleAnalyticsId: '',
    vercelAnalyticsId: ''
  },
  
  // Frontend-specific overrides  
  isDevelopment: (typeof window !== 'undefined' && window.location.hostname === 'localhost'),
  isProduction: (typeof window !== 'undefined' && window.location.hostname !== 'localhost'),
  
  // API Configuration (frontend-specific)
  API_BASE: (typeof window !== 'undefined' && window.location.hostname === 'localhost') ? 'http://localhost:3000/api' : '/api',
  
  // Analytics Configuration (frontend-specific) - browser safe
  VERCEL_ANALYTICS_ID: getEnvVar('VERCEL_ANALYTICS_ID') || getEnvVar('REACT_APP_VERCEL_ANALYTICS_ID'),
  GOOGLE_ANALYTICS_ID: getEnvVar('GOOGLE_ANALYTICS_ID') || getEnvVar('REACT_APP_GOOGLE_ANALYTICS_ID'),
  
  // Feature Flags (frontend-specific) - browser safe
  ENABLE_ADMIN: getEnvVar('REACT_APP_ENABLE_ADMIN', 'true') !== 'false',
  ENABLE_ANALYTICS: getEnvVar('REACT_APP_ENABLE_ANALYTICS', 'true') !== 'false',
  ENABLE_BLOG: getEnvVar('REACT_APP_ENABLE_BLOG', 'true') !== 'false',
  
  // Debug Mode (frontend-specific) - browser safe
  DEBUG: getEnvVar('REACT_APP_DEBUG') === 'true'
};

// Helper functions (extend shared config helpers)
environment.hasAnalytics = () => {
  return environment.ENABLE_ANALYTICS && (
    environment.VERCEL_ANALYTICS_ID || 
    environment.GOOGLE_ANALYTICS_ID
  );
};

environment.getAnalyticsId = () => {
  return environment.VERCEL_ANALYTICS_ID || environment.GOOGLE_ANALYTICS_ID;
};

environment.isLocalhost = () => {
  return typeof window !== 'undefined' && window.location.hostname === 'localhost';
};

environment.getFullUrl = (path = '') => {
  return `${environment.site.portfolio}${path}`;
};

// Additional frontend-specific helpers
environment.getPersonalInfo = () => {
  return environment.personal;
};

environment.getProfessionalInfo = () => {
  return environment.professional;
};

environment.getSiteInfo = () => {
  return environment.site;
};

environment.getSocialLinks = () => {
  return environment.social;
};

environment.getThemeColors = (theme) => {
  return environment.themes[theme] || environment.themes.dark;
};

environment.getBreakpoint = (width) => {
  return environment.getBreakpoint(width);
};

environment.isMobile = () => {
  return environment.isMobile();
};

environment.isTablet = () => {
  return environment.isTablet();
};

environment.isDesktop = () => {
  return environment.isDesktop();
};

// Make environment available globally
window.environment = environment;

export default environment;
