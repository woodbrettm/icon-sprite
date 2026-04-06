import type { CustomHookMetadata } from '#root/src/compiler/hook/types.ts';
import type { DefJob } from '#root/src/compiler/job/types.def.ts';
import type { DefPlugin } from '#root/src/compiler/plugin/types.def.ts';
import type { FilePath, FilePathGlobPattern, Resolvable, ResolvableArray } from '#root/src/utils/types.ts';

/**
 * Config to be loaded from config file
 */
export type DefCliConfig = {
  jobs?: ResolvableArray<DefJob>;
  watch?: Resolvable<DefWatchSettings>;
  plugins?: ResolvableArray<DefPlugin>;
  root?: Resolvable<FilePath>;
};

// Pulling from chokidar settings:
// https://github.com/paulmillr/chokidar
// parcel/watcher might be ok too.
export type DefWatchSettings = {
  usePolling?: Resolvable<boolean>;
  files: (
    | Resolvable<FilePathGlobPattern>
    | ResolvableArray<FilePathGlobPattern>
  );
  ignore: unknown; // TODO: this.
};
