'use client'

import { NearEarthObject, Planet, Sun } from '@/components/CelestialBodies'
import Controls from '@/components/Controls'
import { planetOrbits } from '@/data/planetOrbits'
import { OrbitControls, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Papa from 'papaparse'
import { useEffect, useState } from 'react'

interface NEOData {
  full_name: string
  a: string // semi-major axis
  e: string // eccentricity
  i: string // inclination
  H: string // absolute magnitude
}

function App() {
  const [showOrbits, setShowOrbits] = useState(true)
  const [showLabels, setShowLabels] = useState(true)
  const [neoData, setNeoData] = useState<NEOData[]>([])

  useEffect(() => {
    fetch('/data/sbdb_query_results.csv')
      .then(response => response.text())
      .then(csvString => {
        const { data } = Papa.parse<NEOData>(csvString, { header: true })
        setNeoData(data)
      })
  }, [])

  const renderNEOs = () => {
    return neoData.map((neo, index) => {
      const distance = parseFloat(neo.a) * 10 // Scale the semi-major axis
      const size = 20 - parseFloat(neo.H) // Use absolute magnitude for size
      const color = `hsl(${index * 30 % 360}, 100%, 50%)` // Generate a unique color

      return (
        <NearEarthObject
          key={neo.full_name}
          name={neo.full_name}
          distance={distance}
          size={Math.max(0.1, size / 10)} // Ensure minimum size
          color={color}
          orbitColor={color}
          showOrbit={showOrbits}
          showLabel={showLabels}
          orbitSpeed={1 / distance} // Slower orbit for farther objects
          inclination={parseFloat(neo.i)}
          eccentricity={parseFloat(neo.e)}
        />
      )
    })
  }

  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 50, 100], fov: 60 }}>
        <color attach="background" args={['#000']} />
        <ambientLight intensity={1} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />
        <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Sun />
        {planetOrbits.map((planet) => (
          <Planet
            key={planet.name}
            name={planet.name}
            distance={planet.distance}
            size={planet.size}
            color={planet.color}
            orbitColor={planet.orbitColor}
            showOrbit={showOrbits && planet.showOrbit}
            showLabel={showLabels && planet.showLabel}
            orbitSpeed={planet.orbitSpeed}
          />
        ))}
        {renderNEOs()}
        <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
      </Canvas>
      <Controls
        showOrbits={showOrbits}
        setShowOrbits={setShowOrbits}
        showLabels={showLabels}
        setShowLabels={setShowLabels}
      />
    </div>
  )
}

export default App