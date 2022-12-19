import { useTranslation } from "react-i18next";
import { JobAPI } from "apis/JobAPI";
import { JobDto } from "@shared/models/job";
import { Controller, useForm } from "react-hook-form";
import Input from "@components/InputNew";
import Button from "@components/Button";
import { KeyIcon } from "@components/Icons";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JobsPageRoute } from "./Routes";

const encoding = [
  { value: "utf-8", label: "UTF-8" },
  { value: "windows-874", label: "Windows-874" },
];

type FilesDto = {
  billTrans?: FileList;
  billTransEncoding?: string | { value: string; label: string };
  billDisp?: FileList;
  billDispEncoding?: string | { value: string; label: string };
};

function readFile(file: File, encoding: string = "utf-8"): Promise<string> {
  let promise = new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsText(file, encoding);
  });
  return promise;
}

const AddJobPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation("jobspage", { keyPrefix: "addPage" });
  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<JobDto>({
    mode: "onChange",
  });

  const {
    register: registerFile,
    control,
    watch: watchFile,
    getValues: getValuesFile,
    formState: { isValid: isFileValid, errors: errorsFile },
  } = useForm<FilesDto>({
    mode: "onChange",
    defaultValues: {
      billTransEncoding: encoding[1].value,
      billDispEncoding: encoding[1].value,
    },
  });

  const typeWatcher = watch("type");

  const billTransWatcher = watchFile("billTrans");
  const billTransEncodingWatcher = watchFile("billTransEncoding");
  const [billTransText, setBillTransText] = useState("");

  useEffect(() => {
    (async () => {
      if (billTransWatcher !== undefined && billTransWatcher.length > 0) {
        setBillTransText(
          await readFile(
            billTransWatcher[0],
            billTransEncodingWatcher as string
          )
        );
      }
    })();
  }, [billTransWatcher, billTransEncodingWatcher]);

  const billDispWatcher = watchFile("billDisp");
  const billDispEncodingWatcher = watchFile("billDispEncoding");
  const [billDispText, setBillDispText] = useState("");

  useEffect(() => {
    (async () => {
      if (billDispWatcher !== undefined && billDispWatcher.length > 0) {
        setBillDispText(
          await readFile(billDispWatcher[0], billDispEncodingWatcher as string)
        );
      }
    })();
  }, [billDispWatcher, billDispEncodingWatcher]);

  const onValidSubmit = async (data: JobDto) => {
    setIsSubmitting(true);
    var formData = new FormData();
    formData.append("type", data.type);
    formData.append("description", data.description);
    formData.append("dataDate", data.dataDate.toISOString());
    if (data.type == "csop") {
      formData.append("billTrans", new Blob([billTransText]), "billtrans.xml");
      formData.append("billDisp", new Blob([billDispText]), "billdisp.xml");
    }
    await JobAPI.addJobAsync(formData);
    setIsSubmitting(false);
    navigate(JobsPageRoute);
  };

  return (
    <div>
      <div className="page-t flex flex-row items-center gap-3">
        <h1 className="flex-1">{t("title")}</h1>
        <Button
          type="submit"
          form="addjobform"
          mode="primary"
          disabled={isSubmitting || !isValid || !isFileValid}
          isLoading={isSubmitting}
        >
          <KeyIcon />
          {t("submit")}
        </Button>
      </div>
      <form id="addjobform" onSubmit={handleSubmit(onValidSubmit)}>
        <div className="flex flex-row gap-3">
          <Input
            {...register("dataDate", {
              valueAsDate: true,
              required: t("dataDateRequired"),
            })}
            type="date"
            label={t("dataDate")}
            placeholder={t("dataDate")}
            defaultValue={new Date().toLocaleDateString("sv")}
            errors={errors?.dataDate?.message}
            className="mb-6"
          />
          <Input
            {...register("description", {
              setValueAs: (v: string) => v.trim(),
            })}
            type="text"
            label={t("description")}
            placeholder={t("descriptionPlaceholder")}
            className="mb-6 flex-1"
          />
        </div>
        <input
          id="csop"
          {...register("type", { required: true })}
          type="radio"
          checked={true}
          value="csop"
          className="mr-1"
        />
        <label htmlFor="csop">CSOP</label>
        {typeWatcher == "csop" && (
          <div className="my-3">
            <section>
              <div className="flex flex-row gap-3">
                <h5 className="self-center">BILLTRANS</h5>
                <div>
                  <div>{t("encoding")}</div>
                  <Controller
                    name="billTransEncoding"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        className="mb-2 select"
                        placeholder={t("encoding")}
                        onChange={(v) => field.onChange((v as any).value)}
                        value={encoding.find((p) => p.value == field.value)}
                        options={encoding}
                      />
                    )}
                  />
                </div>
                <div>
                  <div>{t("selectFile")}</div>
                  <input
                    {...registerFile("billTrans", {
                      validate: {
                        required: (v) => (v?.length ?? 0) > 0,
                      },
                    })}
                    type="file"
                    multiple={false}
                  />
                </div>
              </div>
              {billTransWatcher && billTransWatcher.length > 0 && (
                <textarea
                  className="p-3 block w-full min-h-[300px]"
                  value={billTransText}
                />
              )}
            </section>

            <section>
              <div className="flex flex-row gap-3">
                <h5 className="self-center">BILLDISP</h5>
                <div>
                  <div>{t("encoding")}</div>
                  <Controller
                    name="billDispEncoding"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        className="mb-2 select"
                        placeholder={t("encoding")}
                        onChange={(v) => field.onChange((v as any).value)}
                        value={encoding.find((p) => p.value == field.value)}
                        options={encoding}
                      />
                    )}
                  />
                </div>
                <div>
                  <div>{t("selectFile")}</div>
                  <input
                    {...registerFile("billDisp", {
                      validate: {
                        required: (v) => (v?.length ?? 0) > 0,
                      },
                    })}
                    type="file"
                    multiple={false}
                  />
                </div>
              </div>
              {billDispWatcher && billDispWatcher.length > 0 && (
                <textarea
                  className="p-3 block w-full min-h-[300px]"
                  value={billDispText}
                />
              )}
            </section>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddJobPage;
/*        <input
          id="43folders"
          {...register("type", { required: true })}
          type="radio"
          value="43folders"
        />
        <label htmlFor="43folders">43folders</label>
        */
