import { useBEM } from "@shared/lib";
import type { FC } from "react";
import type { IForm } from "@shared/ui/form/config/types";

export const Form: FC<IForm> = ({
  extraCN,
  utilCN,
  disabled,
  onSubmit,
  onChange,
  children,
}) => {
  const { bem } = useBEM("form");

  return (
    <form
      className={bem("", extraCN, utilCN)}
      onSubmit={onSubmit}
      onChange={onChange}
      aria-disabled={disabled}
    >
      {children}
    </form>
  );
};
