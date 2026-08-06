import {
  buildChoiceOptions,
  pickRandomExerciseKind,
  pickRandomFormIndex,
  pickPromptShown,
  pickRandomVerb,
} from "@shared/lib/quiz";
import type { Round } from "@features/exercise/model/types";
import type { ExerciseKind } from "@shared/lib/quiz";

/**
 * Picks a random task: choice / free input / phonemic, builds prompt and options.
 */
export function createRound(): Round {
  const verb = pickRandomVerb();
  const kind: ExerciseKind = pickRandomExerciseKind();
  if (kind === "phonemic") {
    return { kind, verb, targetForm: 0, promptShown: 0 };
  }
  const targetForm = pickRandomFormIndex();
  const promptShown = pickPromptShown(targetForm);
  const options =
    kind === "choice" ? buildChoiceOptions(verb, targetForm) : undefined;
  return { kind, verb, targetForm, promptShown, options };
}
