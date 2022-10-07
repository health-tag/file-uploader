import Button from "@components/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Job } from "@shared/models/job";
import { JobAPI } from "services/JobService";
import { useEffect } from "react";
import { PencilIcon } from "@components/Icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL } from "App";
import { BundleResult } from "@shared/models/result";

const JobViewer = ({ job }: { job: Job }) => {
  const [isLogOpen, setIsLogOpen] = useState<boolean>(false);
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);
  const { t } = useTranslation("jobspage");
  const [log, setLog] = useState("");
  const [results, setResults] = useState<Array<BundleResult> | null>(null);

  const getLog = async () => {
    let r = await JobAPI.getJobLogAsync(job.id);
    setLog(r);
  };

  const getResult = async () => {
    let r = await JobAPI.getJobResultAsync(job.id);
    setResults(r);
  };

  return (
    <div className="card p-3">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <div className="bg-primary-gradient-light-2 text-white uppercase inline-block rounded-md py-1 px-2">
            {job.status}
          </div>
          <div className="bg-primary-gradient text-white uppercase inline-block rounded-md py-1 px-2">
            {job.type}
          </div>
          <span className="text-gray-400">{job.id}</span>
        </div>
        <h4>
          {job.dataDate.toLocaleDateString("th-TH", { dateStyle: "full" })}
        </h4>
        <div>{job.description}</div>
        <div>
          <h5 className="text-bold">{t("files")}</h5>
          <ol>
            {job.files.map((file, i) => (
              <li key={i}>{file}</li>
            ))}
          </ol>
          <Button mode="secondary" onClick={() => getLog()}>
            Log
          </Button>
          <Button mode="secondary" onClick={() => getResult()}>
            Result
          </Button>
        </div>
      </div>
      {isLogOpen && <div></div>}
      {isResultOpen && (
        <div>
          <p className="text-sm"></p>
          <table className="table-style-one">
            <thead>
              <th>ResourceName</th>
              <th>Description</th>
              <th>Status</th>
              <th>Location</th>
            </thead>
          </table>
        </div>
      )}
    </div>
  );
};

const JobsPage = () => {
  const { t } = useTranslation("jobspage");
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Array<Job>>(new Array<Job>());

  useEffect(() => {
    (async () => {
      let jobs = await JobAPI.getJobsAsync();
      setJobs(jobs);
    })();
  }, []);
  return (
    <div>
      <div className="page-t flex flex-row items-center">
        <h1 className="flex-1">{t("jobs")}</h1>
        <Button mode="primary" onClick={() => navigate("/jobs/add")}>
          <PencilIcon />
          {t("addJob")}
        </Button>
      </div>
      {jobs.map((job, i) => (
        <JobViewer key={i} job={job} />
      ))}
    </div>
  );
};

export default JobsPage;
