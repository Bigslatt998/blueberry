import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
   server:{
    host: true,
    headers: {
      "content-type": "text/javascript",

    }
  },
   build: {
    assetsDir: 'assets',
  },
})

