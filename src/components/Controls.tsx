import { Eye, EyeOff, Tag } from 'lucide-react'
import React from 'react'

interface ControlsProps {
  showOrbits: boolean
  setShowOrbits: (show: boolean) => void
  showLabels: boolean
  setShowLabels: (show: boolean) => void
}

const Controls: React.FC<ControlsProps> = ({ showOrbits, setShowOrbits, showLabels, setShowLabels }) => {
  return (
    <div className="absolute bottom-4 left-4 bg-gray-900 bg-opacity-70 p-4 rounded-lg">
      <h2 className="text-white text-lg font-bold mb-2">Controls</h2>
      <div className="flex flex-col space-y-2">
        <button
          className={`flex items-center space-x-2 px-3 py-2 rounded transition-colors duration-200 ${
            showOrbits ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'
          }`}
          onClick={() => setShowOrbits(!showOrbits)}
        >
          {showOrbits ? <Eye size={18} /> : <EyeOff size={18} />}
          <span className="text-white">{showOrbits ? 'Hide Orbits' : 'Show Orbits'}</span>
        </button>
        <button
          className={`flex items-center space-x-2 px-3 py-2 rounded transition-colors duration-200 ${
            showLabels ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'
          }`}
          onClick={() => setShowLabels(!showLabels)}
        >
          <Tag size={18} />
          <span className="text-white">{showLabels ? 'Hide Labels' : 'Show Labels'}</span>
        </button>
      </div>
    </div>
  )
}

export default Controls