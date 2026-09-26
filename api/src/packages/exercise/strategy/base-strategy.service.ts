import {Injectable} from "@nestjs/common";
import type {IExerciseStrategy} from "./exercise-strategy.interface.js";
import {GetExerciseDto} from "../dto/get-exercise.dto.js";
import {getRandom} from "../../../shared/utils/random.util.js";
import {DictionaryEntity} from "../../dictionary/dictionary.entity.js";
import {ANSWER_WAYS} from "../const/index.const.js";
import {CheckExerciseDto} from "../dto/check-exercise.dto.js";
import {GetDictionaryDto} from "../../dictionary/dto/get-dictionary.dto.js";

@Injectable()
export class BaseExerciseStrategy implements IExerciseStrategy {
  generate(dictionary: DictionaryEntity): GetExerciseDto {
    return new GetExerciseDto({
      type: '',
      title: '',
      description: '',
      dictionary_id: dictionary.id,
      target_form: 0,
      answer_type: this.getAnswerWay(),
      options: [],
    });
  }

  check(
    { answer }: CheckExerciseDto,
    dictionary: GetDictionaryDto,
  ): { correct: boolean; answer: string } {
    return { correct: true, answer: '' };
  }

  getAnswerWay(): string {
    const ways = Object.values(ANSWER_WAYS);
    return ways[getRandom(0, ways.length)];
  }

  getForm(
    dictionary: DictionaryEntity,
    exclude?: number,
  ): { value: string; version: number } {
    const { v1, v2, v3 } = dictionary;
    const forms = [v1, v2, v3].filter((v, i) => i !== exclude);
    const random = getRandom(0, forms.length);
    return { value: forms[random], version: random };
  }
}