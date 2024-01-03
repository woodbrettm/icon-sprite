import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'lib/main': 'exports/main.ts',
    'bin/iconsprite': 'exports/cli.ts',
  },
  splitting: false,
  treeshake: 'recommended',
  sourcemap: true,
  dts: true,
  format: ['esm'],
  skipNodeModulesBundle: true,
  watch: false,
  clean: true,
  target: 'node18',
  outDir: 'build',
});
