import type { PossibleVoidResult, RequireKeys } from '#utils/types.ts';
import type { ResolvedFilePath } from '#utils/types.ts';
import type { BuildConfig } from '#compiler/config/types.ts';
import type { LogFunctionArgs } from '#logger/types.ts';
import type { LoggingContext } from '#logger/types.ts';
import type { Job } from '#compiler/job/types.ts';


export type HookBuildContext = {
  root: ResolvedFilePath;
  meta: CustomHookMetadata;
  log(args: LogFunctionArgs, ctx: LoggingContext): Promise<void>;
}

export interface CustomHookMetadata
{}

export type HookKeys = (
  | 'configFinalized'
  | 'buildStart'
  | 'jobStart'
  | 'inputIcon'
  | 'transformIcon'
  | 'transformSprite'
  | 'outputSprite'
  | 'jobEnd'
  | 'buildEnd'
);

export type HookNames = RequireKeys<HookKeys, {
  configFinalized: 'config-finalized';
  buildStart: 'build-start';
  jobStart: 'job-start';
  inputIcon: 'input-icon';
  transformIcon: 'transform-icon';
  transformSprite: 'transform-sprite';
  outputSprite: 'output-sprite';
  jobEnd: 'job-end';
  buildEnd: 'build-end';
}>;

/** Internal pipeline for calling hooks */
export type HookPipes = RequireKeys<HookKeys, {
  configFinalized: ConfigFinalizedHookPipe;
  buildStart: BuildStartHookPipe;
  jobStart: JobStartHookPipe;
  inputIcon: InputIconHookPipe;
  transformIcon: TransformIconHookPipe;
  transformSprite: TransformSpriteHookPipe;
  outputSprite: OutputSpriteHookPipe;
  jobEnd: JobEndHookPipe;
  buildEnd: BuildEndHookPipe;
}>;

export type ConfigFinalizedHookPipe = {
  hooks: ConfigFinalizedHook[];
  ctx: HookBuildContext,
  call: (
    this: ConfigFinalizedHookPipe,
    config: BuildConfig,
  ) => void;
};

export type BuildStartHookPipe = {
  hooks: BuildStartHook[];
  ctx: HookBuildContext;
  call: (
    this: BuildStartHookPipe,
  ) => void;
};

export type JobStartHookPipe = {
  hooks: JobStartHook[];
  ctx: HookBuildContext,
  call: (
    this: JobStartHookPipe,
    job: Job,
  ) => void;
};

export type InputIconHookPipe = {
  hooks: InputIconHook[];
  ctx: HookBuildContext,
  call: (
    this: InputIconHookPipe,
    input: unknown,
  ) => PossibleVoidResult<unknown>;
};

export type TransformIconHookPipe = {
  hooks: TransformIconHook[];
  ctx: HookBuildContext,
  call: (
    this: TransformIconHookPipe,
    icon: unknown,
  ) => PossibleVoidResult<unknown>;
};

export type TransformSpriteHookPipe = {
  hooks: TransformSpriteHook[];
  ctx: HookBuildContext,
  call: (
    this: TransformSpriteHookPipe,
    sprite: unknown,
  ) => PossibleVoidResult<unknown>;
};

export type OutputSpriteHookPipe = {
  hooks: OutputSpriteHook[];
  ctx: HookBuildContext,
  call: (
    this: OutputSpriteHookPipe,
    output: unknown,
  ) => PossibleVoidResult<unknown>;
};

export type JobEndHookPipe = {
  hooks: JobEndHook[];
  ctx: HookBuildContext,
  call: (
    this: JobEndHookPipe,
    job: Job,
  ) => void;
};

export type BuildEndHookPipe = {
  hooks: BuildEndHook[];
  ctx: HookBuildContext,
  call: (
    this: BuildEndHookPipe,
  ) => void;
};

/** Intended as a mapping of hookKeys to Hooks */
export type Hooks = RequireKeys<HookKeys, {
  configFinalized: ConfigFinalizedHook;
  buildStart: BuildStartHook;
  jobStart: JobStartHook;
  inputIcon: InputIconHook;
  transformIcon: TransformIconHook;
  transformSprite: TransformSpriteHook;
  outputSprite: OutputSpriteHook;
  jobEnd: JobEndHook;
  buildEnd: BuildEndHook;
}>;

export type ConfigFinalizedHook = {
  name: HookNames['configFinalized'];
  pluginName: string;
  call: (
    this: ConfigFinalizedHook,
    config: BuildConfig,
    buildCtx: HookBuildContext,
  ) => void;
};

export type BuildStartHook = {
  name: HookNames['buildStart'];
  pluginName: string;
  call: (
    this: BuildStartHook,
    buildCtx: HookBuildContext,
  ) => void;
};

export type JobStartHook = {
  name: HookNames['jobStart'];
  pluginName: string;
  call: (
    this: JobStartHook,
    job: Job,
    buildCtx: HookBuildContext,
  ) => void;
};

export type InputIconHook = {
  name: HookNames['inputIcon'];
  pluginName: string;
  call: (
    this: InputIconHook,
    input: unknown,
    buildCtx: HookBuildContext,
  ) => PossibleVoidResult<unknown>;
};

export type TransformIconHook = {
  name: HookNames['transformIcon'];
  pluginName: string;
  call: (
    this: TransformIconHook,
    icon: unknown,
    buildCtx: HookBuildContext,
  ) => PossibleVoidResult<unknown>;
};

export type TransformSpriteHook = {
  name: HookNames['transformIcon'];
  pluginName: string;
  call: (
    this: TransformSpriteHook,
    sprite: unknown,
    buildCtx: HookBuildContext,
  ) => PossibleVoidResult<unknown>;
};

export type OutputSpriteHook = {
  name: HookNames['outputSprite'];
  pluginName: string;
  call: (
    this: OutputSpriteHook,
    output: unknown,
    buildCtx: HookBuildContext,
  ) => PossibleVoidResult<unknown>;
};

export type JobEndHook = {
  name: HookNames['jobEnd'];
  pluginName: string;
  call: (
    this: JobEndHook,
    job: Job,
    buildCtx: HookBuildContext,
  ) => void;
};

export type BuildEndHook = {
  name: HookNames['buildEnd'];
  pluginName: string;
  call: (
    this: BuildEndHook,
    buildCtx: HookBuildContext,
  ) => void;
};
