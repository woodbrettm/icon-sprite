/*
  The root is what the project matches up against for finding
  the config file for example. Defaults to process.cwd().
*/

/*
  cwd is either absolute path, or relative to process.cwd()
  This option doesn't affect the cwd the cli is working against.
  So if changing the cwd here affects the cli, make sure to set it
  there instead.

  Setting this does not change node cwd (process.chdir())
*/

export type LogLevel = 'normal' | 'none';

export type BuildConfig = {
  jobSpec?: Resolvable<JobSpec | Array<JobSpec>>;
  hooks?: Resolvable<BuildHooks>;
  logging?: Resolvable<LogLevel>;
  cwd?: Resolvable<string>;
  inputIgnore?: Resolvable<string>;
  formatting?: Resolvable<{
    indent?: string;
    newline?: string;
  }>;
};

export type BuildConfig_FnResolved = {
  jobSpec?: JobSpec | Array<JobSpec>;
  hooks?: BuildHooks;
  logging?: LogLevel;
  cwd?: string;
  inputIgnore?: string;
  formatting?: {
    indent?: string;
    newline?: string;
  };
}

export type ResolvedConfig = Readonly<{
  jobSpec: JobSpec | Array<JobSpec>;
  hooks?: BuildHooks;
  logging: LogLevel;
  cwd: string;
  inputIgnore?: string;
  formatting: {
    indent: string;
    newline: string;
  };
}>

export type JobSpec = {
  name: string;
  inputMatch: string;
  inputIgnore?: string | Array<string>;
  outputFile: string | false;
};

export type JobSpecOptions = {
  cwd: string;
  inputIgnore?: string | Array<string>;
}

export type Job = Readonly<{
  name: string; // General Name
  inputFiles: Array<string>; // Array<AbsolutePath>
  outputFile: string | false; // absolute path
}>

export type BuildOutput = Map<string, JobOutput>

export type JobOutput = [Job, string];

export type Meta = Record<string, unknown>;

export type BuildContext = Readonly<{
  meta: Meta
}>;

export type HookRes<T> = T | Promise<T>;

export type Resolvable<T> = T | (() => T) | (() => Promise<T>);

export type BuildHooks = {
  config?: (config: BuildConfig) => HookRes<void>;
  setup?: (config: ResolvedConfig, context: BuildContext) => HookRes<void>;
  jobStart?: (job: Job, context: BuildContext) => HookRes<void>;
  header?: (header: string, context: BuildContext) => HookRes<string>;
  symbolId?: (symbolId: string, context: BuildContext) => HookRes<string>;
  transformIcon?: (context: BuildContext) => HookRes<string>;
  footer?: (context: BuildContext) => HookRes<string>;
  finalize?: (context: BuildContext) => HookRes<string>;
  parse?: () => HookRes<void>;
  prettify?: () => HookRes<void>;
  writeFile?(): HookRes<void>;
  jobEnd?: () => HookRes<void>;
  cleanup?: (context: BuildContext) => HookRes<void>;
};
