export type Job = {
    id: string;
    description: string;
    type: "csop" | "43folders";
    date: Date;
    files: Array<string>;
  };

  export type JobDto = {
    description: string;
    type: "csop" | "43folders";
  };