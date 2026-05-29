import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    transformer: 'postcss',
  },
  build: {
    sourcemap: false,
    assetsInlineLimit: 0,
    cssTarget: 'chrome120',
    cssMinify: false,
    chunkSizeWarningLimit: 950,
  },
  plugins: [
    react(),
  ]
})
