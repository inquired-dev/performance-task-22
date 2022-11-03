export type GradeWeight = 'homework' | 'assessment';

export interface Grade {
    points: number
    weight: GradeWeight
}
