import { useBEM } from "@shared/lib";
import type { IButton } from "@shared/ui/button/config/types.ts";
import type { FC } from "react";

export const Button: FC<IButton> = ({
  ref,
  extraCN,
  utilCN,
  label,
  onClick,
  disabled,
  formId,
  type = "button",
}) => {
  const { bem } = useBEM("btn");

  return (
    <button
      ref={ref}
      className={bem("", extraCN, utilCN)}
      onClick={onClick}
      disabled={disabled}
      type={type}
      form={formId}
    >
      <div className={bem("loader")}></div>
      <div className={bem("label")}>{label}</div>
    </button>
  );
};
