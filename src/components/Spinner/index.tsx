import style from "./index.module.css";
export const Spinner = () => {
  return (
    <div className={style["lds-ring"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
