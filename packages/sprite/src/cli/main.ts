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
    name: 'iconsprite',
    description: 'Icon Sprite CLI',
    version: packageJson.version,
  },
  async run({ args }) {
    console.log('MAIN');
    console.log(this);
    if (args._[0] !== 'build') {
      await showUsage(this);
    }
    console.log('ROOT');
    console.log(args);

  },
  subCommands: {
    build,
  },
});

await runMain(main);
