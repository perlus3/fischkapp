import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import imagePlugin from '@rollup/plugin-image';


export default defineConfig({
  base: '/fischkapp/',

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

