const express = require('express');
const router = express.Router();

// Learning modules data (same as in the old server.js)
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
              test: (code) => code.includes('app.get(\'/\'') || code.includes('app.get("/"')
            },
            {
              description: 'Should send "Hello DevForge!" response',
              test: (code) => code.includes('Hello DevForge!')
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Middleware & Request Processing',
    description: 'Learn how to use middleware for authentication, logging, and data parsing',
    difficulty: 'Intermediate',
    duration: '20 minutes',
    topics: ['Middleware', 'Authentication', 'Request parsing', 'Error handling'],
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'Custom Middleware',
        type: 'theory',
        content: 'Create custom middleware for logging and authentication',
        codeExample: `// Custom logging middleware
app.use((req, res, next) => {
  console.log(\`\${new Date().toISOString()} - \${req.method} \${req.path}\`);
  next();
});

// Authentication middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  // Verify token logic here
  next();
};`,
        challenge: {
          type: 'code',
          description: 'Create a logging middleware that logs the request method and timestamp',
          starterCode: `const express = require('express');
const app = express();
const PORT = 3000;

// Create logging middleware here

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
          solution: `const express = require('express');
const app = express();
const PORT = 3000;

// Create logging middleware here
app.use((req, res, next) => {
  console.log(\`\${new Date().toISOString()} - \${req.method} \${req.path}\`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
          tests: [
            {
              description: 'Should have middleware function',
              test: (code) => code.includes('app.use(') && code.includes('next()')
            },
            {
              description: 'Should log timestamp and method',
              test: (code) => code.includes('new Date()') && code.includes('req.method')
            },
            {
              description: 'Should call next() function',
              test: (code) => code.includes('next()')
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-3',
    title: 'API Design & Validation',
    description: 'Build RESTful APIs with proper validation and error handling',
    difficulty: 'Intermediate',
    duration: '25 minutes',
    topics: ['REST API', 'Validation', 'Error handling', 'HTTP status codes'],
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'User Registration API',
        type: 'theory',
        content: 'Create a user registration endpoint with validation',
        codeExample: `app.post('/api/users', (req, res) => {
  const { username, email, password } = req.body;
  
  // Validation
  if (!username || !email || !password) {
    return res.status(400).json({ 
      error: 'Missing required fields' 
    });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ 
      error: 'Password too short' 
    });
  }
  
  // Process registration
  res.status(201).json({ 
    message: 'User created successfully' 
  });
});`,
        challenge: {
          type: 'code',
          description: 'Create a POST endpoint that validates email format and password length',
          starterCode: `const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  
  // Add validation here
  
  res.status(201).json({ message: 'Valid data' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
          solution: `const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  
  // Add validation here
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password too short' });
  }
  
  res.status(201).json({ message: 'Valid data' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
          tests: [
            {
              description: 'Should validate email exists',
              test: (code) => code.includes('!email') || code.includes('email === undefined')
            },
            {
              description: 'Should validate password length',
              test: (code) => code.includes('password.length') && code.includes('< 6')
            },
            {
              description: 'Should return 400 for invalid data',
              test: (code) => code.includes('400') && code.includes('error')
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-4',
    title: 'Database Integration',
    description: 'Connect to databases and perform CRUD operations',
    difficulty: 'Advanced',
    duration: '30 minutes',
    topics: ['Database', 'CRUD', 'Connection pooling', 'Transactions'],
    lessons: [
      {
        id: 'lesson-4-1',
        title: 'User CRUD Operations',
        type: 'theory',
        content: 'Implement Create, Read, Update, Delete operations for users',
        codeExample: `// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create user
app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});`,
        challenge: {
          type: 'code',
          description: 'Create a GET endpoint that returns a list of users with error handling',
          starterCode: `const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

// Mock users array
const users = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
];

app.get('/api/users', (req, res) => {
  // Implement with error handling
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
          solution: `const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

// Mock users array
const users = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
];

app.get('/api/users', (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
          tests: [
            {
              description: 'Should return users array',
              test: (code) => code.includes('res.json(users)')
            },
            {
              description: 'Should have try-catch block',
              test: (code) => code.includes('try') && code.includes('catch')
            },
            {
              description: 'Should handle errors properly',
              test: (code) => code.includes('500') && code.includes('error')
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-5',
    title: 'Authentication & Security',
    description: 'Implement JWT authentication and security best practices',
    difficulty: 'Advanced',
    duration: '35 minutes',
    topics: ['JWT', 'bcrypt', 'Security', 'Password hashing'],
    lessons: [
      {
        id: 'lesson-5-1',
        title: 'JWT Authentication',
        type: 'theory',
        content: 'Create secure authentication with JWT tokens and password hashing',
        codeExample: `const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`,
        challenge: {
          type: 'code',
          description: 'Create a login endpoint that validates credentials and returns a JWT token',
          starterCode: `const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

// Mock user for testing
const mockUser = {
  id: 1,
  email: 'test@example.com',
  password: '$2b$10$hashedPasswordHere'
};

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  // Implement login logic here
  
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
          solution: `const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

// Mock user for testing
const mockUser = {
  id: 1,
  email: 'test@example.com',
  password: '$2b$10$hashedPasswordHere'
};

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  // Implement login logic here
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }
  
  if (email === mockUser.email && password === 'password123') {
    const token = 'jwt_token_here';
    res.json({ token, user: { id: mockUser.id, email: mockUser.email } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
          tests: [
            {
              description: 'Should validate credentials exist',
              test: (code) => code.includes('!email') || code.includes('!password')
            },
            {
              description: 'Should return token on success',
              test: (code) => code.includes('token') && code.includes('res.json')
            },
            {
              description: 'Should return 401 for invalid credentials',
              test: (code) => code.includes('401') && code.includes('Invalid credentials')
            }
          ]
        }
      }
    ]
  }
];

// Get all modules
router.get('/', (req, res) => {
  res.json(learningModules);
});

// Get specific module
router.get('/:moduleId', (req, res) => {
  const module = learningModules.find(m => m.id === req.params.moduleId);
  if (!module) {
    return res.status(404).json({ error: 'Module not found' });
  }
  res.json(module);
});

// Get lesson from module
router.get('/:moduleId/lessons/:lessonId', (req, res) => {
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
router.post('/execute', (req, res) => {
  const { code, tests, moduleId, lessonId, userId = 'anonymous' } = req.body;
  
  try {
    // Validate input
    if (!code || typeof code !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid code input',
        success: false,
        results: [],
        message: 'Code must be a string',
        points: 0,
        badges: []
      });
    }
    
    if (!tests || !Array.isArray(tests)) {
      return res.status(400).json({ 
        error: 'Invalid tests input',
        success: false,
        results: [],
        message: 'Tests must be an array',
        points: 0,
        badges: []
      });
    }
    
    // Enhanced code validation
    const securityChecks = validateCodeSecurity(code);
    if (!securityChecks.safe) {
      return res.status(400).json({ 
        error: 'Code contains forbidden operations',
        success: false,
        results: [],
        message: securityChecks.message,
        points: 0,
        badges: []
      });
    }
    
    // Syntax validation
    const syntaxCheck = validateCodeSyntax(code);
    if (!syntaxCheck.valid) {
      return res.status(400).json({ 
        error: 'Syntax error in code',
        success: false,
        results: [],
        message: `Syntax Error: ${syntaxCheck.error}`,
        points: 0,
        badges: []
      });
    }
    
    // Run tests against the code
    const results = tests.map(test => {
      try {
        let passed = false;
        let message = 'Failed';
        let points = 0;
        
        // Use the test function if available, otherwise fall back to description-based logic
        if (test.test && typeof test.test === 'function') {
          passed = test.test(code);
        } else {
          // Enhanced test logic with better pattern matching
          passed = runEnhancedTests(test.description, code);
        }
        
        // Award points based on test difficulty and correctness
        points = calculateTestPoints(test.description, passed, code);
        
        return {
          description: test.description || 'Test',
          passed: passed,
          message: passed ? 'Passed ✅' : 'Failed ❌',
          points: points,
          feedback: getTestFeedback(test.description, passed, code)
        };
      } catch (testError) {
        return {
          description: test.description || 'Test',
          passed: false,
          message: `Test error: ${testError.message}`,
          points: 0,
          feedback: 'An error occurred while running this test'
        };
      }
    });
    
    const allPassed = results.every(r => r.passed);
    const totalPoints = results.reduce((sum, r) => sum + r.points, 0);
    const badges = calculateBadges(results, totalPoints, moduleId);
    const level = calculateLevel(totalPoints);
    
    // Calculate bonus points for perfect solutions
    const bonusPoints = calculateBonusPoints(code, results, moduleId);
    const finalPoints = totalPoints + bonusPoints;
    
    res.json({
      success: allPassed,
      results: results,
      message: allPassed ? '🎉 Excellent! All tests passed!' : '💪 Keep trying! Some tests failed.',
      points: finalPoints,
      totalPoints: totalPoints,
      bonusPoints: bonusPoints,
      badges: badges,
      level: level,
      progress: calculateProgress(results),
      feedback: getOverallFeedback(results, finalPoints),
      nextChallenge: getNextChallenge(moduleId, lessonId, allPassed)
    });
    
  } catch (error) {
    console.error('Code execution error:', error);
    res.status(500).json({ 
      error: 'Code execution failed', 
      success: false,
      results: [],
      message: `Server error: ${error.message}`,
      points: 0,
      badges: []
    });
  }
});

// Helper functions for enhanced validation and scoring
function validateCodeSecurity(code) {
  const forbiddenPatterns = [
    { pattern: /process\.exit/, message: 'process.exit() is not allowed' },
    { pattern: /require\s*\(\s*['"]fs['"]/, message: 'File system access is not allowed' },
    { pattern: /require\s*\(\s*['"]child_process['"]/, message: 'Child process execution is not allowed' },
    { pattern: /require\s*\(\s*['"]http['"]/, message: 'HTTP module is not allowed' },
    { pattern: /require\s*\(\s*['"]https['"]/, message: 'HTTPS module is not allowed' },
    { pattern: /eval\s*\(/, message: 'eval() is not allowed' },
    { pattern: /Function\s*\(/, message: 'Function constructor is not allowed' },
    { pattern: /setTimeout\s*\(/, message: 'setTimeout is not allowed' },
    { pattern: /setInterval\s*\(/, message: 'setInterval is not allowed' }
  ];
  
  for (const forbidden of forbiddenPatterns) {
    if (forbidden.pattern.test(code)) {
      return { safe: false, message: forbidden.message };
    }
  }
  
  return { safe: true, message: 'Code passed security checks' };
}

function validateCodeSyntax(code) {
  try {
    // Basic syntax validation
    new Function(code);
    return { valid: true, error: null };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

function runEnhancedTests(description, code) {
  const testPatterns = {
    'GET route': () => /app\.get\s*\(\s*['"]\/['"]/.test(code),
    'Hello DevForge': () => /Hello DevForge!?/.test(code),
    'start without errors': () => /app\.listen/.test(code) && /express\s*\(\s*\)/.test(code),
    'middleware function': () => /app\.use\s*\(/.test(code) && /next\s*\(\s*\)/.test(code),
    'timestamp and method': () => /new Date\s*\(\s*\)/.test(code) && /req\.method/.test(code),
    'validate email exists': () => /!email/.test(code) || /email\s*===?\s*undefined/.test(code),
    'validate password length': () => /password\.length/.test(code) && /<\s*6/.test(code),
    'return 400': () => /400/.test(code) && /error/.test(code),
    'return users array': () => /res\.json\s*\(\s*users\s*\)/.test(code),
    'try-catch block': () => /try\s*\{/.test(code) && /catch\s*\(/.test(code),
    'handle errors properly': () => /500/.test(code) && /error/.test(code),
    'validate credentials exist': () => /!email/.test(code) || /!password/.test(code),
    'return token on success': () => /token/.test(code) && /res\.json/.test(code),
    'return 401': () => /401/.test(code) && /Invalid credentials/.test(code)
  };
  
  for (const [pattern, testFn] of Object.entries(testPatterns)) {
    if (description.includes(pattern)) {
      return testFn();
    }
  }
  
  // Default test
  return /express\s*\(\s*\)/.test(code) && /app\.listen/.test(code);
}

function calculateTestPoints(description, passed, code) {
  if (!passed) return 0;
  
  let basePoints = 10;
  
  // Bonus points for different types of tests
  if (description.includes('middleware')) basePoints += 5;
  if (description.includes('validation')) basePoints += 5;
  if (description.includes('error handling')) basePoints += 5;
  if (description.includes('authentication')) basePoints += 10;
  if (description.includes('database')) basePoints += 10;
  
  // Quality bonus
  if (code.includes('try') && code.includes('catch')) basePoints += 3;
  if (code.includes('const') || code.includes('let')) basePoints += 2;
  if (code.includes('async') && code.includes('await')) basePoints += 5;
  
  return basePoints;
}

function calculateBonusPoints(code, results, moduleId) {
  let bonus = 0;
  
  // Perfect solution bonus
  if (results.every(r => r.passed)) {
    bonus += 25;
  }
  
  // Code quality bonus
  if (code.includes('//') || code.includes('/*')) bonus += 5; // Comments
  if (code.includes('const') && code.includes('let')) bonus += 3; // Good variable declarations
  if (code.includes('async') && code.includes('await')) bonus += 5; // Async/await usage
  
  // Module-specific bonuses
  if (moduleId === 'module-5' && code.includes('jwt') && code.includes('bcrypt')) bonus += 10;
  if (moduleId === 'module-4' && code.includes('try') && code.includes('catch')) bonus += 10;
  
  return bonus;
}

function calculateBadges(results, totalPoints, moduleId) {
  const badges = [];
  
  if (totalPoints >= 100) badges.push({ name: '🚀 Speed Demon', description: 'Fast learner!' });
  if (totalPoints >= 200) badges.push({ name: '💎 Diamond Coder', description: 'Exceptional skills!' });
  if (results.every(r => r.passed)) badges.push({ name: '🎯 Perfect Score', description: 'Flawless execution!' });
  if (moduleId === 'module-5' && totalPoints >= 50) badges.push({ name: '🔐 Security Expert', description: 'Security master!' });
  if (moduleId === 'module-4' && totalPoints >= 50) badges.push({ name: '🗄️ Database Guru', description: 'Database wizard!' });
  
  return badges;
}

function calculateLevel(totalPoints) {
  if (totalPoints < 50) return { level: 1, name: '🌱 Beginner', progress: totalPoints / 50 * 100 };
  if (totalPoints < 150) return { level: 2, name: '📚 Student', progress: (totalPoints - 50) / 100 * 100 };
  if (totalPoints < 300) return { level: 3, name: '💻 Developer', progress: (totalPoints - 150) / 150 * 100 };
  if (totalPoints < 500) return { level: 4, name: '🚀 Expert', progress: (totalPoints - 300) / 200 * 100 };
  return { level: 5, name: '🏆 Master', progress: 100 };
}

function calculateProgress(results) {
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  return {
    percentage: Math.round((passed / total) * 100),
    passed,
    total,
    remaining: total - passed
  };
}

function getTestFeedback(description, passed, code) {
  if (passed) {
    return 'Great job! Your code meets all requirements.';
  }
  
  // Provide helpful feedback based on test type
  if (description.includes('GET route')) {
    return 'Make sure you have app.get("/", ...) in your code.';
  } else if (description.includes('Hello DevForge')) {
    return 'Check that your response sends "Hello DevForge!" exactly.';
  } else if (description.includes('middleware')) {
    return 'Remember to use app.use() and call next() in your middleware.';
  } else if (description.includes('validation')) {
    return 'Add proper validation checks for your input data.';
  } else if (description.includes('error handling')) {
    return 'Include try-catch blocks and proper error responses.';
  }
  
  return 'Review the requirements and try again.';
}

function getOverallFeedback(results, totalPoints) {
  if (totalPoints >= 100) {
    return '🎉 Outstanding work! You\'re mastering Node.js concepts quickly!';
  } else if (totalPoints >= 50) {
    return '👍 Good progress! Keep practicing to improve your skills.';
  } else {
    return '💪 Keep going! Every attempt brings you closer to mastery.';
  }
}

function getNextChallenge(moduleId, lessonId, allPassed) {
  if (!allPassed) return null;
  
  // Suggest next challenge based on current progress
  const nextChallenges = {
    'module-1': { module: 'module-2', lesson: 'lesson-2-1', title: 'Middleware & Request Processing' },
    'module-2': { module: 'module-3', lesson: 'lesson-3-1', title: 'API Design & Validation' },
    'module-3': { module: 'module-4', lesson: 'lesson-4-1', title: 'Database Integration' },
    'module-4': { module: 'module-5', lesson: 'lesson-5-1', title: 'Authentication & Security' }
  };
  
  return nextChallenges[moduleId] || null;
}

// Get user progress and statistics
router.get('/progress/:userId', (req, res) => {
  const { userId } = req.params;
  
  // Mock user progress data (in real app, this would come from database)
  const userProgress = {
    userId,
    totalPoints: 0,
    level: { level: 1, name: '🌱 Beginner', progress: 0 },
    badges: [],
    modulesCompleted: [],
    currentStreak: 0,
    totalChallenges: 0,
    challengesCompleted: 0,
    accuracy: 0,
    rank: 'Unranked'
  };
  
  res.json(userProgress);
});

// Get leaderboard
router.get('/leaderboard', (req, res) => {
  // Mock leaderboard data (in real app, this would come from database)
  const leaderboard = [
    {
      rank: 1,
      userId: 'alice_dev',
      username: 'Alice',
      totalPoints: 450,
      level: { level: 4, name: '🚀 Expert' },
      badges: ['🚀 Speed Demon', '💎 Diamond Coder', '🎯 Perfect Score'],
      modulesCompleted: 5
    },
    {
      rank: 2,
      userId: 'bob_coder',
      username: 'Bob',
      totalPoints: 320,
      level: { level: 3, name: '💻 Developer' },
      badges: ['🚀 Speed Demon', '🎯 Perfect Score'],
      modulesCompleted: 4
    },
    {
      rank: 3,
      userId: 'charlie_learner',
      username: 'Charlie',
      totalPoints: 180,
      level: { level: 2, name: '📚 Student' },
      badges: ['🚀 Speed Demon'],
      modulesCompleted: 3
    }
  ];
  
  res.json(leaderboard);
});

// Submit challenge solution and update progress
router.post('/submit', (req, res) => {
  const { userId, moduleId, lessonId, code, tests, timeSpent } = req.body;
  
  try {
    // Validate input
    if (!userId || !moduleId || !lessonId || !code || !tests) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        success: false 
      });
    }
    
    // Run tests and calculate score
    const results = tests.map(test => {
      const passed = runEnhancedTests(test.description, code);
      const points = calculateTestPoints(test.description, passed, code);
      return { description: test.description, passed, points };
    });
    
    const allPassed = results.every(r => r.passed);
    const totalPoints = results.reduce((sum, r) => sum + r.points, 0);
    const bonusPoints = calculateBonusPoints(code, results, moduleId);
    const finalPoints = totalPoints + bonusPoints;
    
    // Calculate performance metrics
    const performance = {
      accuracy: Math.round((results.filter(r => r.passed).length / results.length) * 100),
      efficiency: timeSpent ? Math.max(0, 100 - timeSpent / 60) : 50, // Bonus for faster completion
      quality: calculateCodeQuality(code),
      totalPoints: finalPoints
    };
    
    // Award badges and level up
    const badges = calculateBadges(results, totalPoints, moduleId);
    const level = calculateLevel(finalPoints);
    
    res.json({
      success: true,
      performance,
      badges,
      level,
      points: finalPoints,
      message: allPassed ? '🎉 Challenge completed successfully!' : '💪 Keep practicing!',
      nextChallenge: getNextChallenge(moduleId, lessonId, allPassed),
      feedback: getOverallFeedback(results, finalPoints)
    });
    
  } catch (error) {
    console.error('Challenge submission error:', error);
    res.status(500).json({ 
      error: 'Failed to submit challenge',
      success: false 
    });
  }
});

function calculateCodeQuality(code) {
  let quality = 50; // Base quality
  
  // Good practices
  if (code.includes('const') || code.includes('let')) quality += 10;
  if (code.includes('//') || code.includes('/*')) quality += 5; // Comments
  if (code.includes('try') && code.includes('catch')) quality += 15;
  if (code.includes('async') && code.includes('await')) quality += 10;
  
  // Bad practices
  if (code.includes('var')) quality -= 5;
  if (code.includes('console.log') && !code.includes('//')) quality -= 3;
  
  return Math.max(0, Math.min(100, quality));
}

module.exports = router;
