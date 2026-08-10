import { Exercise } from "./exercise.ts";
import { capitalize } from "@shared/lib/utils/text.ts";
import {randomSequence, shuffle} from "@shared/lib/utils/random.ts";

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
        const { v1 } = this.verb;
        const randoms = randomSequence({ max: 3, count: 3 });
        const options = randoms.map(i => this.verb.options[i]);

        return shuffle([ v1, ...options ]);
    }
}