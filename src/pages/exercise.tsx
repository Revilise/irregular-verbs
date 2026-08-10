import {type FormEvent} from "react";
import {Stack} from "@shared/ui/stack/index.js";
import {Form} from "@shared/ui/form/index.js";
import {Input} from "@shared/ui/input/index.js";
import {Button} from "@shared/ui/button/index.js";
import {useExercise} from "@features/exercise/model/hook.ts";
import {AnswerType, ExerciseStatus} from "@features/exercise/config/types.ts";
import {Checker} from "@shared/ui/checker";
import {CheckerType} from "@shared/ui/checker/config/const.ts";

export const Exercise = () => {
  const { exercise, answer, options, submit, status, refresh } = useExercise();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  const onOptionChange = (e: FormEvent) => {
      const target = e.target as HTMLInputElement;
      answer.set(target.value);
  }

  const onNextClick = () => {
      refresh();
  }

  return (
     <Stack extraCN={{ isSecondary: true }}>
       <h3 className={"h3"}>{exercise.title}</h3>

       <Stack>
         <div>{exercise.description}</div>
       </Stack>

       {exercise.answer === AnswerType.choose && (
          <Form
              disabled={status !== ExerciseStatus.idle}
              onSubmit={onSubmit}
              onChange={onOptionChange}
          >
              {options.map((opt, idx) =>
                  <Checker key={`${opt}-${idx}`} type={CheckerType.radio} name={"variant"} value={opt} label={opt} />
              )}

              <Button
                  extraCN={{ isPrimary: true }}
                  disabled={status !== ExerciseStatus.idle || !answer.value?.trim() }
                  label={"Check"}
                  type={"submit"}
              />
          </Form>
       )}

       {exercise.answer === AnswerType.write && (
          <Form
              disabled={status !== ExerciseStatus.idle}
              onSubmit={onSubmit}
          >
            <label className="sr-only" htmlFor="answer-input">
              Type your answer
            </label>
            <Input
               id="answer-input"
               autoComplete="off"
               spellCheck={false}
               value={answer.value}
               onChange={(e) => answer.set(e.target.value)}
               placeholder="Type the verb form…"
            />
            <Button
               extraCN={{ isPrimary: true }}
               disabled={status !== ExerciseStatus.idle || !answer.value?.trim()}
               label={"Check"}
               type={"submit"}
            />
          </Form>
       )}

       {status !== ExerciseStatus.idle && (
          <Stack>
              <h3>{status === ExerciseStatus.correct ? "Correct!" : "You made a mistake"}</h3>
              <div>The correct answer is <strong>{exercise.expected}</strong></div>

              <Button onClick={onNextClick} label={"Next"} />
          </Stack>
       )}
     </Stack>
  )
}
