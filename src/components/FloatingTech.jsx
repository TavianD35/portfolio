{/*
Filename: FloatingTech.jsx
Author: Tavian Dodd
Date Created: 01/26/2026
Last Updated: 01/26/2026
*/}

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, Environment, ContactShadows } from '@react-three/drei'

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} /> 
      <pointLight position={[10, 10, 10]} intensity={1} color="#4d4dff" />

      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[0, 0, 0]}>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.8} />
        </mesh>

        <mesh position={[2, 2, -2]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color="#ff9900" emissive="#ff5500" emissiveIntensity={3} toneMapped={false} />
        </mesh>

        <mesh position={[-2, -1.5, 1]} rotation={[1, 1, 0]}>
          <icosahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color="#333" roughness={0.2} metalness={1} />
        </mesh>

        <mesh position={[1.5, -2, 2]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#4d4dff" emissive="#4d4dff" emissiveIntensity={2} />
        </mesh>
      </Float>

      <Environment preset="city" />
      <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.5} far={4} />
    </>
  )
}

export default function FloatingTech() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
        <Suspense fallback={null}>
            <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}