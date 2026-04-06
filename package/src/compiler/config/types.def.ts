import type { DefJob } from '#compiler/job/types.def.ts';
import type { DefJobResolved } from '#compiler/job/types.def.ts';
import type { DefPlugin } from '#compiler/plugin/types.def.ts';
import type { DefPluginResolved } from '#compiler/plugin/types.def.ts';
import type { DefLoggingSettings } from '#logger/types.def.ts';
import type { DefLoggingSettingsResolved } from '#logger/types.def.ts';
import type { FilePath} from '#utils/types.ts';
import type { Resolvable } from '#utils/types.ts';
import type { ResolvableArray } from '#utils/types.ts';
import type { ResolvedFilePath } from '#utils/types.ts';


export type DefBuildConfig = {
  jobs: ResolvableArray<DefJob>;
  logging?: Resolvable<DefLoggingSettings>;
  plugins?: ResolvableArray<DefPlugin>;
  root?: Resolvable<FilePath>;
};

export type DefBuildConfigResolved = {
  jobs: DefJobResolved[];
  logging?: DefLoggingSettingsResolved;
  plugins?: DefPluginResolved[];
  root?: ResolvedFilePath;
};
