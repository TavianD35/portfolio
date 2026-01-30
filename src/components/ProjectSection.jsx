{/*
Filename: ProjectSection.jsx
Author: Tavian Dodd
Date Created: 01/26/2026
Last Updated: 01/29/2026
*/}

import { useState, useEffect } from 'react'

export default function ProjectSection({ title, stack, description, image, align = 'left', background = 'transparent' }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div 
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',           
        width: '100%',
        scrollSnapAlign: 'start',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '0 5vw' : '0 5vw',
        background: background, 
        boxShadow: background !== 'transparent' ? '0 -50px 100px rgba(0,0,0,0.7)' : 'none',
        zIndex: 1,
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <div style={{
        display: isMobile ? 'flex' : 'grid',
        flexDirection: 'column',
        gridTemplateColumns: '1fr 1fr',
        gap: isMobile ? '4vh' : '60px',
        maxWidth: '1200px',
        width: '100%',
        alignItems: 'center',
        height: isMobile ? '100%' : 'auto',
        justifyContent: 'center'
      }}>
        
        {/* text side */}
        <div style={{ 
            order: isMobile ? 1 : (align === 'left' ? 1 : 2),
            textAlign: isMobile ? 'center' : 'left',
            flexShrink: 0,
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            zIndex: 2
        }}>
          <h3 style={{ 
            color: '#4d4dff', margin: 0, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold',
            fontSize: isMobile ? '0.8rem' : '0.9rem' 
          }}>
            {stack}
          </h3>
          <h2 style={{ 
            fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : '3.5rem', 
            margin: '15px 0', lineHeight: 1.1, fontWeight: '800', color: 'white' 
          }}>
            {title}
          </h2>
          <p style={{ 
            fontSize: isMobile ? '0.95rem' : '1.1rem', 
            color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, 
            maxWidth: '500px',
            margin: isMobile ? '0 auto' : '0'
          }}>
            {description}
          </p>
          <button style={{
            marginTop: isMobile ? '20px' : '30px',
            padding: isMobile ? '12px 25px' : '15px 35px',
            background: 'white',
            color: 'black',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: isMobile ? '0.9rem' : '1rem',
            alignSelf: isMobile ? 'center' : 'flex-start'
          }}>
            View Case Study
          </button>
        </div>

        {/* image side */}
        <div style={{ 
          order: isMobile ? 2 : (align === 'left' ? 2 : 1),
          width: '100%',
          flexGrow: 0,
          flexShrink: 1,
          maxHeight: isMobile ? '35vh' : '400px',
          height: isMobile ? 'auto' : '400px',
          aspectRatio: isMobile ? '16/9' : 'auto',
          
          background: '#000',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
            {/* replace with screen shots later */}
            <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
        </div>

      </div>
    </div>
  )
}