export class JobEntity {
  id: string;
  description: string;
  type: 'csop' | '43folders';
  dataDate: Date;
  taskDate: Date;
  files: Array<string> = new Array<string>();
}

export class Job extends JobEntity {
  status: string;
}

export type JobDto = {
  description: string;
  dataDate: Date;
  type: 'csop' | '43folders';
};
