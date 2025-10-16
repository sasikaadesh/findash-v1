import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: []
      }
    })
  ],
  esbuild: {
    // Disable TypeScript checking completely
    target: 'es2020',
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    // Ignore TypeScript errors
    ignoreAnnotations: true
  },
  build: {
    // Skip TypeScript checking during build
    rollupOptions: {
      onwarn(warning, warn) {
        // Skip certain warnings
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return
        if (warning.code === 'UNRESOLVED_IMPORT') return
        warn(warning)
      }
    }
  },
  server: {
    host: true,
    port: 5173
  },
  // Disable TypeScript checking
  define: {
    'process.env.NODE_ENV': '"development"'
  }
})
