import { resp as getRandomExerciseResp } from "./get-random-exercise/mock";
import { resp as checkExerciseResp } from "./check-exercise/mock.ts";
import {createMockHandler} from "@shared/lib/msw/lib";

export const exerciseHandlers = [
    createMockHandler({
        url: "/exercise/generate",
        method: "get",
        resp: getRandomExerciseResp,
        delay: 1200
    }),
    createMockHandler({
        url: "/exercise/check",
        method: "post",
        resp: checkExerciseResp,
        delay: 500
    })
]