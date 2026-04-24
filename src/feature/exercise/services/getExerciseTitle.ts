import type { Round } from "@features/exercise/model/types";

/**
 * Main heading for the current task type.
 */
export function getExerciseTitle(round: Round): string {
  if (round.kind === "phonemic") {
    return "Guess the verb (infinitive)";
  }
  if (round.kind === "choice") {
    return "Choose the correct form";
  }
  return "Type the correct form";
}
