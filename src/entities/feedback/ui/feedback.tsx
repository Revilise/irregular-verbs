import type { FC } from "react";
import { Button } from "@shared/ui/button";

export interface FeedbackProps {
  correct: boolean;
  reveal: string;
  onNext: () => void;
}

export const Feedback: FC<FeedbackProps> = ({ correct, reveal, onNext }) => {
  return (
    <div
      className={`feedback ${correct ? "feedback--ok" : "feedback--bad"}`}
      role="status"
    >
      <p className="feedback__title">{correct ? "Correct!" : "Not quite."}</p>
      {!correct && (
        <p className="feedback__answer">
          Answer: <strong>{reveal}</strong>
        </p>
      )}
      <Button extraCN={{ isPrimary: true }} label={"Next exercise"} onClick={onNext} />
    </div>
  );
};

