'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField() {
  const ref = useRef<any>(null)
  
  // Generating particles
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(5000 * 3)
    const col = new Float32Array(5000 * 3)
    const colorA = new THREE.Color('#818cf8') // Indigo
    const colorB = new THREE.Color('#c084fc') // Purple
    
    for (let i = 0; i < 5000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
      
      const mixedColor = colorA.clone().lerp(colorB, Math.random())
      col[i * 3] = mixedColor.r
      col[i * 3 + 1] = mixedColor.g
      col[i * 3 + 2] = mixedColor.b
    }
    return [pos, col]
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

function FloatingBlobs() {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-2, 1, -2]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshPhongMaterial color="#818cf8" emissive="#4f46e5" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[2, -1, -3]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshPhongMaterial color="#c084fc" emissive="#9333ea" emissiveIntensity={0.5} />
        </mesh>
      </Float>
    </>
  )
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10 bg-transparent">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ParticleField />
        <FloatingBlobs />
      </Canvas>
    </div>
  )
}
