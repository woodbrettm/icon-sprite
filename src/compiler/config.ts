import type { LoadConfigOptions as C12Config } from 'c12';

import type {
  BuildConfig,
  BuildConfig_FnResolved,
  ResolvedConfig,
} from '../types';

import process from 'node:process';

import { loadConfig as c12LoadConfig } from 'c12';
import { deepmergeInto } from 'deepmerge-ts';
import { klona } from 'klona';
import { resolve } from 'pathe';

import { isRecord } from '../utils/record';
import { callConfigHook } from './hooks';

import {
  missingConfigKey,
  unresolvedConfigFunction,
  configNotReadonly,
} from 'src/utils/error';

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
 * Merges config objects together, with keys in left-most args
 * taking precedence.
 */
export function mergeConfigs
<
  C extends Record<string, unknown>,
>
(
  target: C,
  ...merge: Array<Partial<C>>
)
: C
{
  if (!merge.length) return target;
  deepmergeInto(target, ...merge);
  return target;
}

export function mergeInDefaults
(
  config: BuildConfig,
)
: void
{
  const defaults = getConfigDefaults();
  mergeConfigs(defaults, config);
}

/**
 * Loads config from the current working directory.
 */
export async function loadWorkspaceConfig
(
  optionsArg?: {
    cwd?: string,
    configFile?: string,
  }
)
: Promise<BuildConfig | null>
{
  const options = optionsArg ?? {};

  if (!isRecord(options)) {
    throw new TypeError('Expected Record<> type for options arg');
  }

  const c12Options: C12Config = {
    rcFile: false,
    globalRc: false,
    dotenv: false,
    packageJson: false,
    ...(options.cwd && { cwd: options.cwd }),
    configFile: options.configFile ?? './sprite.config',
  };
  const { config } = await c12LoadConfig<BuildConfig>(c12Options);
  return config;
}

// must resolved the cwd key (since it could be relative)
export async function resolveConfig
(
  configArg: BuildConfig,
)
: Promise<ResolvedConfig>
{
  const config = klona(configArg);
  mergeInDefaults(config);
  await resolveFunctions(config);
  assertFunctionsResolved(config);
  resolveCwd(config);
  await callConfigHook(config);
  freezeConfig(config);
  assertConfigResolved(config);
  return config;
}

/**
 * Returns the BuildConfig defaults
 */
function getConfigDefaults
()
: Pick<
    BuildConfig,
    | 'jobSpec'
    | 'cwd'
    | 'formatting'
    | 'logging'
  >
{
  return {
    jobSpec: {
      name: 'main',
      inputMatch: './src/assets/**/*.icon.svg',
      outputFile: './src/assets/icon-sprite.svg',
    },
    cwd: process.cwd(),
    logging: 'normal',
    formatting: {
      indent: '  ',
      newline: '\n',
    },
  };
}

function resolveCwd
(
  config: BuildConfig_FnResolved
)
: void
{
  config.cwd = (
    config.cwd
    ? resolve(process.cwd(), config.cwd)
    : process.cwd()
  );
}

async function resolveFunctions
(
  config: BuildConfig
)
: Promise<void>
{
  const keys = getResolvableKeys();
  for (const key of keys) {
    if (!Object.hasOwn(config, key)) {
      const msg = (
        'Keys mismatch, getResolvableKeys()' +
        'provided key not found in config: ' +
        key
      );
      throw new Error(msg);
    }
    const keyValue = config[key];
    if (typeof keyValue !== 'function') continue;
    config[key] = keyValue();
  }
}

function assertFunctionsResolved
(
  config: BuildConfig,
)
: asserts config is BuildConfig_FnResolved
{
  const keys = getResolvableKeys();
  for (const key of keys) {
    const keyValue = config[key];
    if (typeof keyValue == 'function') continue;
    unresolvedConfigFunction(key);
  }
}

function getResolvableKeys
()
: Array<keyof BuildConfig>
{
  return [
    'jobSpec',
    'hooks',
    'logging',
    'cwd',
    'inputIgnore',
    'formatting',
  ];
}

function freezeConfig
(
  config: BuildConfig_FnResolved
)
: void
{
  Object.freeze(config);
}

function checkConfigFrozen
(
  config: BuildConfig_FnResolved
)
: void
{
  if (!Object.isFrozen(config)) {
    configNotReadonly();
  }
}

function assertConfigResolved
(
  config: BuildConfig_FnResolved
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
  config: BuildConfig_FnResolved
)
: void
{
  const reqKeys = [
    ['jobSpec', config.jobSpec],
    ['logging', config.logging],
    ['cwd', config.cwd],
    ['formatting', config.formatting],
    ['formatting.indent', config.formatting?.indent],
    ['formatting.newline', config.formatting?.newline],
  ] as const;

  const missingKeys = [];

  for (const key of reqKeys) {
    if (key[1]) continue;
    missingKeys.push(key[0]);
  }

  missingConfigKey(missingKeys.join(', '));
}


