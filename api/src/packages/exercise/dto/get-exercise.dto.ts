import {IsArray, IsNumber, IsString} from "class-validator";
import {DictionaryEntity} from "../../dictionary/dictionary.entity.js";

export class GetExerciseDto {
    @IsString()
    readonly type: string;

    @IsString()
    readonly title: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly dictionary_id: DictionaryEntity["id"];

    @IsNumber()
    readonly target_form: number;

    @IsString()
    readonly answer_type: string;

    @IsArray()
    @IsString({ each: true })
    readonly options: string[];

    constructor(options: {
        type: string,
        title: string;
        description: string;
        dictionary_id: string;
        target_form: number;
        answer_type: string;
        options?: string[];
    }) {
        this.type = options.type;
        this.title = options.title;
        this.description = options.description;
        this.dictionary_id = options.dictionary_id;
        this.target_form = options.target_form;
        this.answer_type = options.answer_type;
        this.options = options.options ?? [];
    }
}