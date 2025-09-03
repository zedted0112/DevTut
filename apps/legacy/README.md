# 🚀 DevForge Learning Lab

**Interactive Node.js Learning Platform - Build Real Projects Step by Step**

A comprehensive, production-ready learning platform that teaches Node.js by building parts of the DevForge microservices project. This is not just a tutorial - it's a complete learning ecosystem with real-world architecture.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React SPA)                     │
├─────────────────────────────────────────────────────────────┤
│                    API Gateway Layer                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐  │
│  │   Auth     │   Users     │  Modules    │  Lessons   │  │
│  │  Service   │  Service    │  Service    │  Service   │  │
│  └─────────────┴─────────────┴─────────────┴─────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐  │
│  │  Progress  │ Analytics   │   Redis     │ PostgreSQL │  │
│  │  Service   │  Service    │   Cache     │  Database  │  │
│  └─────────────┴─────────────┴─────────────┴─────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 What You'll Learn

### **Beginner Level**
- Express.js fundamentals
- Middleware patterns
- Basic routing and HTTP methods
- Error handling and validation

### **Intermediate Level**
- JWT authentication
- Password hashing with bcrypt
- Database integration with Prisma
- Redis caching strategies

### **Advanced Level**
- Microservices architecture
- API Gateway patterns
- Service communication
- Production deployment

## 🛠️ Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Backend** | Node.js + Express | Server framework |
| **Database** | PostgreSQL + Prisma | Data persistence |
| **Cache** | Redis | Session & data caching |
| **Authentication** | JWT + bcrypt | Secure user management |
| **Frontend** | React + TypeScript | Modern SPA interface |
| **Testing** | Jest + Supertest | Unit & integration tests |
| **Deployment** | Docker + Docker Compose | Containerization |

## 📁 Project Structure

```
devforge-learning-lab/
├── src/                          # Source code
│   ├── config/                   # Configuration files
│   │   ├── app.js               # Main app configuration
│   │   └── database.js          # Database configuration
│   ├── controllers/              # Route controllers
│   ├── routes/                   # API route definitions
│   ├── middleware/               # Custom middleware
│   ├── services/                 # Business logic services
│   ├── models/                   # Data models
│   ├── utils/                    # Utility functions
│   └── app.js                    # Main application file
├── public/                       # Static assets
│   ├── css/                      # Stylesheets
│   ├── js/                       # Client-side JavaScript
│   └── images/                   # Images and icons
├── views/                        # Server-side views (if needed)
├── tests/                        # Test files
│   ├── unit/                     # Unit tests
│   └── integration/              # Integration tests
├── docs/                         # Documentation
├── uploads/                      # File uploads
├── .env.example                  # Environment variables template
├── docker-compose.yml            # Docker services
└── README.md                     # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- Docker & Docker Compose (optional)

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd devforge-learning-lab
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
# Edit .env with your database and Redis credentials
```

### 3. Database Setup
```bash
# Create database
createdb devforge_learning_dev

# Run migrations (when implemented)
npm run db:migrate
```

### 4. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:4000`

## 📚 Learning Modules

### **Module 1: Express.js Fundamentals**
- **Lesson 1.1**: Hello World Server
- **Lesson 1.2**: Middleware and Routing
- **Lesson 1.3**: Request/Response Handling
- **Lesson 1.4**: Error Handling

### **Module 2: Authentication System**
- **Lesson 2.1**: User Registration with bcrypt
- **Lesson 2.2**: JWT Token Generation
- **Lesson 2.3**: Protected Routes
- **Lesson 2.4**: Token Refresh

### **Module 3: Microservices Architecture**
- **Lesson 3.1**: API Gateway Setup
- **Lesson 3.2**: Service Communication
- **Lesson 3.3**: Load Balancing
- **Lesson 3.4**: Service Discovery

## 🎯 Features

### **Interactive Learning**
- Real-time code execution
- Instant feedback and validation
- Progress tracking
- Achievement system

### **Project-Based Learning**
- Build actual DevForge components
- Real-world problem solving
- Industry-standard practices
- Portfolio-ready projects

### **Advanced Features**
- User progress analytics
- Adaptive difficulty
- Peer learning support
- Certification system

## 🔧 Development

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run all tests
npm run test:unit    # Run unit tests only
npm run test:integration # Run integration tests
npm run lint         # Lint code
npm run format       # Format code
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
```

### **Code Quality**
- ESLint configuration
- Prettier formatting
- Husky pre-commit hooks
- Conventional commits

## 🧪 Testing

### **Test Structure**
```
tests/
├── unit/                    # Unit tests
│   ├── models/             # Model tests
│   ├── services/           # Service tests
│   └── utils/              # Utility tests
├── integration/             # Integration tests
│   ├── api/                # API endpoint tests
│   ├── database/           # Database tests
│   └── auth/               # Authentication tests
└── fixtures/                # Test data
```

### **Running Tests**
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- tests/unit/models/User.test.js

# Watch mode
npm run test:watch
```

## 🚀 Deployment

### **Docker Deployment**
```bash
# Build and run with Docker Compose
docker-compose up -d

# Production build
docker-compose -f docker-compose.prod.yml up -d
```

### **Environment Variables**
```bash
# Required
NODE_ENV=production
PORT=4000
JWT_SECRET=your-super-secret-key
DATABASE_URL=postgresql://user:pass@host:port/db
REDIS_URL=redis://host:port

# Optional
CORS_ORIGINS=https://yourdomain.com
EMAIL_API_KEY=your-email-api-key
ANALYTICS_ENABLED=true
```

## 📊 Analytics & Monitoring

### **Built-in Analytics**
- User progress tracking
- Learning path analytics
- Performance metrics
- Engagement statistics

### **Health Checks**
- Service health endpoints
- Database connectivity
- Redis availability
- External service status

## 🤝 Contributing

### **Development Workflow**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

### **Code Standards**
- Follow ESLint rules
- Write comprehensive tests
- Document new features
- Use conventional commits

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **DevForge Project** - The inspiration for this learning platform
- **Express.js Team** - For the amazing web framework
- **Node.js Community** - For continuous innovation

## 📞 Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)

---

**Ready to master Node.js? Start your learning journey with DevForge Learning Lab! 🚀**
