import "@app/style/index.pcss";

import { type FormEvent } from "react";
import { FORM_LABELS, getForm } from "@data/verbs";
import "./App.css";

import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { Choices } from "@entities/choices";
import { Feedback } from "@entities/feedback";
import { Phonemic } from "@entities/phonemic";
import { Stack } from "@shared/ui/stack";
import { Form } from "@shared/ui/form";
import { selectFormState } from "@shared/ui/form/services";
import { Layout } from "@shared/ui/layout";
import { AnswerPhaseStatus } from "@shared/const";
import { getExerciseTitle, selectExerciseState } from "@features/exercise";

export default function App() {
  const { round, answerPhase, nextRound, submitAnswer } = selectExerciseState();
  const { value: answerValue, setValue: setAnswerValue } = selectFormState();

  const title = getExerciseTitle(round);

  const onChooseOption = (option: string) => {
    if (answerPhase.status !== AnswerPhaseStatus.Idle || round.kind !== "choice")
      return;
    submitAnswer(option);
  };

  const onSubmitWritten = (e: FormEvent) => {
    e.preventDefault();
    if (answerPhase.status !== AnswerPhaseStatus.Idle || round.kind === "choice")
      return;
    submitAnswer(answerValue);
  };

  return (
    <Layout>
      <Stack extraCN={{ isSecondary: true }}>
        <h3 className={"h3"}>{title}</h3>

        {round.kind === "phonemic" && <Phonemic verb={round.verb} />}

        {round.kind === "choice" && (
          <Stack>
            <div>
              Pick the correct <strong>{FORM_LABELS[round.targetForm]}</strong>{" "}
              for <em>{getForm(round.verb, round.promptShown)}</em>
            </div>

            <Choices
              options={round.options || []}
              disabled={answerPhase.status !== AnswerPhaseStatus.Idle}
              onChoose={onChooseOption}
            />
          </Stack>
        )}

        {round.kind === "write" && (
          <Stack>
            <div>
              Write the <strong>{FORM_LABELS[round.targetForm]}</strong> of{" "}
              <em>{getForm(round.verb, round.promptShown)}</em>
            </div>
          </Stack>
        )}

        {(round.kind === "write" || round.kind === "phonemic") && (
          <Form onSubmit={onSubmitWritten}>
            <label className="sr-only" htmlFor="answer-input">
              Your answer
            </label>

            <Input
              id="answer-input"
              autoComplete="off"
              spellCheck={false}
              value={answerValue}
              onChange={(e) => setAnswerValue(e.target.value)}
              disabled={answerPhase.status !== AnswerPhaseStatus.Idle}
              placeholder="Type the verb form…"
            />
            <Button
              extraCN={{ isPrimary: true }}
              disabled={
                answerPhase.status !== AnswerPhaseStatus.Idle || !answerValue.trim()
              }
              label={"Check"}
              type={"submit"}
            />
          </Form>
        )}

        {answerPhase.status === AnswerPhaseStatus.Answered && (
          <Feedback
            correct={answerPhase.correct}
            reveal={answerPhase.reveal}
            onNext={nextRound}
          />
        )}
      </Stack>
    </Layout>
  );
}
