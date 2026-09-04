import type { IComponent } from "@shared/types/component.ts";
import type { ReactNode } from "react";

export interface ILayout extends IComponent {
  children: ReactNode;
}
