import { Exercise } from "./exercise.ts";
import {capitalize} from "@shared/lib/utils/text.ts";
import {randomSequence, shuffle} from "@shared/lib/utils/random.ts";

export class AnotherFormExercise extends Exercise {
    expectedVersion: number;
    questionVersion: number;
    question: string;
    expected: string;

    static defaultCfg = {
        type: "another-form",
        title: "Guess another form of verb (infinitive)"
    }

    constructor() {
        super(AnotherFormExercise.defaultCfg);

        const { version: questionVersion, value: question } = Exercise.pickForm(this.verb)
        this.questionVersion = questionVersion;
        this.question = question;

        const { version: expectedVersion, value: expected } = Exercise.pickForm(this.verb, questionVersion);
        this.expectedVersion = expectedVersion;
        this.expected = expected;
    }

    get description(): string {
        return `${capitalize(this.answer)} <strong>${this.expectedVersion} form</strong> of verb <strong>${this.question}</strong> (${this.questionVersion})`
    }

    get options(): string[] {
        const randoms = randomSequence({ max: 3, count: 2 });
        const options = randoms.map(i => this.verb.options[i]);
        return shuffle([...options, this.expected ])
    }
}