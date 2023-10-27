/// <reference types="vitest" />

import { resolve } from 'path';
import { defineConfig } from 'vite';
import vitePluginTypeGen from 'vite-plugin-dts';

import packageConfig from './package.json';

export default defineConfig({
  build: {
    minify: false,
    sourcemap: false,
    outDir: 'dist',
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'IconSprite',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [...Object.keys(packageConfig.dependencies), 'fs', 'path'],
    },
  },
  test: {
    include: ['**/*.test.ts'],
    coverage: {
      provider: 'v8',
    },
  },
  plugins: [
    vitePluginTypeGen({
      include: ['src/**/*.ts'],
      exclude: ['**/*.test.ts'],
    }),
  ],
});
