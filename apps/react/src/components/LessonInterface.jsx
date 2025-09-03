import { useState } from 'react'
import CodeEditor from './CodeEditor'

const LessonInterface = ({ lesson, onClose }) => {
  const [activeTab, setActiveTab] = useState('problem')
  const [showSolution, setShowSolution] = useState(false)
  const [codeOutput, setCodeOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  const tabs = [
    { id: 'problem', label: '📖 Problem', icon: '📖' },
    { id: 'code', label: '💻 Code', icon: '💻' },
    { id: 'challenge', label: '🎯 Challenge', icon: '🎯' },
    { id: 'solution', label: '💡 Solution', icon: '💡' }
  ]

  const handleRunCode = async () => {
    setIsRunning(true)
    // Simulate code execution
    setTimeout(() => {
      setCodeOutput('✅ Code executed successfully!\nServer running on port 3000\nGET / -> Hello DevForge!')
      setIsRunning(false)
    }, 1500)
  }

  const handleShowSolution = () => {
    setShowSolution(true)
    setActiveTab('solution')
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-3xl relative">
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
          {/* Left: Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Tabs */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
              <div className="flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === 'problem' && (
                <div className="space-y-6">
                  <div className="card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">📖</span>
                      <h3 className="text-xl font-semibold text-gray-800">Problem Description</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {lesson.content}
                    </p>
                  </div>

                  {lesson.codeExample && (
                    <div className="card p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">💻</span>
                        <h3 className="text-xl font-semibold text-gray-800">Code Example</h3>
                      </div>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto border border-gray-700">
                        <code>{lesson.codeExample}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💻</span>
                        <h3 className="text-xl font-semibold text-gray-800">Code Editor</h3>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={handleRunCode}
                          disabled={isRunning}
                          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isRunning ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Running...
                            </>
                          ) : (
                            <>
                              ▶️ Run Code
                            </>
                          )}
                        </button>
                        <button
                          onClick={handleShowSolution}
                          className="btn-secondary"
                        >
                          💡 Show Solution
                        </button>
                      </div>
                    </div>
                    
                    <div className="h-96">
                      <CodeEditor
                        value={lesson.challenge?.starterCode || '// Write your code here...'}
                        readOnly={false}
                        language="javascript"
                      />
                    </div>
                  </div>

                  {/* Output Panel */}
                  {codeOutput && (
                    <div className="card p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">📤</span>
                        <h3 className="text-xl font-semibold text-gray-800">Output</h3>
                      </div>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto border border-gray-700 font-mono">
                        {codeOutput}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'challenge' && (
                <div className="space-y-6">
                  <div className="card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">🎯</span>
                      <h3 className="text-xl font-semibold text-gray-800">Challenge</h3>
                    </div>
                    
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6">
                      <p className="text-yellow-800 font-medium">
                        {lesson.challenge?.description || 'Complete the coding challenge above'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Requirements</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            Server should start without errors
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            Root route should return correct response
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            Use Express.js framework
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Tips</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-center gap-2">
                            <span className="text-blue-500">💡</span>
                            Remember to use app.get() for routes
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-blue-500">💡</span>
                            Don't forget to call app.listen()
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-blue-500">💡</span>
                            Check the code example for reference
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'solution' && (
                <div className="space-y-6">
                  <div className="card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">💡</span>
                      <h3 className="text-xl font-semibold text-gray-800">Solution</h3>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <p className="text-green-800 font-medium">
                        Here's the complete solution to the challenge:
                      </p>
                    </div>

                    <div className="h-96">
                      <CodeEditor
                        value={lesson.challenge?.solution || '// Solution will appear here...'}
                        readOnly={true}
                        language="javascript"
                      />
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Key Points:</h4>
                      <ul className="text-blue-700 space-y-1 text-sm">
                        <li>• We use Express.js to create a web server</li>
                        <li>• The app.get() method defines a GET route</li>
                        <li>• app.listen() starts the server on the specified port</li>
                        <li>• Always handle errors and provide meaningful responses</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Progress */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">📊</span>
                  <h3 className="text-lg font-semibold text-gray-800">Your Progress</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completion</span>
                    <span className="font-semibold text-blue-600">0%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <div className="text-sm text-gray-500">Start coding to see progress!</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">⚡</span>
                  <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
                </div>
                <div className="space-y-3">
                  <button className="w-full btn-primary text-sm">
                    🚀 Submit Solution
                  </button>
                  <button className="w-full btn-secondary text-sm">
                    📝 Save Draft
                  </button>
                  <button className="w-full btn-secondary text-sm">
                    🔄 Reset Code
                  </button>
                </div>
              </div>

              {/* Help */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">❓</span>
                  <h3 className="text-lg font-semibold text-gray-800">Need Help?</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>• Check the code example above</p>
                  <p>• Review Express.js documentation</p>
                  <p>• Use the hints in the challenge tab</p>
                  <p>• Ask questions in the community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonInterface
