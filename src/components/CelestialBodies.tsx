'use client'

import { Html, Sphere, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'

interface CelestialBodyProps {
  name: string
  distance: number
  size: number
  color: string
  orbitColor: string
  showOrbit: boolean
  showLabel: boolean
  orbitSpeed: number
}

export const Sun: React.FC = () => {
  const sunRef = useRef<THREE.Mesh>(null)
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002
    }
  })

  return (
    <mesh ref={sunRef}>
      <Sphere args={[2, 32, 32]}>
        <meshBasicMaterial color="#FDB813" />
      </Sphere>
      <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />
    </mesh>
  )
}

export const Planet: React.FC<CelestialBodyProps> = ({ name, distance, size, color, orbitColor, showOrbit, showLabel, orbitSpeed }) => {
  const ref = useRef<THREE.Mesh>(null!)
  const orbitRef = useRef<THREE.Line>(null!)
  
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    ref.current.position.x = Math.cos(elapsedTime * orbitSpeed * 0.1) * distance
    ref.current.position.z = Math.sin(elapsedTime * orbitSpeed * 0.1) * distance
    ref.current.rotation.y += 0.01
  })

  return (
    <>
      <mesh ref={ref}>
        <Sphere args={[size, 32, 32]}>
          <meshStandardMaterial color={color} roughness={0.7} metalness={0.3} />
        </Sphere>
        {showLabel && (
          <Text
            position={[0, size + 0.5, 0]}
            fontSize={Math.max(0.5, size * 0.5)}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {name}
          </Text>
        )}
      </mesh>
      {showOrbit && (
        <line ref={orbitRef}>
          <bufferGeometry>
            <bufferAttribute
              attachObject={['attributes', 'position']}
              count={64}
              array={new Float32Array(
                [...Array(64)].map((_, i) => {
                  const angle = (i / 32) * Math.PI * 2
                  return [Math.cos(angle) * distance, 0, Math.sin(angle) * distance]
                }).flat()
              )}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={orbitColor} opacity={0.5} transparent linewidth={2} />
        </line>
      )}
    </>
  )
}

export const NearEarthObject: React.FC<{
  name: string
  distance: number
  size: number
  color: string
  orbitColor: string
  showOrbit: boolean
  showLabel: boolean
  orbitSpeed: number
  inclination: number
  eccentricity: number
}> = ({ name, distance, size, color, orbitColor, showOrbit, showLabel, orbitSpeed, inclination, eccentricity }) => {
  const orbitRef = useRef<THREE.Group>(null)
  const objectRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += orbitSpeed * 0.02
    }
  })

  const orbitRadius = distance * (1 - eccentricity * eccentricity)
  const orbitCenter = new THREE.Vector3(distance * eccentricity, 0, 0)

  return (
    <group ref={orbitRef} rotation={[0, 0, inclination * Math.PI / 180]}>
      {showOrbit && (
        <line>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attachObject={['attributes', 'position']}
              count={64}
              array={new Float32Array(192).map((_, i) => {
                if (i % 3 === 0) {
                  return orbitRadius * Math.cos(i / 3 * Math.PI / 32) + orbitCenter.x
                } else if (i % 3 === 1) {
                  return 0
                } else {
                  return orbitRadius * Math.sin((i - 2) / 3 * Math.PI / 32)
                }
              })}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial attach="material" color={orbitColor} />
        </line>
      )}
      <mesh ref={objectRef} position={[distance, 0, 0]}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {showLabel && (
        <Html position={[distance, size + 0.5, 0]}>
          <div className="text-white text-xs">{name}</div>
        </Html>
      )}
    </group>
  )
}