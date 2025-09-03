/**
 * DevForge Learning Lab - Interactive Node.js Course
 * 
 * This app teaches Node.js by building parts of DevForge step by step.
 * Each lesson includes theory, code examples, and interactive challenges.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Learning modules data
const learningModules = [
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
              test: (code) => !code.includes('syntax error')
            },
            {
              description: 'Should have a GET route for "/"',
              test: (code) => code.includes('app.get(\'/\'')
            },
            {
              description: 'Should send "Hello DevForge!" response',
              test: (code) => code.includes('Hello DevForge!')
            }
          ]
        }
      },
      {
        id: 'lesson-1-2',
        title: 'Adding Middleware',
        type: 'theory',
        content: 'Learn how to use middleware for logging and parsing',
        codeExample: `app.use(express.json());
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  next();
});`,
        challenge: {
          type: 'code',
          description: 'Add middleware to log all requests and parse JSON',
          starterCode: `const express = require('express');
const app = express();
const PORT = 3000;

// Add middleware here

app.get('/', (req, res) => {
  res.json({ message: 'Hello DevForge!' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
          solution: `const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello DevForge!' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
          tests: [
            {
              description: 'Should use express.json() middleware',
              test: (code) => code.includes('express.json()')
            },
            {
              description: 'Should have custom logging middleware',
              test: (code) => code.includes('console.log') && code.includes('next()')
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Building Authentication System',
    description: 'Learn JWT authentication by building the DevForge auth service',
    difficulty: 'Intermediate',
    duration: '30 minutes',
    topics: ['JWT', 'bcrypt', 'Password hashing', 'Token management'],
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'User Registration with bcrypt',
        type: 'theory',
        content: 'Learn how to securely hash passwords using bcrypt',
        codeExample: `const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};`,
        challenge: {
          type: 'code',
          description: 'Create functions to hash and verify passwords',
          starterCode: `const bcrypt = require('bcrypt');

// Create hashPassword function
// Create verifyPassword function

// Test your functions
const testPassword = 'password123';
hashPassword(testPassword).then(hash => {
  console.log('Hash:', hash);
  verifyPassword(testPassword, hash).then(isValid => {
    console.log('Password valid:', isValid);
  });
});`,
          solution: `const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// Test your functions
const testPassword = 'password123';
hashPassword(testPassword).then(hash => {
  console.log('Hash:', hash);
  verifyPassword(testPassword, hash).then(isValid => {
    console.log('Password valid:', isValid);
  });
});`,
          tests: [
            {
              description: 'Should have hashPassword function',
              test: (code) => code.includes('hashPassword')
            },
            {
              description: 'Should have verifyPassword function',
              test: (code) => code.includes('verifyPassword')
            },
            {
              description: 'Should use bcrypt.hash',
              test: (code) => code.includes('bcrypt.hash')
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-3',
    title: 'Microservices Architecture',
    description: 'Learn microservices by building the DevForge gateway',
    difficulty: 'Advanced',
    duration: '45 minutes',
    topics: ['Service communication', 'API Gateway', 'Proxy middleware', 'Error handling'],
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'Building API Gateway',
        type: 'theory',
        content: 'Learn how to create a gateway that routes requests to different services',
        codeExample: `const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/api/auth', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  onError: (err, req, res) => {
    res.status(504).json({ error: 'Service unavailable' });
  }
}));`,
        challenge: {
          type: 'code',
          description: 'Create a simple gateway that routes /api/users to a user service',
          starterCode: `const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

// Create proxy middleware for /api/users
// Target should be http://localhost:3001

app.listen(PORT, () => {
  console.log(\`Gateway running on port \${PORT}\`);
});`,
          solution: `const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

app.use('/api/users', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  onError: (err, req, res) => {
    res.status(504).json({ error: 'User service unavailable' });
  }
}));

app.listen(PORT, () => {
  console.log(\`Gateway running on port \${PORT}\`);
});`,
          tests: [
            {
              description: 'Should use createProxyMiddleware',
              test: (code) => code.includes('createProxyMiddleware')
            },
            {
              description: 'Should route /api/users',
              test: (code) => code.includes('/api/users')
            },
            {
              description: 'Should have error handling',
              test: (code) => code.includes('onError')
            }
          ]
        }
      }
    ]
  }
];

// API Routes
app.get('/api/modules', (req, res) => {
  res.json(learningModules);
});

app.get('/api/modules/:moduleId', (req, res) => {
  const module = learningModules.find(m => m.id === req.params.moduleId);
  if (!module) {
    return res.status(404).json({ error: 'Module not found' });
  }
  res.json(module);
});

app.get('/api/modules/:moduleId/lessons/:lessonId', (req, res) => {
  const module = learningModules.find(m => m.id === req.params.moduleId);
  if (!module) {
    return res.status(404).json({ error: 'Module not found' });
  }
  
  const lesson = module.lessons.find(l => l.id === req.params.lessonId);
  if (!lesson) {
    return res.status(404).json({ error: 'Lesson not found' });
  }
  
  res.json(lesson);
});

// Code execution endpoint (for challenges)
app.post('/api/execute', (req, res) => {
  const { code, tests } = req.body;
  
  try {
    // Validate input
    if (!code || typeof code !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid code input',
        success: false,
        results: [],
        message: 'Code must be a string'
      });
    }
    
    if (!tests || !Array.isArray(tests)) {
      return res.status(400).json({ 
        error: 'Invalid tests input',
        success: false,
        results: [],
        message: 'Tests must be an array'
      });
    }
    
    // Basic code validation (in production, use sandboxing)
    if (code.includes('process.exit') || code.includes('require(\'fs\')')) {
      return res.status(400).json({ 
        error: 'Code contains forbidden operations',
        success: false,
        results: [],
        message: 'Code contains forbidden operations'
      });
    }
    
    // Run tests against the code
    const results = tests.map(test => {
      try {
        const passed = test.test(code);
        return {
          description: test.description || 'Test',
          passed: Boolean(passed),
          message: passed ? 'Passed' : 'Failed'
        };
      } catch (testError) {
        return {
          description: test.description || 'Test',
          passed: false,
          message: `Test error: ${testError.message}`
        };
      }
    });
    
    const allPassed = results.every(r => r.passed);
    
    res.json({
      success: allPassed,
      results: results,
      message: allPassed ? 'All tests passed! 🎉' : 'Some tests failed. Try again!'
    });
    
  } catch (error) {
    console.error('Code execution error:', error);
    res.status(500).json({ 
      error: 'Code execution failed', 
      success: false,
      results: [],
      message: `Server error: ${error.message}` 
    });
  }
});

// Serve the main app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 DevForge Learning Lab running on port ${PORT}`);
  console.log(`📚 ${learningModules.length} learning modules available`);
  console.log(`🌐 Open http://localhost:${PORT} to start learning!`);
});

module.exports = app;
