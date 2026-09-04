import { useState } from "react";
import { useScore } from "@shared/lib/score/lib/hook.ts";
import type { Exercise } from "./exercise.ts";
import { ExerciseFactory } from "./index.ts";
import { type useExerciseReturn } from "../config/types.ts";
import { ExerciseStatus } from "../config/types.ts";

export function useExercise(): useExerciseReturn {
  const [exercise, setExercise] = useState<Exercise>(() =>
    ExerciseFactory.random(),
  );
  const [answerValue, setAnswerValue] = useState<string>("");
  const [status, setStatus] = useState<ExerciseStatus>(ExerciseStatus.idle);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [options, setOptions] = useState<string[]>(exercise.options);
  const { updateScore } = useScore();

  function refresh() {
    const exercise = ExerciseFactory.random();
    setExercise(exercise);
    setStatus(ExerciseStatus.idle);
    setAnswerValue("");
    setOptions(exercise.options);
    setIsSolved(false);
  }

  function submit() {
    const isCorrect = exercise.check(answerValue);
    setStatus(isCorrect ? ExerciseStatus.correct : ExerciseStatus.wrong);
    setIsSolved(true);
    updateScore(isCorrect);
  }

  return {
    refresh,
    submit,
    exercise,
    status,
    options,
    isSolved,
    answer: {
      value: answerValue,
      set: setAnswerValue,
    },
  };
}
