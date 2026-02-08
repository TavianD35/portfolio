{/*
Filename: App.jsx
Author: Tavian Dodd
Date Created: 01/15/2026
Last Updated: 02/03/2026
*/}

import CustomCursor from './components/CustomCursor'
import { HashRouter as Router, Routes, Route, HashRouter } from 'react-router-dom'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import './app.css' 
import MobilePortfolio from './components/MobilePortfolio'
import { SimulationLoader } from './SimulationLoader'
import { useState, useRef, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, SpotLight, CameraControls, useCursor } from '@react-three/drei'
import { Model } from './Room'

// constants
const standingPos = [1.625, 1.8, 2]
const sittingPos = [1.1, 1.1, 0]

const standingTarget = [0.25, 1, 0]
const sittingTarget = [0, 0.85, 0]

// rotate prompt component
function RotatePrompt() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: '#111', 
      zIndex: 9000,
      display: 'flex', flexDirection: 'column', 
      justifyContent: 'center', alignItems: 'center',
      color: 'white', textAlign: 'center', padding: '20px'
    }}>
      <div style={{ 
        fontSize: '40px', marginBottom: '20px', 
        animation: 'spin 2s infinite ease-in-out' 
      }}>
        📱↺
      </div>
      <h2 style={{ marginBottom: '10px' }}>Please Rotate Device</h2>
      <p style={{ color: '#aaa', maxWidth: '300px' }}>
        This portfolio is designed for landscape mode.
      </p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(90deg); }
          50% { transform: rotate(90deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  )
}

function MonitorHitbox({ position, rotation, onClick }) {
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  return (
    <mesh 
      position={position} 
      rotation={rotation || [0, 0, 0]} 
      onClick={(e) => { e.stopPropagation(); onClick() }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[0.5, 0.32, 0.01]} />
      <meshBasicMaterial color="red" transparent opacity={0} />
    </mesh>
  )
}

function Controls({ isSitting, controls, targetPos, targetLook }) {
  useEffect(() => {
    if (controls.current) {
        controls.current.setLookAt(...targetPos, ...targetLook, true)
    }
  }, [isSitting, controls, targetPos, targetLook])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (controls.current) {
        controls.current.setLookAt(...standingPos, ...standingTarget, false)
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [controls])

  return (
    <CameraControls 
      ref={controls} 
      makeDefault 
      smoothTime={0.75}
      mouseButtons={{ left: 0, middle: 0, right: 0, wheel: 0 }}
      touches={{ one: 0, two: 0, three: 0 }}
    />
  )
}

