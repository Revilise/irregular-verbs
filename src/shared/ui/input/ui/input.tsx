import { useBEM } from "@shared/lib";
import type { IInput } from "@shared/ui/input/config/types.ts";
import type { FC } from "react";

export const Input: FC<IInput> = ({
  extraCN,
  utilCN,
  id,
  value,
  onChange,
  disabled,
  placeholder,
  autoComplete = "off",
  spellCheck = false,
  type = "text",
}) => {
  const { bem } = useBEM("input");

  return (
    <input
      id={id}
      className={bem("", extraCN, utilCN)}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      autoComplete={autoComplete}
      spellCheck={spellCheck}
      type={type}
    />
  );
};
