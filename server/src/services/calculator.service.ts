import { Grade, GradeWeightSettings } from "../models/calculator.model";
import calcSettings from '../db/calcSettings.json';
import fs from 'fs';

const getAverage = (grades: number[], weight: number) => {
    if (grades.length > 0) {
        return (((grades.reduce((b, a) => a + b)) / (grades.length * 100)) * 100) * weight;
    } else {
        return 0;
    }
}

export const calculateClassAverage = (grades: Grade[]) => {
    const homeworks: number[] = [];
    const assessments: number[] = [];
    const quizzes: number[] = [];
    grades.forEach(grade => {
        switch (grade.weight) {
            case 'homework':
                homeworks.push(grade.points);
                break;
            case 'assessment':
                assessments.push(grade.points);
                break;
            case 'quiz':
                quizzes.push(grade.points);
                break;
            default:
                break;
        }
    });
    const homeworkAvg = getAverage(homeworks, calcSettings.homework);
    const assessmentAvg = getAverage(assessments, calcSettings.assessment);
    const total = homeworkAvg + assessmentAvg;

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
