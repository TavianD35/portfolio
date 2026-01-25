{/*
Filename: App.jsx
Author: Tavian Dodd
Date Created: 01/15/2026
Last Updated: 01/20/2026
*/}

import { Routes, Route } from 'react-router-dom'
import About from './pages/About'
// import Projects from './pages/Projects' 
// import Contact from './pages/Contact' 
import { SimulationLoader } from './SimulationLoader'
import { useState, useRef, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, SpotLight, CameraControls, useCursor } from '@react-three/drei'
import { Model } from './RoomV3'

const standingPos = [1.625, 1.8, 2]
const standingTarget = [0.25, 1, 0]
const sittingPos = [1.1, 1.1, 0]
const sittingTarget = [0, 0.85, 0]

function MonitorHitbox({ position, rotation, onClick }) {
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  return (
    <mesh 
      position={position} 
      rotation={rotation || [0, 0, 0]} 
      visible={false}
      onClick={(e) => { e.stopPropagation(); onClick() }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[0.5, 0.32, 0.01]} />
      <meshBasicMaterial color="red" wireframe />
    </mesh>
  )
}

function Controls({ isSitting, controls }) {
  useEffect(() => {
    if (controls.current) {
      if (isSitting) {
        controls.current.setLookAt(...sittingPos, ...sittingTarget, true)
      } else {
        controls.current.setLookAt(...standingPos, ...standingTarget, true)
      }
    }
  }, [isSitting, controls])

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
  const [monitorContent, setMonitorContent] = useState(null)
  const [transitionState, setTransitionState] = useState('idle') 
  
  const controls = useRef()

  const handleMonitorClick = (content, tx, ty, tz, cx, cy, cz) => {
    if (controls.current) {
      controls.current.setLookAt(cx, cy, cz, tx, ty, tz, true)
    }

    setTimeout(() => {
      setTransitionState('fading-out')
      
      setTimeout(() => {
        setMonitorContent(content)
        setTransitionState('fading-in')
        setTimeout(() => setTransitionState('idle'), 500)
      }, 500) 

    }, 1200) 
  }

  const handleCloseMonitor = () => {
    setTransitionState('fading-out')
    
    setTimeout(() => {
      setMonitorContent(null)
      
      if (controls.current) {
        controls.current.setLookAt(...sittingPos, ...sittingTarget, true)
      }

      setTransitionState('fading-in')
      setTimeout(() => setTransitionState('idle'), 500)
    }, 500)
  }

  return (
    <>
    <div style={{ width: "100vw", height: "100vh", background: "#111", overflow: 'hidden' }}>

      {!monitorContent && (
        <div style={{position: 'absolute', top: 20, left: 20, zIndex: 20}}>
          <button
            onClick={() => setIsSitting(!isSitting)} 
            style={{
              padding: '10px 20px', background: '#4d4dff', color: 'white',
              border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer',
              transition: 'opacity 0.2s',
              opacity: transitionState === 'idle' ? 1 : 0
            }}>
            {isSitting ? "Back To Room" : "View Work"}
          </button>
        </div>
      )}

      <Canvas camera={{ position: standingPos, fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <Environment preset="city" background={false} blur={1} environmentIntensity={0.2} />
          <rectAreaLight width={10} height={10} position={[0, 5, -5]} intensity={5} color="#2c2c54" lookAt={[0, 0, 0]} />
          <SpotLight position={[3, 4, 2]} angle={0.5} penumbra={0.5} intensity={2} castShadow color="#e0e0ff" />
          <SpotLight position={[-2, 3, -2]} intensity={3} color="blue" angle={0.5} />
          <Model />
          
          {isSitting && (
            <>
              {/* left monitor */}
              <MonitorHitbox 
                position={[0.1, 1.025, 0.475]} 
                rotation={[0, 2.1, 0]} 
                onClick={() => handleMonitorClick('left', 0.1, 1.025, 0.475, 0.55, 1.025, 0.2)} 
              />
              {/* center monitor */}
              <MonitorHitbox 
                position={[-0.025, 1.025, 0]} 
                rotation={[0, 1.6, 0]} 
                onClick={() => handleMonitorClick('center', -0.025, 1.025, 0, 0.6, 1.025, 0)} 
              />
              {/* right monitor */}
              <MonitorHitbox 
                position={[0.1, 1.025, -0.475]} 
                rotation={[0, -2.1, 0]} 
                onClick={() => handleMonitorClick('right', 0.1, 1.025, -0.475, 0.55, 1.025, -0.2)} 
              />
            </>
          )}

          <Controls isSitting={isSitting} controls={controls} />
        </Suspense>
      </Canvas>

      {/* black curtain transition */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: '#000',
        opacity: transitionState === 'fading-out' ? 1 : 0, 
        pointerEvents: 'none',
        transition: 'opacity 0.5s ease-in-out', 
        zIndex: 50
      }} />

      {/* content overlay */}
      {monitorContent && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(15, 15, 20, 0.96)', 
          zIndex: 40,
          overflowY: 'auto', 
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
           
           {/* close button */}
           <div style={{ 
             position: 'sticky', top: 0, width: '100%', 
             display: 'flex', justifyContent: 'center', 
             padding: '20px 0', background: 'rgba(15, 15, 20, 0.9)',
             zIndex: 100 
           }}>
             <button
               onClick={handleCloseMonitor}
               style={{
                 padding: '12px 30px', background: 'white', color: 'black',
                 border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer',
                 boxShadow: '0 4px 15px rgba(255,255,255,0.2)'
               }}>
               Close Monitor
             </button>
           </div>

           {/* page content wrapper */}
           <div style={{ 
             width: 'fit-content', 
             maxWidth: '1000px', 
             margin: '0 auto',
             padding: '0 20px 50px 20px',
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center'
           }}>
             
             {monitorContent === 'left' && <About />}

             {monitorContent === 'center' && (
                <div style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>
                   <h1>My Projects</h1>
                   <p>Projects Component Coming Soon</p>
                </div>
             )}

             {monitorContent === 'right' && (
                <div style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>
                   <h1>Contact Me</h1>
                   <p>Contact Component Coming Soon</p>
                </div>
             )}
             
           </div>

        </div>
      )}

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


