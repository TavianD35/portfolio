{/*
Filename: Contact.jsx
Author: Tavian Dodd
Date Created: 02/01/2026
Last Updated: 02/05/2026
*/}

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const socialButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#eee',
    textDecoration: 'none',
    border: '1px solid #333',
    padding: '12px 20px',
    flex: 1,
    transition: 'all 0.3s ease',
    background: 'rgba(255, 255, 255, 0.02)',
    fontFamily: 'monospace',
    fontSize: '0.9rem'
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText("taviand35@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [formData, setFormData] = useState({
    sender_name: '',
    email_address: '',
    message_body: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 'idle', 'sending', or 'success'
  const [status, setStatus] = useState('idle');

  const validateForm = () => {
    // check if any fields are empty
    if (!formData.sender_name.trim() || !formData.email_address.trim() || !formData.message_body.trim()) {
      alert("SYSTEM ERROR: All fields must be populated before transmission.");
      return false;
    }

    // validate email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email_address)) {
      alert("SYSTEM ERROR: Invalid email_address format detected.");
      return false;
    }

    return true;
  };

  const handleSend = () => {
    // run validation checks first
    if (!validateForm()) return;

    setStatus('sending');

    const serviceId = 'service_y3hmzpa';
    const templateId = 'template_0r6r56a';
    const publicKey = 'sTbtXetdoXnKADPmh';

    emailjs.send(serviceId, templateId, formData, publicKey)
    .then((response) => {
      setFormData({
        sender_name: '',
        email_address: '',
        message_body: ''
      });
      
      setStatus('success');

      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    })
    .catch((err) => {
      console.error('FAILED...', err);
      alert("CRITICAL ERROR: Transmission failed.");
      setStatus('idle');
    });
  };

  return (
    
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      background: '#111',
      color: '#eee',
      padding: '100px 10vw',
      boxSizing: 'border-box',
      fontFamily: 'monospace'
    }}>

      <style>
  {`
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus {
      -webkit-text-fill-color: #eee !important;
      -webkit-box-shadow: 0 0 0px 1000px #000 inset !important;
      transition: background-color 5000s ease-in-out 0s;
    }
  `}
