import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import imagePlugin from '@rollup/plugin-image';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), imagePlugin()],
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxInject: `import React from 'react'`,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
