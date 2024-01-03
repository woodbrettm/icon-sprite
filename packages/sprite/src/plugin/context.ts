import type {
  PluginContext,
  PluginCustomData,
  FormattingOptions,
  GeneralRecord,
  ResolvedWorkDir,
} from '../types';

import { klona } from 'klona';

import { isRecord } from '../utils/predicates';

export function initPluginContext
(
  options: {
    workDir: ResolvedWorkDir;
    formatting: FormattingOptions,
  },
)
: Readonly<PluginContext>
{
  return Object.freeze({
    customData: defineCustomData({}),
    workDir: options.workDir,
    formatting: (
      isRecord(options.formatting)
        ? Object.freeze(klona(options.formatting))
        : options.formatting
    ),
  });
}

function defineCustomData
<
  T extends GeneralRecord,
>
(
  data: T,
)
: PluginCustomData
{
  return data;
}
