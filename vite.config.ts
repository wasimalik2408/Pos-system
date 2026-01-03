import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist', // explicitly tell Vite to put build here
    emptyOutDir: true, // clean the dist folder before build
  },
  publicDir: 'public', // ensures _redirects file is copied to dist
});
