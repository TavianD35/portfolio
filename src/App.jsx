{/*
Filename: App.jsx
Author: Tavian Dodd
Date Created: 01/15/2026
Last Updated: 01/20/2026
*/}

import { Routes, Route } from 'react-router-dom'
import About from './pages/About'
import { SimulationLoader } from './SimulationLoader'
import { useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, SpotLight, CameraControls } from '@react-three/drei'
import { Model } from './Room'

const standingPos = [1.625, 1.8, 2]
const standingTarget = [0.25, 1, 0]
const sittingPos = [1.1, 1.1, 0]
const sittingTarget = [0, 0.85, 0]

function Controls({ isSitting }) {
  const controls = useRef()

  useEffect(() => {
    if (controls.current) {
      if (isSitting) {
        controls.current.setLookAt(...sittingPos, ...sittingTarget, true)
      } else {
        controls.current.setLookAt(...standingPos, ...standingTarget, true)
      }
    }
  }, [isSitting])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (controls.current) {
        controls.current.setLookAt(...standingPos, ...standingTarget, false)
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <CameraControls 
      ref={controls} 
      makeDefault 
      smoothTime={1.5}
      mouseButtons={{ left: 0, middle: 0, right: 0, wheel: 0 }}
      touches={{ one: 0, two: 0, three: 0 }}
    />
  )
}

function Home3D() {
  const [isSitting, setIsSitting] = useState(false)

  return (
    <>
    <div style={{ width: "100vw", height: "100vh", background: "#111" }}>

      <div style={{position: 'absolute', top: 20, left: 20, zIndex: 10}}>
        <button
          onClick={() => setIsSitting(!isSitting)} 
          style={{
            padding: '10px 20px', 
            background: '#4d4dff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>

          {isSitting ? "Back To Room" : "View Work"}
        </button>
      </div>

      <Canvas camera={{ position: standingPos, fov: 50 }}>
        
        <ambientLight intensity={0.35} />
        <Environment preset="city" background={false} blur={1} environmentIntensity={0.2} />

        <rectAreaLight
          width={10}
          height={10}
          position={[0, 5, -5]}
          intensity={5}
          color="#2c2c54"
          lookAt={[0, 0, 0]}
        />

        <SpotLight 
          position={[3, 4, 2]} 
          angle={0.5} 
          penumbra={0.5} 
          intensity={2} 
          castShadow 
          color="#e0e0ff" 
        />

        <SpotLight 
          position={[-2, 3, -2]} 
          intensity={3} 
          color="blue" 
          angle={0.5} 
        />

        <Model />

        <Controls isSitting={isSitting} />
        
      </Canvas>
    </div>

    <SimulationLoader />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home3D />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}


