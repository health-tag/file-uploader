import axios from "axios";
import { Job, JobDto } from "@shared/models/job";

const BASE_URL = "http://localhost:3000";

export class JobAPI {
  static async addJobAsync(job: JobDto) {
    let r = await axios.post(`${BASE_URL}/job/`, job);
  }

  static async getJobAsync(id: string) {
    let r = await axios.get(`${BASE_URL}/job/${id}`);
  }

  static async deleteJobAsync(id: string) {
    let r = await axios.delete(`${BASE_URL}/job/${id}`);
  }

  static async getJobsAsync(): Promise<Array<Job>> {
    let r = await axios.get(`${BASE_URL}/job/`);
    return r.data;
  }
}
