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
import { BundleResult, EntryResult } from "@shared/models/result";

const FHIR_SERVER_URL = "http://localhost:8080/fhir";

const transformResult = (results: Array<BundleResult>) => {
  let entries = results?.flatMap((r) => r.entries);
  let entriesCount = entries.length;
  let successCount = entries
    ?.map((e): number => {
      try {
        return parseInt((e.status as string).replace(/\D/, "")) < 400 ? 1 : 0;
      } catch (err) {
        return 0;
      }
    })
    .reduce((acc, current) => {
      return acc + current;
    });
  return {
    successCount,
    entriesCount,
    entries,
  };
};

const JobViewer = ({ job }: { job: Job }) => {
  const [isLogOpen, setIsLogOpen] = useState<boolean>(false);
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);
  const { t } = useTranslation("jobspage");
  const [log, setLog] = useState<string | null>(null);
  const [results, setResults] = useState<{
    successCount: number;
    entriesCount: number;
    entries: Array<EntryResult>;
  } | null>(null);

  const getLog = async () => {
    if (log == null) {
      let r = await JobAPI.getJobLogAsync(job.id);
      setLog(r);
    }
    setIsLogOpen((old) => !old);
  };

  const getResult = async () => {
    if (results == null) {
      let r = await JobAPI.getJobResultAsync(job.id);
      setResults(transformResult(r));
    }
    setIsResultOpen((old) => !old);
  };

  const getJobStatusCSS = (status: String) => {
    switch (status) {
      case "done":
        return "bg-lime-300";
      case "error":
        return "bg-orange-300";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="card p-3">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <div
            className={`${getJobStatusCSS(
              job.status
            )} uppercase inline-block rounded-md py-1 px-2`}
          >
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
          <ol className="my-3 p-3 rounded-lg bg-slate-100 list-decimal">
            {job.files.map((file, i) => (
              <li key={i} className="ml-3">
                {file}
              </li>
            ))}
          </ol>
          {job.status != "pending" && (
            <>
              <Button mode="secondary" onClick={() => getLog()}>
                Log
              </Button>
              <Button
                className="ml-3"
                mode="secondary"
                onClick={() => getResult()}
              >
                Result
              </Button>
            </>
          )}
        </div>
      </div>
      {isLogOpen && (
        <div
          className="my-3 p-3 rounded-lg bg-slate-800 text-white whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: log as string }}
        ></div>
      )}
      {isResultOpen && (
        <div className="my-3">
          <p className="my-1 text-sm">
            <b>Location</b> คือ URL ของ FHIR Resource สามารถใช้ URL
            นี้ในการเข้าดู FHIR Resource บน FHIR Server ได้
          </p>
          <div className="flex flex-row gap-3">
            <div className="p-3">
              <div className="text-2xl">{results?.successCount}</div>
              <div>/{results?.entriesCount}</div>
              <div>จำนวนการส่งข้อมูลที่สำเร็จ</div>
            </div>
          </div>
          {results?.entries.groupBy("resourceName").map((g) => (
            <>
              <h5>{g.key}</h5>
              <table className="table-style-1">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {g.value.map((e) => (
                    <tr>
                      <td>{e.description}</td>
                      <td>{e.status}</td>
                      <td>
                        {e.location != null && (
                          <a href={`${FHIR_SERVER_URL}/${e.location}`}>
                            {e.location}
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ))}
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
      <section className="flex flex-col gap-3">
        {jobs.map((job, i) => (
          <JobViewer key={i} job={job} />
        ))}
      </section>
    </div>
  );
};

export default JobsPage;
