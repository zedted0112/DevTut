import { useState } from 'react'

const MigrationProgress = ({ status, onReset }) => {
  const [showDetails, setShowDetails] = useState(false)

  const getStepLabel = (step) => {
    switch (step) {
      case 1: return 'Extracting legacy data'
      case 2: return 'Transforming to React format'
      case 3: return 'Validating data'
      case 4: return 'Migrating to React app'
      default: return 'Unknown step'
    }
  }

  const getStepIcon = (step) => {
    if (step < status.currentStep) return '✅'
    if (step === status.currentStep) return '🔄'
    return '⏳'
  }

  const getProgressPercentage = () => {
    if (status.totalSteps === 0) return 0
    return Math.round((status.currentStep / status.totalSteps) * 100)
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl mx-4 mb-6 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🔄</div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              Migration Status
            </h3>
            <p className="text-white/80 text-sm">
              {status.isComplete ? 'Migration completed successfully!' : 'Migrating your learning data...'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-white/80 hover:text-white transition-colors"
          >
            {showDetails ? '📋 Hide Details' : '📋 Show Details'}
          </button>
          
          {status.isComplete && (
            <button
              onClick={onReset}
              className="btn-secondary text-sm"
            >
              🔄 Reset Migration
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-white/80 text-sm mb-2">
          <span>Progress</span>
          <span>{getProgressPercentage()}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
      </div>

      {/* Step Details */}
      {showDetails && (
        <div className="space-y-3">
          {Array.from({ length: status.totalSteps }, (_, i) => i + 1).map((step) => (
            <div 
              key={step}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                step === status.currentStep 
                  ? 'bg-white/20 border border-white/30' 
                  : step < status.currentStep 
                    ? 'bg-green-500/20 border border-green-500/30'
                    : 'bg-white/10 border border-white/20'
              }`}
            >
              <span className="text-xl">{getStepIcon(step)}</span>
              <div className="flex-1">
                <div className="text-white font-medium">
                  Step {step}: {getStepLabel(step)}
                </div>
                {step === status.currentStep && !status.isComplete && (
                  <div className="text-white/70 text-sm">In progress...</div>
                )}
                {step < status.currentStep && (
                  <div className="text-green-400 text-sm">Completed</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Errors and Warnings */}
      {(status.errors.length > 0 || status.warnings.length > 0) && (
        <div className="mt-4 space-y-3">
          {status.errors.length > 0 && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-red-400">❌</span>
                <span className="text-red-400 font-semibold">Errors ({status.errors.length})</span>
              </div>
              <ul className="text-red-300 text-sm space-y-1">
                {status.errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}
          
          {status.warnings.length > 0 && (
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400">⚠️</span>
                <span className="text-yellow-400 font-semibold">Warnings ({status.warnings.length})</span>
              </div>
              <ul className="text-yellow-300 text-sm space-y-1">
                {status.warnings.map((warning, index) => (
                  <li key={index}>• {warning}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Success Message */}
      {status.isComplete && status.errors.length === 0 && (
        <div className="mt-4 bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
          <div className="text-2xl mb-2">🎉</div>
          <div className="text-green-400 font-semibold mb-1">
            Migration Completed Successfully!
          </div>
          <div className="text-green-300 text-sm">
            Your learning data has been successfully migrated to the new React platform.
          </div>
        </div>
      )}
    </div>
  )
}

export default MigrationProgress
