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
      '/api': {
        target: 'https://fact-checking-assistant.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('proxy error', err);
          });
        }
      }
    }
  }
});
