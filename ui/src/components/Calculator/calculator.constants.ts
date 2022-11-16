import { Grade } from './calculator.types';

export enum GradeTypes {
    HOMEWORK = 'homework',
    ASSIGNMENT = 'assignment',
    QUIZ = 'quiz',
}

export const initialData: Grade[] = [
    {
        points: 0,
        weight: GradeTypes.HOMEWORK
    },
    {
        points: 0,
        weight: GradeTypes.ASSIGNMENT
    },
    {
        points: 0,
        weight: GradeTypes.QUIZ
    },
];
