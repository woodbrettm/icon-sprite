import type { Iso8601Str } from '#utils/types.ts';
import type { ResolvedFilePath } from '#utils/types.ts';
import type { PossibleVoidResult } from '#utils/types.ts';

import { LOG_LEVEL } from './constants';
import { LOG_LEVEL_NAME } from './constants';


export type LogLevelMap = typeof LOG_LEVEL;
export type LogLevelNameMap = typeof LOG_LEVEL_NAME;

export type LogLevelName = LogLevelNameMap[keyof LogLevelNameMap];
export type LogLevelInt = LogLevelMap[keyof LogLevelMap];

export interface CustomLoggingMetadata {}

/** For the config */
export type LoggingSettings = {
  /** minimum level required for log to be outputted to console */
  minLevel: LogLevelName;

  /** Whether to include timestamp in log */
  includeTimestamp: boolean;

  /** Tells the logger to never clear the screen */
  neverClear: boolean;

  /** Custom contextual info. This can be added into the config
   * and is accessible in the log hook
   */
  meta?: CustomLoggingMetadata;

  /** If the logger should log to the console */
  logToConsole?: boolean;

  logHook: LogHook;
}

/** Similar to BuildContext but for logging */
export type LoggingContext = {

  /** minimum level required for log to be outputted to console */
  minLevel: LogLevelName;

  /** Whether to include timestamp in log */
  includeTimestamp: boolean;

  /** Custom contextual info */
  meta: CustomLoggingMetadata;

  /** If the logger should log to the console */
  logToConsole: boolean;

  /** Tells the logger to never clear the screen */
  neverClear: boolean;

  root: ResolvedFilePath;

  logHook?: LogHook;
}

export type Log
<E extends Error = Error>
= {
  err?: E;
  timestamp: Iso8601Str;
  levelName: LogLevelName;
  levelInt: LogLevelInt;
  msg: string;
  customData?: Record<PropertyKey, unknown>;

  /** Indicates the console should be cleared before displayed */
  clearConsole: boolean;
};

export type LogHook = (
  (log: Log, ctx: LogHookContext) => Promise<PossibleVoidResult<Log>>
);

export type LogHookContext = {
  /** minimum level required for log to be outputted to console */
  minLevel: LogLevelName;

  /** Whether to include timestamp in log */
  includeTimestamp: boolean;

  /** Custom contextual info */
  meta: CustomLoggingMetadata;

  /** If the logger should log to the console */
  logToConsole: boolean;

  /** Tells the logger to never clear the screen */
  neverClear: boolean;

  /** Resolves file paths from this */
  root: ResolvedFilePath;
};

export type LogFunctionArgs
<E extends Error = Error> = {

  level: LogLevelName;

  msg: string;

  /** Only apply if overriding the log function's timestamp */
  timestamp?: Iso8601Str;

  err?: E;

  /** Clear the console before logging */
  clearConsole?: boolean;

  /** Custom data specific to the log */
  customData?: Record<PropertyKey, unknown>;
};
