export const LOG_LEVEL = {
  SILENT: 0,
  DEBUG: 20,
  INFO: 40,
  WARN: 60,
  ERROR: 80,
} as const;

export const LOG_LEVEL_NAME = {
  SILENT: 'silent',
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
} as const;

export const LOG_LEVEL_NAME_R = {
  silent: 'SILENT',
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARN',
  error: 'ERROR',
} as const;
