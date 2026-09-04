import { IRREGULAR_VERBS } from "@data/verbs.ts";
import { random } from "@shared/lib/utils/random.ts";
import {
  AnswerType,
  type ExerciseOptions,
  type Verb,
} from "../config/types.ts";

export class Exercise {
  type: string;
  title: string;
  verb: Verb;
  answer: AnswerType;
  expected?: string;

  static answers = Object.values(AnswerType);

  static pickVerb(): Verb {
    return IRREGULAR_VERBS[random({ max: IRREGULAR_VERBS.length })];
  }

  static pickForm(verb: Verb, excludeVersion?: number) {
    const { v1, v2, v3, ipa } = verb;
    const forms = [v1, v2, v3].filter((_, v) => v + 1 !== excludeVersion);
    const idx = random({ max: forms.length });

    return {
      ipa,
      version: idx + 1,
      value: forms[idx],
    };
  }

  static pickAnswerType(): AnswerType {
    return Exercise.answers[
      random({ max: Exercise.answers.length })
    ] as AnswerType;
  }

  constructor(cfg?: ExerciseOptions) {
    const { type = "", title = "" } = cfg ?? {};

    this.type = type;
    this.title = title;
    this.verb = Exercise.pickVerb();
    this.answer = Exercise.pickAnswerType();
  }

  get description(): string {
    throw new Error("Exercise description");
  }

  get options(): string[] {
    return [];
  }

  check(value: string): boolean {
    return value === this.expected;
  }
}
