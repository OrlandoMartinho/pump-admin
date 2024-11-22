import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Isso permite acessar o servidor no seu IP local
    port: 3001,       // Substitua 3001 pela porta desejada
  },
});
