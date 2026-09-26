import {Controller, Get, Param, Query} from '@nestjs/common';
import {DictionaryService} from "./dictionary.service.js";

@Controller('dictionary')
export class DictionaryController {
    constructor(private readonly service: DictionaryService) {}

    @Get("/")
    getAll() {
        return this.service.findAll();
    }

    @Get("/random")
    getRandomOne() {
        return this.service.findRandom();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }
}
