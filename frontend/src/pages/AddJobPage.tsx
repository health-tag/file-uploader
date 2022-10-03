import { useTranslation } from "react-i18next";
import { JobAPI } from "services/JobService";
import { JobDto } from "@shared/models/job";
import { Controller, useForm } from "react-hook-form";
import Input from "@components/InputNew";
import Button from "@components/Button";
import { KeyIcon } from "@components/Icons";
import Select from "react-select";
import { useState } from "react";

const encoding = [
  { value: "utf-8", label: "UTF-8" },
  { value: "windows-874", label: "Windows-874" },
];

type FilesDto = {
  billTrans?: File;
  billTransEncoding?: string | { value: string; label: string };
  billDisp?: File;
  billDispEncoding?: string | { value: string; label: string };
};

function readFile(file: File, encoding: string = "utf-8"): string {
  const reader = new FileReader();
  console.log(file);
  reader.readAsText(file, encoding);
  return reader.result as string;
}

const AddJobPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation("jobspage", { keyPrefix: "addPage" });
  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<JobDto>({ mode: "onChange" });

  const {
    register: registerFile,
    control,
    watch: watchFile,
  } = useForm<FilesDto>();

  const typeWatcher = watch("type");

  const billDispWatcher = watchFile("billDisp");
  const billDispEncodingWatcher = watchFile("billDispEncoding");
  const billTransWatcher = watchFile("billTrans");

  const onValidSubmit = () => {
    var formData = new FormData();
  };

  return (
    <div>
      <h1>{t("title")}</h1>
      <form onSubmit={handleSubmit(onValidSubmit)}>
        <Input
          {...register("description", {
            required: t("description"),
            setValueAs: (v: string) => v.trim(),
          })}
          type="text"
          label={t("description")}
          placeholder={t("description")}
          className="mb-6"
        />
        <Input
          {...register("dataDate", {
            required: t("dataDate"),
            setValueAs: (v: string) => v.trim(),
          })}
          type="date"
          label={t("dataDate")}
          placeholder={t("dataDate")}
          className="mb-6"
        />
        <input id="csop" {...register("type")} type="radio" value="csop" />
        <label htmlFor="csop">CSOP</label>
        <input
          id="43folders"
          {...register("type")}
          type="radio"
          value="43folders"
        />
        <label htmlFor="43folders">43folders</label>
        {typeWatcher == "csop" && (
          <div>
            <label>BILLTRANS</label>
            <input {...registerFile("billTrans")} type="file" />
            <Controller
              name="billTransEncoding"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="mb-2 select"
                  placeholder="Encoding"
                  onChange={(v) => (v as any).value}
                  defaultValue={encoding[0]}
                  options={encoding}
                />
              )}
            />
            {billDispWatcher && (
              <textarea
                value={readFile(
                  billDispWatcher,
                  billDispEncodingWatcher as string
                )}
              />
            )}
            <label>BILLDISP</label>
            <input {...registerFile("billDisp")} type="file" />
            <Controller
              name="billDispEncoding"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="mb-2 select"
                  placeholder="Encoding"
                  onChange={(v) => (v as any).value}
                  defaultValue={encoding[0]}
                  options={encoding}
                />
              )}
            />
          </div>
        )}
        <Button
          className="w-full"
          type="submit"
          mode="primary"
          disabled={isSubmitting || !isValid}
          isLoading={isSubmitting}
        >
          <KeyIcon />
          {t("submit")}
        </Button>
      </form>
      <Input />
    </div>
  );
};

export default AddJobPage;
