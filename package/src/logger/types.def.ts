import type { PossibleVoidResult } from '#utils/types.ts';
import type { Resolvable } from '#utils/types.ts';
import type { CustomLoggingMetadata } from './types.ts';
import type { Log } from './types.ts';
import type { LoggingContext } from './types.ts';
import type { LogLevelName } from './types.ts';


export type DefLogHook = (
  log: Log,
  ctx: LoggingContext,
) => PossibleVoidResult<Log>;

export type DefLoggingSettings = {
  /** minimum level required for log to be outputted to console */
  minLevel?: Resolvable<LogLevelName>;

  /** Whether to include timestamp in log */
  includeTimestamp?: Resolvable<boolean>;

  /** Tells the logger to never clear the screen */
  neverClear?: Resolvable<boolean>;

  /** Custom contextual info */
  meta?: CustomLoggingMetadata;

  /** If the logger should log to the console */
  logToConsole?: Resolvable<boolean>;

  logHook?: DefLogHook;
}

export type DefLoggingSettingsResolved = {
  /** minimum level required for log to be outputted to console */
  minLevel?: LogLevelName;

  /** Whether to include timestamp in log */
  includeTimestamp?: boolean;

  /** Tells the logger to never clear the screen */
  neverClear?: boolean;

  /** Custom contextual info */
  customCtx?: CustomLoggingMetadata;

  /** If the logger should log to the console */
  logToConsole?: boolean;

  logHook?: DefLogHook;
}
