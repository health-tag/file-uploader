export type BundleResult = {
  statusCode: number;
  fhirErrorResponse?: FHIRErrorOutcome;
  entries: Array<EntryResult>;
};

export type EntryResult = {
  resourceName: string;
  description: string;
  status?: string;
  location?: string;
  fhirErrorResponse?: FHIRErrorResponse;
};

export type FHIRErrorResponse = {
  status: string;
  outcome: FHIRErrorOutcome;
};

export type FHIRErrorOutcome = {
  resourceType: string;
  issue: Array<FHIRErrorIssue>;
};

export type FHIRErrorIssue = {
  severity: string;
  code: string;
  diagnostics: string;
};
