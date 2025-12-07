import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // bind to all addresses so the dev server is reachable from the browser
    host: true,
    port: 5173,
    // explicit HMR options can help when automatic websocket URL detection fails
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    }
  }
})
