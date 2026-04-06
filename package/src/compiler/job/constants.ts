export const JOB_STATUS = {
  BACKLOG: 'backlog',
  RUNNING: 'running',
  FAILED: 'failed',
  SUCCESS: 'success',
} as const;

export const JOB_IO = {
  RAW: 'raw',
  AST: 'ast',
  FILE: 'file',
} as const;

export const JOB_RUN = {
  ASYNC: 'async',
  SYNC: 'sync',
} as const;
