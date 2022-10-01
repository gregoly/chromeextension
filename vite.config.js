import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { chromeExtension } from 'vite-plugin-chrome-extension';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: 'src/manifest.json',
      output: {
        // manualChunks: () => 'app',
      }
    },
  },
  plugins: [vue(), chromeExtension(), cssInjectedByJsPlugin()],
});
