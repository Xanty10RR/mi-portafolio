// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  outDir: 'dist', // 👈 aquí va la carpeta de salida para Netlify
  base: '/',      // 👈 opcional, sirve para rutas
});