import React from "react";
const Input = React.forwardRef(
  (
    {
      id,
      type = "text",
      label,
      error,
      className,
      inputClassName,
      ...otherProps
    }: {
      id?: string;
      label?: string;
      error?: string;
      className?: string;
      inputClassName?: string;
      type: "text" | "password" | "date";
      [x: string]: any;
    },
    ref: React.ForwardedRef<any>
  ) => {
    const inputId =
      id ??
      Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substring(0, 6);
    return (
      <div className={className ?? ""}>
        {label && <label htmlFor={inputId}>{label}</label>}
        <input
          className={`${error && error.trim().length > 0 && "invalid"} ${
            inputClassName ?? ""
          }`}
          ref={ref}
          id={id}
          type={type}
          {...otherProps}
        />
        {error && error.trim().length > 0 && (
          <div className="text-sm text-red-600 py-2">{error}</div>
        )}
      </div>
    );
  }
);

export default Input;
