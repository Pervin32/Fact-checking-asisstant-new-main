import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // 'src' qovluğuna yönləndirmə
    }
  },
  server: {
    proxy: {
      '/factcheck': {
        target: 'https://fact-checking-assistant.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/factcheck/, '')
      }
    }
  }
});
