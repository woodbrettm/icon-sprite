import { demoIconPaths } from '../demo/demo-config.js';
import { buildSprite, exportSpriteToFile } from '../src/index.js';

const sprite = await buildSprite(demoIconPaths.sourceFolder);
exportSpriteToFile(sprite, demoIconPaths.spriteFile);
