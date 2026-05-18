// Configuración Vite — opcional para una build aún más optimizada.
// Vite minifica HTML/CSS/JS, hashea referencias y genera /dist listo
// para subir a Vercel. El despliegue también funciona sin Vite,
// subiendo la carpeta tal cual (la optimización principal ya está
// en los JPEGs comprimidos).
//
// Uso (cuando tengas Node/npm globales):
//   npm install
//   npm run build        → genera /dist optimizado
//   npm run preview      → sirve /dist localmente para probar

import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: false,   // las imágenes en /images se procesan como assets de la HTML
  base: './',         // rutas relativas: funciona también desde subdirectorio
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false,
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  server: { port: 5500, open: true, host: true },
  preview: { port: 5500 },
});
