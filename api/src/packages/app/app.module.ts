import { Module } from '@nestjs/common';
import { WebModule } from "../web/web.module.js";
import { DictionaryModule } from "../dictionary/dictionary.module.js";
import { ExerciseModule } from "../exercise/exercise.module.js";

@Module({
  imports: [
    WebModule,
    DictionaryModule,
    ExerciseModule,
  ],
})
export class AppModule {}
