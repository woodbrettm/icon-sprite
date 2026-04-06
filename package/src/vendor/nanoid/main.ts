import { nanoid as libNanoid } from 'nanoid';
import { R } from '#vendor/remeda/main.ts';
import { ValidationError } from '#error/main.ts';


/**
 *
 * @param length Length of the Id. Defaults to 10.
 * @returns id as a string, with optional custom Type.
 */
export function generateId
<T extends string>
(length: number = 10)
: T | ValidationError
{
  if (!R.isNumber(length)) {
    return new ValidationError(
      'Length must be a number'
    );
  }
  const id = libNanoid<T>(length);
  return id;
}
