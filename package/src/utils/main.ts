import type { LogFunctionArgs } from '#logger/types.ts';
import type { Iso8601Str } from './types.ts';
import { R } from '#vendor/remeda/main.ts';

export function prepLogFromErr
<E extends Error>
(error: E | unknown, args?: Exclude<LogFunctionArgs, 'level' | 'msg' | 'err'>)
: LogFunctionArgs
{
  const arg: LogFunctionArgs = {
    level: 'error',
    msg: 'An Error Occured',
  }

  if (R.isError(error)) {
    arg.msg = error.message;
    arg.err = error;
  } else {
    Object.defineProperty(
      arg.customData,
      'error',
      error as PropertyDescriptor,
    );
  }

  if (R.isDefined(args)) {
    R.mergeDeep(arg, R.clone(args));
  }

  return arg;
}

export function assertStrIso8601
(str: string)
: asserts str is Iso8601Str
{

}

export function nowTimestamp
()
: Iso8601Str
{
  const now = new Date().toISOString();
  assertStrIso8601(now);
  return now;
}
