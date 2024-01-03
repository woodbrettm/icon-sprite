import { defineConfig } from 'icon-sprite';

export default defineConfig({
  jobSpec: {
    name: 'main',
    inputMatch: 'icons/*.svg',
    outputFile: 'icons/icon-sprite.svg',
    inputIgnore: 'icon-sprite.svg',
  },
  plugins: [
    {
      name: 'My Cool Plugin',
      spriteHeader(header: string) {
        return header += '<h1>Oooga</h1>';
      },
    }
  ],
})

{
  spriteHeader: [
    {
      pluginName: 'My Cool Plugin',
      name: 'spriteHeader',
      func: (header)
    },

  ]
}
