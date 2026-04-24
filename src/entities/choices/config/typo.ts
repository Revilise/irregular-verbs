export interface IChoices {
  options: string[];
  disabled?: boolean;
  onChoose: (option: string) => void;
}
