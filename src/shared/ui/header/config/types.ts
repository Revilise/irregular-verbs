import type {IComponent} from "../../../types/component.ts";

export interface IHeader extends IComponent {
  title: string,
  subtitle: string,
  score: {
    right: number,
    total: number
  }
}
