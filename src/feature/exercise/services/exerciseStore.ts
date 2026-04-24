import { create } from "zustand/react";
import { getForm } from "@data/verbs";
import { formsMatch } from "@shared/lib/quiz";
import { AnswerPhaseStatus } from "@shared/const";
import { useFormStore } from "@shared/ui/form/services/store";
import type { AnswerPhase, Round } from "@features/exercise/model/types";
import { createRound } from "@features/exercise/services/createRound";

interface ExerciseState {
  round: Round;
  answerPhase: AnswerPhase;
}

interface ExerciseActions {
  nextRound: () => void;
  /** Choice option or free-text answer; compares to the current round’s target form. */
  submitAnswer: (guess: string) => void;
}

const initial: ExerciseState = {
  round: createRound(),
  answerPhase: { status: AnswerPhaseStatus.Idle },
};

export const useExerciseStore = create<ExerciseState & ExerciseActions>(
  (set, get) => ({
    ...initial,
    nextRound: () => {
      set({
        round: createRound(),
        answerPhase: { status: AnswerPhaseStatus.Idle },
      });
      useFormStore.getState().reset();
    },
    submitAnswer: (guess) => {
      const { round, answerPhase } = get();
      if (answerPhase.status !== AnswerPhaseStatus.Idle) return;

      const correct = getForm(round.verb, round.targetForm);
      const ok = formsMatch(correct, guess);

      set({
        answerPhase: {
          status: AnswerPhaseStatus.Answered,
          correct: ok,
          reveal: correct,
        },
      });
    },
  }),
);

// eslint-disable-next-line react-hooks/rules-of-hooks
export const selectExerciseState = () => useExerciseStore((s) => s);
