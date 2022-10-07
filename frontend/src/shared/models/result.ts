export type BundleResult = {
  statusCode: number;
  entries: Array<EntryResult>;
};

export type EntryResult = {
  resourceName: string;
  description: string;
  status: string | undefined | null;
  location: string | undefined | null;
};
