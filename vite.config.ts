import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    include: ['metaapp-pandora-sdk']
  }
})
