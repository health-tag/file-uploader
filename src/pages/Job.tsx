import { useTranslation } from "react-i18next"

type Jobs = {
    id: string,
    name: string,
    type: "csop" | "43folders",
    date: Date,
    files: Array<string>
}

type JobResultResourceResult = {
    identifier: string,
    statusCode: string,
    error: string | undefined
}

type JobResultResource = {
    resourceName: string,
    results: Array<JobResultResourceResult>
}

type JobResult = {
    id: string,
    name: string,
    type: "csop" | "43folders",
    date: Date,
    finished: Date,
}

const JobsPage = () => {
    const { t } = useTranslation("jobspage");
    const jobs: Array<Jobs> = [{ id: "1", name: "", type: "csop", date: new Date(), files: ["BILLSTRANS.xml", "BILLSOPS.xml"] }]
    return <div>
        <h1>{t("Jobs")}</h1>
        {jobs.map((job, i) => {
            <div key={i} className="card">
                <div>{job.id}</div>
                <div>{job.name}</div>
                <div>{job.type}</div>
                <div>{job.date.toLocaleDateString()}</div>
                <div className="text-bold">{t("Files")}</div>
                {job.files.map((file,i)=>{
                    <div>{file}</div>
                })}
            </div>
        })}
    </div>
}