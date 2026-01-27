{/*
Filename: Projects.jsx
Author: Tavian Dodd
Date Created: 01/26/2026
Last Updated: 01/26/2026
*/}

import FloatingTech from '../components/FloatingTech'
import ProjectSection from '../components/ProjectSection'

export default function Projects() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      background: '#050505', 
      color: 'white',
      overflowY: 'scroll',       
      scrollSnapType: 'y mandatory', 
      scrollBehavior: 'smooth'
    }}>
      
      {/* 3d background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <FloatingTech />
      </div>

      {/* scrollable content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        
        {/* section 1: intro */}
        <div style={{
           height: '100vh', 
           width: '100%',
           scrollSnapAlign: 'start', 
           display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
           background: 'transparent' 
        }}>
           <h1 style={{ fontSize: '6vw', margin: 0, lineHeight: 0.9, textAlign: 'center' }}>
             PLACE <br /> 
             <span style={{ color: '#4d4dff' }}>HOLDER</span>
           </h1>
           <div style={{ marginTop: '50px', fontSize: '1.5rem', opacity: 0.5 }}>
             ↓
           </div>
        </div>

        {/* section 2: simulation? */}
        <ProjectSection 
          title=""
          stack=""
          description=""
          image=""
          align="left"
          background="#0a192f" 
        />

        {/* section 3: portfolio? */}
        <ProjectSection 
          title=""
          stack=""
          description=""
          image=""
          align="right"
          background="#161616" 
        />

        {/* section 4: ? */}
        <ProjectSection 
          title=""
          stack=""
          description=""
          image=""
          align="left"
          background="#1a1125" 
        />

        {/* section 5: footer */}
        <div style={{
           height: '50vh', 
           scrollSnapAlign: 'start', 
           display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
           background: '#000000',
           borderTop: '1px solid #333'
        }}>
           <h2 style={{ fontSize: '3rem' }}>Temp Text</h2>
           <button style={{ 
               padding: '15px 40px', fontSize: '1.2rem', background: '#4d4dff', 
               color: 'white', border: 'none', borderRadius: '5px', marginTop: '20px', cursor: 'pointer' 
           }}>
             Contact Me?
           </button>
        </div>

      </div>
    </div>
  )
}