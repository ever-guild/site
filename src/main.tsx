import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { resetBrowserCache } from './cacheReset'
import './styles/_reset.scss'

void resetBrowserCache(__APP_BUILD_ID__)

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
