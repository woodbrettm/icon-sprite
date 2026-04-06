import type { Log} from './types.ts';
import type { LogHookContext } from './types.ts';
import type { LogLevelInt } from './types.ts';
import type { LogLevelName } from './types.ts';

import { validateSchema } from '#utils/schema.ts';
import { assertStrIso8601 } from '#utils/main.ts';


export function assertLog
(obj: Record<PropertyKey, unknown>)
: asserts obj is Log
{
  validateSchema<Log>(obj, {
    timestamp: assertStrIso8601,
    levelName: assertLogLevelName,
    levelInt: assertLogLevelInt,
    clearConsole: '',
    msg: '',
    err: { reqKey: false, fn: },
    context: { reqKey: false, fn:  },
  })
}

export function assertLogLevelName
(str: string)
: asserts str is LogLevelName
{

}

export function assertLogLevelInt
(int: Number)
: asserts int is LogLevelInt
{

}

export function assertLogHookContext
(obj: Record<PropertyKey, unknown>)
: asserts obj is LogHookContext
{

}
