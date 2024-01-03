export type NonUndefined<T> = T extends undefined ? never : T;

export type Resolvable<T> = (
  | T
  | (() => T | Promise<T>)
  | (() => undefined | false))
  | (() => Promise<undefined | false>
);

export type GeneralRecord = Record<PropertyKey, unknown>;

export type NonValue = null | undefined;

export type EmptyRecord = Record<string, never>;

export type BuildOutput = Map<Job['name'], JobOutput>;

/**
 * Completed job, file output string
 */
export type JobOutput = [Job, string];

export type FormattingOptions = false | Formatting;

export type Formatting = {
  indent: string;
  newline: string;
};

/**
 * Normal contains info-related, warn is warnings and errors only,
 * silent is errors only
 */
export type LogLevel = 'normal' | 'warn' | 'silent';

export type WorkDir = string;

export type ResolvedWorkDir = Branded<string, 'ResolvedWorkDir'>;

// Branded Types: e.g. type UserID = Branded<string, "UserId">
// https://egghead.io/blog/using-branded-types-in-typescript
declare const __branded: unique symbol;
type Brand<B> = { [__branded]: B };
export type Branded<T, B> = T & Brand<B>;

export type BuildConfig = {
  jobSpec?: Resolvable<JobSpec | JobSpec[]>;
  plugins?: Plugin[];
  logging?: Resolvable<LogLevel>;
  workDir?: Resolvable<WorkDir>;
  inputIgnore?: Resolvable<string>;
  formatting?: Resolvable<Partial<FormattingOptions>>;
};

export type BuildConfigFnResolved = {
  jobSpec?: JobSpec | JobSpec[];
  plugins?: Plugin[];
  logging?: LogLevel;
  workDir?: WorkDir;
  inputIgnore?: string;
  formatting?: Partial<FormattingOptions>
};

export type ResolvedConfig = Readonly<{
  jobSpec: JobSpec | JobSpec[];
  plugins?: Plugin[];
  logging: LogLevel;
  workDir: ResolvedWorkDir;
  inputIgnore?: string;
  formatting: FormattingOptions;
}>;

export type JobSpec = {
  name: string;
  inputMatch: string;
  inputIgnore?: string | string[];
  outputFile: string | false;
};

export type JobSpecOptions = {
  workDir: WorkDir;
  inputIgnore?: string | string[];
};

export type Job = {
  name: string; // General Name
  inputFiles: string[]; // AbsolutePath[]
  outputFile: string | false; // absolute path
}

/**
 * Plugin hooks are executed in the order the plugins
 * are defined in the config.
 */
export type Plugin = {
  name: string;
  version?: string;
} & {
  [H in Hook as H['name']]?: H['call'];
};

export type PluginContext = Readonly<{
  customData: PluginCustomData;
  workDir: ResolvedWorkDir;
  formatting: Readonly<FormattingOptions>;
}>;

export type PluginCustomData
<
  T extends GeneralRecord = GeneralRecord
> = T & GeneralRecord;

export type HookLookup = {
  [H in Hook as H['name']]: H;
};

export type Hook = (
  | EditConfigHook
  | SetupHook
  | JobStartHook
  | SpriteHeaderHook
  | IconFilePathHook
  | LoadIconHook
  | IconIdHook
  | TransformIconHook
  | SpriteFooterHook
  | FinalizeHook
  | ParseHook
  | FormatHook
  | EmitFileHook
  | JobEndHook
  | TeardownHook
);

export type HookRegistry = {
  [H in Hook as H['name']]: H[];
};

export type HookRes<T> = T | Promise<T>;

// TODO: extending this is returning false
export type HookTemplate = {
  name: string;
  plugin: string;
  call: (...args: unknown[]) => unknown;
}

/**
 * Allows the plugin to mutate the config before it's resolved.
 * Can also prefer to return a config object which is deep merged
 * into the existing config.
 */
export type EditConfigHook = {
  name: 'editConfig';
  plugin: string;
  call: (
    (this: EmptyRecord, config: BuildConfig) =>
      | HookRes<Partial<BuildConfig> | NonValue>
      | HookRes<void>
  );
};

/**
 * Allows plugin to view the resolved config for debugging purposes,
 * and to compute any values to store them inside the plugin
 * for later usage.
 */
export type SetupHook = {
  name: 'setup';
  plugin: string;
  call: (
    (this: PluginContext, config: ResolvedConfig) => HookRes<void>
  );
};

/**
 * Allows plugin to mutate job object before job run commences.
 */
export type JobStartHook = {
  name: 'jobStart';
  plugin: string;
  call: (
    (this: PluginContext, job: Job) => HookRes<void>
  );
};

export type SpriteHeaderHook = {
  name: 'spriteHeader';
  plugin: string;
  call: (
    (this: PluginContext, header: string) =>
      | HookRes<string | NonValue>
      | HookRes<void>
  );
};

export type IconFilePathHook = {
  name: 'iconFilePath';
  plugin: string;
  call: (
    (this: PluginContext, path: string) =>
      | HookRes<string | NonValue>
      | HookRes<void>
  );
};

export type LoadIconHook = {
  name: 'loadIcon';
  plugin: string;
  call: (
    (this: PluginContext, fileContent: string) =>
      | HookRes<string | NonValue>
      | HookRes<void>
  );
};

export type IconIdHook = {
  name: 'iconId';
  plugin: string;
  call: (
    (this: PluginContext, iconId: string) =>
      | HookRes<string | NonValue>
      | HookRes<void>
  );
}

export type TransformIconHook = {
  name: 'transformIcon';
  plugin: string;
  call: (
    (this: PluginContext, icon: string) =>
      | HookRes<string | NonValue>
      | HookRes<void>
  );
}

export type SpriteFooterHook = {
  name: 'spriteFooter';
  plugin: string;
  call: (
    (this: PluginContext, footer: string) =>
      | HookRes<string | NonValue>
      | HookRes<void>
  );
}

export type FinalizeHook = {
  name: 'finalize';
  plugin: string;
  call: (
    (this: PluginContext, sprite: string) =>
      | HookRes<string | NonValue>
      | HookRes<void>
  );
}

export type ParseHook = {
  name: 'parse';
  plugin: string;
  call: (
    (this: PluginContext) =>
      | HookRes<NonValue>
      | HookRes<void>
  );
}

export type FormatHook = {
  name: 'format';
  plugin: string;
  call: (
    (this: PluginContext) =>
      | HookRes<NonValue>
      | HookRes<void>
  );
}

export type EmitFileHook = {
  name: 'emitFile';
  plugin: string;
  call: (
    (this: PluginContext, filePath: string, fileContent: string) =>
      | HookRes<NonValue>
      | HookRes<void>
  );
}

export type JobEndHook = {
  name: 'jobEnd';
  plugin: string;
  call: (
    (this: PluginContext, job: Readonly<Job>) => HookRes<void>
  );
}

export type TeardownHook = {
  name: 'teardown';
  plugin: string;
  call: (
    (this: PluginContext) => HookRes<void>
  );
}
