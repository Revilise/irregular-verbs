"use client";

import {useState} from "react";
import { useClient } from "@shared/api/hook.ts";
import { checkExercise } from "../api/check-exercise";
import { getRandomExercise } from "../api/get-random-exercise";
import type {ExerciseDto, ExerciseCheckResultDto, ExerciseCheckDto} from "../api/types.ts";

interface UseExerciseResult {
  exercise: ExerciseDto | null;
  userAnswer: string;
  checkResult: ExerciseCheckResultDto | null;
  isFetching: boolean;
  isChecking: boolean;
  isChecked: boolean;
  error: Error | null;
  submitAnswer: () => Promise<void>;
  loadNextExercise: () => Promise<void>;
  setUserAnswer: (value: string) => void;
}

export function useExercise({ defaultExercise }: { defaultExercise?: ExerciseDto } = {}): UseExerciseResult {
  const {
    data: exercise,
    isFetching: isExerciseFetching,
    error: exerciseError,
    fetch: fetchExercise,
  } = useClient<ExerciseDto>(getRandomExercise, { defaultValue: defaultExercise })

  const {
    data: checkResult,
    isFetching: isCheckResultFetching,
    error: isCheckResultError,
    fetch: fetchCheckResult,
    reset: resetCheckResult,
  } = useClient<ExerciseCheckResultDto, ExerciseCheckDto>(checkExercise, { immediately: false })

  const [userAnswer, setUserAnswer] = useState<string>("");

  async function submitAnswer() {
    if (exercise && userAnswer.trim().length) {
      return fetchCheckResult({
        type: exercise.type,
        dictionary_id: exercise.dictionary_id,
        target_form: exercise.target_form,
        answer: userAnswer,
      });
    }
  }

  async function loadNextExercise() {
    await fetchExercise();
    resetCheckResult();
    setUserAnswer("")
  }

  return {
    exercise,
    userAnswer,
    checkResult,
    error: exerciseError || isCheckResultError,

    isFetching: isExerciseFetching || isCheckResultFetching,
    isChecking: isCheckResultFetching,
    isChecked: checkResult !== null,

    setUserAnswer,
    submitAnswer,
    loadNextExercise,
  };
}
