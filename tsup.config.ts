import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'index': 'src/main.ts',
    'bin/sprite': 'src/cli/main.ts',
  },
  splitting: false,
  treeshake: 'recommended',
  sourcemap: false,
  clean: true,
  dts: true,
  format: ['esm'],
  skipNodeModulesBundle: true,
  watch: false,
  target: 'node18',
  outDir: 'dist',
});
