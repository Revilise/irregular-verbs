import type { IComponent } from "@shared/types/component.ts";
import { CheckerType } from "./const.ts";

export interface IChecker extends IComponent {
  id?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  checked?: boolean;
  required?: boolean;
  type: CheckerType;
  label?: string;
}
