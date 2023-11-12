import { buildSprite, exportSpriteToFile } from '../src/index';
import { DEMO_ICONS } from './icon-paths';

const sprite = await buildSprite(DEMO_ICONS.sourceFolder);
exportSpriteToFile(sprite, DEMO_ICONS.spriteFile);
