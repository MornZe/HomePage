import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    __BUILD_INFO__: JSON.stringify({
      branch: process.env.VERCEL_GIT_COMMIT_REF || 'dev',
      commitSha: process.env.VERCEL_GIT_COMMIT_SHA || 'main'
    })
  }
})
