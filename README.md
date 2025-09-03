# 🚀 DevForge Learning Platform

A modern learning platform for mastering Node.js microservices, built with a clean monorepo architecture.

## 📁 Project Structure

```
devforge-platform/
├── apps/
│   ├── legacy/          # Original vanilla JS app (working)
│   └── react/           # Modern React + Tailwind app
├── packages/
│   └── shared/          # Shared utilities and components
├── package.json         # Root package.json (monorepo config)
└── README.md           # This file
```

## 🛠️ Tech Stack

### Legacy App (apps/legacy/)
- **Vanilla JavaScript** - Original working implementation
- **HTML/CSS** - Custom styling and layout
- **YouTube API** - Video integration
- **CodeMirror** - Code editor

### React App (apps/react/)
- **React 18** - Modern component-based architecture
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Modern Hooks** - State management and effects

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Install all dependencies
npm run install:all

# Or install individually
npm install
cd apps/legacy && npm install
cd apps/react && npm install
```

### Development
```bash
# Run legacy app (original working version)
npm run dev:legacy

# Run React app (new modern version)
npm run dev:react

# Build React app for production
npm run build:react
```

## 🔄 Migration Path

1. **Phase 1**: ✅ Legacy app working (apps/legacy/)
2. **Phase 2**: 🔄 React app development (apps/react/)
3. **Phase 3**: 🚀 Feature parity and testing
4. **Phase 4**: 🎯 Production deployment

## 📚 Features

### Current (Legacy)
- ✅ Video player integration
- ✅ Code editor with syntax highlighting
- ✅ Lesson management
- ✅ Challenge system
- ✅ Solution viewing

### Planned (React)
- 🚧 Modern UI/UX with Tailwind
- 🚧 Component-based architecture
- 🚧 Better state management
- 🚧 Responsive design
- 🚧 Performance optimizations

## 🤝 Contributing

1. **Legacy App**: Keep working on features in `apps/legacy/`
2. **React App**: Develop new features in `apps/react/`
3. **Shared**: Extract common logic to `packages/shared/`

## 📝 License

MIT License - see LICENSE file for details
