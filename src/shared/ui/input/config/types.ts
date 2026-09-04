import type { IComponent } from "@shared/types/component.ts";
import type { InputHTMLAttributes } from "react";

type HTMLInput = InputHTMLAttributes<HTMLInputElement>;

export interface IInput extends IComponent {
  id?: string;
  value?: HTMLInput["value"];
  onChange?: HTMLInput["onChange"];
  disabled?: HTMLInput["disabled"];
  placeholder?: HTMLInput["placeholder"];
  autoComplete?: HTMLInput["autoComplete"];
  spellCheck?: HTMLInput["spellCheck"];
  type?: HTMLInput["type"];
}
