import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: './', 
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    },
    preview: {
      allowedHosts: true,
      host: true, // 0.0.0.0
      port: 3000
    },
    server: {
      allowedHosts: true,
      host: true, // 0.0.0.0
      port: 3000
    }
  }
})