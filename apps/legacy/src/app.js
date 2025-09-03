/**
 * DevForge Learning Lab - Main Application
 * 
 * This is the main application file that sets up the Express server,
 * middleware, routes, and error handling for the learning platform.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Import configuration
const config = require('./config/app');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const moduleRoutes = require('./routes/modules');
const lessonRoutes = require('./routes/lessons');
const progressRoutes = require('./routes/progress');
const analyticsRoutes = require('./routes/analytics');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const notFoundHandler = require('./middleware/notFoundHandler');
const authMiddleware = require('./middleware/auth');

// Import services
const DatabaseService = require('./services/DatabaseService');
const RedisService = require('./services/RedisService');

class LearningApp {
  constructor() {
    this.app = express();
    this.port = config.server.port;
    this.env = config.server.env;
    
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  /**
   * Initialize all middleware
   */
  initializeMiddleware() {
    // Security middleware
    this.app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'self'", "https://www.youtube.com", "https://youtube.com", "https://www.youtube-nocookie.com"]
        }
      }
    }));

    // CORS configuration
    this.app.use(cors({
      origin: config.security.corsOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    }));

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: {
        error: 'Too many requests from this IP, please try again later.'
      },
      standardHeaders: true,
      legacyHeaders: false
    });
    this.app.use('/api/', limiter);

    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Compression middleware
    this.app.use(compression());

    // Logging middleware
    if (this.env === 'development') {
      this.app.use(morgan('dev'));
    } else {
      this.app.use(morgan('combined'));
    }

    // Static files
    this.app.use(express.static(path.join(__dirname, '../public')));
    this.app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

    // Request logging
    this.app.use((req, res, next) => {
      console.log(`📥 ${req.method} ${req.path} -> ${req.get('origin') || 'unknown'}`);
      next();
    });
  }

  /**
   * Initialize all routes
   */
  initializeRoutes() {
    // Health check endpoints
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: this.env,
        version: process.env.npm_package_version || '1.0.0'
      });
    });

    this.app.get('/ping', (req, res) => {
      res.send('pong');
    });

    // API routes
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/users', authMiddleware, userRoutes);
    this.app.use('/api/modules', moduleRoutes);
    this.app.use('/api/lessons', lessonRoutes);
    this.app.use('/api/progress', authMiddleware, progressRoutes);
    this.app.use('/api/analytics', authMiddleware, analyticsRoutes);

    // Serve the main app
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    // Note: Catch-all route removed for Express 5 compatibility
    // SPA routing will be handled by the frontend
  }

  /**
   * Initialize error handling
   */
  initializeErrorHandling() {
    // 404 handler
    this.app.use(notFoundHandler);
    
    // Global error handler
    this.app.use(errorHandler);
  }

  /**
   * Initialize database connections
   */
  async initializeServices() {
    try {
      // Initialize database
      await DatabaseService.connect();
      console.log('✅ Database connected successfully');
      
      // Initialize Redis
      await RedisService.connect();
      console.log('✅ Redis connected successfully');
      
    } catch (error) {
      console.error('❌ Failed to initialize services:', error);
      throw error;
    }
  }

  /**
   * Start the application
   */
  async start() {
    try {
      // Initialize services
      await this.initializeServices();
      
      // Start the server
      this.app.listen(this.port, () => {
        console.log(`🚀 DevForge Learning Lab running on port ${this.port}`);
        console.log(`🌍 Environment: ${this.env}`);
        console.log(`📚 Learning platform ready!`);
        console.log(`🌐 Open http://localhost:${this.port} to start learning!`);
      });
      
    } catch (error) {
      console.error('❌ Failed to start application:', error);
      process.exit(1);
    }
  }

  /**
   * Graceful shutdown
   */
  async shutdown() {
    console.log('🔄 Shutting down gracefully...');
    
    try {
      // Close database connections
      await DatabaseService.disconnect();
      console.log('✅ Database connections closed');
      
      // Close Redis connections
      await RedisService.disconnect();
      console.log('✅ Redis connections closed');
      
      console.log('✅ Graceful shutdown completed');
      process.exit(0);
      
    } catch (error) {
      console.error('❌ Error during shutdown:', error);
      process.exit(1);
    }
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  app.shutdown();
});

process.on('SIGINT', () => {
  console.log('SIGINT received');
  app.shutdown();
});

// Create and export the app instance
const app = new LearningApp();

// Start the app if this file is run directly
if (require.main === module) {
  app.start();
}

module.exports = app;
