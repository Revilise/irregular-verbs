import type { IComponent } from "@shared/types/component.ts";
import { CheckerType } from "./const.ts";
import type { ComponentPropsWithRef } from "react";

export interface IChecker extends IComponent {
  id?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  checked?: boolean;
  required?: boolean;
  type: CheckerType;
  label?: string;
  ref?: ComponentPropsWithRef<"input">["ref"];
  tabIndex?: number;
  onChange?: ComponentPropsWithRef<"input">["onChange"];
  onKeyDown?: ComponentPropsWithRef<"input">["onKeyDown"];
  onFocus?: ComponentPropsWithRef<"input">["onFocus"];
}
