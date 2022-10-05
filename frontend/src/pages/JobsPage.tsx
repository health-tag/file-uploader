import Button from "@components/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Job } from "@shared/models/job";
import { JobAPI } from "services/JobService";
import { useEffect } from "react";
import { AcceptIcon, PencilIcon } from "@components/Icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL } from "App";

type BundleResult = {
  statusCode: number;
  entries: Array<EntryResult>;
};

type EntryResult = {
  resourceName: string;
  description: string;
  status: string | undefined | null;
  location: string | undefined | null;
};

let data: Array<BundleResult> = JSON.parse(`[
    {
     "statusCode": 200,
     "entries": [
      {
       "resourceName": "Organization",
       "description": "Organization/0xC88a594dBB4e9F1ce15d59D0ED129b92E6d89884",
       "status": "200 OK",
       "location": "Organization/0xC88a594dBB4e9F1ce15d59D0ED129b92E6d89884/_history/1"
      }
     ]
    },
    {
     "statusCode": 200,
     "entries": [
      {
       "resourceName": "Location",
       "description": "Location?identifier=https://sil-th.org/CSOP/station|001",
       "status": "200 OK",
       "location": "Location/2/_history/1"
      }
     ]
    },
    {
     "statusCode": 200,
     "entries": [
      {
       "resourceName": "Practitioner",
       "description": "Practitioner?identifier=https://www.tmc.or.th|45842",
       "status": "200 OK",
       "location": "Practitioner/3/_history/1"
      }
     ]
    },
    {
     "statusCode": 200,
     "entries": [
      {
       "resourceName": "Patient",
       "description": "Patient?identifier=https://sil-th.org/CSOP/hn|500000000",
       "status": "200 OK",
       "location": "Patient/4/_history/1"
      }
     ]
    },
    {
     "statusCode": 200,
     "entries": [
      {
       "resourceName": "Encounter",
       "description": "Encounter/O-NM2-3142-00000004",
       "status": "200 OK",
       "location": "Encounter/5/_history/1"
      },
      {
       "resourceName": "Encounter",
       "description": "Encounter/O-NM2-3142-00000004",
       "status": "200 OK",
       "location": "Encounter/5/_history/1"
      },
      {
       "resourceName": "Encounter",
       "description": "Encounter/O-NM2-3142-00000004",
       "status": "200 OK",
       "location": "Encounter/5/_history/1"
      },
      {
       "resourceName": "Encounter",
       "description": "Encounter/O-NM2-3142-00000004",
       "status": "200 OK",
       "location": "Encounter/5/_history/1"
      },
      {
       "resourceName": "Encounter",
       "description": "Encounter/O-NM2-3142-00000004",
       "status": "200 OK",
       "location": "Encounter/5/_history/1"
      }
     ]
    },
    {
     "statusCode": 200,
     "entries": [
      {
       "resourceName": "MedicationDispense",
       "description": "MedicationDispense/O-NM2-3142-00000004|ASPT8",
       "status": "200 OK",
       "location": "MedicationDispense/6/_history/1"
      },
      {
       "resourceName": "MedicationDispense",
       "description": "MedicationDispense/O-NM2-3142-00000004|ATET5",
       "status": "200 OK",
       "location": "MedicationDispense/7/_history/1"
      },
      {
       "resourceName": "MedicationDispense",
       "description": "MedicationDispense/O-NM2-3142-00000004|ATOTL40",
       "status": "200 OK",
       "location": "MedicationDispense/8/_history/1"
      },
      {
       "resourceName": "MedicationDispense",
       "description": "MedicationDispense/O-NM2-3142-00000004|LOSTZ5",
       "status": "200 OK",
       "location": "MedicationDispense/9/_history/1"
      },
      {
       "resourceName": "MedicationDispense",
       "description": "MedicationDispense/O-NM2-3142-00000004|OMETM",
       "status": "200 OK",
       "location": "MedicationDispense/10/_history/1"
      }
     ]
    }
   ]`);

const JobViewer = ({ job }: { job: Job }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useTranslation("jobspage");
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
          <div></div>
          <Button
            mode="secondary"
            onClick={() => axios.get(`${BASE_API_URL}/job/${job.id}/queue`)}
          >
            Queue
          </Button>
          <Button mode="secondary">Log</Button>
        </div>
      </div>
      {isOpen && <div></div>}
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
        <Button
          mode="primary"
          onClick={() => axios.get(`${BASE_API_URL}/job/start`)}
        >
          <AcceptIcon />
          Start
        </Button>
      </div>
      {jobs.map((job, i) => (
        <JobViewer key={i} job={job} />
      ))}
    </div>
  );
};

export default JobsPage;
