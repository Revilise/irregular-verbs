import { Injectable } from '@nestjs/common';
import { DictionaryRepository } from "./dictionary.repository.js";
import { GetDictionaryDto } from "./dto/get-dictionary.dto.js";
import {getRandom} from "../../shared/utils/random.util.js";

@Injectable()
export class DictionaryService {
    constructor(private readonly repo: DictionaryRepository) {}

    async findAll(): Promise<GetDictionaryDto[]> {
        return this.repo.findAll();
    }

    async findOne(id: string): Promise<GetDictionaryDto | null> {
        return this.repo.findOne(id);
    }

    async findRandom(): Promise<GetDictionaryDto | null> {
        const total = this.repo.getTotal();
        const random = getRandom(0, total);
        return this.repo.findOne(random.toString());
    }
}
