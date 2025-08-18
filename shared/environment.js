// Environment Configuration
// This file handles all environment variables and environment-specific configuration

const environment = {
  // Environment detection
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_TEST: process.env.NODE_ENV === 'test',

  // Server configuration
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'localhost',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  API_URL: process.env.API_URL || 'http://localhost:3000/api',

  // Database configuration
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://localhost:5432/portfolio',
  DATABASE_SSL: process.env.DATABASE_SSL === 'true',
  DATABASE_POOL_MIN: parseInt(process.env.DATABASE_POOL_MIN) || 2,
  DATABASE_POOL_MAX: parseInt(process.env.DATABASE_POOL_MAX) || 10,

  // Redis configuration
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: parseInt(process.env.REDIS_PORT) || 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_DB: parseInt(process.env.REDIS_DB) || 0,

  // Email configuration
  GMAIL_USER: process.env.GMAIL_USER || 'david.fdezcuenca@gmail.com',
  GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
  RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL || 'david.fdezcuenca@gmail.com',
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: parseInt(process.env.SMTP_PORT) || 587,
  SMTP_SECURE: process.env.SMTP_SECURE === 'true',

  // Authentication configuration
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS) || 12,

  // Security configuration
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(',') || [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://www.davidfdezcuenca.com',
    'https://davidfdezcuenca.com'
  ],
  CORS_CREDENTIALS: process.env.CORS_CREDENTIALS === 'true',
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX) || 100,

  // Cache configuration
  CACHE_TTL_PROJECTS: parseInt(process.env.CACHE_TTL_PROJECTS) || 3600,
  CACHE_TTL_BLOG_POSTS: parseInt(process.env.CACHE_TTL_BLOG_POSTS) || 1800,
  CACHE_TTL_GITHUB_REPOS: parseInt(process.env.CACHE_TTL_GITHUB_REPOS) || 7200,
  CACHE_TTL_USER_PROFILE: parseInt(process.env.CACHE_TTL_USER_PROFILE) || 1800,

  // GitHub configuration
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  GITHUB_USERNAME: process.env.GITHUB_USERNAME || 'illuminatus503',
  GITHUB_API_RATE_LIMIT: parseInt(process.env.GITHUB_API_RATE_LIMIT) || 5000,

  // Blog configuration
  BLOG_POSTS_PER_PAGE: parseInt(process.env.BLOG_POSTS_PER_PAGE) || 10,
  BLOG_DEFAULT_STATUS: process.env.BLOG_DEFAULT_STATUS || 'draft',
  BLOG_MAX_TAGS_PER_POST: parseInt(process.env.BLOG_MAX_TAGS_PER_POST) || 10,

  // Analytics configuration
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  VERCEL_ANALYTICS_ID: process.env.VERCEL_ANALYTICS_ID,
  ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS !== 'false',
  ENABLE_DEBUG_ANALYTICS: process.env.ENABLE_DEBUG_ANALYTICS === 'true',

  // Logging configuration
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  LOG_FORMAT: process.env.LOG_FORMAT || 'dev',
  LOG_FILE: process.env.LOG_FILE || 'logs/app.log',
  LOG_MAX_SIZE: process.env.LOG_MAX_SIZE || '5m',
  LOG_MAX_FILES: parseInt(process.env.LOG_MAX_FILES) || 5,

  // Feature flags
  ENABLE_ADMIN: process.env.ENABLE_ADMIN !== 'false',
  ENABLE_BLOG: process.env.ENABLE_BLOG !== 'false',
  ENABLE_CONTACT: process.env.ENABLE_CONTACT !== 'false',
  ENABLE_GITHUB_INTEGRATION: process.env.ENABLE_GITHUB_INTEGRATION !== 'false',
  ENABLE_CACHE: process.env.ENABLE_CACHE !== 'false',
  ENABLE_RATE_LIMITING: process.env.ENABLE_RATE_LIMITING !== 'false',

  // Development configuration
  DEBUG: process.env.DEBUG === 'true',
  VERBOSE_LOGGING: process.env.VERBOSE_LOGGING === 'true',
  ENABLE_HOT_RELOAD: process.env.ENABLE_HOT_RELOAD === 'true',
  ENABLE_SOURCE_MAPS: process.env.ENABLE_SOURCE_MAPS === 'true'
};

// Helper functions
environment.get = (key, defaultValue = null) => {
  return environment[key] !== undefined ? environment[key] : defaultValue;
};

environment.require = (key) => {
  const value = environment[key];
  if (value === undefined || value === null) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return value;
};

environment.isProduction = () => {
  return environment.IS_PRODUCTION;
};

environment.isDevelopment = () => {
  return environment.IS_DEVELOPMENT;
};

environment.isTest = () => {
  return environment.IS_TEST;
};

environment.getDatabaseConfig = () => {
  return {
    url: environment.DATABASE_URL,
    ssl: environment.DATABASE_SSL,
    pool: {
      min: environment.DATABASE_POOL_MIN,
      max: environment.DATABASE_POOL_MAX
    }
  };
};

environment.getRedisConfig = () => {
  return {
    url: environment.REDIS_URL,
    host: environment.REDIS_HOST,
    port: environment.REDIS_PORT,
    password: environment.REDIS_PASSWORD,
    db: environment.REDIS_DB
  };
};

environment.getEmailConfig = () => {
  return {
    user: environment.GMAIL_USER,
    password: environment.GMAIL_APP_PASSWORD,
    recipient: environment.RECIPIENT_EMAIL,
    smtp: {
      host: environment.SMTP_HOST,
      port: environment.SMTP_PORT,
      secure: environment.SMTP_SECURE
    }
  };
};

environment.getSecurityConfig = () => {
  return {
    jwtSecret: environment.JWT_SECRET,
    jwtExpiresIn: environment.JWT_EXPIRES_IN,
    jwtRefreshExpiresIn: environment.JWT_REFRESH_EXPIRES_IN,
    bcryptRounds: environment.BCRYPT_ROUNDS,
    allowedOrigins: environment.ALLOWED_ORIGINS,
    corsCredentials: environment.CORS_CREDENTIALS
  };
};

environment.getCacheConfig = () => {
  return {
    ttl: {
      projects: environment.CACHE_TTL_PROJECTS,
      blogPosts: environment.CACHE_TTL_BLOG_POSTS,
      githubRepos: environment.CACHE_TTL_GITHUB_REPOS,
      userProfile: environment.CACHE_TTL_USER_PROFILE
    }
  };
};

environment.getRateLimitConfig = () => {
  return {
    windowMs: environment.RATE_LIMIT_WINDOW_MS,
    max: environment.RATE_LIMIT_MAX
  };
};

// Validation
environment.validate = () => {
  const required = [
    'DATABASE_URL',
    'JWT_SECRET'
  ];

  const missing = required.filter(key => !environment[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return true;
};

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
  // Node.js/CommonJS
  module.exports = environment;
} else if (typeof window !== 'undefined') {
  // Browser
  window.environment = environment;
}

export default environment;
