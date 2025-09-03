/**
 * Application Configuration
 * 
 * Central configuration for the DevForge Learning Lab application.
 */

require('dotenv').config();

const config = {
  // Server Configuration
  server: {
    port: process.env.PORT || 4000,
    host: process.env.HOST || 'localhost',
    env: process.env.NODE_ENV || 'development'
  },
  
  // Security Configuration
  security: {
    jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 10,
    corsOrigins: process.env.CORS_ORIGINS ? 
      process.env.CORS_ORIGINS.split(',') : 
      ['http://localhost:3000', 'http://localhost:5173']
  },
  
  // Database Configuration
  database: {
    url: process.env.DATABASE_URL || 'postgresql://localhost:5432/devforge_learning',
    maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS) || 20
  },
  
  // Redis Configuration
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || null,
    db: parseInt(process.env.REDIS_DB) || 0
  },
  
  // Learning Platform Configuration
  learning: {
    maxCodeExecutionTime: parseInt(process.env.MAX_CODE_EXECUTION_TIME) || 30000,
    allowedCodeModules: process.env.ALLOWED_CODE_MODULES ? 
      process.env.ALLOWED_CODE_MODULES.split(',') : 
      ['express', 'bcrypt', 'jsonwebtoken'],
    forbiddenCodePatterns: [
      'process.exit',
      'require(\'fs\')',
      'require(\'child_process\')',
      'eval(',
      'Function('
    ]
  },
  
  // File Upload Configuration
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
    allowedFileTypes: process.env.ALLOWED_FILE_TYPES ? 
      process.env.ALLOWED_FILE_TYPES.split(',') : 
      ['.js', '.json', '.txt', '.md'],
    uploadPath: process.env.UPLOAD_PATH || './uploads'
  },
  
  // Email Configuration (for notifications)
  email: {
    provider: process.env.EMAIL_PROVIDER || 'sendgrid',
    apiKey: process.env.EMAIL_API_KEY,
    fromEmail: process.env.FROM_EMAIL || 'noreply@devforge-learning.com',
    templates: {
      welcome: 'welcome-email-template',
      progress: 'progress-email-template',
      completion: 'completion-email-template'
    }
  },
  
  // Analytics Configuration
  analytics: {
    enabled: process.env.ANALYTICS_ENABLED === 'true',
    provider: process.env.ANALYTICS_PROVIDER || 'internal',
    trackingId: process.env.ANALYTICS_TRACKING_ID
  }
};

module.exports = config;
