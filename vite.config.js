import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './src/pages/index.html',
        autoridades: './src/pages/autoridades.html',
        contacto: './src/pages/contacto.html',
        galeria: './src/pages/galeria.html',
        turismo: './src/pages/turismo.html',
        login: './src/pages/login.html',
        noticias: './src/pages/noticias/index.html',
        noticiasDetalle: './src/pages/noticias/detalle-noticia.html',
        noticiasArchivo: './src/pages/noticias/archivo.html',
        proyectos: './src/pages/proyectos/index.html',
        proyectosArchivo: './src/pages/proyectos/archivo.html',
        servicios: './src/pages/servicios/index.html',
        serviciosConsultas: './src/pages/servicios/consultas.html',
        serviciosPagos: './src/pages/servicios/pagos.html',
        serviciosTramites: './src/pages/servicios/tramites.html',
        transparencia: './src/pages/transparencia/index.html',
        transparenciaDocumentos: './src/pages/transparencia/documentos.html',
        transparenciaRendicion: './src/pages/transparencia/rendicion-cuentas.html'
      }
    }
  },
  server: {
    port: 3000,
    open: '/pages/index.html'
  }
});