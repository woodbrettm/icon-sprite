import type { Hooks } from '#compiler/hook/types.ts';


export type Plugin = {
  name: string;
} & Partial<Hooks>;
