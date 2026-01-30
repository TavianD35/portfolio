{/*
Filename: MobilePortfolio.jsx
Author: Tavian Dodd
Date Created: 01/29/2026
Last Updated: 01/29/2026
*/}

import FloatingTech from './FloatingTech'
import ProjectSection from './ProjectSection'

const StickyCard = ({ children, background = 'transparent' }) => (
  <div style={{
    position: 'sticky', 
    top: 0, 
    height: '100vh', 
    width: '100%',
    scrollSnapAlign: 'start',
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    background: background,
    boxShadow: background !== 'transparent' ? '0 -50px 100px rgba(0,0,0,0.7)' : 'none',
    zIndex: 1,
    padding: '20px',
    boxSizing: 'border-box',
    overflow: 'hidden'      
  }}>
    {children}
  </div>
)

export default function MobilePortfolio({ onEnter }) {
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      background: '#050505', 
      color: 'white',
      overflowY: 'scroll',       
      scrollSnapType: 'y mandatory', 
      scrollBehavior: 'smooth',
      overflowX: 'hidden'
    }}>
      
      {/* background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <FloatingTech />
      </div>

      {/* content layer */}
      <div style={{ position: 'relative', zIndex: 10 }}>

        {/* landing card */}
        <div style={{
           position: 'sticky', top: 0,
           height: '100vh', width: '100%',
           scrollSnapAlign: 'start',
           display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
           background: 'transparent', 
           zIndex: 0,
           boxSizing: 'border-box',
           overflow: 'hidden'
        }}>
           <h3 style={{ 
             color: '#4d4dff', letterSpacing: '2px', marginBottom: '10px',
             fontSize: 'clamp(0.8rem, 2vw, 1rem)', 
             textAlign: 'center'
           }}>
             SIMULATION ENGINEER
           </h3>
           <h1 style={{ 
             fontSize: 'clamp(3rem, 12vw, 4.5rem)',
             margin: 0, lineHeight: 1, textAlign: 'center' 
           }}>
             TAVIAN <br />
             <span style={{ opacity: 0.5 }}>D.</span>
           </h1>

           {/* enter immersive button */}
           <button 
             onClick={onEnter}
             style={{
               marginTop: '40px',
               padding: '15px 30px',
               background: 'rgba(77, 77, 255, 0.2)',
               border: '1px solid #4d4dff',
               color: '#4d4dff',
               borderRadius: '30px',
               fontSize: '1rem',
               fontWeight: 'bold',
               cursor: 'pointer',
               backdropFilter: 'blur(10px)',
               boxShadow: '0 0 20px rgba(77, 77, 255, 0.4)'
             }}
           >
             Enter 3D Experience ↻
           </button>
           <p style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '10px' }}>(Requires Landscape)</p>

           <div style={{ marginTop: 'auto', marginBottom: '50px', fontSize: '1.5rem', opacity: 0.5 }}>↓</div>
        </div>

        {/* 2. about me card */}
        <StickyCard background="#111">
           <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '20px' }}>About Me</h2>
           <p style={{ 
             maxWidth: '400px', lineHeight: 1.6, textAlign: 'center', opacity: 0.8,
             fontSize: 'clamp(0.9rem, 2vw, 1.1rem)'
           }}>
             I specialize in Digital Twin simulations and full-stack development. 
             I bridge the gap between industrial automation and modern web technology, 
             creating tools that simulate reality to save time and money.
           </p>
           <div style={{ marginTop: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
             {['Emulate3D', 'React', 'C#', '.NET', 'Three.js'].map(skill => (
               <span key={skill} style={{ padding: '8px 15px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.9rem' }}>
                 {skill}
               </span>
             ))}
           </div>
        </StickyCard>

        {/* projects cards */}
        <ProjectSection 
          title="Emulate3D"
          stack="Simulation // C# // PLC"
          description="A digital twin simulation integrated with Rockwell PLCs to validate warehouse throughput."
          image="https://placehold.co/600x400/0a192f/FFF?text=Simulation"
          align="left"
          background="#0a192f" 
        />

        <ProjectSection 
          title="Portfolio V1"
          stack="React // Three.js"
          description="An immersive 3D web experience featuring a custom modeled room and interactive shaders."
          image="https://placehold.co/600x400/161616/FFF?text=Portfolio"
          align="right"
          background="#161616" 
        />

        {/* contact / footer card */}
        <StickyCard background="#000000">
           <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', margin: 0 }}>Let's Talk.</h2>
           <p style={{ opacity: 0.6, marginTop: '10px' }}>Open for opportunities.</p>
           
           <button style={{ 
               marginTop: '30px', padding: '15px 40px', fontSize: '1.2rem', 
               background: '#4d4dff', color: 'white', border: 'none', borderRadius: '5px' 
           }}>
             Email Me
           </button>

           {/* "download resume" button */}
           <a 
             href="/resume.pdf" // Update this path later
             download
             style={{ 
               marginTop: '20px', color: 'white', textDecoration: 'underline', cursor: 'pointer' 
             }}
           >
             Download Resume
           </a>
        </StickyCard>

      </div>
    </div>
  )
}