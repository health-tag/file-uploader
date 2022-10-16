import axios from "axios";
import { Job, JobDto } from "@shared/models/job";
import { BASE_API_URL as BASE_URL } from "configuration";
import { BundleResult } from "@shared/models/result";

export class JobAPI {
  static async addJobAsync(job: FormData) : Promise<boolean> {
    let r = await axios.post(`${BASE_URL}/job/`, job);
    return r.status < 400;
  }

  static async getJobAsync(id: string) : Promise<Job> {
    let r = await axios.get(`${BASE_URL}/job/${id}`);
    return r.data;
  }

  static async getJobLogAsync(id: string) : Promise<string> {
    let r = await axios.get(`${BASE_URL}/job/${id}/log`);
    return r.data;
  }

  static async getJobResultAsync(id: string)  : Promise<Array<BundleResult>>  {
    let r = await axios.get(`${BASE_URL}/job/${id}/result`);
    return r.data;
  }
  /*
  static async startQueueAsync() {
    let r = await axios.get(`${BASE_URL}/job/start`);
  }

  static async stopQueueAsync() {
    let r = await axios.get(`${BASE_URL}/job/stop`);
  }
*/
  static async deleteJobAsync(id: string) {
    let r = await axios.delete(`${BASE_URL}/job/${id}`);
    return r.status < 400;
  }

  static async getJobsAsync(): Promise<Array<Job>> {
    let r = await axios.get(`${BASE_URL}/job/`);
    (r.data as Array<Job>).forEach((j) => {
      j.dataDate = new Date(j.dataDate);
    });
    return r.data;
  }
}
