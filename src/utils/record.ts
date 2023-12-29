export function isRecord
(
  toCheck: unknown
)
: toCheck is Record<string, unknown>
{
  return toCheck !== null &&
    toCheck?.constructor.name.toLowerCase() === 'object';
}

export function isNonEmptyRecord
(
  toCheck: Record<string, unknown>
)
: boolean
{
  return Object.keys(toCheck).length > 0;
}
