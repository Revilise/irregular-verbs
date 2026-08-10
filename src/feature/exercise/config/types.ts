import { AnswerPhaseStatus } from "@shared/const";
import type { IrregularVerb, VerbFormIndex } from "@data/verbs";
import type { ExerciseKind } from "@shared/lib/quiz";
import type {Exercise} from "@features/exercise/model/exercise.ts";

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

export interface ExerciseOptions {
    type: string;
    title: string;
}

export interface Verb {
    v1: string;
    v2: string;
    v3: string;
    ipa: string;
}

export enum AnswerType {
    choose = "choose",
    write = "write",
}

export type useExerciseReturn = {
    refresh: () => void;
    exercise: Exercise;
    status: ExerciseStatus;
    submit: () => void;
    answer: {
        value: string;
        set: (value: string) => void;
    }
}

export enum ExerciseStatus {
    "idle",
    "correct",
    "wrong"
}