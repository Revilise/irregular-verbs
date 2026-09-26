import {Injectable} from "@nestjs/common";
import {DictionaryEntity} from "../../dictionary/dictionary.entity.js";
import {GetExerciseDto} from "../dto/get-exercise.dto.js";
import {BaseExerciseStrategy} from "./base-strategy.service.js";
import {capitalize} from "../../../shared/utils/string.util.js";
import {CheckExerciseDto} from "../dto/check-exercise.dto.js";
import {GetDictionaryDto} from "../../dictionary/dto/get-dictionary.dto.js";
import {ANSWER_WAYS} from '../const/index.const.js';

@Injectable()
export class PhonemicStrategy extends BaseExerciseStrategy {
  generate(dictionary: DictionaryEntity): GetExerciseDto {
    const answerWay = this.getAnswerWay();

    return new GetExerciseDto({
      type: 'phonemic',
      title: this.getTitle(),
      description: this.getDescription({ answerWay, ipa: dictionary.ipa }),
      dictionary_id: dictionary.id,
      target_form: 0,
      answer_type: answerWay,
    });
  }

  check(
    { answer }: CheckExerciseDto,
    dictionary: GetDictionaryDto,
  ): { correct: boolean; answer: string } {
    return {
      correct: answer === dictionary.v1,
      answer: dictionary.v1,
    };
  }

  getAnswerWay(): string {
    return ANSWER_WAYS.write;
  }

  getDescription({ answerWay, ipa }: { answerWay: string; ipa: string }) {
    return `${capitalize(answerWay)} infinitive of this verb: <strong>${ipa}</strong>`;
  }

  getTitle() {
    return 'Guess the verb (infinitive)';
  }
}