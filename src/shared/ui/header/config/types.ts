import type {IComponent} from "@shared/types/component.ts";

export interface IHeader extends IComponent {
  title: string,
  subtitle: string,
  score?: {
    right: number,
    total: number
  }
}
