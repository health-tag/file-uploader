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
      [job.id, job],
    );
    console.log(`Rows inserted ${r.changes}`);
  }

  async getJobAsync(jobId: string): Promise<Job> {
    let r: Array<{ id: string; data: JobEntity; status: string }> =
      await this.db.all(`SELECT * FROM jobs WHERE id = ?;`, [jobId]);
    return r.map((r) => {
      let job: Job = {
        status: r.status,
        ...r.data,
      };
      return job;
    })[0];
  }

  async getJobsAsync(): Promise<Array<Job>> {
    Logger.log("PP")
    let r: Array<{ id: string; data: JobEntity; status: string }> =
      await this.db.all(`SELECT * FROM jobs;`);
    Logger.log("PP")
    Logger.log(r)
    return r.map((r) => {
      let job: Job = {
        status: r.status,
        ...r.data,
      };
      return job;
    });
  }

  async deleteJobAsync(jobId: string) {
    let r = await this.db.run(`DELETE FROM jobs WHERE id = ?;`, [jobId]);
    console.log(`Rows deleted ${r.changes}`);
  }

  async runJobAsync(jobId: string) {
    PythonShell.run(
      './python/fhir-transformer/__main__.py',
      {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
      },
      function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
      },
    );
  }
}
