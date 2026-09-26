import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRandomDictionaryQuery } from "./get-random-dictionary.query.js";
import { DictionaryService } from "../../dictionary.service.js";

@QueryHandler(GetRandomDictionaryQuery)
export class GetRandomDictionaryHandler implements IQueryHandler<GetRandomDictionaryQuery> {
    constructor(private readonly dictionaryService: DictionaryService) {}

    execute(query: GetRandomDictionaryQuery) {
        return this.dictionaryService.findRandom();
    }
}