// main 3d home component
function Home3D({ onExit }) {
  const [isSitting, setIsSitting] = useState(false)
  const [monitorContent, setMonitorContent] = useState(null)
  const [transitionState, setTransitionState] = useState('idle') 
  
  // mobile detection
  const [isMobile, setIsMobile] = useState(false)
  const [isPortrait, setIsPortrait] = useState(false)
  
  const controls = useRef()

  useEffect(() => {
    const handleResize = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches
      const mobileWidth = window.innerWidth < 1024
      
      setIsMobile(isTouch && mobileWidth)
      setIsPortrait(window.innerHeight > window.innerWidth)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const targetPos = isSitting ? sittingPos : standingPos
  const targetLook = isSitting ? sittingTarget : standingTarget

  const isFullWidth = monitorContent === 'center'

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

      {/* rotate prompt which is rendered conditionally */}
      {isMobile && isPortrait && <RotatePrompt />}

      {/* exit button for mobile immersive */}
      {isMobile && !monitorContent && (
        <div style={{position: 'absolute', top: 20, right: 20, zIndex: 20}}>
          <button
            onClick={onExit} 
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: 'monospace',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              textShadow: '0 0 5px rgba(0,0,0,0.5)'
            }}
          >
            // exit_3d
          </button>
        </div>
      )}

      {!monitorContent && (
        <div style={{
          position: 'absolute', 
          top: 20, 
          left: '50%', 
          transform: 'translateX(-50%)', 
          zIndex: 20
        }}>
          <button
            onClick={() => setIsSitting(!isSitting)} 
            style={{
              padding: '10px 15px', 
              background: '#4d4dff',
              color: '#000',
              border: '2px solid #4d4dff',
              borderRadius: '5px',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s',
              opacity: transitionState === 'idle' ? 1 : 0,
              boxShadow: '0 0 10px rgba(77, 77, 255, 0.2)',
              animation: 'pulseGlow 2s infinite ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#4d4dff'
              e.target.style.boxShadow = '0 0 50px rgba(77, 77, 255, 0.9)'
              e.target.style.animation = 'none'
              e.target.style.transform = 'translateY(-2.5px) scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#4d4dff'
              e.target.style.boxShadow = 'none'
              e.target.style.animation = 'pulseGlow 2s infinite ease-in-out'
              e.target.style.transform = 'translateY(0) scale(1)';
            }}
          >
            {isSitting ? "> BACK_TO_ROOM" : "> VIEW_WORK"}
          </button>
        </div>
      )}

      <Canvas 
        dpr={[1, 2]}
        gl={{antialias: true}}
        camera={{ position: standingPos, fov: 50 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <Environment preset="city" background={false} blur={1} environmentIntensity={0.2} />
          <rectAreaLight width={10} height={10} position={[0, 5, -5]} intensity={5} color="#2c2c54" lookAt={[0, 0, 0]} />
          <SpotLight position={[3, 4, 2]} angle={0.5} penumbra={0.5} intensity={2} castShadow={!isMobile} color="#e0e0ff" />
          <SpotLight position={[-2, 3, -2]} intensity={3} color="blue" angle={0.5} />
          <Model isSitting={isSitting} />
          
          {isSitting && (
            <>
              <MonitorHitbox 
                position={[0.1, 1.025, 0.475]} 
                rotation={[0, 2.1, 0]} 
                onClick={() => handleMonitorClick('left', 0.1, 1.025, 0.475, 0.55, 1.025, 0.2)} 
              />
              <MonitorHitbox 
                position={[-0.025, 1.025, 0]} 
                rotation={[0, 1.6, 0]} 
                onClick={() => handleMonitorClick('center', -0.025, 1.025, 0, 0.6, 1.025, 0)} 
              />
              <MonitorHitbox 
                position={[0.1, 1.025, -0.475]} 
                rotation={[0, -2.1, 0]} 
                onClick={() => handleMonitorClick('right', 0.1, 1.025, -0.475, 0.55, 1.025, -0.2)} 
              />
            </>
          )}

          <Controls 
            isSitting={isSitting} 
            controls={controls} 
            targetPos={targetPos} 
            targetLook={targetLook} 
          />
        </Suspense>
      </Canvas>

      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: '#000',
        opacity: transitionState === 'fading-out' ? 1 : 0, 
        pointerEvents: 'none',
        transition: 'opacity 0.5s ease-in-out', 
        zIndex: 50
      }} />

      {monitorContent && (
        <div style={{
          position: 'fixed', 
          inset: 0,
          background: 'rgba(15, 15, 20, 0.96)', 
          zIndex: 40,
          overflowY: 'auto', 
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
           
           {/* close button */}
           <button
             onClick={handleCloseMonitor}
             style={{
               position: 'fixed',
               top: 20,
               right: 20,
               zIndex: 100,
               background: 'transparent', 
               color: 'rgba(255, 255, 255, 0.6)',
               border: 'none', 
               fontFamily: 'monospace',
               fontSize: '1.2rem',
               fontWeight: 'bold', 
               cursor: 'pointer',
               textShadow: '0 0 5px rgba(0,0,0,0.8)'
             }}
             onMouseEnter={(e) => {
                e.target.style.color = '#ff5555' 
                e.target.innerText = '// close monitor' 
             }}
             onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.6)'
                e.target.innerText = '// close'
             }}
           >
             // close
           </button>

           <div style={{ 
             width: '100%', 
             maxWidth: isFullWidth ? 'none' : '1000px', 
             margin: '0 auto',
             padding: isFullWidth ? '0' : '0 20px', 
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center'
           }}>
             
             {monitorContent === 'left' && <About />}

             {monitorContent === 'center' && <Projects />}

             {monitorContent === 'right' && <Contact />}
             
           </div>

        </div>
      )}

    </div>
    <SimulationLoader />
    </>
  )
}

export default function App() {
  const [isTouch] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia("(pointer: coarse)").matches : false
  )

  const [immersiveMode, setImmersiveMode] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches && window.innerWidth <= 1024)
  }, [])

  if (isMobile && !immersiveMode) {
    return <MobilePortfolio onEnter={() => setImmersiveMode(true)} />
  }

  return (
    <>
      {/*!isTouch && <CustomCursor />*/}
      
      <Routes>
        <Route path="/" element={
           <Home3D onExit={() => setImmersiveMode(false)} /> 
        } /> 
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}


