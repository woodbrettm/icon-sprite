import { defineCommand } from 'citty';
import { loadWorkspaceConfig } from '../compiler/config';

export const build = defineCommand({
  meta: {
    name: 'build',
    description: 'Builds icon sprite using input and output args.'
  },
  args: {
    input: {
      type: 'string',
      description: 'Glob pattern for matching inputs, relative to cwd.',
      required: false,
      alias: 'i',
    },
    output: {
      type: 'string',
      description: 'Output filepath including .svg extension, relative to cwd.',
      required: false,
      alias: 'o',
    },
    config: {
      type: 'string',
      description: 'Path to js/ts config file, without file extension, relative to cwd.',
      required: false,
      alias: 'c',
    },
    cwd: {
      type: 'string',
      description: 'Set the working dir, absolute path or relative to process.cwd().',
      required: false,
    },
    name: {
      type: 'string',
      description: 'Job name that shows up in console.',
      required: false,
    },
    ignore: {
      type: 'string',
      description: 'Glob pattern to ignore inputs.',
      required: false,
    },
    silent: {
      type: 'boolean',
      description: 'Only output error logs.',
      required: false,
      default: false,
    },
  },
  async run({ args: parsedArgs }) {

    const workspaceConfig = await loadWorkspaceConfig();
    console.log(workspaceConfig);
  },
})
