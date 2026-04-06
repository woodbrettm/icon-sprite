import type { XMLAST } from '#vendor/fast-xml-parser/types.ts';
import type { FilePath } from '#utils/types.ts';
import type { FilePathGlobPattern } from '#utils/types.ts';
import type { Resolvable } from '#utils/types.ts';
import type { ResolvableArray } from '#utils/types.ts';
import type { JobIOTypeMap } from './types.ts';
import type { JobRunType } from './types.ts';


export type DefJob = {
  name: Resolvable<string>;
  input: ResolvableArray<DefJobInputSpec>;
  output: ResolvableArray<DefJobOutputSpec>;
  runType?: Resolvable<JobRunType>;
};

export type DefJobResolved = {
  name: string;
  input: DefJobInputSpec[];
  output: DefJobOutputSpec[];
  runType?: JobRunType;
};

export type DefJobInputSpec = (
  | DefJobInputSpecRaw
  | DefJobInputSpecAst
  | DefJobInputSpecFile
);

export type DefJobInputSpecRaw = {
  type: JobIOTypeMap['RAW'];
  value: string[];
};

export type DefJobInputSpecAst = {
  type: JobIOTypeMap['AST'];
  value: XMLAST[];
}

export type DefJobInputSpecFile = {
  type: JobIOTypeMap['FILE'];
  value: FilePathGlobPattern[];
};

export type DefJobOutputSpec = (
  | DefJobOutputSpecRaw
  | DefJobOutputSpecAst
  | DefJobOutputSpecFile
);

export type DefJobOutputSpecRaw = {
  type: JobIOTypeMap['RAW'];
};

export type DefJobOutputSpecAst = {
  type: JobIOTypeMap['AST'];
};

export type DefJobOutputSpecFile = {
  type: JobIOTypeMap['FILE'];
  value: FilePath[];
};
