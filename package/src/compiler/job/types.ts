import type { ResolvedFilePath } from '#utils/types.ts';
import type { XMLAST } from '#vendor/fast-xml-parser/types.ts';
import * as CO from './constants';


export type JobStatusMap = typeof CO.JOB_STATUS;
export type JobStatus = JobStatusMap[keyof JobStatusMap];

export type JobIOTypeMap = typeof CO.JOB_IO;
export type JobIOType = JobIOTypeMap[keyof JobIOTypeMap];

export type JobRunTypeMap = typeof CO.JOB_RUN;
export type JobRunType = JobRunTypeMap[keyof JobRunTypeMap];

export type Job = {
  name: string;
  input: JobInputSpec[];
  output: JobOutputSpec[];
  status: JobStatus;
  runType: JobRunType;
  timestamps: JobTimestamps;
};

export type JobTimestamps = {
  started?: Date;
  stopped?: Date;
};

export type JobInputSpec = (
  | JobInputSpecRaw
  | JobInputSpecAst
  | JobInputSpecFile
);

export type JobInputSpecRaw = {
  type: JobIOTypeMap['RAW'];
  value: string[];
};

export type JobInputSpecAst = {
  type: JobIOTypeMap['AST'];
  value: XMLAST[];
};

export type JobInputSpecFile = {
  type: JobIOTypeMap['FILE'];
  value: ResolvedFilePath[];
};

export type JobOutputSpec = (
  | JobOutputSpecRaw
  | JobOutputSpecAst
  | JobOutputSpecFile
);

export type JobOutputSpecRaw = {
  type: JobIOTypeMap['RAW'];
  value: string;
};

export type JobOutputSpecAst = {
  type: JobIOTypeMap['AST'];
  value: XMLAST;
};

export type JobOutputSpecFile = {
  type: JobIOTypeMap['FILE'];
  value: ResolvedFilePath[];
};
