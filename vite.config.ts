import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'node:child_process'

function buildId() {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA
  if (process.env.VERCEL_GIT_COMMIT_SHA) return process.env.VERCEL_GIT_COMMIT_SHA

  try {
    return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim()
  } catch {
    return new Date().toISOString()
  }
}

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
  ],
  define: {
    __APP_BUILD_ID__: JSON.stringify(buildId()),
  },
})
