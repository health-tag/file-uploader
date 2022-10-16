export class JobEntity {
  id: string = "";
  description: string = "";
  type: "csop" | "43folders" = "csop";
  dataDate: Date = new Date();
  taskDate: Date = new Date();
  files: Array<string> = new Array<string>();
}

export class Job extends JobEntity {
  status: "working" | "pending" | "error" | "done" | string = "";
}

export type JobDto = {
  description: string;
  dataDate: Date;
  type: "csop" | "43folders";
};
