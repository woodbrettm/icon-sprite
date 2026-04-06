import type { BuildConfig } from '#compiler/config/types.ts';
import type { Job } from '#compiler/job/types.ts';
import type { PossibleVoidResult } from '#utils/types.ts';
import type { RequireKeys } from '#utils/types.ts';
import type * as H from './types.ts';


export type DefHooks = RequireKeys<H.HookKeys, {
  configFinalized: DefConfigFinalizedHook;
  buildStart: DefBuildStartHook;
  jobStart: DefJobStartHook;
  inputIcon: DefInputIconHook;
  transformIcon: DefTransformIconHook;
  transformSprite: DefTransformSpriteHook;
  outputSprite: DefOutputSpriteHook;
  jobEnd: DefJobEndHook;
  buildEnd: DefBuildEndHook;
}>;

export type DefConfigFinalizedHook = (
  this: H.ConfigFinalizedHook,
  config: BuildConfig,
  ctx: H.HookBuildContext,
) => void;

export type DefBuildStartHook = (
  this: H.BuildStartHook,
  ctx: H.HookBuildContext,
) => void;

export type DefJobStartHook = (
  this: H.BuildStartHook,
  job: Job,
  ctx: H.HookBuildContext,
) => void;

export type DefInputIconHook = (
  this: H.InputIconHook,
  input: unknown,
  buildCtx: H.HookBuildContext,
) => PossibleVoidResult<unknown>;

export type DefTransformIconHook = (
  this: H.TransformIconHook,
  icon: unknown,
  buildCtx: H.HookBuildContext,
) => PossibleVoidResult<unknown>;

export type DefTransformSpriteHook = (
  this: H.TransformSpriteHook,
  sprite: unknown,
  buildCtx: H.HookBuildContext,
) => PossibleVoidResult<unknown>;

export type DefOutputSpriteHook = (
  this: H.OutputSpriteHook,
  output: unknown,
  buildCtx: H.HookBuildContext,
) => PossibleVoidResult<unknown>;

export type DefJobEndHook = (
  this: H.JobEndHook,
  job: Job,
  buildCtx: H.HookBuildContext,
) => void;

export type DefBuildEndHook = (
  this: H.BuildEndHook,
  buildCtx: H.HookBuildContext,
) => void;
