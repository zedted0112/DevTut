import ModuleCard from './ModuleCard'

const ModuleGrid = ({ modules, onLessonSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {modules.map((module) => (
        <ModuleCard 
          key={module.id} 
          module={module} 
          onLessonSelect={onLessonSelect}
        />
      ))}
    </div>
  )
}

export default ModuleGrid
