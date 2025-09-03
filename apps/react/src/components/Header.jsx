import { useState } from 'react'

const Header = () => {
  const [stats] = useState([
    { number: '12', label: 'Modules' },
    { number: '48', label: 'Lessons' },
    { number: '15K+', label: 'Students' }
  ])

  return (
    <header className="relative overflow-hidden py-16 px-4">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text text-transparent">
          🚀 DevForge Learning Lab
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Master Node.js by building a real microservices project step by step
        </p>
        
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20"
            >
              <div className="text-3xl font-bold text-white mb-1">
                {stat.number}
              </div>
              <div className="text-white/80 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
