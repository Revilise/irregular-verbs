import type { IComponent } from "@shared/types/component";
import type { FormHTMLAttributes, ReactNode } from "react";

type HTMLForm = FormHTMLAttributes<HTMLFormElement>;

export interface IForm extends IComponent {
  onSubmit: HTMLForm["onSubmit"];
  children: ReactNode;
}

