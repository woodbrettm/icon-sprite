import type { ResolvedConfig, BuildConfig_FnResolved, BuildContext, Job } from '../types';

import { klona } from 'klona';

// TODO: Combine into single call Hook Function

export async function callConfigHook
(
  config: BuildConfig_FnResolved,
)
: Promise<void>
{
  if (config.hooks?.config) {
    await config.hooks.config(config)
  }
}

export async function callSetupHook
(
  config: ResolvedConfig,
  context: BuildContext,
)
: Promise<void>
{
  if (config.hooks?.setup) {
    await config.hooks.setup(klona(config), context);
  }
}

// Expects returned string to replace internal header string
export async function callHeaderHook
(
  header: string,
  config: ResolvedConfig,
  context: BuildContext,
)
: Promise<string | undefined>
{
  if (!config.hooks?.header) return;
  const updatedHeader = await
    config.hooks.header(header, context);
  if (!updatedHeader || typeof updatedHeader !== 'string') return;
  return updatedHeader;
}

export async function callJobStartHook
(
  job: Job,
  config: ResolvedConfig,
  context: BuildContext,
)
: Promise<void>
{
  if (config.hooks?.jobStart) {
    await config.hooks.jobStart(job, context);
  }
}

export async function callTransformIconHook() {

}

export async function callFooterHook() {

}

export async function callFinalizeHook() {

}

export async function callParseHook() {

}

export async function callPrettifyHook() {

}

export async function callWriteFileHook() {

}

export async function callBuildEndHook() {

}

export async function callCleanupHook
(
  config: ResolvedConfig,
  context: BuildContext,
)
: Promise<void>
{
  if (config.hooks?.cleanup) {
    await config.hooks.cleanup(context);
  }
}
