import { deepFreeze as libDeepFreeze } from 'deep-freeze-es6';

/** Deep Freezes Items */
export function deepFreeze<T>(item: T): T {
  return libDeepFreeze(item);
}
