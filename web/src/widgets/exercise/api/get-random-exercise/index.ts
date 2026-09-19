import {apiClient} from "@shared/api/client.ts";
import type {ExerciseDto} from "../types.ts";

export function getRandomExercise({ signal }: { signal?: AbortSignal }) {
    return apiClient<ExerciseDto>("/exercise/generate", { signal })
}