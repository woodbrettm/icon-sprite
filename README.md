# Icon Sprite

[![npm](https://img.shields.io/npm/v/icon-sprite)](https://www.npmjs.com/package/icon-sprite)
[![Github Actions](https://github.com/woodbrettm/icon-sprite/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/woodbrettm/icon-sprite/actions/workflows/tests.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/woodbrettm/icon-sprite/blob/main/LICENSE)

This package contains functions which allow a dev to build an icon sprite from a folder of svg icons
and export it to a single icon sprite svg file.

- Best used inside an npm script for now.
- The majority of the original icons' SVG code is kept intact, so it's up to the dev to format
  the original icon files. (See below).
- The svg file name is used to create the symbol id. So a filename of `up-arrow` can be referenced
  in html using `#up-arrow`. (See below).

## Usage

In addition to the documentation below, the repo contains a `demo` folder for reference, as well as a usage
example generating the demo content in the `scripts` folder.

### Functions

```javascript
import { buildSprite, exportSpriteToFile } from 'icon-sprite';

const spriteString = buildSprite('path-to-icons-folder');

exportSpriteToFile(spriteString, 'path-to-sprite-file.svg');
// The sprite must NOT be exported to the same folder as the source icons,
// as buildSprite() imports ALL svgs from the 'path-to-icons-folder'.
```

### SVG Code

When combining the svg files,

- The `xmlns` attribute is removed
- `<svg></svg>` is replaced with `<symbol></symbol>`
- The svg file-name is added to the symbol as: `id="file-name"`

The source/original icon svgs must be formatted like so:

- It's typically best to remove the height and width attributes so the svg can
  be sized from CSS.
- Make sure the `xmlns` attr is exactly `xmlns="http://www.w3.org/2000/svg`
- Other elements than `<path>` inside the svg should be fine

### Input:

```xml
<!-- Original icon file: up-arrow.svg -->
<!-- Setting fill="currentColor" is often useful -->
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <path
    d="..."
    fill="..."
    other-attr="..."
  />
</svg>
```

### Output:

The outputted file is formatted using Prettier.

```xml
<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <symbol id="up-arrow" viewBox="0 0 32 32">
      <path
        d="..."
        fill="..."
        other-attr="..."
      />
    </symbol>
  </defs>
</svg>
```

### Referencing SVGs

The svg `icon-sprite.svg` file needs to be imported into the html file
first. Once done, each icon in the sprite can be referenced like so:

```html
<svg><use href="path-to-sprite-file.svg#up-arrow"></use></svg>
```
