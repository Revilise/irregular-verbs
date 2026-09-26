import {Injectable} from "@nestjs/common";
import {GetExerciseDto} from "../dto/get-exercise.dto.js";
import {randomSequence} from "../../../shared/utils/random.util.js";
import {shuffle} from "../../../shared/utils/array.util.js";
import {capitalize} from "../../../shared/utils/string.util.js";
import {BaseExerciseStrategy} from "./base-strategy.service.js";
import {CheckExerciseDto} from "../dto/check-exercise.dto.js";
import {GetDictionaryDto} from "../../dictionary/dto/get-dictionary.dto.js";

@Injectable()
export class FormStrategy extends BaseExerciseStrategy {
  generate(dictionary: GetDictionaryDto): GetExerciseDto {
    const answerWay = this.getAnswerWay();
    const questionForm = this.getForm(dictionary);
    const expectedForm = this.getForm(dictionary, questionForm.version);

    return new GetExerciseDto({
      type: 'form',
      title: this.getTitle(),
      description: this.getDescription({
        expectedForm,
        questionForm,
        answerWay,
      }),
      dictionary_id: dictionary.id,
      target_form: expectedForm.version,
      answer_type: answerWay,
      options: this.getOptions({
        dictionary,
        expectedValue: expectedForm.value,
      }),
    });
  }

  check(
    { answer, target_form }: CheckExerciseDto,
    dictionary: GetDictionaryDto,
  ): { correct: boolean; answer: string } {
    const { v1, v2, v3 } = dictionary;
    const correctAnswer = [v1, v2, v3].at(target_form);

    return {
      correct: answer === correctAnswer,
      answer: correctAnswer as string,
    };
  }

  getOptions({
    dictionary,
    expectedValue,
  }: {
    dictionary: GetDictionaryDto;
    expectedValue: string;
  }) {
    const randoms = randomSequence({
      max: dictionary.options.length,
      count: 2,
    });
    const options = randoms.map((i: number) => dictionary.options[i]);
    return shuffle([...options, expectedValue]);
  }

  getDescription({
    expectedForm,
    questionForm,
    answerWay,
  }: {
    expectedForm: { value: string; version: number };
    questionForm: { value: string; version: number };
    answerWay: string;
  }) {
    return `${capitalize(answerWay)} <strong>${expectedForm.version + 1} form</strong> of ${questionForm.value}`;
  }

  getTitle() {
    return 'Guess another form of verb (infinitive)';
  }
}