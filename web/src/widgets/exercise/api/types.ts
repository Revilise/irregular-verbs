export interface ExerciseDto {
    type: string;
    title: string;
    description: string;
    dictionary_id: string;
    target_form: number;
    answer_type: string;
    options?: string[];
}

export interface ExerciseCheckDto {
    type: string;
    dictionary_id: string;
    target_form: number;
    answer: string;
}

export interface ExerciseCheckResultDto {
    correct: boolean;
    answer: string;
}