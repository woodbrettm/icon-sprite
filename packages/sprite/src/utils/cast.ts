import { isArray } from './predicates'

export function toArray
<
  T,
>
(
  item: T,
)
: T extends unknown[] ? T : T[]
{
  return (
    isArray(item)
    ? item
    : [item] as T extends unknown[] ? T : T[]
  )
}
