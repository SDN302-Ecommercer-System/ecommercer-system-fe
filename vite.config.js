import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://my.sepay.vn',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/userapi'),
      },
      '/hunter-api': {
        target: 'https://api.hunter.io',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/hunter-api/, '/v2/email-verifier'),
      }
    },
  },
});
