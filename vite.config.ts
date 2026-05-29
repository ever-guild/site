import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const faviconURL = '/favicon.png'



// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 950,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      selfDestroying: true,
      includeAssets: [faviconURL],
      manifest: {
        name: 'Ever Guild',
        short_name: 'Ever Guild',
        description: 'Senior-led software engineering guild for Web3, AI, full-stack delivery, technical audits and crisis support.',
        theme_color: '#001D25',
        background_color: '#001D25',
        icons: [
          {
            src: faviconURL,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
    })
  ]
})
