import {AnswerPhaseStatus, getExerciseTitle, selectExerciseState} from "@features/exercise/index.js";
import {selectFormState} from "@shared/ui/form/services/index.js";
import type {FormEvent} from "react";
import {Phonemic} from "@entities/phonemic/index.js";
import {Stack} from "@shared/ui/stack/index.js";
import {FORM_LABELS, getForm} from "@data/verbs.js";
import {Choices} from "@entities/choices/index.js";
import {Form} from "@shared/ui/form/index.js";
import {Input} from "@shared/ui/input/index.js";
import {Button} from "@shared/ui/button/index.js";
import {Feedback} from "@entities/feedback/index.js";

export const Exercise = () => {
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
  )
}
