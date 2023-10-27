import { expect, test } from 'vitest';

import { demoIconPaths, demoSpriteString } from '../demo/demo-config';
import { buildSprite } from './index.ts';

test('buildSprite Outputs Correct SVG String', async () => {
  const builtSprite = await buildSprite(demoIconPaths.sourceFolder);
  expect(builtSprite).toEqual(demoSpriteString);
});
