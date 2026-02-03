{/*
Filename: main.jsx
Author: Tavian Dodd
Date Created: 01/15/2026
Last Updated: 02/01/2026
*/}

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
