export type GradeWeight = 'homework' | 'assessment' | 'quiz';

export interface Grade {
    id:string
    points: number
    weight: GradeWeight
}



