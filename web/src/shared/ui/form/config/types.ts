import type { IComponent } from "@shared/types/component";
import type { FormHTMLAttributes, ReactNode, Ref } from "react";

type HTMLForm = FormHTMLAttributes<HTMLFormElement>;

export interface IForm extends IComponent {
  ref?: Ref<HTMLFormElement>;
  onSubmit?: HTMLForm["onSubmit"];
  onChange?: HTMLForm["onChange"];
  children: ReactNode;
  disabled?: boolean;
  id?: string;
}
