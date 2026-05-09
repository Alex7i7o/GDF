// vite.config.js
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/GDF/', 
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        campamento: resolve(__dirname, 'campamento.html'),
        nosotros: resolve(__dirname, 'nosotros.html'),
        blog: resolve(__dirname, 'blog.html'),
        plantilla: resolve(__dirname, 'Plantilla.html'),
      }
    }
  }
})