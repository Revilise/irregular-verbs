import {CqrsModule} from "@nestjs/cqrs";
import {Module} from '@nestjs/common';
import {ExerciseController} from "./exercise.controller.js";
import {ExerciseContext} from "./exercise-context.service.js";
import {PhonemicStrategy} from "./strategy/phonemic-strategy.service.js";
import {FormStrategy} from "./strategy/form-strategy.service.js";

@Module({
    imports: [CqrsModule],
    controllers: [ExerciseController],
    providers: [
        ExerciseContext,
        PhonemicStrategy,
        FormStrategy,
    ],
})
export class ExerciseModule {}
