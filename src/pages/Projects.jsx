{/*
Filename: Projects.jsx
Author: Tavian Dodd
Date Created: 01/26/2026
Last Updated: 02/04/2026
*/}

import { useState, useEffect, useRef } from 'react';
import ProjectSection from '../components/ProjectSection';

export default function Projects() {
  const [activeSection, setActiveSection] = useState(0);
  const scrollContainerRef = useRef(null);

  const handleScroll = (e) => {
    const scrollPos = e.target.scrollTop;
    const windowHeight = window.innerHeight;
    const index = Math.round(scrollPos / windowHeight);
    setActiveSection(index);
  };

  const projectList = [
    { title: "Intro", id: 0 },
    { title: "Project 1", id: 1 },
    { title: "Project 2", id: 2 },
    { title: "Project 3", id: 3 },
    { title: "Footer?", id: 4 },
  ];

  return (
    <>
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          * { box-sizing: border-box; }
          
          /* The 'Power Line' animation */
          @keyframes flow {
            0% { background-position: 0% 0%; }
            100% { background-position: 0% 100%; }
          }
        `}
      </style>

      {/* background */}
      <div style={{ 
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
        background: '#050505', zIndex: 0 
      }} />

      {/* scrolling sidebar */}
      <div style={{
        position: 'fixed', left: '40px', top: '15%', bottom: '15%',
        width: '2px', background: 'rgba(255,255,255,0.1)', zIndex: 100,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* "current" overlay" */}
        <div style={{
          position: 'absolute', 
          top: 0, 
          width: '100%', 
          height: `${(activeSection / (projectList.length - 1)) * 100}%`,
          background: 'linear-gradient(to bottom, transparent, #4d4dff)',
          boxShadow: '0 0 15px #4d4dff, 0 0 45px rgba(77, 77, 255, 0.5)',
          transition: 'height 0.4s ease-out',
          opacity: 0.8
        }} />

        {projectList.map((proj, i) => (
          <div key={i} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {/* current node */}
            <div style={{
              width: '12px', height: '12px', borderRadius: '50%',
              background: activeSection >= i ? '#4d4dff' : '#222',
              boxShadow: activeSection >= i ? '0 0 15px #4d4dff' : 'none',
              transition: 'all 0.4s ease', zIndex: 2, border: '2px solid #050505'
            }} />
            
            {/* label */}
            <span style={{
              position: 'absolute', left: '25px', whiteSpace: 'nowrap',
              fontFamily: 'monospace', fontSize: '12px',
              color: activeSection === i ? '#fff' : '#444',
              transition: 'all 0.4s ease',
              textTransform: 'uppercase', letterSpacing: '2px'
            }}>
              {proj.title}
            </span>
          </div>
        ))}
      </div>

      <div 
        className="no-scrollbar"
        onScroll={handleScroll}
        ref={scrollContainerRef}
        style={{ 
          position: 'absolute', top: 0, left: 0, 
          width: '100%', height: '100%', zIndex: 10, 
          overflowY: 'scroll', scrollSnapType: 'y mandatory', scrollBehavior: 'smooth'
        }}
      >

        <div style={{ height: '100vh', scrollSnapAlign: 'start', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
           <h1 style={{ fontSize: '5vw', color: 'white', textAlign: 'center' }}>
             Make a good intro
           </h1>
        </div>

        {/* project sections */}
        <div style={{ scrollSnapAlign: 'start' }}>
          <ProjectSection title="Project 1" align="left" background="transparent" />
        </div>
        <div style={{ scrollSnapAlign: 'start' }}>
          <ProjectSection title="Project 2" align="right" background="transparent" />
        </div>
        <div style={{ scrollSnapAlign: 'start' }}>
          <ProjectSection title="Project 3" align="left" background="transparent" />
        </div>

        {/* footer */}
        <div style={{ height: '50vh', scrollSnapAlign: 'start', background: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        </div>
      </div>
    </>
  );
}