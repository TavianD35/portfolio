{/*
Filename: SimulationLoader.jsx
Author: Tavian Dodd
Date Created: 01/22/2026
Last Updated: 01/22/2026
*/}

import { useProgress } from '@react-three/drei'
import { useState, useEffect } from 'react'

export function SimulationLoader({ showRotateHint }) {
  const { progress: activeProgress } = useProgress()
  const [percent, setPercent] = useState(0)
  const [dots, setDots] = useState('')
  const [finished, setFinished] = useState(false)

  // "fake loader" loop"
  useEffect(() => {
    let interval = setInterval(() => {
      setPercent(prev => {
        // stop timer at 100%
        if (prev >= 100) {
          clearInterval(interval)
          setFinished(true)
          return 100
        }
        
       // Speed control
        const increment = Math.random() * 2 + 0.5 
        
        // wait for real load (dont pass 100)
        if (prev > 90 && activeProgress < 100) {
           return prev
        }

        return Math.min(prev + increment, 100)
      })
    }, 50)

    return () => clearInterval(interval)
  }, [activeProgress])

  // typing dot animation
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)
    return () => clearInterval(dotInterval)
  }, [])

  // text based on percent
  let statusText = "Initializing Environment"
  if (percent > 25) statusText = "Loading Geometry"
  if (percent > 50) statusText = "Compiling Shaders"
  if (percent > 75) statusText = "Calibrating Physics"
  if (percent === 100) statusText = "Simulation Ready"

  if (finished) return null

  return (
    <div style={{
      // use fixed/inset to lock it to the screen (prevents scroll/zoom issues)
      position: 'fixed', inset: 0,
      background: '#111', color: '#fff',
      fontFamily: 'monospace',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      zIndex: 9999
    }}>
      
      <div style={{ 
        width: '100%', 
        maxWidth: '600px', 
        padding: '0 20px',
        textAlign: 'left',
        boxSizing: 'border-box'
      }}>
        <p style={{ margin: 0 }}>
            <span style={{ 
            color: '#4d4dff', 
            fontSize: '1rem',
            marginRight: '10px'
        }}>

            [SYSTEM]

            </span> 
            {/* statusText style */}
            <span style={{ 
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#fff'
            }}>
            {statusText}{dots}
            </span>
        </p>
        
        <div style={{ 
          width: '100%', height: '30px', 
          border: '2px solid #333', marginTop: '10px', 
          position: 'relative' 
        }}>

        <div style={{
            width: `${percent}%`, height: '100%',
            background: '#4d4dff',
            transition: 'width 0.1s linear'
        }}/>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '5px' }}>
            <p style={{ margin: 0, fontSize: '1.0rem', opacity: 0.7 }}>
            {percent.toFixed(0)}% COMPLETE
            </p>
        </div>
      </div>
    </div>
  )
}