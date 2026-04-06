import type { LogFunctionArgs, LoggingContext } from '#logger/types.ts';
import type { ResolvedFilePath } from '#utils/types.ts';
import type { HookBuildContext } from './hook/types.ts';
import type { HookPipes } from './hook/types.ts';


export type BuildContext = {
  root: ResolvedFilePath;
  hookCtx: HookBuildContext;
  hooks: HookPipes;
  loggingCtx: LoggingContext;
  log(this: BuildContext, args: LogFunctionArgs): Promise<void>;
}
