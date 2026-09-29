import type { IComponent } from "@shared/types/component.ts";
import type { ComponentPropsWithRef } from "react";

type ButtonProps = ComponentPropsWithRef<"button">;

export interface IButton extends IComponent {
  ref?: ButtonProps["ref"];
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: ButtonProps["type"];
  formId?: string;
}
