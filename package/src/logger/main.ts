import type { PossibleVoidResult } from '#utils/types.ts';
import type { BuildConfig } from '#compiler/config/types.ts';
import type { Log } from './types.ts';
import type { LoggingContext } from './types.ts';
import type { LogFunctionArgs } from './types.ts';
import type { LogHookContext } from './types.ts';

import { R } from '#vendor/remeda/main.ts';
import { nowTimestamp } from '#utils/main.ts';
import { LOG_LEVEL } from './constants.ts';
import { LOG_LEVEL_NAME_R } from './constants.ts';
import { assertLog } from './schema.ts';
import { assertLogHookContext } from './schema.ts';


export async function log
(args: LogFunctionArgs, ctx: LoggingContext)
: Promise<void>
{
  const log: Log = {
    timestamp: args.timestamp ?? nowTimestamp(),
    levelName: args.level,
    levelInt: LOG_LEVEL[LOG_LEVEL_NAME_R[args.level]],
    clearConsole: args.clearConsole ?? false,
    msg: args.msg,
    ...(R.isDefined(args.customData) && { customData: args.customData }),
    ...(R.isDefined(args.err) && { err: args.err }),
  };

  assertLog(log);

  const logHookCtx: LogHookContext = {
    minLevel: ctx.minLevel,
    includeTimestamp: ctx.includeTimestamp,
    meta: ctx.meta,
    logToConsole: ctx.logToConsole,
    neverClear: ctx.neverClear,
    root: ctx.root,
  };

  assertLogHookContext(logHookCtx);

  const hookRes = await runLogHook(log, logHookCtx, ctx);

  if (!ctx.logToConsole) return;

  const finalizedLog = hookRes ?? log;
  assertLog(finalizedLog);

  logToConsole(finalizedLog, ctx);
}

export function logToConsole
(log: Log, ctx: LoggingContext)
{
  // https://github.com/unjs/consola
  // log.clearConsole
  // ctx.neverClear
}

export async function runLogHook
(log: Log, hookCtx: LogHookContext, ctx: LoggingContext)
: Promise<PossibleVoidResult<Log>>
{
  if (!R.isDefined(ctx.logHook)) return;
  return await ctx.logHook(log, hookCtx);
}

export function scaffoldLoggingContext
(buildCtx: BuildConfig)
: LoggingContext
{

}
