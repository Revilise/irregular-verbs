import {IsArray, IsString} from "class-validator";

export class GetDictionaryDto {
    @IsString()
    readonly id: string;

    @IsString()
    readonly v1: string;

    @IsString()
    readonly v2: string;

    @IsString()
    readonly v3: string;

    @IsString()
    readonly ipa: string;

    @IsArray()
    @IsString({ each: true })
    readonly options: string[];
}