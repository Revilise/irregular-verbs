import type {FormEvent} from "react";
import {useExercise} from "../model/hook.ts";
import {AnswerType, ExerciseStatus} from "../config/types.ts";

import {Stack} from "@shared/ui/stack";
import {Form} from "@shared/ui/form";
import {Checker} from "@shared/ui/checker";
import {CheckerType} from "@shared/ui/checker/config/const.ts";
import {Button} from "@shared/ui/button";
import {Input} from "@shared/ui/input";

import {capitalize} from "@shared/lib/utils/text.ts";

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
                <div dangerouslySetInnerHTML={{ __html: exercise.description }} />
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
                <Stack extraCN={{ isOutline: true }}>
                    <strong className={"align-center"}>{capitalize(status)}</strong>
                    <div className={"align-center"}>The correct answer is <strong>{exercise.expected}</strong></div>
                    <Button onClick={onNextClick} label={"Next"} />
                </Stack>
            )}
        </Stack>
    )
}
