#!/bin/env node

import { defineCommand, runMain, showUsage } from 'citty';

import packageJson from '../../package.json' with { type: 'json' };
import { build } from './build';

/*

  cli:
    process cli config
    load environment config
    merge both
    call build

  jsApi:
    take the final config, which must match the
*/

// sprite --version
// sprite shows usage
// sprite --help shows usage
// sprite build --help shows usage

const main = defineCommand ({
  meta: {
    name: 'sprite',
    description: 'Icon Sprite CLI',
    version: packageJson.version,
  },
  async run() {
    await runRoot();
  },
  subCommands: {
    build,
  },
});

await runMain(main);

async function runRoot() {
  await showUsage(main);
}
