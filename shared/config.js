// Shared Configuration for Portfolio
// This file contains all shared configuration between API and Frontend

const config = {
  // Personal Information
  personal: {
    name: 'David Fernández-Cuenca Marcos',
    email: 'david.fdezcuenca@gmail.com',
    location: {
      city: 'Dusseldorf',
      country: 'Germany',
      countryCode: 'DE'
    },
    jobTitle: 'Software Engineer & AI Specialist',
    experience: '10+ years',
    specialization: 'Critical Systems, AI, Distributed Systems'
  },

  // Professional Details
  professional: {
    company: 'Indra',
    role: 'Air Traffic Control Systems Specialist',
    skills: [
      'Backend Development',
      'Python',
      'Ada',
      'C',
      'React',
      'Node.js',
      'Machine Learning',
      'Critical Systems',
      'Distributed Systems'
    ]
  },

  // Social Media & Links
  social: {
    github: 'https://github.com/davidfdezcuenca',
    linkedin: 'https://linkedin.com/in/davidfdezcuenca',
    twitter: 'https://twitter.com/davidfdezcuenca',
    portfolio: 'https://www.davidfdezcuenca.com'
  },

  // Site Configuration
  site: {
    name: 'David Fernández-Cuenca Portfolio',
    description: 'Portfolio profesional de David Fernández-Cuenca, desarrollador especializado en software crítico, inteligencia artificial y sistemas distribuidos.',
    keywords: 'desarrollador software, inteligencia artificial, React, Node.js, Python, sistemas críticos, portfolio, Dusseldorf, Alemania',
    defaultLanguage: 'es',
    defaultTheme: 'dark',
    supportedLanguages: ['es', 'en'],
    supportedThemes: ['dark', 'light']
  },

  // API Configuration
  api: {
    baseUrl: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api',
    endpoints: {
      projects: '/projects',
      blog: '/blog',
      contact: '/contact',
      login: '/login',
      github: '/github'
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    }
  },

  // Database Configuration
  database: {
    url: process.env.DATABASE_URL,
    tables: {
      users: 'users',
      projects: 'projects',
      blogPosts: 'blog_posts',
      skills: 'skills',
      contactSubmissions: 'contact_submissions'
    }
  },

  // Email Configuration
  email: {
    from: process.env.GMAIL_USER || 'david.fdezcuenca@gmail.com',
    to: process.env.RECIPIENT_EMAIL || 'david.fdezcuenca@gmail.com',
    subject: 'Nuevo mensaje del portfolio',
    smtp: {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false
    }
  },

  // GitHub Configuration
  github: {
    username: 'illuminatus503',
    apiUrl: 'https://api.github.com',
    reposPerPage: 100,
    excludeForks: true,
    requireDescription: true
  },

  // Blog Configuration
  blog: {
    postsPerPage: 10,
    defaultStatus: 'draft',
    supportedTags: [
      'tecnología',
      'programación',
      'inteligencia artificial',
      'sistemas críticos',
      'desarrollo web',
      'backend',
      'frontend',
      'devops'
    ]
  },

  // Analytics Configuration
  analytics: {
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
    vercelAnalyticsId: process.env.VERCEL_ANALYTICS_ID,
    enableTracking: process.env.NODE_ENV === 'production'
  },

  // Security Configuration
  security: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: '24h',
    bcryptRounds: 12,
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'https://www.davidfdezcuenca.com']
  },

  // Cache Configuration
  cache: {
    ttl: {
      projects: 3600, // 1 hour
      blogPosts: 1800, // 30 minutes
      githubRepos: 7200 // 2 hours
    }
  }
};

// Helper functions
config.getApiUrl = (endpoint) => {
  return `${config.api.baseUrl}${endpoint}`;
};

config.getPersonalInfo = () => {
  return config.personal;
};

config.getSocialLinks = () => {
  return config.social;
};

config.getSiteInfo = () => {
  return config.site;
};

config.isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

config.isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
  // Node.js/CommonJS
  module.exports = config;
} else if (typeof window !== 'undefined') {
  // Browser
  window.sharedConfig = config;
}

export default config;
