import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetDictionaryQuery} from "./get-dictionary.query.js";
import {DictionaryService} from "../../dictionary.service.js";

@QueryHandler(GetDictionaryQuery)
export class GetDictionaryHandler implements IQueryHandler<GetDictionaryQuery> {
    constructor(private readonly dictionaryService: DictionaryService) {}

    execute(query: GetDictionaryQuery) {
        return this.dictionaryService.findOne(query.id);
    }
}