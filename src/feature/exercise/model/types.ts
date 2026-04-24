import { AnswerPhaseStatus } from "@shared/const";
import type { IrregularVerb, VerbFormIndex } from "@data/verbs";
import type { ExerciseKind } from "@shared/lib/quiz/types.ts";

/** One quiz screen: type of task + verb + which forms to show. */
export interface Round {
  kind: ExerciseKind;
  verb: IrregularVerb;
  targetForm: VerbFormIndex;
  /** Form shown in the prompt (V2/V3 when asking for V1; V1 when asking for V2/V3). */
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
