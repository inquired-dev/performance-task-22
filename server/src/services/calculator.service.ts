import { Grade } from "../models/calculator.model";

const getAverage = (grades: number[], weight: number) => (
    (((grades.reduce((b, a) => a + b)) / (grades.length * 100)) * 100) * weight
);

export const calculateClassAverage = (grades: Grade[]) => {
    const homework: number[] = [];
    const assessments: number[] = [];
    grades.map(grade => grade.weight === 'homework'
        ? homework.push(grade.points)
        : assessments.push(grade.points)
    );
    const homeworkAvg = getAverage(homework, .25);
    const assessmentAvg = getAverage(assessments, .75);
    const total = homeworkAvg + assessmentAvg;

    return { total: total.toString() };
};
