import { Injectable, Post } from '@nestjs/common';
import { JobDto } from '@shared/models/job';
import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { promisify } from 'util';

@Injectable()
export class JobService {
  private db: Database<sqlite3.Database, sqlite3.Statement>;

  constructor() {
    (async () => {
      this.db = await open({
        filename: '../workingdir/jobs.db',
        driver: sqlite3.Database,
      });
      await this.db.run(`CREATE TABLE IF NOT EXISTS jobs(
        id TEXT PRIMARY KEY,
        data TEXT NOT NULL,
        concurrency_token TEXT NOT NULL
        );`);
    })();
  }

  async addJobAsync(job: JobDto) {
    let r = await this.db.run(
      `INSERT INTO jobs(id,data,concurrency_token) VALUES(hex(randomblob(16)),json_insert(?),hex(randomblob(16)));`,
      [job],
    );
    console.log(`Rows inserted ${r.changes}`);
  } 

  async deletJobAsync(jobId: string) {
    let r = await this.db.run(`DELETE FROM jobs WHERE id = ?;`, [jobId]);
    console.log(`Rows deleted ${r.changes}`);
  }
}
