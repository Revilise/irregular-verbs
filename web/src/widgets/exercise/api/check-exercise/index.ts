import {apiClient} from "@shared/api/client.ts";
import type {ExerciseCheckDto, ExerciseCheckResultDto} from "@widgets/exercise/api/types.ts";

export function checkExercise({ payload, signal }: { payload: ExerciseCheckDto, signal?: AbortSignal }): Promise<ExerciseCheckResultDto> {
    return apiClient<ExerciseCheckResultDto>("/exercise/check", {
        signal,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
}
