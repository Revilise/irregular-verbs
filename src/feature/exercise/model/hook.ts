import { useState } from "react";
import type { Exercise } from "./exercise.ts";
import { ExerciseFactory } from "./index.ts";
import type { useExerciseReturn } from "../config/types.ts";
import { ExerciseStatus } from "../config/types.ts";

export function useExercise(): useExerciseReturn {
    const [exercise, setExercise] = useState<Exercise>(() => ExerciseFactory.random());
    const [answerValue, setAnswerValue] = useState<string>("");
    const [status, setStatus] = useState<ExerciseStatus>(ExerciseStatus.idle);

    function refresh() {
        const exercise = ExerciseFactory.random();
        setExercise(exercise);
        setStatus(ExerciseStatus.idle);
        setAnswerValue("");
    }

    function submit() {
        const isCorrect = exercise.check(answerValue);
        setStatus(isCorrect ? ExerciseStatus.correct : ExerciseStatus.wrong);
    }

    return {
        refresh,
        submit,
        exercise,
        status,
        answer: {
            value: answerValue,
            set: setAnswerValue
        }
    }
}