import { Grade, GradeWeightSettings } from "../models/calculator.model";
import calcSettings from '../db/calcSettings.json';
import fs from 'fs';

const getAverage = (grades: number[], weight: number) => (
    (((grades.reduce((b, a) => a + b)) / (grades.length * 100)) * 100) * weight
);

export const calculateClassAverage = (grades: Grade[]) => {
    const homework: number[] = [];
    const assessments: number[] = [];
    const quizzes: number[] = [];
    grades.map(grade => {
      if (grade.weight === 'homework') {
        homework.push(grade.points)
      } else if (grade.weight === 'assessment') {
        assessments.push(grade.points);
      } else if (grade.weight === 'quiz') {
        quizzes.push(grade.points);
      }
    });

    const homeworkAvg = getAverage(homework, calcSettings.homework);
    const assessmentAvg = getAverage(assessments, calcSettings.assessments);
    const quizAvg = getAverage(quizzes, calcSettings.quiz);
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
