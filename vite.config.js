import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/bio/',  // Set base path to '/bio/'
  css: {
    postcss: 'postcss.config.js',
    preprocessorOptions: {
      scss: {
        //additionalData: `@use "./src/styles/_main.scss";`,
      },
    },
  },
});
