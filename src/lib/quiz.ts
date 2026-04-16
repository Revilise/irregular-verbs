import {
  IRREGULAR_VERBS,
  type IrregularVerb,
  type VerbFormIndex,
  getForm,
} from '../data/verbs'

export type ExerciseKind = 'choice' | 'write' | 'phonemic'

function randomInt(max: number): number {
  return Math.floor(Math.random() * max)
}

export function pickRandomVerb(): IrregularVerb {
  return IRREGULAR_VERBS[randomInt(IRREGULAR_VERBS.length)]!
}

export function pickRandomFormIndex(): VerbFormIndex {
  return randomInt(3) as VerbFormIndex
}

/**
 * Which form to display as the clue. If the answer is V1, show V2 or V3; otherwise show V1.
 */
export function pickPromptShown(targetForm: VerbFormIndex): VerbFormIndex {
  if (targetForm === 0) {
    return randomInt(2) === 0 ? 1 : 2
  }
  return 0
}

export function pickRandomExerciseKind(): ExerciseKind {
  const kinds: ExerciseKind[] = ['choice', 'write', 'phonemic']
  return kinds[randomInt(3)]!
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy
}

/**
 * Build 4 unique options for multiple choice: one correct form + distractors from the same slot index.
 */
export function buildChoiceOptions(
  verb: IrregularVerb,
  targetForm: VerbFormIndex,
): string[] {
  const correct = getForm(verb, targetForm)
  const sameSlot = IRREGULAR_VERBS.filter((v) => v !== verb).map((v) =>
    getForm(v, targetForm),
  )
  const fallback = IRREGULAR_VERBS.filter((v) => v !== verb).flatMap((v) => [
    v.v1,
    v.v2,
    v.v3,
  ])
  const ordered = [...new Set([...sameSlot, ...fallback])].filter(
    (f) => f !== correct,
  )
  shuffle(ordered)
  const distractors = ordered.slice(0, 3)
  return shuffle([correct, ...distractors])
}

export function normalizeAnswer(s: string): string {
  return s.trim().toLowerCase()
}

export function formsMatch(expected: string, user: string): boolean {
  return normalizeAnswer(expected) === normalizeAnswer(user)
}
