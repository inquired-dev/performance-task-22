import { GradeTypes } from "../utils/constants"

export type GradeWeightType = GradeTypes.HOMEWORK | GradeTypes.ASSIGNMENT | GradeTypes.QUIZ

export interface Grade {
    points: number,
    weight: GradeWeightType
}

export type GradeWeightSettings = {
    [key in GradeWeightType]: number
}
