import { random } from "@shared/lib/utils/random.ts";
import type { Exercise } from "@features/exercise/model/exercise.ts";
import { PhonemicExercise } from "./_phonemic.ts";
import { AnotherFormExercise } from "./_anotherForm.ts";

export class ExerciseFactory {
  static constructors: Record<string, typeof Exercise> = {
    phonemic: PhonemicExercise,
    "another-form": AnotherFormExercise,
  };

  static create(type: string) {
    const constructor = this.constructors[type];

    if (!constructor) {
      throw new Error("unexpected exercise type: " + type);
    }

    return new constructor();
  }

  static random() {
    const kinds = Object.values(this.constructors);
    const idx = random({ max: kinds.length });
    return new kinds[idx]();
  }
}
