import Button from "@components/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Job } from "@shared/models/job";
import { JobAPI } from "services/JobService";
import { useEffect } from "react";
import { PencilIcon } from "@components/Icons";
import { useNavigate } from "react-router-dom";
import { BundleResult, EntryResult } from "@shared/models/result";
import { AddJobPageRoute } from "./Routes";
import { FHIR_SERVER_URL } from "configuration";
import { ConsoleLine } from "@shared/models/console";

let wssURL = `${window.location.protocol === "https:" ? "wss" : "ws"}://${
  window.location.hostname
}:3000/ws`;
const socket = new WebSocket(wssURL);
window["testsocket"] = socket;

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
  //const { socket } = useContext(SocketServiceContext);
  const [isConnected, setIsConnected] = useState(
    socket.readyState == socket.OPEN
  );
  const [tick, setTick] = useState<number>(0);
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

  const [liveLog, setLiveLog] = useState<Array<ConsoleLine>>([]);

  const showNormalLog = async () => {
    await getLog();
    setIsLiveLogOpen(false);
    setLiveLog([]);
  };

  useEffect(() => {
    if (job.status == "pending" || job.status == "working") {
      console.log(job.status)
      let openHandler = (e: Event) => {
        setIsConnected(true);
      };
      let errorHandler = (e: Event) => {
        console.log(e);
        setIsConnected(false);
      };
      let closeHandler = (e: CloseEvent) => {
        console.log(e.reason);
        setIsConnected(false);
      };
      let messageHandler = (e: MessageEvent) => {
        let { event, data }: { event: string; data: any } = JSON.parse(e.data);
        console.log(event);
        console.log(data);
        switch (event) {
          case "currentLogs":
            if (data[job.id] !== undefined) {
              setLiveLog(data[job.id]);
              setIsLiveLogOpen(true);
            }
            break;
          case "log":
            if (data.jobId === job.id) {
              setLiveLog((c) => {
                c.push(data);
                return c;
              });
              setTick((c) => c + 1);
            }
            break;
          case "finishLog":
            if (data == job.id) {
              job.status = "done";
              showNormalLog();
            }
            break;
          case "errorLog":
            if (data == job.id) {
              job.status = "error";
              showNormalLog();
            }
            break;
        }
      };

      socket.addEventListener("open", openHandler);
      socket.addEventListener("error", errorHandler);
      socket.addEventListener("close", closeHandler);
      socket.addEventListener("message", messageHandler);

      return () => {
        socket.removeEventListener("open", openHandler);
        socket.removeEventListener("error", errorHandler);
        socket.removeEventListener("close", closeHandler);
        socket.removeEventListener("message", messageHandler);
      };
    }
  }, []);

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
      case "working":
        return " bg-yellow-300";
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
            {t(job.status)}
          </div>
          <div className="bg-primary-gradient text-white uppercase inline-block rounded-md py-1 px-2">
            {t(job.type)}
          </div>
          <span className="text-gray-400">{job.id}</span>
        </div>
        <h4>
          {job.dataDate.toLocaleDateString("th-TH", { dateStyle: "full" })}
        </h4>
        {job.description && <div>job.description</div>}
        <div>
          <h5 className="text-bold">{t("files")}</h5>
          <ol className="mb-3 p-4 rounded-lg bg-slate-100 list-decimal">
            {job.files.map((file, i) => (
              <li key={i} className="ml-3">
                {file}
              </li>
            ))}
          </ol>
          {(job.status == "done" || job.status == "error") && (
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
          {liveLog.map((c, i) => (
            <div key={i} className="whitespace-pre-line">
              {c.line}
            </div>
          ))}
        </div>
      )}
      {isLogOpen && (
        <div
          className="my-3 p-3 rounded-lg bg-slate-800 text-white whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: log as string }}
        ></div>
      )}
      {isResultOpen && (
        <div className="my-3">
          <div className="my-3 card p-3">
            <h5>{t("putResult")}</h5>
            <div className="text-2xl">
              {t("success")} {results?.successCount} {t("total")}{" "}
              {results?.entriesCount}
            </div>
          </div>
          {results?.entries.groupBy("resourceName").map((g) => (
            <div className="mb-6">
              <h5 className="sticky mb-3">{g.key}</h5>
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
                          <a
                            className="underline text-secondary"
                            href={`${FHIR_SERVER_URL}/${e.location}`}
                          >
                            {e.location}
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const JobsPage = () => {
  //const { socket } = useContext(SocketServiceContext);
  const [isConnected, setIsConnected] = useState(
    socket.readyState == socket.OPEN
  );
  const { t } = useTranslation("jobspage");
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Array<Job>>(new Array<Job>());

  useEffect(() => {
    (async () => {
      let jobs = await JobAPI.getJobsAsync();
      setJobs(jobs);
    })();
  }, []);

  useEffect(() => {
    let openHandler = (e: Event) => {
      console.log(socket.readyState);
      setIsConnected(true);
    };
    let errorHandler = (e: Event) => {
      console.log(e);
      setIsConnected(false);
    };
    let closeHandler = (e: CloseEvent) => {
      console.log(e.reason);
      setIsConnected(false);
    };
    socket.addEventListener("open", openHandler);
    socket.addEventListener("error", errorHandler);
    socket.addEventListener("close", closeHandler);
    return () => {
      socket.removeEventListener("open", openHandler);
      socket.removeEventListener("error", errorHandler);
      socket.removeEventListener("close", closeHandler);
    };
  }, []);

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
        {jobs.map((job, i) => (
          <JobViewer key={i} job={job} />
        ))}
      </section>
    </div>
  );
};

export default JobsPage;
