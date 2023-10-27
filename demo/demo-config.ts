import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const demoIconPaths = {
  sourceFolder: path.resolve(__dirname, './source'),
  spriteFile: path.resolve(__dirname, './icon-sprite.svg'),
};

const demoSpriteString = fs.readFileSync(demoIconPaths.spriteFile, 'utf8');
export { demoIconPaths, demoSpriteString };
