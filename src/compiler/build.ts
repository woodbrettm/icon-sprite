import type {
  BuildConfig,
  BuildOutput,
  BuildContext,
} from '../types';

import consola from 'consola';

import { defineMeta } from '../context/meta';
import { resolveConfig } from './config';
import { resolveJobSpecs } from './spec';
import { runJob } from './job';

import {
  callSetupHook,
  callCleanupHook,
} from './hooks';

export async function build
(
  config: BuildConfig,
)
: Promise<BuildOutput>
{
  if (config.logging === 'normal') {
    consola.start('Starting Sprite Build');
  }

  const resolvedConfig = await resolveConfig(config);
  const context = createBuildContext();

  await callSetupHook(resolvedConfig, context);

  const jobs = await resolveJobSpecs(
    resolvedConfig.jobSpec,
    { cwd: resolvedConfig.cwd }
  );

  const buildOutput: BuildOutput = new Map();

  for (const job of jobs) {
    const jobOutput = await runJob(job, resolvedConfig, context)
    buildOutput.set(jobOutput[0].name, jobOutput);
  }

  await callCleanupHook(resolvedConfig, context);

  if (resolvedConfig.logging === 'normal') {
    consola.success('Sprite Build Complete');
  }

  return buildOutput;
}

function createBuildContext
()
: BuildContext
{
  return Object.freeze({
    meta: defineMeta({}),
  });
}
