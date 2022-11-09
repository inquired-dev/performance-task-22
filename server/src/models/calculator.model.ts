export type GradeWeightType = 'homework' | 'assessment' | 'quiz'

export interface Grade {
    points: number,
    weight: GradeWeightType
}

export type GradeWeightSettings = {
    [key in GradeWeightType]: number
}
