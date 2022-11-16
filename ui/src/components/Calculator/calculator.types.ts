import { GradeTypes } from "./calculator.constants";

export type GradeWeight = GradeTypes.HOMEWORK | GradeTypes.ASSIGNMENT | GradeTypes.QUIZ;

export interface Grade {
    points: number
    weight: GradeWeight
}
