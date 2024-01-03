import type {
  BuildContext,
  Job,
  JobOutput,
  ResolvedConfig
} from '../types';

import { consola } from 'consola';

import {
  callHeaderHook,
  callJobStartHook,
} from '../compiler/hooks'

export async function runJob
(
  job: Readonly<Job>,
  config: ResolvedConfig,
  context: BuildContext,
)
: Promise<JobOutput>
{
  if (config.logging === 'normal') {
    consola.info(`Running Job: ${job.name}`);
  }

  await callJobStartHook(job, config, context);

  let spriteContent = '';

  spriteContent += await spriteHeader(config, context);
}

async function spriteHeader
(
  config: ResolvedConfig,
  context: BuildContext,
)
: Promise<string>
{
  const initialHeader = `<svg xmlns="http://www.w3.org/2000/svg"><defs>`;
  const headerHookRes = await callHeaderHook(initialHeader, config, context);
  return headerHookRes ?? initialHeader;
}


/* Make sure to create a directory for the output file if it doesn't exist.
fs.mkdir() apparently has a { recursive: true } option, but to run mkdir do
I need to separate the filename from the path?
*/


// function loadIcon
// (

// )
// {

// }

// function svgToSymbol
// (
  
// )

// function genSymbolId() {
  
// }
