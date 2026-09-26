import {Body, Controller, Get, Post} from '@nestjs/common';
import {GetExerciseDto} from "./dto/get-exercise.dto.js";
import {ExerciseContext} from "./exercise-context.service.js";
import {getRandom} from "../../shared/utils/random.util.js";
import {QueryBus} from "@nestjs/cqrs";
import {GetRandomDictionaryQuery} from "../dictionary/query/get-random-dictionary/get-random-dictionary.query.js";
import {CheckExerciseDto} from "./dto/check-exercise.dto.js";
import {GetDictionaryQuery} from "../dictionary/query/get-dictionary/get-dictionary.query.js";

@Controller('exercise')
export class ExerciseController {

    constructor(
        private readonly exerciseContext: ExerciseContext,
        private readonly queryBus: QueryBus,
    ) {}

    @Get('/generate')
    async generate(): Promise<GetExerciseDto> {
        const type = ["phonemic", "form"];
        const strategy = this.exerciseContext.setStrategy(type[getRandom(0, type.length)]);
        const dictionary = await this.queryBus.execute(new GetRandomDictionaryQuery());
        return strategy.generate(dictionary);
    }

    @Post('/check')
    async check(@Body() body: CheckExerciseDto): Promise<{ correct: boolean }> {
        const strategy = this.exerciseContext.setStrategy(body.type);
        const dictionary = await this.queryBus.execute(new GetDictionaryQuery(body.dictionary_id));
        return strategy.check(body, dictionary);
    }
}
