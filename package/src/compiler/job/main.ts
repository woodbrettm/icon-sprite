import type { BuildContext } from '#compiler/types.ts';
import type { DefJob } from './types.def.ts';
import type { Job } from './types.ts';
import { JOB_RUN } from './constants.ts';


export async function defineJob
(job: DefJob)
: Promise<DefJob>
{
  return job;
}

export async function runJobs
(jobs: Job[], ctx: BuildContext)
{
  runAsyncJobs(
    jobs.filter(job => job.runType === JOB_RUN.ASYNC),
    ctx,
  );
  runSyncJobs(
    jobs.filter(job => job.runType === JOB_RUN.SYNC),
    ctx,
  );
}

export async function runAsyncJobs
(job: Job[], ctx: BuildContext)
: Promise<void>
{
  // Don't forget job hooks
}

export async function runSyncJobs
(job: Job[], ctx: BuildContext)
: Promise<void>
{

}
