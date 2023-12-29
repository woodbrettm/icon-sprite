import { defineConfig } from 'icon-sprite';

export default defineConfig({
  jobSpec: {
    name: 'main',
    inputMatch: 'icons/*.svg',
    outputFile: 'icons/icon-sprite.svg',
    inputIgnore: 'icon-sprite.svg',
  },
})
