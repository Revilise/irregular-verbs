import type {IComponent} from "@shared/types/component.ts";
import type {ReactNode} from "react";

export interface IStack extends IComponent {
  children: ReactNode,
}
