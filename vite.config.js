import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '',
  css: {
    postcss: './postcss.config.js'
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        autoridades: resolve(__dirname, 'autoridades.html'),
        servicios: resolve(__dirname, 'servicios.html'),
        proyectos: resolve(__dirname, 'proyectos.html'),
        noticias: resolve(__dirname, 'noticias.html'),
        galeria: resolve(__dirname, 'galeria.html'),
        transparencia: resolve(__dirname, 'transparencia.html'),
        contacto: resolve(__dirname, 'contacto.html'),
        login: resolve(__dirname, 'login.html')
      }
    }
  },
  server: {
    port: 3000,
    hot: true
  }
})