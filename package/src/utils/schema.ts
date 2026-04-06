export function validateSchema
<
  R extends Record<PropertyKey, unknown>,
>
(
  obj: Record<PropertyKey, unknown>,
  schema: {
    [K in keyof R]: (...args: never) => void;
  }
)
: asserts obj is R
{
  // for (const [key, value] of toCheck) {
  //   if (!Object.hasOwn(schema, key)) {
  //     throw new ValidationError(`schema missing key: ${key}`);
  //   }

  // }

}
