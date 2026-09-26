import { type FormEvent } from "react";
import { useExercise } from "../model/hook.ts";
import { AnswerType } from "../config/types.ts";

import { Stack } from "@shared/ui/stack";
import { Form } from "@shared/ui/form";
import { Checker } from "@shared/ui/checker";
import { CheckerType } from "@shared/ui/checker/config/const.ts";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import {useAnimate} from "@shared/lib/animate";
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
  const { phase: animation, start: startAnimation, finish: finishAnimation } = useAnimate({ phases: animationPhases })
  const isFormDisabled = isChecked || isChecking;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void submitAnswer();
  };

  const onOptionChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setUserAnswer(target.value);
  };

  const onNextClick = async () => {
    await startAnimation(300);
    await loadNextExercise();
    await finishAnimation(300);
  };

  if (error && !exercise) {
    return <ExerciseError message={error.message} reload={loadNextExercise} />
  }

  return (
      <>
        {exercise && (
            <Stack
                extraCN={{ isSecondary: true }}
                utilCN={[animation]}
            >
              <h2 className={"h3"}>{exercise.title}</h2>

              <Stack>
                <div dangerouslySetInnerHTML={{ __html: exercise.description }} />
              </Stack>

              {exercise.answer_type === AnswerType.choose && (
                  <Form
                      disabled={isFormDisabled}
                      onSubmit={onSubmit}
                      onChange={onOptionChange}
                  >
                    {exercise.options?.map((opt, idx) => (
                        <Checker
                            key={`${opt}-${idx}`}
                            type={CheckerType.radio}
                            name={"variant"}
                            value={opt}
                            label={opt}
                            disabled={isFormDisabled}
                        />
                    ))}

                    <Button
                        extraCN={{ isPrimary: true }}
                        disabled={isFormDisabled || !userAnswer.trim()}
                        label={"Check"}
                        type={"submit"}
                    />
                  </Form>
              )}

              {exercise.answer_type === AnswerType.write && (
                  <Form disabled={isFormDisabled} onSubmit={onSubmit}>
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
                    <p>The correct answer is <mark>{checkResult.answer}</mark></p>
                    <Button onClick={onNextClick} label={"Next"} />
                  </Stack>
              )}
            </Stack>
        )}

        {isFetching && "...loaging" }
      </>
  );
};
