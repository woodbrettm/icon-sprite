import type { TF } from '#vendor/type-fest/types.ts';


export type EmptyRecord = Record<PropertyKey, unknown>;

export type PossibleVoidResult<T = void> = (
  | T
  | void
  | undefined
);

export type Resolvable<T> = (
  | T
  | Promise<T>
  | { resolve: (args: never) => T }
  | { resolve: (args: never) => Promise<T> }
);

/** Unwraps resolvables from an array or tuple. */
export type AllResolved<T extends unknown[]> = (
  T extends [infer Head, ...infer Tail]
    ? [Resolved<Head>, ...AllResolved<Tail>]
    : []
);

export type Implements<T, U extends T> = U;

export type ResolvedObjKey
<
  T extends Record<string, Resolvable<unknown>>,
  K extends keyof T,
> = (
  T[K] extends Resolvable<infer U> ? Resolved<U> : T[K]
);

/**
 * Converts obj keys to tuple of keys' values
 */
export type ResolveObjKeysToTuple<
  Obj extends Record<string, unknown>,
  Keys extends ReadonlyArray<keyof Obj>
> = {
  [Index in keyof Keys]: Resolved<Obj[Keys[Index]]>
};

/**
 * Type where the array itself is resolvable while each item
 * in the array is resolvable as well.
 */
export type ResolvableArray<T> = Resolvable<Resolvable<T>[]>

export type Resolved<T> = (
  T extends Resolvable<infer U> ? U : T
);

export type FilePathGlobPattern = (
  TF.Tagged<string, 'File Path Glob Pattern'>
);

export type FilePath = (
  TF.Tagged<string, 'Unresolved File Path'>
);

export type Iso8601Str = (
  TF.Tagged<string, 'ISO 8601 Datetime String'>
);

/** Absolute File Path */
export type ResolvedFilePath = (
  TF.Tagged<string, 'Resolved File Path'>
);

/** Requires Object to Have Keys from Union
 *  Note that an error won't show, but instead
 *  `never` will be the value of a missing key
*/
export type RequireKeys<T extends PropertyKey, U> = {
    [K in T]: K extends keyof U ? U[K] : never;
};
