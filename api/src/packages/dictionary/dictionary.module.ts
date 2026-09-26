import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service.js';
import { DictionaryController } from './dictionary.controller.js';
import { DictionaryRepository } from "./dictionary.repository.js";
import { handlers } from "./query/index.js";

@Module({
  controllers: [DictionaryController],
  providers: [
      DictionaryService,
      DictionaryRepository,
      ...handlers
  ],
})
export class DictionaryModule {}