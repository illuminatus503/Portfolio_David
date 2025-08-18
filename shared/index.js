// Shared Configuration Index
// This file exports all shared configurations for easy importing

// Core configuration
export { default as config } from './config.js';
export { default as constants } from './constants.js';
export { default as environment } from './environment.js';

// Environment-specific configurations
export { default as frontendConfig } from './frontend-config.js';
export { default as apiConfig } from './api-config.js';

// Re-export for CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
  const config = require('./config.js');
  const constants = require('./constants.js');
  const environment = require('./environment.js');
  const frontendConfig = require('./frontend-config.js');
  const apiConfig = require('./api-config.js');

  module.exports = {
    config,
    constants,
    environment,
    frontendConfig,
    apiConfig
  };
}

// Browser global exports
if (typeof window !== 'undefined') {
  window.sharedConfigs = {
    config: window.sharedConfig,
    constants: window.constants,
    environment: window.environment,
    frontendConfig: window.frontendConfig,
    apiConfig: window.apiConfig
  };
}
