import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: true, // Permite qualquer domínio
    host: true, // Garante que o servidor escute em 0.0.0.0 (necessário para Docker/Easypanel)
    port: 80 // Porta que o Easypanel espera
  },
  server: {
    allowedHosts: true,
    host: true
  }
})