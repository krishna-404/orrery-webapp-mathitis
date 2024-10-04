'use client'

import { NearEarthObject, Planet, Sun } from '@/components/CelestialBodies'
import Controls from '@/components/Controls'
import { OrbitControls, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'

function App() {
  const [showOrbits, setShowOrbits] = useState(true)
  const [showLabels, setShowLabels] = useState(true)

  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 50, 100], fov: 60 }}>
        <color attach="background" args={['#000']} />
        <ambientLight intensity={1} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />
        <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Sun />
        <Planet name="Mercury" distance={5.8} size={0.38} color="#8c7853" orbitColor="#8c7853" showOrbit={showOrbits} showLabel={showLabels} orbitSpeed={4.74} />
        <Planet name="Venus" distance={10.8} size={0.95} color="#ffd700" orbitColor="#ffd700" showOrbit={showOrbits} showLabel={showLabels} orbitSpeed={3.5} />
        <Planet name="Earth" distance={15} size={1} color="#4169e1" orbitColor="#4169e1" showOrbit={showOrbits} showLabel={showLabels} orbitSpeed={2.98} />
        <Planet name="Mars" distance={22.8} size={0.53} color="#ff4500" orbitColor="#ff4500" showOrbit={showOrbits} showLabel={showLabels} orbitSpeed={2.41} />
        <Planet name="Jupiter" distance={77.8} size={11.2} color="#ffa500" orbitColor="#ffa500" showOrbit={showOrbits} showLabel={showLabels} orbitSpeed={1.31} />
        <Planet name="Saturn" distance={143} size={9.45} color="#f4c542" orbitColor="#f4c542" showOrbit={showOrbits} showLabel={showLabels} orbitSpeed={0.97} />
        <Planet name="Uranus" distance={287} size={4} color="#40e0d0" orbitColor="#40e0d0" showOrbit={showOrbits} showLabel={showLabels} orbitSpeed={0.68} />
        <Planet name="Neptune" distance={450} size={3.88} color="#4169e1" orbitColor="#4169e1" showOrbit={showOrbits} showLabel={showLabels} orbitSpeed={0.54} />
        <NearEarthObject name="NEO 1" distance={18} size={0.1} color="#ff00ff" orbitColor="#ff00ff" showOrbit={showOrbits} showLabel={showLabels} orbitSpeed={3.5} />
        <NearEarthObject name="NEO 2" distance={25} size={0.15} color="#00ffff" orbitColor="#00ffff" showOrbit={showOrbits} showLabel={showLabels} orbitSpeed={3} />
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