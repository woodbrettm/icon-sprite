import type { LoadConfigOptions as C12Config } from 'c12';

import type {
  BuildConfig,
  BuildConfigFnResolved,
  ResolvedConfig,
  ResolvedWorkDir,
  HookRegistry,
} from '../types';

import process from 'node:process';

import { loadConfig as c12LoadConfig } from 'c12';
import { deepmergeInto } from 'deepmerge-ts';
import { resolve } from 'pathe';

import { isRecord, isFunc, hasKey } from '../utils/predicates';
import { callEditConfigHooks, registerEditConfigHooks } from '../plugin/hooks';

/**
 * Helper for creating Config
 */
export function defineConfig
(
  config: BuildConfig
)
: BuildConfig
{
  return config;
}

/**
 * Merges into target config (mutation)
 */
export function mergeIntoConfig
<
  C extends Record<string, unknown>,
>
(
  target: C,
  ...merge: Partial<C>[]
)
: void
{
  if (merge.length) {
    deepmergeInto(target, ...merge);
  }
}

/**
 * Loads config from the current working directory.
 */
export async function loadWorkspaceConfig
(
  optionsArg?: {
    workDir?: string,
    configFile?: string,
  }
)
: Promise<BuildConfig | null>
{
  const options = optionsArg ?? {};
  const c12Options: C12Config = {
    rcFile: false,
    globalRc: false,
    dotenv: false,
    packageJson: false,
    ...(options.workDir && { cwd: options.workDir }),
    configFile: options.configFile ?? './sprite.config',
  };
  const { config } = await c12LoadConfig<BuildConfig>(c12Options);
  return config;
}

// must resolved the cwd key (since it could be relative)
export async function resolveConfig
(
  registry: HookRegistry,
  configArg: BuildConfig,
)
: Promise<ResolvedConfig>
{
  const config = getDefaultConfig();
  mergeIntoConfig(config, configArg);
  registerEditConfigHooks(registry, config);
  await callEditConfigHooks(registry, config);
  await resolveConfigFunctions(config);
  assertFunctionsResolved(config);
  resolveWorkDir(config);
  freezeConfig(config);
  assertConfigResolved(config);
  return config;
}

/**
 * Returns the BuildConfig defaults
 */
function getDefaultConfig
()
: BuildConfig
{
  return {
    jobSpec: {
      name: 'main',
      inputMatch: './src/assets/**/*.icon.svg',
      outputFile: './src/assets/icon-sprite.svg',
    },
    logging: 'normal',
    workDir: process.cwd(),
    formatting: {
      indent: '  ',
      newline: '\n',
    },
  };
}

function resolveWorkDir
(
  config: BuildConfigFnResolved,
)
: void
{
  const resolved = (
    config.workDir
    ? resolve(process.cwd(), config.workDir)
    : process.cwd()
  ) as ResolvedWorkDir;
  config.workDir = resolved;
}

async function resolveConfigFunctions
(
  config: BuildConfig
)
: Promise<void>
{
  // TODO: Dynamically loop through keys from getResolvableKeys()
  // typing issues when doing so atm
  if (isFunc(config.jobSpec)) {
    const res = await config.jobSpec();
    if (res) config.jobSpec = res;
  }
  if (isFunc(config.logging)) {
    const res = await config.logging();
    if (res) config.logging = res;
  }
  if (isFunc(config.workDir)) {
    const res = await config.workDir();
    if (res) config.workDir = res;
  }
  if (isFunc(config.inputIgnore)) {
    const res = await config.inputIgnore();
    if (res) config.inputIgnore = res;
  }
  if (isFunc(config.formatting)) {
    const res = await config.formatting();
    if (res) config.formatting = res;
  }
}

function assertFunctionsResolved
(
  config: BuildConfig,
)
: asserts config is BuildConfigFnResolved
{
  const keys = getResolvableKeys();
  for (const key of keys) {
    const keyValue = config[key];
    if (typeof keyValue == 'function') continue;
    throw new Error(`Unresolved key(s): ${key} in Config.`)
  }
}

function getResolvableKeys
()
{
  return [
    'jobSpec',
    'logging',
    'workDir',
    'inputIgnore',
    'formatting',
  ] as const;
}

function freezeConfig
<
  C extends Record<string, unknown>
>
(
  config: C
)
: asserts config is Readonly<C>
{
  Object.freeze(config);
}

function checkConfigFrozen
(
  config: BuildConfigFnResolved
)
: void
{
  if (!Object.isFrozen(config)) {
    throw new Error('Resolved config not readonly');
  }
}

function assertConfigResolved
(
  config: BuildConfigFnResolved
)
: asserts config is ResolvedConfig
{
  checkReqResolvedKeys(config);
  checkConfigFrozen(config);
}

/**
 * Checks if any required keys are missing from
 * the config for it to be considered resolved.
 * Raises an error listing missing keys if any found.
 */
function checkReqResolvedKeys
(
  config: BuildConfigFnResolved
)
: void
{
  const reqFormatting = (
    config.formatting !== false
    && isRecord(config.formatting)
      ? [
          ['indent', hasKey(config.formatting, 'indent')],
          ['newline', hasKey(config.formatting, 'newline')],
        ]
      : []
  );
  const reqKeys = [
    ['jobSpec', hasKey(config, 'jobSpec')],
    ['logging', hasKey(config, 'logging')],
    ['cwd', hasKey(config, 'cwd')],
    ['formatting', hasKey(config, 'formatting')],
    ...reqFormatting,
  ];

  const missingKeys = [];

  for (const key of reqKeys) {
    if (key[1]) continue;
    missingKeys.push(key[0]);
  }

  if (missingKeys.length) {
    throw new Error(`
      Missing required resolved config keys: ${missingKeys.join(', ')}`,
    );
  }
}
