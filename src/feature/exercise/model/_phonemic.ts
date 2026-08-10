import { Exercise } from "./exercise.ts";
import { capitalize } from "@shared/lib/utils/text.ts";

export class PhonemicExercise extends Exercise {

    static defaultCfg = {
        type: "phonemic",
        title: "Guess the verb (infinitive)"
    }

    constructor() {
        super(PhonemicExercise.defaultCfg);
        this.expected = this.verb.v1;
    }

    get description(): string {
        return `${capitalize(this.answer)} what is this verb: ${this.verb.ipa}`;
    }

    get options(): string[] {
        const { v1, v2, v3 } = this.verb;
        return [ v1, v2, v3 ]
    }

    check(value: string) {
        return value === this.expected;
    }
}