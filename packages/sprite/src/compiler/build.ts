import type {
  BuildConfig,
  BuildOutput,
} from '../types';

import consola from 'consola';

import { resolveConfig } from './config';
import { resolveJobSpecs } from './spec';
import { runJob } from './job';
import { initPluginContext } from '../plugin/context';

import {
  callSetupHooks,
  callTeardownHooks,
  initHookRegistry,
  registerBuildHooks,
} from '../plugin/hooks';

export async function build
(
  configArg: BuildConfig,
)
: Promise<BuildOutput>
{
  if (configArg.logging === 'normal') {
    consola.start('Starting Icon Sprite Build...');
  }

  const hookRegistry = initHookRegistry();
  const config = await resolveConfig(hookRegistry, configArg);

  registerBuildHooks(hookRegistry, config);

  const pluginContext = initPluginContext({
    workDir: config.workDir,
    formatting: config.formatting,
  });

  await callSetupHooks(hookRegistry, pluginContext, config);

  const jobs = await resolveJobSpecs(
    config.jobSpec,
    { workDir: config.workDir }
  );

  const buildOutput: BuildOutput = new Map();

  for (const job of jobs) {
    const jobOutput = await runJob(job, config, context)
    buildOutput.set(jobOutput[0].name, jobOutput);
  }

  await callTeardownHooks(hookRegistry, context);

  if (config.logging === 'normal') {
    consola.success('Sprite Build Complete');
  }

  return buildOutput;
}
