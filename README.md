# Todo

- Add NPM token to 1password
- Enable github action write permission in workflow syntax
- Add Prettier to devdependencies
- How to set node version engines?
- Verify using publint.dev
- #!/bin/env node is being removed from the icon-sprite file
- Make sure to test loading the config in a monorepo. IS the cwd of a subdir when called from that packagejson?
- Referencing SVGs section needs an aria attribute (hidden or presentation? or something else)
- SideEffects false in package.json?
- Run integration tests against playground, which load the package using file:../
- Do I need a peer dependency on Typescript? How to specify typescript version?

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

## Installation

```bash
npm install -D icon-sprite
```

## Usage

At the moment, the package is intended to be used inside a custom node script file, though
could also be used in a build process. In addition to the documentation below, the repo
contains a demo folder for reference.

### Exports

The package exports two functions. One to build the icon sprite as a string, and one to
export it to a file:

```javascript
import { buildSprite, exportSpriteToFile } from 'icon-sprite';

const sprite = await buildSprite('absolute-path-to-folder-containing-icons');
exportSpriteToFile(sprite, 'absolute-path-to-file.svg');

// Directory of sprite file and input icons cannot be the same, as
// buildSprite imports all svgs from the folder.
```

### Script Example

#### `Folder Structure:`

```
src
  assets
    icons
      source

scripts
  icon-sprite.ts|js

package.json
```

#### `icon-sprite.ts|js:`

```javascript
import path from 'path';
import { buildSprite, exportSpriteToFile } from 'icon-sprite';

const sourceFolderPath = path.resolve(__dirname, '../src/assets/icons/source');
const spriteFilePath = path.resolve(
  __dirname,
  '../src/assets/icons/icon-sprite.svg',
);

const spriteString = await buildSprite(sourceFolderPath);

exportSpriteToFile(spriteString, spriteFilePath);
```

#### `package.json`

I'm using @digitak/esrun instead of ts-node. Standard js file with
node command is also fine.

```json
{
  "scripts": {
    "icon-sprite": "esrun ./scripts/icon-sprite.ts"
  }
}
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
    ... other icons converted to <symbol>
  </defs>
</svg>
```

### Referencing SVGs

```html
<svg><use href="path-to-sprite-file.svg#up-arrow"></use></svg>
```
