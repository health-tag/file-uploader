import axios from "axios";
import { Job, JobDto } from "@shared/models/job";
import { BASE_API_URL as BASE_URL } from "App";

export class JobAPI {
  static async addJobAsync(job: FormData) {
    let r = await axios.post(`${BASE_URL}/job/`, job);
  }

  static async getJobAsync(id: string) {
    let r = await axios.get(`${BASE_URL}/job/${id}`);
  }

  static async queueJobAsync(id: string) {
    let r = await axios.get(`${BASE_URL}/job/${id}/queue`);
  }

  static async startQueueAsync() {
    let r = await axios.get(`${BASE_URL}/job/start`);
  }

  static async stopQueueAsync() {
    let r = await axios.get(`${BASE_URL}/job/stop`);
  }

  static async deleteJobAsync(id: string) {
    let r = await axios.delete(`${BASE_URL}/job/${id}`);
  }

  static async getJobsAsync(): Promise<Array<Job>> {
    let r = await axios.get(`${BASE_URL}/job/`);
    (r.data as Array<Job>).forEach((j) => {
      j.dataDate = new Date(j.dataDate);
    });
    return r.data;
  }
}
