import { LoadingIcon } from "@components/Icons";
import { useTranslation } from "react-i18next";

type Props = {
  mode?: "primary" | "secondary" | "danger";
  type?: "submit" | "reset" | "button";
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
  disabled?: boolean;
  onClick?: Function;
  children?: React.ReactNode;
  [x: string]: any;
};

const Button = (props: Props) => {
  const { t } = useTranslation("components");
  const {
    mode = "",
    type = "button",
    children,
    isLoading,
    loadingText = t("button.loading"),
    className = "",
    disabled = false,
    onClick,
    ...otherProps
  } = props;

  const handlerOnClick = () => {
    if (onClick === undefined || onClick == null) return;
    onClick();
  };

  return (
    <button
      className={`${mode} ${className}`}
      type={type}
      disabled={disabled}
      onClick={handlerOnClick}
      {...otherProps}
    >
      {isLoading ? (
        <div className="flex items-center gap-2 justify-center">
          <LoadingIcon spinning={true} />
          <span>{loadingText}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 justify-center flex-wrap">
          {children}
        </div>
      )}
    </button>
  );
};
export default Button;
