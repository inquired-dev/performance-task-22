export type GradeWeight = 'homework' | 'assessment' | 'quiz';

export interface Grade {
    points: number
    weight: GradeWeight
}

export interface FormData extends Grade {
    id: number;
}