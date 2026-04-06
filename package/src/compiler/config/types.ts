import type { Job } from '#compiler/job/types.ts';
import type { Plugin } from '#compiler/plugin/types.ts';
import type { LoggingSettings } from '#logger/types.ts';
import type { ResolvedFilePath } from '#utils/types.ts';


export type BuildConfig = {
  jobs: Job[];
  logging: LoggingSettings;
  plugins?: Plugin[];
  root: ResolvedFilePath;
};