</style>

    {/* background image */}
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 10,
      backgroundImage: 'url(' + import.meta.env.BASE_URL + '/images/CodeBackground.png' + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity: 0.1,
      filter:  'grayscale(35%) blur(3px)',
      transform: 'rotate(-3deg) scale(1.1)',
      pointerEvents: 'none'
    }} />

      {/* header */}
      <div style={{ position: 'relative', zIndex: 20}}>
        <div style={{ marginBottom: '40px', borderBottom: '1px solid #4d4dff', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{'>'} contact_me</h1>
          <p style={{ color: '#4d4dff' }}>
              Status: <span style={{ color: '#007500', fontWeight: 'bold' }}>ONLINE</span> // Location: Cookeville, TN
          </p>
        </div>

        {/* main grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: window.innerWidth > 900 ? '1.2fr 1fr' : '1fr', 
          gap: '50px' 
        }}>
          
          {/* left column: contact form */}
          <div style={{ border: '1px solid #333', padding: '20px', background: '#0d0d0d', minHeight: '380px' }}>
            <h3 style={{ color: '#4d4dff', marginTop: 0 }}>// Send Message</h3>
            
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <h3 style={{ color: '#007500', fontFamily: 'monospace' }}>{'>'} MESSAGE_TRANSMITTED_SUCCESSFULLY</h3>
                <p style={{ color: '#eee', fontSize: '0.9rem', marginBottom: '20px' }}>System: Response recorded!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                  name ="sender_name" 
                  value={formData.sender_name}
                  onChange={handleInputChange}
                  placeholder='sender_name'
                  disabled={status === 'sending'}
                  style={{ 
                    background: '#000', 
                    border: '1px solid #333', 
                    padding: '12px', 
                    color: '#fff', 
                    fontFamily: 'monospace',
                    outline: 'none',
                    opacity: status === 'sending' ? 0.5 : 1
                  }} 
                />
                <input 
                  name ="email_address" 
                  value={formData.email_address}
                  onChange={handleInputChange}
                  placeholder="email_address" 
                  disabled={status === 'sending'}
                  style={{ 
                    background: '#000', 
                    border: '1px solid #333', 
                    padding: '12px', 
                    color: '#fff', 
                    fontFamily: 'monospace',
                    outline: 'none',
                    opacity: status === 'sending' ? 0.5 : 1
                  }} 
                />
                <textarea
                  name ="message_body" 
                  value={formData.message_body}
                  onChange={handleInputChange}
                  placeholder="message_body" 
                  disabled={status === 'sending'}
                  style={{ 
                    background: '#000', 
                    border: '1px solid #333', 
                    padding: '12px', 
                    color: '#fff', 
                    fontFamily: 'monospace', 
                    minHeight: '150px',
                    outline: 'none',
                    resize: 'vertical',
                    opacity: status === 'sending' ? 0.5 : 1
                  }} 
                />
                <button
                  onClick={handleSend}
                  disabled={status === 'sending'}
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    boxSizing: 'border-box',
                    background: status === 'sending' ? '#111' : '#3131fb', 
                    color: '#000', 
                    border: 'none', 
                    padding: '12px', 
                    fontWeight: 'bold',
                    fontSize: '18px', 
                    fontFamily: 'monospace',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (status !== 'sending') {
                      e.currentTarget.style.background = '#3131fb';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(173, 173, 173, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (status !== 'sending') {
                      e.currentTarget.style.background = '#3131fb';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {status === 'sending' ? 'TRANSMITTING...' : 'Send'}
                </button>
              </div>
            )}
          </div>

          {/* right column: email copy, download resume, social links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* email copy */}
            <div style={{ border: '1px solid #333', padding: '20px', background: '#0d0d0d' }}>
              <h3 style={{ color: '#4d4dff', marginTop: 0 }}>// Direct Contact</h3>
              <button 
                onClick={copyToClipboard}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  width: '100%',
                  boxSizing: 'border-box', 
                  background: '#3131fb', 
                  color: '#000', 
                  border: 'none',
                  padding: '12px', 
                  fontWeight: 'bold',
                  fontSize: '18px',
                  fontFamily: 'monospace',
                  cursor: 'pointer', 
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#3131fb';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(173, 173, 173, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#3131fb';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {copied ? "Email Copied to Clipboard" : "Copy Email"}
              </button>
            </div>

            {/* donwload resume button*/}
            <div style={{ border: '1px solid #333', padding: '20px', background: '#0d0d0d' }}>
              <h3 style={{ color: '#4d4dff', marginTop: 0 }}>// Resume</h3>
              <a 
                href="/your-resume-file.pdf" 
                download="Tavian_Resume.pdf"
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  width: '100%',
                  boxSizing: 'border-box', 
                  background: '#3131fb', 
                  color: '#000', 
                  padding: '12px', 
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  fontFamily: 'monospace',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#3131fb';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(173, 173, 173, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#3131fb';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </a>
            </div>

            {/* social links */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',     
              gap: '40px',             
              width: '100%',           
              marginTop: '30px',       
              padding: '20px 0'         
            }}>
              {/* GitHub */}
              <a 
                href="https://github.com/TavianD35" 
                target="_blank" 
                rel="noreferrer"
                style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector('svg').style.color = '#6cc644';
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector('svg').style.color = '#888';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#888', transition: 'color 0.3s ease' }}>
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.805.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com/in/tavian-dodd" 
                target="_blank" 
                rel="noreferrer"
                style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector('svg').style.color = '#0a66c2';
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector('svg').style.color = '#888';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#888', transition: 'color 0.3s ease' }}>
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}