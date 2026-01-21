{/*
Filename: main.jsx
Author: Tavian Dodd
Date Created: 01/15/2026
Last Updated: 01/15/2026
*/}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
