import { useState, useEffect } from 'react'
import Header from './components/Header'
import ModuleGrid from './components/ModuleGrid'
import LessonModal from './components/LessonModal'
import { mockModules } from './data/mockData'

function App() {
  const [modules, setModules] = useState([])
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setModules(mockModules)
      setLoading(false)
    }, 1000)
  }, [])

  const openLesson = (lesson) => {
    setSelectedLesson(lesson)
    setIsModalOpen(true)
  }

  const closeLesson = () => {
    setSelectedLesson(null)
    setIsModalOpen(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading DevForge Learning Lab...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ModuleGrid modules={modules} onLessonSelect={openLesson} />
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
