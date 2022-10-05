import { Injectable } from '@nestjs/common';
import { Job, JobEntity } from '@shared/models/job';
import { Database, open } from 'sqlite';
import * as sqlite from 'sqlite3';
import { PythonShell } from 'python-shell';
import { Logger } from '@nestjs/common';
@Injectable()
export class JobService {
  private db: Database<sqlite.Database, sqlite.Statement>;

  constructor() {
    (async () => {
      this.db = await open({
        filename: './workingdir/jobs.db',
        driver: sqlite.verbose().Database,
      });
      await this.db.run(`CREATE TABLE IF NOT EXISTS jobs(
        id TEXT PRIMARY KEY,
        data TEXT NOT NULL,
        status TEXT DEFAULT "not-start" NOT NULL,
        concurrency_token TEXT NOT NULL
        );`);
    })();
  }

  async addJobAsync(job: JobEntity) {
    let r = await this.db.run(
      `INSERT INTO jobs(id,data,concurrency_token) VALUES(?,json_insert(?),hex(randomblob(16)));`,
      [job.id, JSON.stringify(job)],
    );
    console.log(`Rows inserted ${r.changes}`);
  }

  async getJobAsync(jobId: string): Promise<Job> {
    let r: Array<{ id: string; data: string; status: string }> =
      await this.db.all(`SELECT * FROM jobs WHERE id = ?;`, [jobId]);
    return r.map((r) => {
      let job: Job = {
        status: r.status,
        ...JSON.parse(r.data),
      };
      return job;
    })[0];
  }

  async getJobsAsync(): Promise<Array<Job>> {
    let r: Array<{ id: string; data: string; status: string }> =
      await this.db.all(`SELECT * FROM jobs;`);
    let mapped = r.map((r) => {
      let job: Job = {
        status: r.status,
        ...JSON.parse(r.data),
      };
      return job;
    });
    return mapped;
  }

  async deleteJobAsync(jobId: string) {
    let r = await this.db.run(`DELETE FROM jobs WHERE id = ?;`, [jobId]);
    console.log(`Rows deleted ${r.changes}`);
  }

  async updateJobAsync(job: JobEntity) {
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
  }
}
