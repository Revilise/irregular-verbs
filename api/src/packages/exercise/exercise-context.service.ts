
import {BadRequestException, Injectable} from '@nestjs/common';
import type { IExerciseStrategy } from "./strategy/exercise-strategy.interface.js";
import {PhonemicStrategy} from "./strategy/phonemic-strategy.service.js";
import {FormStrategy} from "./strategy/form-strategy.service.js";

@Injectable()
export class ExerciseContext {
    private strategies = new Map<string, IExerciseStrategy>();

    constructor(
        private phonemicStrategy: PhonemicStrategy,
        private formStrategy: FormStrategy,
    ) {
        this.strategies.set('phonemic', this.phonemicStrategy);
        this.strategies.set('form', this.formStrategy);
    }

    setStrategy(type: string) {
        const strategy = this.strategies.get(type);
        if (!strategy) {
            throw new BadRequestException(`Strategy not found: ${type}`);
        }

        return strategy;
    }
}
