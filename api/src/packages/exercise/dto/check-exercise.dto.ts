import {IsString} from "class-validator";

export class CheckExerciseDto {
    @IsString()
    answer: string;

    @IsString()
    target_form: number;

    @IsString()
    dictionary_id: string;

    @IsString()
    type: string;
}