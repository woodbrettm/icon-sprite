export class MissingConfigKeyError extends Error
{
  constructor
  (
    message: string
  )
  {
    super(message);
    this.name = 'MissingConfigKeyError';
  }
}

export function missingConfigKey
(
  key: string,
)
: void
{
  throw new MissingConfigKeyError(
    `Missing key(s): ${key} in Config.`,
  );
}

export class UnresolvedConfigFunctionError extends Error
{
  constructor
  (
    message: string
  )
  {
    super(message);
    this.name = 'UnresolvedConfigFunctionError';
  }
}

export function unresolvedConfigFunction
(
  key: string
)
: void
{
  throw new UnresolvedConfigFunctionError(
    `Unresolved key(s): ${key} in Config.`,
  );
}

export class ConfigNotReadonlyError extends Error
{
  constructor
  (
    message: string
  )
  {
    super(message);
    this.name = 'ConfigNotReadonlyError';
  }
}

export function configNotReadonly
()
: void
{
  throw new ConfigNotReadonlyError(
    `Config should be frozen / readonly but isn't.`,
  );
}
