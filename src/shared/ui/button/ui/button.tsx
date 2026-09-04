import { useBEM } from "@shared/lib";
import type { IButton } from "@shared/ui/button/config/types.ts";
import type { FC } from "react";

export const Button: FC<IButton> = ({
  extraCN,
  utilCN,
  label,
  onClick,
  disabled,
  type = "button",
}) => {
  const { bem } = useBEM("btn");

  return (
    <button
      className={bem("", extraCN, utilCN)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
};
