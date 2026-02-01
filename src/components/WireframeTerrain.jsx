{/*
Filename: WireframeTerrain.jsx
Author: Tavian Dodd
Date Created: 01/24/2026
Last Updated: 01/30/2026
*/}

import { useRef, useMemo, useEffect } from 'react' 
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const TerrainMaterial = {
  vertexShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    varying float vElevation;

    void main() {
        vec3 pos = position;

        float dist = distance(uv, uMouse);

        float intensity = 1.0 - smoothstep(0.0, 0.5, dist);
        
        float wave = sin(pos.x * 2.0 + uTime) * 0.1;

        pos.z -= (intensity * 1.5) - wave; 

        vElevation = pos.z; // Pass height to fragment shader if we want to change color based on depth

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
        uniform vec3 uColor;
        varying float vElevation;

        void main() {
        gl_FragColor = vec4(uColor, 1.0);
    }
  `
}

function TerrainPlane() {
  const meshRef = useRef()
  
  // store mouse position globally
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  // definition of 'shaderArgs' for the mesh to use
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color('#646577') }
    },
    vertexShader: TerrainMaterial.vertexShader,
    fragmentShader: TerrainMaterial.fragmentShader,
    wireframe: true
  }), [])

  // global mouse move listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1 - (e.clientY / window.innerHeight)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return

    // update time
    meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime()

    // reads global mouse position to update shader uniform
    meshRef.current.material.uniforms.uMouse.value.lerp(
      new THREE.Vector2(mouseRef.current.x, mouseRef.current.y), 
      0.1
    )
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[30, 12, 64, 64]} />
      <shaderMaterial attach="material" args={[shaderArgs]} transparent side={THREE.DoubleSide} />
    </mesh>
  )
}

export default function WireframeTerrain() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, background: '#050510' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <TerrainPlane />
      </Canvas>
    </div>
  )
}