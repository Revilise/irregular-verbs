import type {ExerciseDto} from "../types.ts";

export const resp: ExerciseDto = {
  type: "phonemic",
  title: "Guess another form",
  description: "Choose 2nd form of 'go'",
  dictionary_id: "0",
  target_form: 0,
  answer_type: "choose",
  options: ["went", "gone", "go"],
};