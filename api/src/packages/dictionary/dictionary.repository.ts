import { Injectable, OnModuleInit } from "@nestjs/common";
import { join } from "path";
import { readFileSync } from "fs";
import { PUBLIC_PATH } from "../../shared/const.js";
import { GetDictionaryDto } from "./dto/get-dictionary.dto.js";


export interface IDictionaryRepository {
    findAll: () => Promise<GetDictionaryDto[]>;
    findOne(id: string): Promise<GetDictionaryDto | null>;
}

@Injectable()
export class DictionaryRepository implements IDictionaryRepository, OnModuleInit {
    cache: GetDictionaryDto[] = [];

    async onModuleInit() {
        try {
            const path = join(PUBLIC_PATH, 'dictionary/dictionary.data.json');
            const content = readFileSync(path, 'utf-8');
            this.cache = JSON.parse(content) as GetDictionaryDto[];
        } catch (error) {
            console.error(error);
            this.cache = [];
        }
    }

    async findAll(): Promise<GetDictionaryDto[]> {
        if (!this.cache) {
            throw new Error('Dictionary not loaded yet');
        }
        return this.cache;
    }

    async findOne(id: string): Promise<GetDictionaryDto | null> {
        const list = await this.findAll();
        return list.find((e) => e.id === id) ?? null;
    }

    getTotal(): number {
        return this.cache.length;
    }
}