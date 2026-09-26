import {GetExerciseDto} from "../dto/get-exercise.dto.js";
import {CheckExerciseDto} from "../dto/check-exercise.dto.js";
import {GetDictionaryDto} from "../../dictionary/dto/get-dictionary.dto.js";

export interface IExerciseStrategy {
    generate(dictionary: GetDictionaryDto): GetExerciseDto
    check(answer: CheckExerciseDto, dictionary: GetDictionaryDto): { correct: boolean }
}