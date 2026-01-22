import React from 'react'

const About = () => {
  return (

    <div style={{
      width: '100vw',
      minHeight: '100vh',
      background: '#111',
      color: '#eee',
      padding: '50px',
      fontFamily: 'Arial, sans-serif'
    }}>
      
      {/* HEADER SECTION */}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>
          Hello, I'm <span style={{ color: '#4d4dff' }}>Tavian.</span>
        </h1>
        <h2 style={{ fontSize: '1.5rem', color: '#888', marginBottom: '40px' }}>
          Simulation Engineer // Coding Enthusiast // Problem Solver
        </h2>

        {/* CONTENT GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          
          {/* Left Column: Text */}
          <div>
            <p style={{ lineHeight: '1.6', fontSize: '1.1rem', marginBottom: '20px' }}>
              I am a graduate from Tennessee Technological University with a B.S. in Computer Science.
            </p>
            <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
              I currently hold a position as a Simulation Engineer, and I have recently reignited my passion for coding by working on personal projects.
            </p>
            <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
                <span style={{fontWeight: 'bold', fontSize: '1.2rem', color: '#4d4dff' }}>
                    Skills:
                </span> <br />
                Coding: C#, Javascript, React <br />
                3D Modeling: Blender, Fusion 360 <br />
                Simulation: Emulate3D <br />
            </p>
            
            {/* A Cool React Button */}
            <button style={{
              marginTop: '30px',
              padding: '15px 30px',
              background: '#4d4dff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>
              Download Resume
            </button>
          </div>

          {/* Right Column: Visual (Placeholder for now) */}
          <div style={{
            background: '#222',
            borderRadius: '15px',
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dashed #444'
          }}>
            [ Profile Picture / 3D Avatar ]
          </div>

        </div>
      </div>
    </div>
  )
}
export default About;