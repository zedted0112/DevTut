import { useState } from 'react'
import CodeEditor from './CodeEditor'

const LessonModal = ({ lesson, onClose }) => {
  const [activeTab, setActiveTab] = useState('solution')

  const tabs = [
    { id: 'solution', label: '✏️ solution.js', icon: '✏️' },
    { id: 'solution-view', label: '💡 solution.js', icon: '💡' },
    { id: 'test', label: '🧪 test.js', icon: '🧪' }
  ]

  const getTabContent = () => {
    switch (activeTab) {
      case 'solution':
        return lesson.challenge?.starterCode || '// Write your solution here...'
      case 'solution-view':
        return lesson.challenge?.solution || '// No solution available'
      case 'test':
        return generateTestCode()
      default:
        return '// Select a tab to view content'
    }
  }

  const generateTestCode = () => {
    if (lesson.challenge?.tests) {
      return lesson.challenge.tests.map(test => 
        `// Test: ${test.description}\n// Expected: ${test.expected}\n// Status: ${test.passed ? 'PASS' : 'FAIL'}\n`
      ).join('\n')
    }
    return `// Sample Test Cases for: ${lesson.challenge?.description || 'Challenge'}

// Test 1: Basic functionality
console.log('Test 1: Basic functionality');
// TODO: Add your test logic here

// Test 2: Edge cases
console.log('Test 2: Edge cases');
// TODO: Add edge case testing

// Test 3: Error handling
console.log('Test 3: Error handling');
// TODO: Add error case testing

// Run tests
console.log('\\nRunning tests...');
// TODO: Execute your tests here`
  }

  const handleShowSolution = () => {
    setActiveTab('solution-view')
  }

  const isReadOnly = activeTab !== 'solution'

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 rounded-t-3xl relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold mb-2">{lesson.title}</h2>
                <p className="text-white/90">Master the fundamentals step by step</p>
              </div>
              <button
                onClick={onClose}
                className="bg-white/20 hover:bg-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl transition-colors duration-200 hover:scale-110"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Code Editor */}
          <div className="flex-1 bg-dark-900 flex flex-col">
            {/* Tabs */}
            <div className="bg-dark-800 border-b border-dark-700 px-6 py-3">
              <div className="flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'text-dark-300 hover:text-white hover:bg-dark-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
                
                {isReadOnly && (
                  <span className="ml-auto bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    READ-ONLY
                  </span>
                )}
              </div>
            </div>

            {/* Editor */}
            <div className="flex-1 p-6">
              <CodeEditor
                value={getTabContent()}
                readOnly={isReadOnly}
                language="javascript"
              />
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="w-96 bg-dark-50 border-l border-dark-200 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Problem Description */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">📖</span>
                  <h3 className="text-lg font-semibold text-dark-800">Problem Description</h3>
                </div>
                <p className="text-dark-600 leading-relaxed">
                  {lesson.content}
                </p>
              </div>

              {/* Code Example */}
              {lesson.codeExample && (
                <div className="card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">💻</span>
                    <h3 className="text-lg font-semibold text-dark-800">Code Example</h3>
                  </div>
                  <pre className="bg-dark-800 text-dark-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{lesson.codeExample}</code>
                  </pre>
                </div>
              )}

              {/* Challenge */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🎯</span>
                  <h3 className="text-lg font-semibold text-dark-800">Challenge</h3>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-4">
                  <p className="text-dark-700">
                    {lesson.challenge?.description || 'Complete the coding challenge above'}
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <button className="btn-primary flex-1">
                    ▶️ Run Code
                  </button>
                  <button 
                    onClick={handleShowSolution}
                    className="btn-secondary flex-1"
                  >
                    💡 Show Solution
                  </button>
                </div>
              </div>

              {/* Video Tutorial */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🎥</span>
                  <h3 className="text-lg font-semibold text-dark-800">Video Tutorial</h3>
                </div>
                <div className="bg-dark-100 rounded-lg p-8 text-center">
                  <div className="text-4xl mb-3">📺</div>
                  <h4 className="font-medium text-dark-700 mb-2">Video Tutorial</h4>
                  <p className="text-dark-500 text-sm mb-4">
                    Watch the concept explanation before coding
                  </p>
                  <div className="flex gap-2 justify-center">
                    <button className="btn-secondary text-sm">
                      ➕ Add Video Link
                    </button>
                    <button className="btn-secondary text-sm">
                      🧪 Test Video
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonModal
