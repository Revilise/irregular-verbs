import type {IComponent} from "@shared/types/component.ts";
import type {ButtonHTMLAttributes} from "react";

type HTMLButtonElement = ButtonHTMLAttributes<HTMLButtonElement>;

export interface IButton extends IComponent {
  label?: string,
  onClick?: () => void,
  disabled?: boolean,
  type?: HTMLButtonElement["type"]
}
