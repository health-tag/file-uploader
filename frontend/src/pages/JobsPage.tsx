import Button from "@components/Button";
import { useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Job } from "@shared/models/job";
import { JobAPI } from "apis/JobAPI";
import { useEffect } from "react";
import { PencilIcon, XIcon } from "@components/Icons";
import { useNavigate } from "react-router-dom";
import { BundleResult, EntryResult } from "@shared/models/result";
import { AddJobPageRoute } from "./Routes";
import { ConsoleLine } from "@shared/models/console";
import { SocketContext } from "providers/SocketProvider";
import React from "react";

import { SuccessfulTable } from "@components/ResultTable/SuccessfulTable";
import { ErrorTable } from "@components/ResultTable/ErrorTable";

const transformResult = (results: Array<BundleResult>) => {
  let entries = results?.flatMap((r) =>
    r.entries.map((e) => {
      if (r.fhirErrorResponse != null) {
        e.fhirErrorResponse = {
          status: "",
          outcome: r.fhirErrorResponse,
        };
      }
      return e;
    })
  );
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

const parseStatusCode = (statusTextWithCode: string) => {
  let statusCode = 1000;
  try {
    statusCode = parseInt(statusTextWithCode.replace(/\D/, ""));
  } catch {}
  return statusCode;
};

const renderBundleErrorTable = (
  groupedByStatus: {
    key: string;
    value: EntryResult[];
  },
  reactKey: any
) => {
  return (
    <React.Fragment key={reactKey}>
      <p className="font-bold">{groupedByStatus.key}</p>
      <div>
        {groupedByStatus.value[0]?.fhirErrorResponse?.outcome.issue.map(
          (issue, i) => (
            <p key={i}>
              <b className="mr-1">
                {issue.severity} - {issue.code}
              </b>
              {issue.diagnostics}
            </p>
          )
        )}
      </div>
      <table className="table-style-1">
        <thead>
          <tr>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {groupedByStatus.value.map((e, i) => (
            <tr key={i}>
              <td>{e.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

const JobViewer = ({
  job,
  onSuccessfulDelete,
}: {
  job: Job;
  onSuccessfulDelete: (id: string) => void;
}) => {
  const { messages } = useContext(SocketContext);
  const [isLiveLogOpen, setIsLiveLogOpen] = useState<boolean>(false);
  const [isLogOpen, setIsLogOpen] = useState<boolean>(false);
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);
  const { t } = useTranslation("jobspage", { keyPrefix: "jobViewer" });
  const [log, setLog] = useState<string | null>(null);
  const [results, setResults] = useState<{
    successCount: number;
    entriesCount: number;
    entries: Array<EntryResult>;
  } | null>(null);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const liveLogDiv = useRef<HTMLDivElement>(null);
  const [liveLog, setLiveLog] = useState<Array<ConsoleLine>>([]);

  const showNormalLog = async () => {
    await getLog();
    setIsLiveLogOpen(false);
    setLiveLog([]);
  };

  useEffect(() => {
    if (autoScroll) {
      liveLogDiv.current?.scroll({
        top: liveLogDiv.current?.scrollHeight,
        behavior: "auto",
      });
    }
  }, [messages, autoScroll]);

  useEffect(() => {
    let logs = new Array<ConsoleLine>();
    for (const { event, data } of messages) {
      switch (event) {
        case "currentLogs":
          if (data[job.id] !== undefined) {
            job.status = "working";
            logs = data[job.id];
          }
          break;
        case "log":
          if (data.jobId === job.id) {
            job.status = "working";
            logs.push(data);
          }
          break;
        case "finishLog":
          if (data === job.id) {
            job.status = "done";
            showNormalLog();
          }
          break;
        case "errorLog":
          if (data === job.id) {
            job.status = "error";
            showNormalLog();
          }
          break;
      }
    }
    if (logs.length > 0) {
      setLiveLog(logs);
      setIsLiveLogOpen(true);
    }
  }, [messages]);

  const getLog = async () => {
    if (log === null) {
      let r = await JobAPI.getJobLogAsync(job.id);
      setLog(r);
    }
    setIsLogOpen((old) => !old);
  };

  const getResult = async () => {
    if (results === null) {
      let r = await JobAPI.getJobResultAsync(job.id);
      setResults(transformResult(r));
    }
    setIsResultOpen((old) => !old);
  };

  const getJobStatusCSS = (status: String) => {
    switch (status) {
      case "done":
        return "bg-lime-300";
      case "working":
        return " bg-yellow-300";
      case "error":
        return "bg-orange-300";
      default:
        return "bg-gray-100";
    }
  };

  const deleteHandler = async () => {
    if (await JobAPI.deleteJobAsync(job.id)) {
      onSuccessfulDelete?.call(this, job.id);
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
            {t(job.status)}
          </div>
          <div className="bg-primary-gradient text-white uppercase inline-block rounded-md py-1 px-2">
            {t(job.type)}
          </div>
          <span className="text-gray-400">{job.id}</span>
          {job.status != "working" && (
            <Button mode="danger" onClick={deleteHandler}>
              <XIcon />
              {t("delete")}
            </Button>
          )}
        </div>
        <h4>
          {job.dataDate.toLocaleDateString("th-TH", { dateStyle: "full" })}
        </h4>
        {job.description && <div>{job.description}</div>}
        <div>
          <h5 className="text-bold">{t("files")}</h5>
          <ol className="mb-3 p-4 rounded-lg bg-slate-100 list-decimal">
            {job.files.map((file, i) => (
              <li key={i} className="ml-3">
                {file}
              </li>
            ))}
          </ol>
          {(job.status === "done" || job.status === "error") && (
            <>
              <Button mode="secondary" onClick={() => getLog()}>
                {t("logs")}
              </Button>
              <Button
                className="ml-3"
                mode="secondary"
                onClick={() => getResult()}
              >
                {t("result")}
              </Button>
            </>
          )}
        </div>
      </div>
      {isLiveLogOpen && (
        <div className="my-3 p-3 rounded-lg bg-slate-800 text-white">
          <input
            id={`${job.id}-autoscroll`}
            type="checkbox"
            className="mr-1"
            checked={autoScroll}
            onChange={() => setAutoScroll((c) => !c)}
          />
          <label htmlFor={`${job.id}-autoscroll`}>{t("autoScroll")}</label>
          <hr className="border-white my-3" />
          <div ref={liveLogDiv} className="max-h-[400px] overflow-y-auto">
            {liveLog.map((c, i) => (
              <div key={`${job.id}-${i}`} className="whitespace-pre-line">
                {c.line}
              </div>
            ))}
          </div>
        </div>
      )}
      {isLogOpen && (
        <div
          className="my-3 p-3 rounded-lg bg-slate-800 text-white whitespace-pre-line max-h-[400px] overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: log as string }}
        ></div>
      )}
      {isResultOpen && (
        <div className="my-3">
          <div className="my-3 p-3">
            <h5>{t("putResult")}</h5>
            <div className="text-2xl">
              {t("success")} {results?.successCount} {t("total")}{" "}
              {results?.entriesCount}
            </div>
          </div>
          <hr className="my-3" />
          {results?.entries
            .groupBy("resourceName")
            .map((groupedByResourceName, i) => (
              <div className="mb-6" key={i}>
                <h5 className="mb-3">{groupedByResourceName.key}</h5>
                {groupedByResourceName.value
                  .groupBy("status")
                  .map((groupedByStatus, j) => {
                    const statusCode = parseStatusCode(groupedByStatus.key);
                    if (statusCode < 400) {
                      return (
                        <SuccessfulTable
                          key={j}
                          groupedByStatus={groupedByStatus}
                        />
                      );
                    } else if (statusCode < 591) {
                      return (
                        <ErrorTable
                          key={j}
                          groupedByStatus={groupedByStatus}
                        />
                      );
                    } else {
                      return renderBundleErrorTable(groupedByStatus, j);
                    }
                  })}
                <hr className="my-3" />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const JobsPage = () => {
  const { isConnected } = useContext(SocketContext);

  const { t } = useTranslation("jobspage");
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Array<Job>>(new Array<Job>());

  useEffect(() => {
    (async () => {
      let jobs = await JobAPI.getJobsAsync();
      setJobs(jobs.sort((a, b) => b.dataDate.getTime() - a.dataDate.getTime()));
    })();
  }, []);

  const onSuccessfulDeleteHandler = (id: string) => {
    setJobs((currentJobs) => currentJobs.filter((j) => j.id !== id));
  };

  return (
    <div>
      <div className="page-t flex flex-row items-center gap-3">
        <h1 className="flex-1">{t("tasks")}</h1>
        {isConnected && (
          <div className="uppercase inline-block rounded-md py-2 px-3 bg-red-400 text-white">
            Live
          </div>
        )}
        <Button mode="primary" onClick={() => navigate(AddJobPageRoute)}>
          <PencilIcon />
          {t("addJob")}
        </Button>
      </div>
      <section className="flex flex-col gap-3">
        {jobs.map((job) => (
          <JobViewer
            key={job.id}
            job={job}
            onSuccessfulDelete={onSuccessfulDeleteHandler}
          />
        ))}
      </section>
    </div>
  );
};

export default JobsPage;
