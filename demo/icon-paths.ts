import path from 'path';

const DEMO_ICONS = {
  sourceFolder: path.resolve(__dirname, './icons'),
  spriteFile: path.resolve(__dirname, './icon-sprite.svg'),
} as const;

export { DEMO_ICONS };
