import type { Resolvable } from '#utils/types.ts';
import type { DefHooks } from '#compiler/hook/types.def.ts';


export type DefPlugin = {
  name: Resolvable<string>;
} & Partial<DefHooks>;

export type DefPluginResolved = {
  name: string;
} & Partial<DefHooks>;
