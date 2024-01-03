import type {
  BuildConfig,
  ResolvedConfig,
  HookRegistry,
  HookLookup,
  Plugin,
  PluginContext,
  Job,
} from '../types';

import {
  isString,
  hasKey,
  isUndefined,
} from '../utils/predicates';

import { mergeIntoConfig } from '../compiler/config';

export const HOOK_NAMES:
readonly [...(keyof HookLookup)[]] = [
  'editConfig',
  'emitFile',
  'finalize',
  'format',
  'iconFilePath',
  'iconId',
  'jobEnd',
  'jobStart',
  'loadIcon',
  'parse',
  'setup',
  'spriteHeader',
  'spriteFooter',
  'teardown',
  'transformIcon',
];

export function initHookRegistry
()
: HookRegistry
{
  const registry: HookRegistry = {
    editConfig: [],
    setup: [],
    jobStart: [],
    spriteHeader: [],
    iconFilePath: [],
    loadIcon: [],
    iconId: [],
    transformIcon: [],
    spriteFooter: [],
    finalize: [],
    parse: [],
    format: [],
    emitFile: [],
    jobEnd: [],
    teardown: [],
  };
  return registry;
}

// TODO: Dynamically register based on plugin name
// issues with type narrowing atm when doing so. Need a generic
// register function.

export function registerEditConfigHooks
(
  registry: HookRegistry,
  config: BuildConfig,
)
: void
{
  if (isUndefined(config.plugins)) return;
  for (const plugin of config.plugins) {
    if (isUndefined(plugin.editConfig)) continue;
    const editConfig = resolveHook(plugin, 'editConfig');
    if (editConfig) registry.editConfig.push(editConfig);
  }
}

export function registerBuildHooks
(
  registry: HookRegistry,
  config: ResolvedConfig,
)
{
  if (isUndefined(config.plugins)) return;
  for (const plugin of config.plugins) {
    registerPluginHooks(plugin, registry);
  }
}

export function registerPluginHooks
(
  plugin: Plugin,
  registry: HookRegistry,
)
: void
{
  /*
    Leaving out editConfig hook, as it's already registered
    by registerEditConfigHooks. registerPluginHooks is run against
    the resolved config, whereas editConfig hook needs to be run
    against an unresolved config.
  */
  const setup = resolveHook(plugin, 'setup');
  if (setup) registry.setup.push(setup);
  const jobStart = resolveHook(plugin, 'jobStart');
  if (jobStart) registry.jobStart.push(jobStart);
  const spriteHeader = resolveHook(plugin, 'spriteHeader');
  if (spriteHeader) registry.spriteHeader.push(spriteHeader);
  const iconFilePath = resolveHook(plugin, 'iconFilePath');
  if (iconFilePath) registry.iconFilePath.push(iconFilePath);
  const loadIcon = resolveHook(plugin, 'loadIcon');
  if (loadIcon) registry.loadIcon.push(loadIcon);
  const iconId = resolveHook(plugin, 'iconId');
  if (iconId) registry.iconId.push(iconId);
  const transformIcon = resolveHook(plugin, 'transformIcon');
  if (transformIcon) registry.transformIcon.push(transformIcon);
  const spriteFooter = resolveHook(plugin, 'spriteFooter');
  if (spriteFooter) registry.spriteFooter.push(spriteFooter);
  const finalize = resolveHook(plugin, 'finalize');
  if (finalize) registry.finalize.push(finalize);
  const parse = resolveHook(plugin, 'parse');
  if (parse) registry.parse.push(parse);
  const format = resolveHook(plugin, 'format');
  if (format) registry.format.push(format);
  const emitFile = resolveHook(plugin, 'emitFile');
  if (emitFile) registry.emitFile.push(emitFile);
  const jobEnd = resolveHook(plugin, 'jobEnd');
  if (jobEnd) registry.jobEnd.push(jobEnd);
  const teardown = resolveHook(plugin, 'teardown');
  if (teardown) registry.teardown.push(teardown);
}

export function resolveHook
<
  N extends keyof HookLookup,
