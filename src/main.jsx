{/*
Filename: main.jsx
Author: Tavian Dodd
Date Created: 01/15/2026
Last Updated: 01/15/2026
*/}

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // <--- IMPORT THIS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <--- WRAP APP HERE */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
