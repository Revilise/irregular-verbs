import type {Exercise} from "@features/exercise/model/exercise.ts";

export interface ExerciseOptions {
    type: string;
    title: string;
}

export interface Verb {
    v1: string;
    v2: string;
    v3: string;
    ipa: string;
    options: string[];
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
    options: string[];
    answer: {
        value: string;
        set: (value: string) => void;
    },
    isSolved: boolean;
}

export enum ExerciseStatus {
    "idle" = "idle",
    "correct" = "correct",
    "wrong" = "wrong"
}