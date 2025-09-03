// Migration service for transferring data from legacy app to React app
import { transformLegacyData, transformToLegacyFormat } from '../data/models';
import apiService from './api';

class MigrationService {
  constructor() {
    this.migrationStatus = {
      isComplete: false,
      currentStep: 0,
      totalSteps: 0,
      errors: [],
      warnings: [],
    };
  }

  // Step 1: Extract learning modules from legacy app
  async extractLegacyData() {
    try {
      console.log('🔄 Step 1: Extracting legacy data...');
      
      // For now, we'll use the mock data structure
      // In production, this would read from the legacy server.js or database
      const legacyModules = [
        {
          id: 'module-1',
          title: 'Getting Started with Express',
          description: 'Learn the basics of Express.js by building a simple server',
          difficulty: 'Beginner',
          duration: '15 minutes',
          topics: ['Express basics', 'Middleware', 'Routing', 'HTTP methods'],
          lessons: [
            {
              id: 'lesson-1-1',
              title: 'Hello World Server',
              type: 'theory',
              content: 'Learn how to create your first Express server',
              codeExample: `const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
              challenge: {
                type: 'code',
                description: 'Create a server that responds with "Hello DevForge!" on the root route',
                starterCode: `const express = require('express');
const app = express();
const PORT = 3000;

// Your code here

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
                solution: `const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello DevForge!');
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
                tests: [
                  {
                    description: 'Server should start without errors',
                    test: (code) => !code.includes('syntax error'),
                    expected: 'No syntax errors',
                    passed: false,
                  },
                  {
                    description: 'Should have a GET route for "/"',
                    test: (code) => code.includes('app.get(\'/\'') || code.includes('app.get("/")'),
                    expected: 'GET route for root path',
                    passed: false,
                  },
                  {
                    description: 'Should send "Hello DevForge!" response',
                    test: (code) => code.includes('Hello DevForge!'),
                    expected: 'Correct response message',
                    passed: false,
                  },
                ],
              },
            },
          ],
        },
        {
          id: 'module-2',
          title: 'JWT Authentication',
          description: 'Implement secure authentication using JWT tokens and password hashing',
          difficulty: 'Intermediate',
          duration: '30 minutes',
          topics: ['JWT', 'Authentication', 'Password Hashing', 'Security'],
          lessons: [
            {
              id: 'lesson-2-1',
              title: 'JWT Basics',
              type: 'theory',
              content: 'Learn about JSON Web Tokens and their role in authentication',
              codeExample: `const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Generate JWT token
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);`,
              challenge: {
                type: 'code',
                description: 'Create a JWT token generation function',
                starterCode: `const jwt = require('jsonwebtoken');

function generateToken(user) {
  // TODO: Implement JWT token generation
  // Should include userId and email, expire in 24h
}

module.exports = { generateToken };`,
                solution: `const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );
}

module.exports = { generateToken };`,
                tests: [
                  {
                    description: 'Function should return a string',
                    test: (code) => code.includes('return') && code.includes('jwt.sign'),
                    expected: 'JWT token string',
                    passed: false,
                  },
                  {
                    description: 'Should include userId and email in payload',
                    test: (code) => code.includes('userId') && code.includes('email'),
                    expected: 'Payload with user data',
                    passed: false,
                  },
                ],
              },
            },
          ],
        },
      ];

      console.log(`✅ Extracted ${legacyModules.length} modules with ${legacyModules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons`);
      return legacyModules;
    } catch (error) {
      console.error('❌ Error extracting legacy data:', error);
      this.migrationStatus.errors.push(`Failed to extract legacy data: ${error.message}`);
      throw error;
    }
  }

  // Step 2: Transform legacy data to React format
  async transformData(legacyData) {
    try {
      console.log('🔄 Step 2: Transforming data to React format...');
      
      const transformedData = transformLegacyData(legacyData);
      
      console.log(`✅ Transformed ${transformedData.length} modules to React format`);
      return transformedData;
    } catch (error) {
      console.error('❌ Error transforming data:', error);
      this.migrationStatus.errors.push(`Failed to transform data: ${error.message}`);
      throw error;
    }
  }

  // Step 3: Validate transformed data
  async validateData(transformedData) {
    try {
      console.log('🔄 Step 3: Validating transformed data...');
      
      const validationResults = {
        valid: true,
        errors: [],
        warnings: [],
      };

      transformedData.forEach((module, moduleIndex) => {
        if (!module.id || !module.title) {
          validationResults.valid = false;
          validationResults.errors.push(`Module ${moduleIndex}: Missing required fields (id, title)`);
        }

        module.lessons.forEach((lesson, lessonIndex) => {
          if (!lesson.id || !lesson.title) {
            validationResults.valid = false;
            validationResults.errors.push(`Module ${moduleIndex}, Lesson ${lessonIndex}: Missing required fields`);
          }

          if (lesson.challenge && !lesson.challenge.description) {
            validationResults.warnings.push(`Module ${moduleIndex}, Lesson ${lessonIndex}: Challenge missing description`);
          }
        });
      });

      if (validationResults.valid) {
        console.log('✅ Data validation passed');
      } else {
        console.warn('⚠️ Data validation completed with issues');
        console.warn('Errors:', validationResults.errors);
        console.warn('Warnings:', validationResults.warnings);
      }

      return validationResults;
    } catch (error) {
      console.error('❌ Error validating data:', error);
      this.migrationStatus.errors.push(`Failed to validate data: ${error.message}`);
      throw error;
    }
  }

  // Step 4: Migrate to React app
  async migrateToReact(transformedData) {
    try {
      console.log('🔄 Step 4: Migrating to React app...');
      
      // Store data in localStorage for now (in production, this would go to a database)
      const migrationData = {
        modules: transformedData,
        migratedAt: new Date().toISOString(),
        version: '1.0.0',
      };

      localStorage.setItem('devtut_migrated_data', JSON.stringify(migrationData));
      
      console.log('✅ Data migrated to React app and stored locally');
      return migrationData;
    } catch (error) {
      console.error('❌ Error migrating to React:', error);
      this.migrationStatus.errors.push(`Failed to migrate to React: ${error.message}`);
      throw error;
    }
  }

  // Complete migration process
  async runMigration() {
    try {
      console.log('🚀 Starting DevTut migration process...');
      
      this.migrationStatus.totalSteps = 4;
      this.migrationStatus.currentStep = 0;
      this.migrationStatus.errors = [];
      this.migrationStatus.warnings = [];

      // Step 1: Extract
      this.migrationStatus.currentStep = 1;
      const legacyData = await this.extractLegacyData();

      // Step 2: Transform
      this.migrationStatus.currentStep = 2;
      const transformedData = await this.transformData(legacyData);

      // Step 3: Validate
      this.migrationStatus.currentStep = 3;
      const validationResults = await this.validateData(transformedData);

      // Step 4: Migrate
      this.migrationStatus.currentStep = 4;
      const migrationResult = await this.migrateToReact(transformedData);

      this.migrationStatus.isComplete = true;
      console.log('🎉 Migration completed successfully!');

      return {
        success: true,
        data: migrationResult,
        validation: validationResults,
        status: this.migrationStatus,
      };
    } catch (error) {
      console.error('❌ Migration failed:', error);
      this.migrationStatus.isComplete = false;
      
      return {
        success: false,
        error: error.message,
        status: this.migrationStatus,
      };
    }
  }

  // Get migration status
  getMigrationStatus() {
    return this.migrationStatus;
  }

  // Reset migration status
  resetMigration() {
    this.migrationStatus = {
      isComplete: false,
      currentStep: 0,
      totalSteps: 0,
      errors: [],
      warnings: [],
    };
  }
}

// Create singleton instance
const migrationService = new MigrationService();

export default migrationService;
