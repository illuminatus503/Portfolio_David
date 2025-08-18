// API Configuration - Extends shared config
// This file contains API-specific configuration

const sharedConfig = require('./config.js');

const apiConfig = {
  ...sharedConfig,
  
  // API-specific overrides
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    cors: {
      origin: sharedConfig.security.allowedOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    }
  },

  // Database specific config
  database: {
    ...sharedConfig.database,
    pool: {
      min: 2,
      max: 10,
      acquireTimeoutMillis: 30000,
      createTimeoutMillis: 30000,
      destroyTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    }
  },

  // Email specific config
  email: {
    ...sharedConfig.email,
    templates: {
      contact: {
        subject: 'Nuevo mensaje del portfolio',
        html: `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> {{name}}</p>
          <p><strong>Email:</strong> {{email}}</p>
          <p><strong>Mensaje:</strong></p>
          <p>{{message}}</p>
          <hr>
          <p><small>Enviado desde el portfolio de David Fernández-Cuenca</small></p>
        `
      }
    }
  },

  // Rate limiting specific config
  rateLimit: {
    ...sharedConfig.api.rateLimit,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false
  },

  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.NODE_ENV === 'production' ? 'json' : 'dev',
    transports: ['console', 'file'],
    file: {
      filename: 'logs/api.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }
  },

  // Security specific config
  security: {
    ...sharedConfig.security,
    helmet: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'", "https://api.github.com"]
        }
      }
    },
    bcrypt: {
      rounds: sharedConfig.security.bcryptRounds
    }
  },

  // Cache specific config
  cache: {
    ...sharedConfig.cache,
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD,
      db: process.env.REDIS_DB || 0,
      keyPrefix: 'portfolio:'
    }
  },

  // Validation schemas
  validation: {
    contact: {
      name: { type: 'string', min: 2, max: 100, required: true },
      email: { type: 'email', required: true },
      message: { type: 'string', min: 10, max: 1000, required: true }
    },
    project: {
      title: { type: 'string', min: 3, max: 200, required: true },
      description: { type: 'string', min: 10, max: 1000, required: true },
      technologies: { type: 'array', items: 'string', required: true },
      github_url: { type: 'url', required: false },
      live_url: { type: 'url', required: false },
      image_url: { type: 'url', required: false },
      featured: { type: 'boolean', default: false }
    },
    blogPost: {
      title: { type: 'string', min: 3, max: 200, required: true },
      content: { type: 'string', min: 50, required: true },
      excerpt: { type: 'string', min: 10, max: 300, required: false },
      tags: { type: 'array', items: 'string', required: false },
      published: { type: 'boolean', default: false }
    }
  }
};

// Helper functions for API
apiConfig.getDatabaseUrl = () => {
  return apiConfig.database.url;
};

apiConfig.getEmailConfig = () => {
  return apiConfig.email;
};

apiConfig.getSecurityConfig = () => {
  return apiConfig.security;
};

apiConfig.getCacheConfig = () => {
  return apiConfig.cache;
};

apiConfig.getValidationSchema = (type) => {
  return apiConfig.validation[type];
};

apiConfig.isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

apiConfig.isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

module.exports = apiConfig;
