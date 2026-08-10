import {random} from "@shared/lib/utils/random.ts";
import { PhonemicExercise } from "./_phonemic.ts";
import type { Exercise } from "@features/exercise/model/exercise.ts";

export class ExerciseFactory {

    static constructors: Record<string, typeof Exercise> = {
        "phonemic": PhonemicExercise,
    }

    static create(type: string) {
        const constructor = this.constructors[type];

        if (!constructor) {
            throw new Error("unexpected exercise type: " + type);
        }

        return new constructor();
    }

    static random() {
        const kinds = [PhonemicExercise];
        const idx = random({ max: kinds.length });
        return new kinds[idx];
    }

}