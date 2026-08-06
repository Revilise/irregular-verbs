import { AnswerPhaseStatus } from "@shared/const";
import type { IrregularVerb, VerbFormIndex } from "@data/verbs";
import type { ExerciseKind } from "@shared/lib/quiz";

export type { ExerciseKind } from "@shared/lib/quiz";

export interface Round {
  kind: ExerciseKind;
  verb: IrregularVerb;
  targetForm: VerbFormIndex;
  promptShown: VerbFormIndex;
  options?: string[];
}

export type AnswerPhase =
  | { status: typeof AnswerPhaseStatus.Idle }
  | {
      status: typeof AnswerPhaseStatus.Answered;
      correct: boolean;
      reveal: string;
    };
