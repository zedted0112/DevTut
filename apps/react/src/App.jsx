import { useState, useEffect } from 'react'
import Header from './components/Header'
import ModuleGrid from './components/ModuleGrid'
import LessonModal from './components/LessonModal'
import MigrationProgress from './components/MigrationProgress'
import migrationService from './services/migrationService'
import { LearningModule } from './data/models'

function App() {
  const [modules, setModules] = useState([])
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [migrationStatus, setMigrationStatus] = useState(null)
  const [showMigration, setShowMigration] = useState(false)

  useEffect(() => {
    initializeApp()
  }, [])

  const initializeApp = async () => {
    try {
      setLoading(true)
      
      // Check if we have migrated data
      const migratedData = localStorage.getItem('devtut_migrated_data')
      
      if (migratedData) {
        const parsed = JSON.parse(migratedData)
        setModules(parsed.modules)
        setLoading(false)
        console.log('✅ Using migrated data from localStorage')
      } else {
        // No migrated data, show migration option
        setShowMigration(true)
        setLoading(false)
        console.log('⚠️ No migrated data found, showing migration option')
      }
    } catch (error) {
      console.error('Error initializing app:', error)
      setLoading(false)
      setShowMigration(true)
    }
  }

  const handleMigration = async () => {
    try {
      setShowMigration(false)
      setLoading(true)
      
      const result = await migrationService.runMigration()
      
      if (result.success) {
        setModules(result.data.modules)
        setMigrationStatus(result.status)
        console.log('🎉 Migration completed successfully!')
      } else {
        console.error('Migration failed:', result.error)
        // Fallback to mock data
        setModules([])
      }
    } catch (error) {
      console.error('Migration error:', error)
      // Fallback to mock data
      setModules([])
    } finally {
      setLoading(false)
    }
  }

  const openLesson = (lesson) => {
    setSelectedLesson(lesson)
    setIsModalOpen(true)
  }

  const closeLesson = () => {
    setSelectedLesson(null)
    setIsModalOpen(false)
  }

  const resetMigration = () => {
    localStorage.removeItem('devtut_migrated_data')
    setModules([])
    setShowMigration(true)
    setMigrationStatus(null)
    migrationService.resetMigration()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading DevTut Learning Platform...</p>
        </div>
      </div>
    )
  }

  if (showMigration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
          <div className="text-6xl mb-6">🚀</div>
          <h1 className="text-3xl font-bold text-dark-800 mb-4">
            Welcome to DevTut!
          </h1>
          <p className="text-dark-600 mb-8 leading-relaxed">
            We need to migrate your learning data from the legacy app to the new React platform. 
            This will preserve all your modules, lessons, and challenges.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={handleMigration}
              className="btn-primary w-full"
            >
              🔄 Start Migration
            </button>
            
            <button
              onClick={() => setShowMigration(false)}
              className="btn-secondary w-full"
            >
              ⏭️ Skip for Now
            </button>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg text-left">
            <h3 className="font-semibold text-blue-800 mb-2">What will be migrated:</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>✅ Learning modules and structure</li>
              <li>✅ Lessons and content</li>
              <li>✅ Code challenges and solutions</li>
              <li>✅ Test cases and validation</li>
              <li>✅ User progress (if available)</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800">
      <Header />
      
      {migrationStatus && (
        <MigrationProgress 
          status={migrationStatus} 
          onReset={resetMigration}
        />
      )}
      
      <main className="container mx-auto px-4 py-8">
        {modules.length > 0 ? (
          <ModuleGrid modules={modules} onLessonSelect={openLesson} />
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📚</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              No Learning Modules Found
            </h2>
            <p className="text-white/80 mb-8">
              It looks like no modules were migrated. You can start fresh or try the migration again.
            </p>
            <button
              onClick={() => setShowMigration(true)}
              className="btn-primary"
            >
              🔄 Try Migration Again
            </button>
          </div>
        )}
      </main>
      
      {isModalOpen && selectedLesson && (
        <LessonModal 
          lesson={selectedLesson} 
          onClose={closeLesson} 
        />
      )}
    </div>
  )
}

export default App
