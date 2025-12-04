import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    // Garante que o build use caminhos relativos, evitando tela branca se não estiver na raiz
    base: './', 
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY)
    },
    preview: {
      allowedHosts: true,
      host: true,
      port: 3000 // Alinhado com o padrão do Easypanel/Nixpacks
    },
    server: {
      allowedHosts: true,
      host: true,
      port: 3000 // Alinhado para desenvolvimento local também
    }
  }
})