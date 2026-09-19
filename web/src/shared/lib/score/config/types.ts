export type ScoreValue = {
  total: number;
  right: number;
};

export interface ScoreStore extends ScoreValue {
  total: ScoreValue["total"];
  right: ScoreValue["right"];

  increment: (isCorrect: boolean) => void;
}
