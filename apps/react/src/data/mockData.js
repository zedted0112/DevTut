export const mockModules = [
  {
    id: 'module-1',
    title: 'Getting Started with Node.js',
    description: 'Learn the fundamentals of Node.js, including installation, basic concepts, and your first server.',
    difficulty: 'Beginner',
    duration: '2 hours',
    topics: ['Node.js Basics', 'Installation', 'First Server', 'Modules'],
    lessons: [
      {
        id: 'lesson-1',
        title: 'Hello World Server',
        content: 'Create your first Express server that responds with "Hello World!" on the root route.',
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
          description: 'Create a server that responds with "Hello DevForge!" on the root route.',
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
              expected: 'Server starts successfully',
              passed: true
            },
            {
              description: 'Root route should return "Hello DevForge!"',
              expected: 'Response matches expected text',
              passed: true
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-2',
    title: 'JWT Authentication',
    description: 'Implement secure authentication using JWT tokens and password hashing.',
    difficulty: 'Intermediate',
    duration: '3 hours',
    topics: ['JWT', 'Authentication', 'Password Hashing', 'Security'],
    lessons: [
      {
        id: 'lesson-2',
        title: 'JWT Authentication',
        content: 'Create secure authentication with JWT tokens and password hashing.',
        codeExample: `const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Implementation here
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});`,
        challenge: {
          description: 'Implement JWT authentication with password hashing',
          starterCode: `const express = require('express');
const app = express();
const PORT = 3000;

// TODO: Implement your solution here

app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});`,
          solution: `const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // TODO: Add your authentication logic here
        // Example: Check user credentials, validate input, etc.
        
        const token = jwt.sign(
            { userId: 'user_id', email: email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );
        
        res.json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});`,
          tests: [
            {
              description: 'Login endpoint should accept email and password',
              expected: 'Endpoint responds to POST request',
              passed: true
            },
            {
              description: 'Should return JWT token on successful login',
              expected: 'Response contains valid JWT token',
              passed: true
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-3',
    title: 'Database Integration',
    description: 'Connect your Node.js application to MongoDB and implement CRUD operations.',
    difficulty: 'Advanced',
    duration: '4 hours',
    topics: ['MongoDB', 'Mongoose', 'CRUD', 'Database Design'],
    lessons: [
      {
        id: 'lesson-3',
        title: 'MongoDB with Mongoose',
        content: 'Set up MongoDB connection and implement basic CRUD operations using Mongoose.',
        codeExample: `const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/devforge', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});`,
        challenge: {
          description: 'Create a User model and implement user registration',
          starterCode: `const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 3000;

// TODO: Create User model and registration endpoint

app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});`,
          solution: `const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

app.use(express.json());

app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({ email, password: hashedPassword });
        await user.save();
        
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

mongoose.connect('mongodb://localhost:27017/devforge', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});`,
          tests: [
            {
              description: 'User model should be defined',
              expected: 'Mongoose model created successfully',
              passed: true
            },
            {
              description: 'Registration endpoint should hash passwords',
              expected: 'Password is properly hashed',
              passed: true
            }
          ]
        }
      }
    ]
  }
]
