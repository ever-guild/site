import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { resetBrowserCache } from './cacheReset'
import './styles/_reset.scss'

const scheduleCacheReset = () => {
  const reset = () => {
    void resetBrowserCache(__APP_BUILD_ID__)
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(reset, { timeout: 2500 })
    return
  }

  globalThis.setTimeout(reset, 1200)
}

scheduleCacheReset()

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
