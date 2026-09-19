import { useBEM } from "@shared/lib";
import type { IStack } from "@shared/ui/stack/config/types.ts";
import type { FC } from "react";

export const Stack: FC<IStack> = ({ extraCN, utilCN, children }) => {
  const { bem } = useBEM("stack");

  return <div className={bem("", extraCN, utilCN)}>{children}</div>;
};
