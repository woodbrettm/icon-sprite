import type { Log } from '#logger/types.ts';
import type { LogFunctionArgs } from '#logger/types.ts';
import type { BuildConfig } from './config/types.ts';
import type { DefBuildConfig } from './config/types.def.ts';
import type { BuildContext } from './types.ts';

import { R } from '#vendor/remeda/main.ts';
import { prepLogFromErr } from '#utils/main.ts';
import { log } from '#logger/main.ts';
import { scaffoldLoggingContext } from '#logger/main.ts';
import { scaffoldHookBuildContext } from './hook/main.ts';
import { scaffoldHookPipes } from './hook/main.ts';
import { scaffoldBuildConfig } from './config/main.ts';
import { runJobs } from './job/main.ts';


export async function buildSprite
(configArg: DefBuildConfig)
{
  const initialLogs: Log[] = [];
  let config: BuildConfig | undefined;
  let ctx: BuildContext | undefined;

  try {
    config = await scaffoldBuildConfig(configArg);
    ctx = scaffoldBuildContext(config);

  } catch(error) {
    if (R.isError(error)) {
      // initialLogs.push
      // logToConsole
      // See if possible to use logging settings
      // from config
    }
    throw error;
  }

  try {
    ctx.hooks.configFinalized.call(config)
    ctx.hooks.buildStart.call();
    runJobs(config.jobs, ctx);
    ctx.hooks.buildEnd.call();

  } catch(error) {
    ctx.log(prepLogFromErr(error));
    throw error;
  }
}

export function scaffoldBuildContext
(config: BuildConfig)
: BuildContext
{
  const loggingCtx = scaffoldLoggingContext(config);
  const buildCtx: BuildContext = {
    root: config.root,
    hooks: scaffoldHookPipes(config),
    loggingCtx: loggingCtx,
    hookCtx: scaffoldHookBuildContext(config, loggingCtx),
    log: buildContextLogWrapper,
  };
  return buildCtx;
}

export async function buildContextLogWrapper
(this: BuildContext, args: LogFunctionArgs)
: Promise<void>
{
  await log(args, this.loggingCtx);
}
