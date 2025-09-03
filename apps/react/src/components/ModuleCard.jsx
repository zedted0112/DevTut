import { useState } from 'react'

const ModuleCard = ({ module, onLessonSelect }) => {
  const [progress] = useState(Math.floor(Math.random() * 100))
  
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-gradient-to-r from-green-500 to-green-600'
      case 'intermediate':
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600'
      case 'advanced':
        return 'bg-gradient-to-r from-red-500 to-red-600'
      default:
        return 'bg-gradient-to-r from-blue-500 to-blue-600'
    }
  }

  const handleClick = () => {
    if (module.lessons.length > 0) {
      onLessonSelect(module.lessons[0])
    }
  }

  return (
    <div 
      className="card p-8 cursor-pointer group"
      onClick={handleClick}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      
      {/* Decorative background element */}
      <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-primary-100/20 to-primary-200/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-bold text-dark-800 group-hover:text-primary-700 transition-colors duration-200">
            {module.title}
          </h3>
          <span className={`${getDifficultyColor(module.difficulty)} text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg`}>
            {module.difficulty}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-dark-600 mb-6 leading-relaxed">
          {module.description}
        </p>
        
        {/* Topics */}
        <div className="flex flex-wrap gap-2 mb-6">
          {module.topics.map((topic, index) => (
            <span 
              key={index}
              className="bg-dark-100 text-dark-700 px-3 py-1 rounded-full text-sm font-medium border border-dark-200 hover:bg-dark-200 transition-colors duration-200"
            >
              {topic}
            </span>
          ))}
        </div>
        
        {/* Meta info */}
        <div className="flex justify-between items-center pt-6 border-t border-dark-200">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray={`${progress}, 100`}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary-600">
                {progress}%
              </span>
            </div>
            <span className="text-sm text-dark-500">Complete</span>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-dark-500">⏱️ {module.duration}</div>
            <div className="text-sm text-dark-500">📚 {module.lessons.length} lessons</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModuleCard
