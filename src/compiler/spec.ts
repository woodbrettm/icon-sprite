import type { DeepPartial } from 'ts-essentials';

import type {
  JobSpec,
  Job,
  JobSpecOptions,
} from '../types';

import process from 'node:process';

import { globby } from 'globby';
import { resolve } from 'pathe';
import { deepmergeInto } from 'deepmerge-ts';

export async function resolveJobSpecs
(
  jobSpecsArg: JobSpec | Array<JobSpec>,
  optionsArg?: DeepPartial<JobSpecOptions>,
)
: Promise<Array<Job>>
{
  const jobSpecs = Array.isArray(jobSpecsArg)
    ? jobSpecsArg
    : [jobSpecsArg]
  ;

  const options: JobSpecOptions = {
    cwd: process.cwd(),
  }

  deepmergeInto(options, optionsArg);

  const jobs: Array<Job> = [];

  for (const spec of jobSpecs) {
    const job = await specToJob(spec, options);
    jobs.push(job);
  }

  return jobs;
}

async function specToJob
(
  spec: JobSpec,
  options: JobSpecOptions,
)
: Promise<Job>
{
  const inputIgnore = spec.inputIgnore ?? options.inputIgnore;
  const files = await globby(
    spec.inputMatch,
    {
      cwd: options.cwd,
      absolute: true,
      unique: true,
      ...(
        inputIgnore &&
        { ignoreFiles: inputIgnore }
      ),
    }
  )

  const outputPath = spec.outputFile
    ? resolve(options.cwd, spec.outputFile)
    : false

  return Object.freeze({
    name: spec.name,
    inputFiles: files,
    outputFile: outputPath,
  });
}
