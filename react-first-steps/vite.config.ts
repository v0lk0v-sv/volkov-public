// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig as defineViteConfig, mergeConfig } from 'vite';

// https://stackoverflow.com/a/30106551
function toBinary(str: string): string {
  const codeUnits = new Uint16Array(str.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = str.charCodeAt(i);
  }
  return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
}

// https://vitejs.dev/config/
const viteConfig = defineViteConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      api: path.resolve(__dirname, 'src/api'),
      apps: path.resolve(__dirname, 'src/apps'),
      components: path.resolve(__dirname, 'src/components'),
      features: path.resolve(__dirname, 'src/features'),
      lib: path.resolve(__dirname, 'src/lib'),
      pages: path.resolve(__dirname, 'src/pages'),
      stores: path.resolve(__dirname, 'src/stores'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
  build: {
    reportCompressedSize: false,
  },
  esbuild: {
    legalComments: 'none',
  },
  css: {
    modules: {
      // header-module_root__<hash> -- can't get rid of -module
      // generateScopedName: '[name]_[local]__[hash:base64:5]',

      generateScopedName: (name, filename, css) => {
        const file = path.basename(filename.split('?')[0], '.module.css');

        return file.charAt(0).toUpperCase() + file.slice(1) + '_' + name + '_' + toBinary(css).slice(0, 4);
      },
    },
  },
  base: './',
});


export default mergeConfig(viteConfig, {});
