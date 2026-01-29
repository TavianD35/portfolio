{/*
Filename: ProjectSection.jsx
Author: Tavian Dodd
Date Created: 01/26/2026
Last Updated: 01/26/2026
*/}

export default function ProjectSection({ title, stack, description, image, align = 'left', background = 'transparent' }) {
  return (
    <div 
      style={{
        height: '100vh',           
        width: '100%',
        scrollSnapAlign: 'start',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'sticky',
        padding: '0 5vw',
        background: background, 
        boxShadow: background !== 'transparent' ? '0 -50px 100px rgba(0,0,0,0.7)' : 'none',
        zIndex: 1
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        maxWidth: '1200px',
        width: '100%',
        alignItems: 'center',
        //zIndex: 2 
      }}>
        
        {/* text side */}
        <div style={{ order: align === 'left' ? 1 : 2 }}>
          <h3 style={{ color: '#4d4dff', margin: 0, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', fontWeight: 'bold' }}>
            {stack}
          </h3>
          <h2 style={{ fontSize: '3.5rem', margin: '15px 0', lineHeight: 1, fontWeight: '800', color: 'white' }}>
            {title}
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: '500px' }}>
            {description}
          </p>
          <button style={{
            marginTop: '30px',
            padding: '15px 35px',
            background: 'white',
            color: 'black',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            View Case Study
          </button>
        </div>

        {/* image side */}
        <div style={{ 
          order: align === 'left' ? 2 : 1,
          height: '400px',
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