>
(
  plugin: Plugin,
  hookName: N,
)
: HookLookup[N] | undefined
{
  if (!hasKey(plugin, hookName)) return;
  if (!HOOK_NAMES.includes(hookName)) {
    throw new TypeError(`Invalid hookName: ${hookName}`);
  }
  const { [hookName]: hookFunc } = plugin;
  // TODO: Shouldn't have to do a type assertion
  const resolvedHook = {
    plugin: plugin.name,
    name: hookName,
    call: hookFunc,
  } as HookLookup[N];
  return resolvedHook;
}

// TODO: Single Call Hook Function

export async function callEditConfigHooks
(
  registry: HookRegistry,
  config: BuildConfig,
)
: Promise<void>
{
  for (const hook of registry.editConfig) {
    const boundCall = hook.call.bind({});
    const res = await boundCall(config);
    if (res) mergeIntoConfig(config, res);
  }
}

export async function callSetupHooks
(
  registry: HookRegistry,
  context: PluginContext,
  config: ResolvedConfig,
)
: Promise<void>
{
  for (const hook of registry.setup) {
    const boundCall = hook.call.bind(context);
    await boundCall(config);
  }
}

export async function callJobStartHooks
(
  registry: HookRegistry,
  context: PluginContext,
  job: Job,
)
: Promise<void>
{
  for (const hook of registry.jobStart) {
    const boundCall = hook.call.bind(context);
    await boundCall(job);
  }
}

export async function callSpriteHeaderHooks
(
  registry: HookRegistry,
  context: PluginContext,
  headerArg: string,
)
: Promise<string>
{
  let header = headerArg;
  for (const hook of registry.spriteHeader) {
    const boundCall = hook.call.bind(context);
    const res = await boundCall(header);
    header = (isString(res)) ? res : header;
  }
  return header;
}

export async function callIconFilePathHooks
(
  registry: HookRegistry,
  context: PluginContext,
  filePathArg: string,
)
: Promise<string>
{
  let filePath = filePathArg;
  for (const hook of registry.iconFilePath) {
    const boundCall = hook.call.bind(context);
    const res = await boundCall(filePath);
    filePath = (isString(res)) ? res : filePath;
  }
  return filePath;
}


export async function callLoadIconHooks
(
  registry: HookRegistry,
  context: PluginContext,
  fileContentArg: string,
)
: Promise<string>
{
  let fileContent = fileContentArg;
  for (const hook of registry.loadIcon) {
    const boundCall = hook.call.bind(context);
    const res = await boundCall(fileContent);
    fileContent = (isString(res)) ? res : fileContent;
  }
  return fileContent;
}

export async function callIconIdHooks
(
  registry: HookRegistry,
  context: PluginContext,
  iconIdArg: string,
)
: Promise<string>
{
  let iconId = iconIdArg;
  for (const hook of registry.iconId) {
    const boundCall = hook.call.bind(context);
    const res = await boundCall(iconId);
    iconId = (isString(res)) ? res : iconId;
  }
  return iconId;
}

export async function callTransformIconHooks
(
  registry: HookRegistry,
  context: PluginContext,
  iconArg: string,
)
: Promise<string>
{
  let icon = iconArg;
  for (const hook of registry.transformIcon) {
    const boundCall = hook.call.bind(context);
    const res = await boundCall(icon);
    icon = (isString(res)) ? res : icon;
  }
  return icon;
}

export async function callSpriteFooterHooks
(
  registry: HookRegistry,
  context: PluginContext,
  footerArg: string,
)
: Promise<string>
{
  let footer = footerArg;
  for (const hook of registry.spriteFooter) {
    const boundCall = hook.call.bind(context);
    const res = await boundCall(footer);
    footer = (isString(res)) ? res : footer;
  }
  return footer;
}

export async function callFinalizeHooks
(
  registry: HookRegistry,
  context: PluginContext,
  spriteArg: string,
)
: Promise<string>
{
  let sprite = spriteArg;
  for (const hook of registry.finalize) {
    const boundCall = hook.call.bind(context);
    const res = await boundCall(sprite);
    sprite = (isString(res)) ? res : sprite;
  }
  return sprite;
}

export async function callTeardownHooks
(
  registry: HookRegistry,
  context: PluginContext,
)
: Promise<void>
{
  for (const hook of registry.teardown) {
    const boundCall = hook.call.bind(context);
    await boundCall();
  }
}
