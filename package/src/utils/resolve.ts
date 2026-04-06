import type { ResolvedObjKey } from './types.ts';
import type { ResolveObjKeysToTuple } from './types.ts';
import type { AllResolved } from './types.ts';
import type { Resolvable } from './types.ts';
import type { Resolved } from './types.ts';

import { R } from '#vendor/remeda/main.ts';
import { MissingKeyError } from '#error/main.ts';
import { ValidationError } from '#error/main.ts'


export async function resolveObjKeys
<
  Obj extends Record<string, Resolvable<unknown>>,
  const Keys extends ReadonlyArray<keyof Obj>,
>
(obj: Obj, keys: Keys)
: Promise<ResolveObjKeysToTuple<Obj, Keys>>
{
  const res = R.map(keys, (key) => resolveObjKey(obj, key));
  return Promise.all(res) as (
    Promise<ResolveObjKeysToTuple<Obj, Keys>>
  );
}

export async function resolveObjKey
<
  Obj extends Record<string, Resolvable<unknown>>,
  Key extends keyof Obj,
>
(obj: Obj, key: Key)
: Promise<ResolvedObjKey<Obj, Key>>
{
  if (!R.isPlainObject(obj)) {
    throw new ValidationError('obj arg must be a record/object.');
  }

  if (!R.isString(key)) {
    throw new ValidationError('key arg must be a string');
  }

  if (!Object.hasOwn(obj,  key)) {
    throw new MissingKeyError(
      `obj arg missing '${key}' key`
    );
  }
  const resolved = await resolveItem(obj[key]);
  return resolved as Promise<ResolvedObjKey<Obj, Key>>;
}

export async function resolveItems
<const T extends Resolvable<unknown>[]>
(toResolve: T)
: Promise<AllResolved<T>>
{
  const resolved = R.map(toResolve, resolveItem);
  return Promise.all(resolved) as Promise<AllResolved<T>>;
}

export async function resolveItem
<T>
(toResolve: T)
: Promise<Resolved<T>>
{
  let res = toResolve;

  if (
    R.isPlainObject(res)
    && Object.hasOwn(res, 'resolve')
    && typeof res['resolve'] === 'function'
  ) {
    res = res.resolve();
  }

  if (R.isPromise(res)) res = await res;
  verifyResolved(res);

  return res;
}

export function verifyResolved
<T extends Resolvable<unknown>>
(value: T)
: asserts value is T & Resolved<T>
{
  if (R.isPlainObject(value) && Object.hasOwn(value, 'resolve')) {
    throw new TypeError(
      `Value contains the key 'resolve' indicating an unresolved function`
    );
  }
  if (R.isPromise(value)) {
    throw new TypeError(`Value: is expected not to be a promise.`)
  }
}
