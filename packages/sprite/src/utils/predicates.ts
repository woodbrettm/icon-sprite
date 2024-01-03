import { NonValue, GeneralRecord, NonUndefined } from '../types';

export function isRecord
<
  T,
>
(
  item: T,
)
: item is Record<PropertyKey, unknown> & T
{
  return item !== null &&
    item?.constructor.name.toLowerCase() === 'object';
}

/**
 * Checks if empty record or array
 */
export function isEmpty
<
  T extends
    | GeneralRecord
    | unknown[]
>
(
  item: T,
)
: boolean
{
  if (isArray(item)) return item.length === 0;
  if (isRecord(item)) return Object.keys(item).length === 0;
  return false;
}

export function isFunc
<
  T,
>
(
  item: T,
)
: item is (T extends (...args: unknown[]) => unknown ? T : never)
{
  return typeof item === 'function';
}

export function isArray
<
  T,
>
(
  item: T,
)
: item is (T extends unknown[] ? T : never)
{
  return Array.isArray(item);
}

/**
 * Checks if undefined
 * @see isNonValue if also wanting to check for null
 */
export function isUndefined
<
  T,
>
(
  toCheck: T,
)
: toCheck is (T extends undefined ? T : never)
{
  return toCheck === undefined;
}

/**
 * Checks if undefined or null
 * @see isUndefined to only check for undefined
 */
export function isNonValue
<
  T,
>
(
  toCheck: T,
)
: toCheck is (T extends NonValue ? T : never)
{
  return toCheck === undefined || toCheck === null;
}

export function isString
<
  T
>
(
  toCheck: T,
)
: toCheck is string & T
{
  return typeof toCheck === 'string';
}

// is record[key] undefined

export function hasKey
<
  T extends GeneralRecord,
  K extends PropertyKey,
>
(
  record: T,
  key: K,
)
: record is T & Required<Record<K, NonUndefined<T[K]>>>
{
  return (
    Object.hasOwn(record, key)
    && record.key !== undefined
  );
}
