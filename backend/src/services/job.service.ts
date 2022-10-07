import { Injectable } from '@nestjs/common';
import { Job, JobEntity } from '@shared/models/job';
import { promises as fsp } from 'fs';
import { basename } from 'path';

async function exists(path) {
  try {
    await fsp.access(path);
    return true;
  } catch {
    return false;
  }
}

@Injectable()
export class JobService {

  async addJobAsync(files: Array<Express.Multer.File>, job: JobEntity) {
    let targetDir = `./workingdir/uploads/${job.id}`;
    await fsp.mkdir(targetDir, { recursive: true });
    for (var file of files) {
      let newfilePath = `${targetDir}/${file.originalname}`;
      await fsp.rename(file.path, newfilePath);
      job.files.push(file.originalname);
    }
    await fsp.writeFile(`${targetDir}/info.json`, JSON.stringify(job), {
      encoding: 'utf-8',
    });
    await fsp.writeFile(`${targetDir}/${job.type}`, '');
    console.log(`Create ${job.type} job at ${targetDir}`);
  }

  async getJobAsync(jobId: string): Promise<Job> {
    let targetDir = `./workingdir/uploads/${jobId}`;
    let job = JSON.parse(
      await fsp.readFile(`${targetDir}/info.json`, { encoding: 'utf-8' }),
    ) as Job;
    if (exists(`${targetDir}/done`)) {
      job.status = 'done';
    } else if (exists(`${targetDir}/error`)) {
      job.status = 'error';
    } else {
      job.status = 'pending';
    }
    return job;
  }

  getJobLogAsync(jobId: string): Promise<string> {
    let targetDir = `./workingdir/uploads/${jobId}`;
    return fsp.readFile(`${targetDir}/log.txt`, {encoding:"utf-8"});
  }

  getJobResultAsync(jobId: string): Promise<string> {
    let targetDir = `./workingdir/uploads/${jobId}`;
    return fsp.readFile(`${targetDir}/result.json`, {encoding:"utf-8"});
  }

  async getJobsAsync(): Promise<Array<Job>> {
    let jobs = new Array<Job>();
    for (let subdir of await fsp.readdir('./workingdir/uploads/')) {
      try {
        let job = await this.getJobAsync(basename(subdir));
        jobs.push(job);
      } catch (err) {
        console.log(err)
      }
    }
    return jobs;
  }

  async deleteJobAsync(jobId: string) {
    let targetDir = `./workingdir/uploads/${jobId}`;
    fsp.rm(targetDir, { recursive: true, force: true });
    console.log(`Delete job at ${targetDir}`);
  }

  /*async updateJobAsync(job: JobEntity) {
    let old: Array<{
      id: string;
      data: string;
      status: string;
      concurrency_token: string;
    }> = await this.db.all(`SELECT * FROM jobs WHERE id = ?;`, [job.id]);

    if (old.length == 0) throw new Error('entity not found');

    let r = await this.db.run(
      `UPDATE jobs SET data = ?, concurrency_token = hex(randomblob(16)) WHERE id = ? AND concurrency_token = ?;`,
      [JSON.stringify(job), job.id, old[0].concurrency_token],
    );
    console.log(`Rows updated ${r.changes}`);
  }

  async updateJobStateAsync(jobId: string, status: string) {
    let old: Array<{
      id: string;
      data: string;
      status: string;
      concurrency_token: string;
    }> = await this.db.all(`SELECT * FROM jobs WHERE id = ?;`, [jobId]);

    if (old.length == 0) throw new Error('entity not found');

    let r = await this.db.run(
      `UPDATE jobs SET status = ?, concurrency_token = hex(randomblob(16)) WHERE id = ? AND concurrency_token = ?;`,
      [status, jobId, old[0].concurrency_token],
    );
    console.log(`Rows status updated ${r.changes}`);
  }*/
}
