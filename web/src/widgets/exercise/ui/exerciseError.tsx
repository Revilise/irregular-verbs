import {Stack} from "@shared/ui/stack";
import {Button} from "@shared/ui/button";
import type {FC} from "react";

interface IExerciseErrorProps {
    message: string;
    reload: () => void;
}

export const ExerciseError: FC<IExerciseErrorProps> = ({ message, reload }) => {
    return (
        <Stack
            extraCN={{ isSecondary: true }}
        >
            <p role="alert">{message}</p>
            <Button onClick={reload} label="Retry" />
        </Stack>
    )
}