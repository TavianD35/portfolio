{/*
Filename: CustomCursor.jsx
Author: Tavian Dodd
Date Created: 01/25/2026
Last Updated: 01/26/2026
*/}

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // track mouse movement
    const moveCursor = (e) => {
      // move dot instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
      // move ring with slight delay
      if (ringRef.current) {
         ringRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  return (
    <>
      {/* inner dot */}
      <div 
        ref={dotRef}
        style={{
          position: 'fixed', top: -5, left: -5, width: 7.5, height: 7.5,
          background: '#ffffff', borderRadius: '50%', pointerEvents: 'none', zIndex: 9999,
          willChange: 'transform'
        }} 
      />
      {/* outer ring */}
      <div 
        ref={ringRef}
        style={{
          position: 'fixed', top: -13.75, left: -13.75, width: 25, height: 25,
          border: '1px solid rgba(255, 255, 255, 0.5)', borderRadius: '50%', pointerEvents: 'none', zIndex: 9998,
          transition: 'transform 0.075s ease-out', // set lag time of the outer ring
          willChange: 'transform'
        }} 
      />
    </>
  )
}