import { Checker } from "@shared/ui/checker";
import { CheckerType } from "@shared/ui/checker/config/const.ts";
import type { IChecker } from "@shared/ui/checker/config/types.ts";

export const ChoiceOption = (props: Omit<IChecker, "type">) => (
  <Checker {...props} type={CheckerType.radio} />
);
