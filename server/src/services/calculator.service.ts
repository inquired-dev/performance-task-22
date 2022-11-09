import { Grade, GradeWeightSettings } from "../models/calculator.model";
import calcSettings from '../db/calcSettings.json';
import fs from 'fs';

const getAverage = (grades: number[], weight: number) => (
    grades.length>0?(((grades.reduce((b, a) => a + b)) / (grades.length * 100)) * 100) * weight:0
);

export const calculateClassAverage = (grades: Grade[]) => {
    const homeworks: number[] = [];
    const assessments: number[] = [];
    const quizzez: number[] = [];
    grades.map(grade => grade.weight === 'homework'
        ? homeworks.push(grade.points)
        : grade.weight === 'quiz'
            ? quizzez.push(grade.points)
            : assessments.push(grade.points));
    const homeworkAvg = getAverage(homeworks, calcSettings.homework);
    const assessmentAvg = getAverage(assessments, calcSettings.assessment);
    const quizAvg = getAverage(quizzez, calcSettings.quiz);
    const total = homeworkAvg + assessmentAvg + quizAvg;

    return { total: total.toString() };
};

export const getWeightSettings = () => {
    return calcSettings;
};

export const updateGradeWeightValues = (settings: GradeWeightSettings) => fs.writeFile(
    './src/db/calcSettings.json',
    JSON.stringify(settings),
    function (err) {
        if (err) {
            console.log(err);
        }
        console.log('writing to calcSettings.json');
    }
);
