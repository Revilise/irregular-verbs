import type { IComponent } from "@shared/types/component.ts";
import type { ComponentPropsWithRef, Ref } from "react";

export interface IChoiceOption extends ComponentPropsWithRef<"input"> {
  label: string;
  value?: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  ref?: Ref<HTMLInputElement>;
}

export interface IChoice extends IComponent {
  value?: string;
  options?: Array<IChoiceOption>;
  name?: string;
  label?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}
