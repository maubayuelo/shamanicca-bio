// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/bioIG/', // Set the base path to match the deployment folder
  build: {
    //outDir: "../bio",
  },
  css: {
    postcss: 'postcss.config.js',
    preprocessorOptions: {
      scss: {
        //additionalData: `@use "./src/styles/_main.scss";`,
      },
    },
  },
  server: {
    proxy: {
      "/wp-json": {
        //target: "https://shamanicca.com/cms", // Your WordPress API URL
        //changeOrigin: true,
        //secure: false,
      },
    },
  },
});
