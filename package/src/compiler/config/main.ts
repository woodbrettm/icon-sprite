import type { BuildConfig } from './types.ts';
import type { DefBuildConfig } from './types.def.ts';
import type { DefBuildConfigResolved } from './types.def.ts';
import { deepFreeze } from '#vendor/deep-freeze-es6/main.ts';


export function defineConfig
(config: DefBuildConfig)
{
  return config;
}

export async function scaffoldBuildConfig
(defConfig: DefBuildConfig)
: Promise<BuildConfig>
{
  const config = await (
    resolveDefBuildConfig(defConfig)
    .then(convertToBuildConfig)
    .then(freezeConfig)
  );
  return config;
}

export async function resolveDefBuildConfig
(config: DefBuildConfig)
: Promise<DefBuildConfigResolved>
{

}

export function freezeConfig
(config: BuildConfig)
: BuildConfig
{
  return deepFreeze(config);
}

export async function convertToBuildConfig
(config: DefBuildConfigResolved)
: Promise<BuildConfig>
{
  // don't forget to clone the config!
  // use structuredClone function
}

export function assertBuildConfig
(config: DefBuildConfig | BuildConfig)
: asserts config is BuildConfig
{

}
