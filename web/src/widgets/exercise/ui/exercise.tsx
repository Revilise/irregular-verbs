import { type FormEvent, useEffect, useRef, useState } from "react";
import { useExercise } from "../model/hook.ts";
import { AnswerType } from "../config/types.ts";

import { Stack } from "@shared/ui/stack";
import { Form } from "@shared/ui/form";
import { Choice } from "@shared/ui/choice";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import {useAnimate} from "@shared/lib/animate";
import { useAutoFocus } from "@shared/lib/autoFocus";
import {ExerciseError} from "@widgets/exercise/ui/exerciseError.tsx";

const animationPhases = {
  start: "isFadeStart", finish: "isFadeEnd", complete: ""
}

export const Exercise = () => {
  const {
    exercise,
    userAnswer,
    checkResult,
    loadNextExercise,
    setUserAnswer,
    submitAnswer,
    isChecking,
    isFetching,
    isChecked,
    error,
  } = useExercise();
  const formRef = useRef<HTMLFormElement>(null);
  const { refresh: refreshFocus } = useAutoFocus(formRef);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { phase: animation, start: startAnimation, finish: finishAnimation } = useAnimate({ phases: animationPhases })
  const isFormDisabled = isChecked || isFetching || isTransitioning;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void submitAnswer();
  };

  const onNextClick = async () => {
    if (isTransitioning || isFetching) return;
    setIsTransitioning(true);

    try {
      await startAnimation(300);
      await loadNextExercise();
      await finishAnimation(300);
    } finally {
      setIsTransitioning(false);
    }
  };

  useEffect(() => {
    if (!exercise || isFetching || isChecking || isTransitioning) return;
    if (isChecked) nextButtonRef.current?.focus();

    else refreshFocus();
  }, [exercise, isChecked, isFetching, isChecking, isTransitioning, refreshFocus]);

  if (error && !exercise) {
    return <ExerciseError message={error.message} reload={loadNextExercise} />;
  }

  return (
    <>
      {exercise && (
        <Stack extraCN={{ isSecondary: true }} utilCN={[animation]}>
          <h2 className={"h3"}>{exercise.title}</h2>

          <Stack>
            <div dangerouslySetInnerHTML={{ __html: exercise.description }} />
          </Stack>

          {exercise.answer_type === AnswerType.choose && (
            <Form
              ref={formRef}
              disabled={isFormDisabled}
              onSubmit={onSubmit}
            >
              <Choice
                name="variant"
                label={exercise.title}
                options={exercise.options?.map((option) => ({
                  label: option,
                  value: option,
                }))}
                value={userAnswer}
                onChange={setUserAnswer}
                disabled={isFormDisabled}
              />

              <Button
                extraCN={{ isPrimary: true }}
                disabled={isFormDisabled || !userAnswer.trim()}
                label={"Check"}
                type={"submit"}
              />
            </Form>
          )}

          {exercise.answer_type === AnswerType.write && (
            <Form
              ref={formRef}
              id={"exercise-form"}
              disabled={isFormDisabled}
              onSubmit={onSubmit}
            >
              <label className="sr-only" htmlFor="answer-input">
                Type your answer
              </label>
              <Input
                id="answer-input"
                autoComplete="off"
                spellCheck={false}
                value={userAnswer}
                disabled={isFormDisabled}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type the verb form…"
              />
              <Button
                extraCN={{ isPrimary: true, isLoading: isFetching }}
                disabled={isFormDisabled || !userAnswer.trim()}
                label={"Check"}
                type={"submit"}
              />
            </Form>
          )}

          {error && <p role="alert">{error?.message}</p>}

          {checkResult && (
            <Stack extraCN={{ isOutline: true }}>
              <strong className={"align-center"}>
                {checkResult.correct ? "Correct" : "Wrong"}
              </strong>
              <p>
                The correct answer is <mark>{checkResult.answer}</mark>
              </p>
              <Button
                ref={nextButtonRef}
                type="button"
                disabled={isFetching || isTransitioning}
                onClick={onNextClick}
                label="Next"
              />
            </Stack>
          )}
        </Stack>
      )}

      {isFetching && "...loaging"}
    </>
  );
};
