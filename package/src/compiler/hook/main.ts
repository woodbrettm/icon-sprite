import type { BuildConfig } from '#compiler/config/types.ts';
import type { LogFunctionArgs, LoggingContext } from '#logger/types.ts';
import type { HookBuildContext} from './types.ts';
import type { HookBuildContextLogger } from './types.ts';
import type { HookPipes } from './types.ts';
import { log } from '#logger/main.ts';


export function scaffoldHookBuildContext
(config: BuildConfig, loggingCtx: LoggingContext)
: HookBuildContext
{
  const ctx: HookBuildContext = {
    meta: {},
    root: config.root,
    log: scaffoldHookLogFunc(loggingCtx),
  };
  return ctx;
}

export function scaffoldHookLogFunc
(ctx: LoggingContext)
: HookBuildContextLogger
{
  const func: HookBuildContextLogger = (
    async (args: LogFunctionArgs) => {
      await log(args, ctx);
    }
  );
  return func;
}

export function scaffoldHookPipes
(config: BuildConfig)
: HookPipes
{

}
