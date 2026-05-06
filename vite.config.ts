import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // Serve index.html for all routes in dev (SPA mode)
    historyApiFallback: true,
  },
  preview: {
    // Same for vite preview
    port: 4173,
  },
});
