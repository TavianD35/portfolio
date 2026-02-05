{/*
Filename: About.jsx
Author: Tavian Dodd
Date Created: 01/21/2026
Last Updated: 02/04/2026
*/}

import WireframeTerrain from "../components/WireframeTerrain";

export default function About() {
  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      minHeight: '100vh',
      background: '#111',
      color: '#eee',
      padding: '80px 50px 50px 50px', 
      fontFamily: 'Arial, sans-serif',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>

      <WireframeTerrain />
      
      {/* header section */}
      <div style={{ 
          position: 'relative', 
          zIndex: 10,          
          maxWidth: '800px', 
          margin: '0 auto' 
      }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>
          Hi, I'm <span style={{ color: '#4d4dff' }}>Tavian.</span>
        </h1>
        <h2 style={{ fontSize: '1.5rem', color: '#888', marginBottom: '40px' }}>
          Simulation Engineer // Coding Enthusiast // Problem Solver
        </h2>

        {/* content grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          
          {/* left column text */}
          <div>
            <p style={{ lineHeight: '1.6', fontSize: '1.1rem', marginBottom: '20px' }}>
              I am a graduate from Tennessee Technological University with a B.S. in Computer Science.
            </p>
            <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
              I am a Simulation Engineer at ATC Automation, with a passion for coding and 3D modeling.
              My job is to create realistic simulations of automated systems using Emulate3D, aiding my peers in 
              visualizing, optimizing, and testing complex processes before implementation. In my free time, I enjoy 
              developing web applications and designing 3D models.
            </p>
            <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
                <span style={{fontWeight: 'bold', fontSize: '1.2rem', color: '#4d4dff' }}>
                    Skills:
                </span> <br />
                Coding: C#, Javascript, React, PLC Ladder Logic <br />
                3D Modeling: Blender, Fusion 360 <br />
                Simulation: Emulate3D <br />
            </p>
          </div> 

          {/* right column visual */}
          <div style={{
            background: '#222',
            borderRadius: '15px',
            height: '300px',
            overflow: 'hidden', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img 
              src="/portfolio/images/SelfPortrait.PNG" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

        </div>
      </div>
    </div>
  )
}