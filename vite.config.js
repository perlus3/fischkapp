import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    // Dodaj obsługę TypeScriptu
    jsxFactory: 'React.createElement',
    jsxInject: `import React from 'react'`,
  },
  css: {
    // Dodaj obsługę modułów CSS
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
